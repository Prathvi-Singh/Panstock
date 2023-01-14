const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userInfo=new mongoose.Schema({
     name:{
        type: String,
        required : true,
     } ,
     email:{
        type:String,
        required : true,
     },
     phone:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     }
     ,
     cpassword:{
        type:String,
        required:true,
     }
     ,

})


userInfo.pre('save',async function(next){
   console.log("hi I am prathvi");
   if(this.isModified('password')){
      this.password=await bcrypt.hash(this.password,12);
      this.cpassword=await bcrypt.hash(this.cpassword,12);
   }
   next();
});

const User=mongoose.model('User',userInfo);

module.exports=User;
