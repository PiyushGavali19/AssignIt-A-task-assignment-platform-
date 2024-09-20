const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
const { redirect } = require("react-router-dom");

main().then(res=> console.log("connection successfull")).catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let Chat1 = new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"Hello Priya send me your Notes",
//     created_at: new Date(),
// })
// Chat1.save().then(res => console.log(res)).catch(err=> console.log(err));

// Chat.deleteOne({to:"Prem"}).then(res=> console.log(res)).catch(err=> console.log(err));

app.listen(port,(req,res)=>{
    console.log("App is listening....");
});

app.get('/',(req,res)=>{
    res.render("home.ejs");
});
//---------------------------------Show Route---------------------------------
app.get('/chats',async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats})
});
//-----------------------------new route-------------------------------------
app.get('/chats/new',(req,res)=>{
    res.render("new.ejs");
});

// -------------create route--------------
app.post('/chats',(req,res)=>{
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
0
    newChat.save().then((res)=>{
        console.log(res);
    }).catch(err=> console.log(er));
    res.redirect("/chats");
})

//-----------------------------------Update / Edit route-------------------------------------
app.get('/chats/:id/edit',async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    console.log(newMsg);
    let chat = await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true, new : true}
    );
    console.log(chat);
    res.redirect("/chats");
});

//--------------------------------------DELETE route---------------------------------------
app.delete('/chats/:id', async (req,res)=>{
    let {id} = req.params;
    let deletedMsg = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
