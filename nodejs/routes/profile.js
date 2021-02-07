const router = require("express").Router();
const Joi = require("joi");
const User = require("../model/User");

const profileSchema = Joi.object({
    name:Joi.string().min(6).required(),
    image:Joi.string().min(6).required(),
    DOB:Joi.date().required(),
    education:Joi.string().min(6).required()
});

router.post('/', async (req,res) =>{
    try {
        const value = await profileSchema.validateAsync(req.body);
        console.log(req.user)
        await User.findByIdAndUpdate(req.user._id, { $set: req.body })
        return res.status(200).json({message:"Successfully updzte."});
    } catch (error) {
        return res.status(400).json(
            {
                msg:error.details[0].message
            }
        );
    }
    
});

// get profile of user
router.get('/me', async (req,res) =>{
    // user find by id
    // delete password
    // return user object
    try {
        // const value = await profileSchema.validateAsync(req.body);
        // console.log(req.user)
        
        const uservalue =await User.findById(req.user._id )
        console.log(uservalue)
        delete uservalue._doc.password
        console.log(uservalue)
        return res.status(200).json({data: uservalue})

    } catch (error) {
        console.log(error)
        return res.status(400).json(
            {
                msg:error.details[0].message
                
            }
        );
    }
    
    
    
});




module.exports = router;
