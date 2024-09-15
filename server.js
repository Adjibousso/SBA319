const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 3001
console.log(process.env.MONGO_url)
const url= "mongodb+srv://diallobousso10:Monsenegal@cluster0.6vwxj.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=Cluster0"
// mongoose.connect(process.env.MONGO_url, ()=>{
//   console.log("server is successfully connected")
// })

app.use(bodyParser.json());



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url, {
      useNewUrlParser: true,
      //useUnifiedTopology: true,
      
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();


app.listen(port, () => {
  console.log('server is running in port 3000');
});
