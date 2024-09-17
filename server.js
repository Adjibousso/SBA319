//import db from db.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Db } = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3001
const router = express.Router();
const userRoutes = require('./routes/laroute');
//app.use('/api', userRoutes);


app.use(express.json());

// Example route using the User model
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

console.log(process.env.MONGO_url)
const url= "mongodb+srv://diallobousso10:Monsenegal@cluster0.6vwxj.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=Cluster0"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))




const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      
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
const Movie = require("./models/comments")

//mongoose.connect("mongodb://localhost/testdb")

run()

async function run() {
    const movie =new Movie({name:"Bousso", age :"100", email:"bouss@gmaioml.fr ",movie_id: "Lion king"})
    await movie.save()
    console.log(movie)
}

const User = require("./models/users")
runUser()

async function runUser() {
    const user =new User({name:"Bousso", age :"100", email:"bouss@ma21o2l.fr "})
    await user.save()
    console.log(user)
}

const Comment = require("./models/comments")
runComment()

async function runComment() {
    const comment =new Comment({name:"adja", age :"100", email:"bouss@juen.fr "})
    await comment.save()
    console.log(comment)
}


app.use('/users', userRoutes);
app.listen(port, () => {
  console.log('server is running in port 3001');
});
