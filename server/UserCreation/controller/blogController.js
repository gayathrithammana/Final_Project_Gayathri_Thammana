const Post = require('../model/post');

exports.upload = (req, res) => {
    
    var encode_image = req.body.file.toString('base64');
    var image = new Buffer(encode_image, 'base64')

    const ts = new Post({
        postDesc: req.body.postDesc,
        email: req.body.email,
        likes: req.body.likes | 0,
        liked_by: [],
        comments: [],
        img: { 
            data: image, 
            contentType: req.body.fileType
        }
    });

    ts.save().then(() => {
        console.log('Thanks for sharing your experience!!');
        res.send({'message':'Thanks for sharing your experience!!'});
    }, (err) => {
        console.log('Error while inserting Post');
        return res.send(err);
    });
}

exports.getPosts = (req, res) => {
    Post.find({}, (error, list) => {
        if(list){
            res.send(list);
        }else{
            res.send('Error Retreiving Posts');
        }
    })
}
exports.updateLikes = (req, res) => {
    const likes = req.body.likes;
    const objectId = req.body.objectId;
    const likedBy = req.body.liked_by;
    const unlikedBy = req.body.unliked_by;

    if(likedBy){
        Post.updateOne({_id: objectId}, { $push: {"liked_by": likedBy}}).then((result) => {
            if(result){
                Post.updateOne( {_id: objectId},{$set:{"likes": likes}}).then((result) => {
                    if(result){
                        return res.send({'message': 'Updated likes'});
                    }else{
                        return res.status(401).send("Invalid Id");
                    }
                }).catch((err) => {
                    return res.status(401).send(err.message);
                });
            }else{
                return res.status(401).send("Invalid Id");
            }
        }).catch((err) => {
            return res.status(401).send(err.message);
        });
    } else if(unlikedBy){
        Post.updateOne({_id: objectId},{$pull:{"liked_by": unlikedBy}}).then((result) => {
            if(result){
                Post.updateOne( {_id: objectId},{$set:{"likes": likes}})
                    .then((result) => {
                        if(result){
                            return res.send({'message': 'Updated likes'});
                        }else{
                            return res.status(401).send("Invalid Id");
                        }
                    }).catch((err) => {
                        return res.status(401).send(err.message);
                    });    
            }else{
                return res.status(401).send("Invalid Id");
            }
        }).catch((err) => {
            return res.status(401).send(err.message);
        });
    }
}

exports.deletePost = (req, res) => {
    const id = req.params.id.split("=")[1];
    Post.findByIdAndDelete({_id:id}, (error, data) => {
        if(!error){
            res.send({'message':'Deleted Post Successfully'});
        }
        else{
            res.send(error);
        }
    })
}

exports.addComment = (req, res) => {
    console.log(req.body.id);
    const objectId = req.body.id;
    Post.updateOne( {_id: objectId},{ 
        $push: {
            "comments": {
                comment: req.body.comment,
                userName: req.body.userName
            }
        }
    }, {new: true})
    .then((result) => {
        console.log(result);
        if(result){
            Post.find({_id: objectId},{comments:1, _id:0}, (error, list) => {
                if(list){
                    res.send(list);
                }else{
                    res.send('Error Retreiving Comments');
                }
            })
        }else{
            return res.status(401).send("Invalid Id");
        }
    }).catch((err) => {
        return res.status(401).send(err.message);
    });  
}