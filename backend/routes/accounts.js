const express=require("express");
const { authMiddleware } = require("../middleware/Authmiddleware");
const { Account } = require("../db");
const mongoose=require('mongoose');

const router=express.Router();


router.get('/balance',authMiddleware,async (req,res)=>{
    try {
        const account= await Account.findOne({
            userId:req.userId
        });

        if(!account){
            return res.status(404).json({
                message:"Account not found"
            });
        }

        res.json({
            balance:account.balance/100
        });

    } catch (error) {
        return res.status(411).json({
            message:"error while getting balance"
        });
    }
});

router.post('/transfer',authMiddleware,async(req,res)=>{
    
    const session = await mongoose.startSession();

    try {
        
        session.startTransaction();
        const { to , amount } = req.body;

        const account= await Account.findOne({userId:req.userId}).session(session);

        if(!account || account.balance<amount*100){
            await session.abortTransaction();
            return res.status(400).json({message:"Insufficient Balance"});
        }

        const toAccount = await Account.findOne({ userId:to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Invalid Account"
            });
        }
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount*100}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount*100}}).session(session);

        await session.commitTransaction();
        res.json({message:"Transfer successful"});
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({message:"Transfer failed"});

    }finally{
        session.endSession();
    }
});



module.exports=router;
