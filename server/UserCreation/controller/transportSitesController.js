const TransportSite = require('../model/transportSite');

exports.getSites = (req, res) => {
    const transportType = req.params.transportType.split("=")[1];
    TransportSite.find({transportType: transportType}, (error, list) => {
        if(list){
            res.send(list);
        } else{
            res.send('Error Retreiving Transport Sites list');
        }
    })
}
