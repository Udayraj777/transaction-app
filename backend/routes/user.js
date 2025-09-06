const express = require('express');
const zod =require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const { User ,Account} = require('../db');
const {signinSchema ,signupSchema,updateUserSchema}=require('../middleware/validation');
const { authMiddleware } = require('../middleware/Authmiddleware');

const router = express.Router();


router.post('/signup', async (req,res)=>{
    const validation=signupSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }

    //check if user already exist 
    const existingUser = await User.findOne({
        username:req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            message:"Email already taken"
        });
    }

    // hash the password
    const saltRounds=10;
    const hashedPassword= await bcrypt.hash(req.body.password,saltRounds);

    // create the user
    const user = await User.create({
        username:req.body.username,
        password:hashedPassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName

    });
    
    // create an account

    const randomBalance = Math.floor(Math.random()*10000)+1;

    // create a account

    const account = await Account.create({
        userId:user._id,
        balance:randomBalance*100
    });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });


});

router.post('/signin',async (req,res)=>{
    const validation=signinSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }

    const user = await User.findOne({username:req.body.username});

    if(user){
        const isValid= await bcrypt.compare(req.body.password,user.password);

        if (isValid){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
            res.json({token:token });
        } else{
            res.status(411).json({
                message:"Error while logging in "
            });
        }
    } else {
        res.status(411).json({  
            message:"Error while logging in "
        });

    }

    
});


router.put('/update',authMiddleware,async(req,res)=>{
    const validation = updateUserSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(411).json({
            message:"Error while updation information"
        });
    }

    // build update data object 

    const updateData={};

    if(validation.data.password){
        const saltRounds=10;
        const hashedUpdatedpassword = await bcrypt.hash(validation.data.password, saltRounds); 
        updateData.password=hashedUpdatedpassword;
    }
    if(validation.data.firstName){
        updateData.firstName=validation.data.firstName;
    }
    if(validation.data.lastName){
        updateData.lastName=validation.data.lastName;
    }

    // update in database

    await User.updateOne(
        {_id:req.userId},
        updateData
    );

    res.json({
        message:"updated successfully"
    });


});

router.get('/bulk',authMiddleware,async(req,res)=>{
    const filter= req.query.filter || "";

    const users= await User.find({
        $or:[
            {firstName:{$regex:filter,$options:"i"}},
            {lastName:{$regex:filter,$options:"i"}}
        ]
    });

    res.json({
        users:users.map(user=>({
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    });
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Check if userId exists from auth middleware
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        code: "AUTH_REQUIRED"
      });
    }

    // Find user and exclude sensitive fields
    const user = await User.findById(req.userId).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });

  } catch (error) {
    console.error('Error in /me endpoint:', error);
    
    // Handle different types of errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
        code: "INVALID_USER_ID"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "SERVER_ERROR"
    });
  }
});

module.exports = router;