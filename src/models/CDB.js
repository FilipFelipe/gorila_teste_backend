const knex = require('../config/database');

class CDB {
    async salvarConsulta(data) {
        return await knex('cdb_TB').insert(data).returning("id")
    }

    async findById(id) {
        return await knex.select('cdbRate', 'investmentDate', 'currentDate')
            .from('cdb_TB')
            .where({ id: id })
            .first();
    }
}


module.exports = new CDB();