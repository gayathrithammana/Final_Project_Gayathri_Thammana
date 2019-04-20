var express = require('express')
var multer  = require('multer')

var app = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpeg')
    }
  })
  
  var upload = multer({ storage: storage }).single('Image');

 
  
  app.post('/', function (req, res) {
      var path ='';
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
       res.status(422).send("an Error occurred");
      } 
      else{
        path = req.file.path;
        return res.send("Upload complete for"+path);
    
      }
  
      // Everything went fine.
    });
  })

  module.exports= app;
