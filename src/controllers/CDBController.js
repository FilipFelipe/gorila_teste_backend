const NotFound = require('../exceptions/notFound');
const cdbModel = require('../models/CDB');
const cdiModel = require('../models/CDI');
const moment = require('moment');

module.exports = (app) => {
    const { existsOrError } = app.src.utils.validation;

    function tratarData(data) {
        const dataISO = moment(data).format("YYYY/MM/DD");
        return dataISO;
    }

    function calcular(cdbRate, cdiFromDB) {
        cdiFromDB.pop(); // excluir a data final
        let acumulado = 1
        const arredondamento = Math.pow(10, 8)
        const resultado = cdiFromDB.map(data => {
            let lastTradePrice = data.lastTradePrice
            let taxaCDI = Math.pow((lastTradePrice / 100) + 1, (1 / 252)) - 1
            taxaCDI = Math.round(taxaCDI * arredondamento) / arredondamento
            acumulado *= (1 + (taxaCDI * (cdbRate / 100)))
            let unitPrice = 1000 * (Math.round(acumulado * arredondamento) / arredondamento)
            return { "date": tratarData(data.date), "unitPrice": parseFloat(unitPrice.toFixed(5)) }
        });
        return resultado;
    }

    const consultarCDB = async (req, res) => {
        const { investmentDate, cdbRate, currentDate } = req.body;
        try {
            existsOrError(investmentDate, 'Data inicial do investimento não informado');
            existsOrError(cdbRate, 'Taxa do CDB não informada');
            existsOrError(currentDate, 'Data atual não informada');
        } catch (error) {
            return res.status(406).json({ "Erro": error });
        }
        try {
            const consultaCDB = await cdbModel.salvarConsulta({ investmentDate, cdbRate, currentDate });
            return res.status(200).send(consultaCDB[0])
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    const calcularCDB = async (req, res) => {
        const { id } = req.params;
        try {
            const buscarConsulta = await cdbModel.findById(id);
            if (!buscarConsulta) {
                throw new NotFound('Número de identificação não localizado')
            }

            const buscarCDI = await cdiModel.findBetweenDates(buscarConsulta.investmentDate,
                buscarConsulta.currentDate)
            if (buscarCDI.length<2) {
                throw new NotFound('Não há datas nesse período')
            }

            const calcularCDI = calcular(buscarConsulta.cdbRate,
                buscarCDI);

            return res.status(200).send(calcularCDI)

        } catch (error) {
            if (error instanceof NotFound) {
                return res.status(404).send({msg:error.message})
            }
            return res.status(500).send({ msg: 'Erro Interno do Servidor' })
        }
    }
    return { consultarCDB, calcularCDB };
};