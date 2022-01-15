const mongoose = require("mongoose");
const db = mongoose.connection;
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
.then(()=>console.log(
     `MongoDB successfully connected at ${db.host}: ${db.port}!how great`)
)
.catch((err)=> console.log(`MondoDB connectoion fails${err}`)
);
module.exports={

}



