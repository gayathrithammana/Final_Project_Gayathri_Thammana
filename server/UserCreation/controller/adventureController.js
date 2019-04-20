const Adventure = require('../model/adventure');
const fs = require('fs');

exports.getAdvList = (req, res) => {
    const adventureType = req.params.adventureType.split("=")[1];
    Adventure.find({adventureType:adventureType}, (error, list) => {
        if(list){
            res.send(list);
        } else{
            res.send('Error Retreiving adventure list');
        }
    });
}

exports.createadv = (req,res) => {
    const adventure = new Adventure({
        adventureType:req.body.adventureType,
        title : req.body.title,
        price : req.body.price,
        desc: req.body.desc,
        age: req.body.age,
        Availability: req.body.Availability,
       
    });
    if(adventure){

        adventure.save().
        then(() => {
            res.sendStatus(200);
        }).catch(()=>{
            res.status(400).send({message : 'Bad Request'});
        });
    }
};