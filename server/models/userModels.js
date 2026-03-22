import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true,unique:true},
    password:{type:String,required:true},
    verifyOtp:{type:String,default:''},
    otpExpiredAt:{type:Number,defalut:0},
    resetOtp:{type:String,default:''},
    resetOtpExpiredAt:{type:Number,default:0},
    isOtpVerified:{type:Boolean,defalut:false}

})
const userModel = mongoose.model.user || mongoose.model("user",userSchema);
export default userModel;