const router = require("express").Router();
const User = require('../model/User');
// const {registerValidation} = require('../validation');
// const {loginValidation} = require('../validation');
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken');
var nodemailer = require('nodemailer');

const joi= require("joi");
const Joi = require("joi");



const registerSchema = Joi.object({
    username:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    confirmpassword:Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});
const forgotSchema = Joi.object({
    email:Joi.string().min(6).required().email()
});

router.post('/register',async(req,res) => {
    try {
        const value = await registerSchema.validateAsync(req.body);
        console.log(value)
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(400).json({message:'Password dies not match'});
        }

        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).json({message:'Email already exist'});
           
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
        const savedUser = await user.save();
        return res.send({message:"User created"});
    }
    catch (error) {
        return res.status(400).json(
            {
                msg:error.details[0].message
            }
        );

     }
});

router.post('/login', async(req,res) => {
    try {
        const value = await loginSchema.validateAsync(req.body);
        console.log(value)
        const userExist = await User.findOne({
            email:req.body.email
        })
        if (!userExist){
            return res.status(400).json({msg:"email or password is incorrect"})
        }

        const validPass =await bcrypt.compare(req.body.password,userExist.password);
        if(!validPass) {
            return res.status(400).json({msg:"email or password is incorrect"})
        }

        const token =jwt.sign({_id:userExist._id}, process.env.TOKEN_SECRET);
        return res.status(200).json({token: token});
        
    }
    catch (error) {
        return res.status(400).json(
            {
                msg:error.details[0].message
            }
        );

    }
});

// /forgot password 
// accept email, validate email
// 1- find user by email  await User.find({email: req.body.email})
// 2- if not exist retun user not exist in json
// 3- genrate 16 rnadom text
// 4- aik link localhost:3000/resetpassword?userid=_id&resettoken={resettoken}
// 5- user ki amil pa send
router.post('/me', async(req,res) => {
    try {
        const value = await forgotSchema.validateAsync(req.body);
        console.log(value)
        const userExist = await User.findOne({
            email:req.body.email
        })
        if (!userExist){
            return res.status(400).json({msg:"email or password is incorrect"})
        }

        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
         
        randomToken= makeid(16);
        url ='/resetpassword"\"?userid=_id&resettoken=randomToken';
         


        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
        });

        var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        
    }
    catch (error) {
        return res.status(400).json(
            {
                msg:error.details[0].message
            }
        );

    }
});





// /reset password




module.exports = router;
