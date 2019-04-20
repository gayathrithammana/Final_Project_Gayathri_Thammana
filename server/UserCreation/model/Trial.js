var fs = require('fs');
const imgPath = './../../src/assets/group-adventure.jpeg';
const Package = require('../Schema/PackageSchema');
var flag=0;

const Pckg = new Package({
title :'Bungee Jumping',
price:'2400$',
desc:'test',
cities:'Boston,Albany,Nashua,White Moutains',
departureCity:'Boston',
departuteTime:'9:15am',
returnTime:'8:30PM',
dressCode:'Casual, comfortable clothes',
included:'Bungee Jumping',
notIncluded:'DepartureTaxes,Breakfast',
days:'4'
});


// var bitmap=fs.readFileSync(imgPath);
// Pckg.img.data = new Buffer(bitmap).toString('base64');
// Pckg.img.data=fs.readFileSync(imgPath);
// Pckg.img.contentType = 'image/jpeg';
// Pckg.img.name ='group-adventure';

Package.find({},function(err,success){
if(err)
throw err;
if(success)
{
   success.forEach(function(each){
       if(each.title===Pckg.title)
       flag=1;

   });
//console.log({success:success});
}
if(flag==0){
Pckg.save(function(err,a){
    if (err) throw err;
      else
      console.log("Image saved");
});
}
else{
    console.log("Package exists");
}
});



   

  