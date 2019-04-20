const Book = require('../model/booking');
var fs = require('fs');
const Cart = require('../model/cart');

exports.create = (req,res) => {
    const Booking = new Book({
        AdvType: req.body.AdvType,
        Date : req.body.Date,
        Time : req.body.Time,
        price: req.body.price,
        Available: req.body.Available,
        
    });
    if(Booking){

        
        Booking.save().
        then(() => {
            res.sendStatus(200);
        }).catch(()=>{
            res.status(400).send({message : 'Bad Request'});
        });
    }
};

exports.getBooking = (req,res) => {
    
    const data ={
        Date : req.params.date.split("=")[1],
         AdvType :  req.params.adventuretype.split("=")[1]
         
    };
 
   console.log("print"+data.AdvType+data.Date);
    Book.find(data,function (err,booksnow){
        if(err)
        res.status(400).send({message : 'Bad Request (AdventureType not found)'});
        if(booksnow)
        console.log("result"+booksnow);
            res.send(booksnow);
        
        });
   
    }


exports.addCartItem = (req, res) => {
    
    const ts = new Cart({
        email: req.body.email,
        packageDetails: req.body.packageDetails
    });

    ts.save().then(() => {
        console.log('Inserted Cart Item');
        res.send({'message':'Inserted Cart Item'});
    }, (err) => {
        console.log('Error while inserting cart item');
        return res.send(err);
    });

};

exports.getCardItems = (req, res) => {
    const email = req.params.email.split("=")[1];
    Cart.find({'email':email}, (error, list) => {
        if(list){
            res.send(list);
        }else{
            res.send('Error Retreiving Posts');
        }
    })
}

exports.deleteFromCart = (req, res) => {
    
    const id = req.params.id.split("=")[1];
    console.log(id);
    Cart.findByIdAndDelete({_id:id}, (error, data) => {
        if(!error){
            res.send({'message':'Deleted Cart Succssfully'});
        }
        else{
            res.send(error);
        }
        
    })
}
    exports.deleteAll = (req, res) => {
    
        Cart.find({},(error,data)=>{
            data.forEach(element => {
                
                Cart.findOneAndDelete({_id:element._id}, (error, data) => {
                    if(!error){
                        res.send({'message':'Deleted Cart Succssfully'});
                    }
                    else{
                        res.send(error);
                    }
                    
                });
            });
        });
       
        

}