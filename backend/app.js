//To get request and route it
const express = require('express');
const cors = require('cors');
var app = new express()
const UserEvent = require('./Models/UserEvents')



app.use(express.json())
app.use(cors());

 
//root url

//Getting Data for first page home page


// //CURD operation for UserEvent 


app.post("/event",async (req,res) => {
    try {
        const { body } = req;
        const oDate = body.date
        const hell = oDate.split("T")[0]
        console.log("check date",hell)
        body.date = hell
         let userEvent = await UserEvent.create(body)
         res.send(userEvent);       
    } catch (error) {
        console.log(error)
    }
})

app.patch("/event/:id", async (req,res) => {
    try {
        let { body,params } = req;
        let upDated = await UserEvent.update(body,{where:{id : params.id}})
        res.send(upDated);
        
    } catch (error) {
       console.log(error) 
    }
    
})

app.post("/getdata", async(req,res) => {
    
    try {
        const { body } =req
        const oDate = body.eDate
        const hell = oDate.split("T")[0]
        body.eDate = hell
        console.log(body.eDate)
        let userEvent = await UserEvent.findAll({where:{date : body.eDate}})
        //{where:{date : req.body.eDate}}
        res.send(userEvent)
        
    } catch (error) {
        console.log(error)
    }
})

app.delete("/event/:id", async (req,res) => {
    try {
        const { params } = req;
        let userEvent = await UserEvent.destroy({where: {id: params.id}});
        res.status(200).send("Deleted successfully");
    } catch (error) {
        console.log(error)
    }
})


module.exports = app;