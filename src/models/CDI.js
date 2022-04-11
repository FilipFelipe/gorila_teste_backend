const knex = require('../config/database');
class CDI {
   async saveCDITable(dataCSV) {
      await knex('cdi_TB').insert(dataCSV);
   }

   async findAll() {
      return await knex.select('name', 'date', 'lastTradePrice').from('cdi_TB');
   }

   async findBetweenDates(investmentDate, currentDate) {
      return await knex.select('date', 'lastTradePrice')
         .whereBetween('date', [investmentDate, currentDate]).orderBy('date', 'asc')
         .from('cdi_TB');
   }
   
   async deleteAll() {
      return await knex.delete().from('cdi_TB');
   }
}


module.exports = new CDI();