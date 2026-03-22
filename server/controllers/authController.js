import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export const Register = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"details missing"});
    }
    try {
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.json({success:false,message:"User already exist!"});
        }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({name,email,password:hashedPassword});
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '7d'});
    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        sameSite: process.env.NODE_ENV==='production' ?'none':'strict',
        maxAge: 7*24*60*60*1000


    })
     res.json({success:true});
        
    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
    
}
export const login =async (req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        return res.json({success:false,message: 'email and password is missing '})
    }

    try {
        const user =await userModel.findOne({email});
        if(!user){
           return res.json({success:false,message:'User does not exist'});

        }

        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.json({success:false,message:'wrong password'});


        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000



        })
        res.json({success:true});


    } catch (error) {
        res.json({success:false,message:error.message});
        
    }

}
export const logout = async (req,res)=>{
    
}