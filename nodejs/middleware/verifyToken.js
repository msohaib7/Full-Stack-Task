const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    const token=req.header('auth-token');
    if (!token) return res.status(401).json({message:"Access denied"});
    

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).json({message:'Invalid Token'});

    }
}

// router.get('/me', VerifyToken, function(req, res, next) {

//   User.findById(req.userId, { password: 0 }, function (err, user) {
//     if (err) return res.status(500).send("There was a problem finding the user.");
//     if (!user) return res.status(404).send("No user found.");
    
//     res.status(200).send(user);
//   });
  
// });