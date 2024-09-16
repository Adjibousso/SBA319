
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Db } = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3001
console.log(process.env.MONGO_url)
const url= "mongodb+srv://diallobousso10:Monsenegal@cluster0.6vwxj.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=Cluster0"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))




const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.send('Example route');
});

//let db = connectDB.db("sample_weatherdata")
// app.get("/", async (req, res) => {
//   let collection = await Db.collection("posts");
//   let data = await collection.find({}).limit(2).toArray();
//   res.send(data).status;
//  });


connectDB();



//app.get('/', async(req, res)=>{
 // let collection = await connectDB.collection("data")
//})

// connect
//const mongoose = require("mongoose")
const User = require("./users")

//mongoose.connect("mongodb://localhost/testdb")

run()

async function run(params) {
    const user =new User({name:"Bousso", age :"100", email:"bousso@gmail.com"})
    await user.save()
    console.log(user)
}


app.listen(port, () => {
  console.log('server is running in port 3001');
});
