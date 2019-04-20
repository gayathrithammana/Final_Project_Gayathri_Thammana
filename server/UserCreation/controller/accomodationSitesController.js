const AccomodationSite = require('../model/accomodationSite');

exports.getSites = (req, res) => {
    AccomodationSite.find( {} , (error, list) => {
        if(list){
            res.send(list);
        } else{
            res.send('Error Retreiving Accomodation Sites list');
        }
    })
}

