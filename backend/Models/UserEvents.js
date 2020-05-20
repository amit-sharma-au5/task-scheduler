const Sequelize = require('sequelize');
const db = require('../database');




 let userevent = db.define("calendars",{
    date : {
        type: Sequelize.STRING,
        allowNull : false
    },
    taskTime : { 
        type : Sequelize.INTEGER,
        allowNull: false
    },
    task : {
        type : Sequelize.STRING,
        allowNull : false
    },
    link : {
        type : Sequelize.STRING,
    },
    member : {
        type :Sequelize.STRING
    }
   
 })





db.sync().then((res) => {console.log("Calendar table has been created")})
  

module.exports = userevent;