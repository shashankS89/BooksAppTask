const express=require("express");
const app=express();

require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const MONGOURI = process.env.MONGOURI;
const cors = require("cors");

app.use(cors());

//////// db connection ///////

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
mongoose.connection.on("connected", () => {
    console.log("connected to mongo ");
  });

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });

//////////// routes /////////////

app.use(require("./routes/user"));



// app.get("/",function(request,response){
//     response.send("Hello Shashank");
// });
// app.get("/contact",function(request,response){
//     response.send("contact me at : shashanksagar212@gmail.com or 6386035931");
// });

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});