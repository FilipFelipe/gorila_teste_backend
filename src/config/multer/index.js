const multer = require('multer');
const multerconfig = multer().single("fileCSV");

module.exports = (app) => {
    app.multerconfig = multerconfig
};
