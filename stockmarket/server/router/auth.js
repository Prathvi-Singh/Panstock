const { application } = require('express');
const express=require('express');
const  router=express.Router();
 const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');

require('../db/conn.js');

router.use(express.json());

const User=require('../models/userinfo.js')


router.get('/',(req,res)=>{
    res.send("Hello , I am flipr");
 });
 

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const {name,email,phone,password,cpassword}=req.body;

    if(!name || !email || !phone  || !password || !cpassword){
        res.json({error:"you missed some information"});
    }
    else if(password!=cpassword){
        res.json({error:"password and cpassword not matching"}); 
    }
    
    try{
        const userExist=await User.findOne({email:email})

            if(userExist){
                return res.status(422).json({error:"this info already present"});
            }
    
            const user_info =new User(req.body);
    
            await user_info.save()
    
            res.status(201).json({message:'successfully register'});
              
    }
    catch(err){
       console.log(err);
    }
})


router.get('/signin',(req,res)=>{
   res.send("I am also wating for login page");
});


router.post('/signin',async(req,res)=>{
    try{
      const {email,password}=req.body;
      console.log(req.body);
    
      if(!email || !password){
          return res.status(400).json({error:"please filled both information"});
      }

      const User_info=await User.findOne({email:email});
      console.log(User_info);

      const match = await bcrypt.compare(password,User_info.password);


      if(!match){
        console.log(match);
         return res.status(400).json({error:"invalid increndtials"});
      }
     
      res.status(201).json({message:'successfully signin'});
    }
    catch(err){
         console.log(err);
    }

  })

  



module.exports=router;