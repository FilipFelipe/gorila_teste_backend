
module.exports = (app) => {
    app.route('/').get(app.src.controllers.inicio.init);

    app.route('/cdi')
        .get(app.src.controllers.CDIController.listarCDI)
        .post(app.multerconfig, app.src.controllers.CDIController.savecdi);

    app.route('/cdb')
        .post(app.src.controllers.CDBController.consultarCDB);

    app.route('/cdb/:id')
        .get(app.src.controllers.CDBController.calcularCDB);

};