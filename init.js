const Chat = require("./models/chat.js");
const mongoose = require("mongoose");

main().then(res=> console.log("connection successfull")).catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from:"piyush",
        to:"Rajeshwari",
        msg:"Let's meet",
        created_at:new Date()
    },
    {
        from:"Rajeshwari",
        to:"Piyush",
        msg:"yeh why not",
        created_at:new Date()
    },
    {
        from:"piyush",
        to:"Rajeshwari",
        msg:"Yeh i'm so excited !",
        created_at:new Date()
    },
    {
        from:"rajeshwarii",
        to:"piyush",
        msg:"Let's meet",
        created_at:new Date()
    }
];

Chat.insertMany(allChats);