//for database

//This file only for to create database connection .

//this is a connection constructor, so we have to create a constructor instance 
const sequelize = require('sequelize')


//Pool is a constructor which contain configuration 

const db = new sequelize("calendar" , "postgres", "as1234", {
    host: "localhost",
    dialect : "postgres"
});

db.authenticate().then(() => console.log("DB connection is established"))
//db is my connection object using this we can create models 
module.exports = db; 
