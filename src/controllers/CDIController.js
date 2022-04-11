const cdiModel = require('../models/CDI');
const moment = require('moment');
const readline = require('readline');
const { Readable } = require('stream');

module.exports = (app) => {
    function tratarData(data) {
        const dataISO = moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
        return dataISO;
    }
    const savecdi = async (req, res) => {
        const { buffer } = req.file
        try {
            await cdiModel.deleteAll();
            const data = await editCSV(buffer)
            await cdiModel.saveCDITable(data);
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send();
        }
    }

    const listarCDI = async (req, res) => {
        try {
            const cdiFromDB = await cdiModel.findAll();
            return res.status(200).json(cdiFromDB);
        } catch (error) {
            return res.status(500).send('error');
        }
    }

    async function editCSV(buffer) {
        const createCSV = new Readable()
        createCSV.push(buffer)
        createCSV.push(null)

        const lineCSV = readline.createInterface({
            input: createCSV
        })

        const dataCSV = []
        for await (let line of lineCSV) {
            const lineCSV = line.split(",")
            dataCSV.push({ name: lineCSV[0], lastTradePrice: lineCSV[2], date: tratarData(lineCSV[1]) })
        }
        dataCSV.shift();
        return dataCSV;
    }
    return { savecdi, listarCDI };
};