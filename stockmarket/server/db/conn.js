const mongoose=require('mongoose');

const DB="mongodb+srv://pan:Prathvi123@cluster0.yfkvsl4.mongodb.net/stockdb?retryWrites=true&w=majority";


mongoose.set('strictQuery', true);
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log(`connection successfully connected`);
}).catch((err)=>{
    console.log("error error ...");
})