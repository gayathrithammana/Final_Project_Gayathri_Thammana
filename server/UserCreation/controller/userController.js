const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.create = (req,res) => {
    console.log(req.body.email);
    const data = {
        email: req.body.email
    };
    
    User.findOne(data, (error, user) => {
        if(user){
            res.status(401).send({'message':'User exists already with this Email Id'});
            
        }else{

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    
                    const user = new User({
                        email : req.body.email,
                        password : hash,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName
                    });

                    user.save().then(() => {
                        res.send({'message':'User created successfully'});
                    }, () => {
                        console.log('Error while creating user');
                    });
                });
            });

        }
    })
    
};

exports.getUser = (req,res) => {
    const email = req.params.email.split("=")[1];
    const password = req.params.password.split("=")[1];
    
    User.findOne({email: email}, (error,user) => {
        if(!user || error){
            res.status(401).send({'message':'Invalid Email Id'});
        }else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(!result || err){
                    res.status(401).send({'message':'Invalid Password'});
                }else{
                    res.send({'user':user});
                }
            });
        }
        
        
    })
};

exports.delete = (req,res) => {
    User.findOneAndRemove(req.params.email).
    then(user => {
        res.send({'message':'user deleted successfully'});
    }); 
};