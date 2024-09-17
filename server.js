//import db from db.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Db } = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3001
const router = express.Router();
//const userRoutes = require('./routes/userRoutes');
//app.use('/api', userRoutes);

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
    const movie =new Movie({name:"Bousso", age :"100", email:"bouss@gmail.fr ",movie_id: "Lion king"})
    await movie.save()
    console.log(movie)
}

const User = require("./models/users")
runUser()

async function runUser() {
    const user =new User({name:"Bousso", age :"100", email:"bouss@mail  .fr "})
    await user.save()
    console.log(user)
}

const Comment = require("./models/comments")
runComment()

async function runComment() {
    const comment =new Comment({name:"Bousso", age :"100", email:"bouss@jun.fr "})
    await comment.save()
    console.log(comment)
}

let users = require('./models/users');
app.use('/users/id' ,(req, res)=>{

  res.params.name(name)
})

app.get('/users/:id', (req, res)=> {
  const id = parseInt(req.params.id)
 const user = users.find (user => user.id===id)
 const message= "I found you "
  res.json(helper.success(message,user))

res.send(`l'identite de l'utilisateur est le numero:  ${user.name}`)

});
app.get('/users', (req, res)=> {
  res.send(`the number of users is ${users.length } `)
})


app.use(bodyParser.urlencoded({ extended: true }));

//  engine to EJS
app.set('view engine', 'ejs');

//  "public" directory.
app.use(express.static('public'));

// memory storage for messages
let messages = [];

// get request to render the form, display messages
app.get('/', (req, res) => {
res.render('index', { messages: messages, error: null });
});

// Handle POST request to add a message
app.post('/submit', (req, res) => {
const message = req.body.message;
if (!message) {
  return res.render('index', { messages: messages, error: 'Message cannot be empty' });
}
if (!isNaN(message)) {
  return res.render('index', { messages: messages, error: 'Message cannot be a number' });
}
messages.push(message);
res.redirect('/');
});

// Handle POST request to delete a message
app.post('/delete', (req, res) => {
const messageIndex = req.body.index;
if (messageIndex < 0 || messageIndex >= messages.length) {
  return res.render('index', { messages: messages, error: 'Invalid message index' });
}
messages.splice(messageIndex, 1);
res.redirect('/');
});

//  update a message
app.post('/update', (req, res) => {
const messageIndex = req.body.index;
const newMessage = req.body.newMessage;
if (messageIndex < 0 || messageIndex >= messages.length) {
  return res.render('index', { messages: messages, error: 'Invalid message index' });
}
if (!newMessage) {
  return res.render('index', { messages: messages, error: 'New message cannot be empty' });
}
if (!isNaN(newMessage)) {
  return res.render('index', { messages: messages, error: 'New message cannot be a number' });
}
messages[messageIndex] = newMessage;
res.redirect('/');
});

// custom middleware to check if the message is number
const ifNumber = (req, res, next) => {
  const message = req.body.message || req.body.newMessage;
  if (message && !isNaN(message)) {
      return res.status(400).send('Error: Input should not be a number')
  }
  next();
};
app.use(ifNumber);

// error middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something went wrong!');
});


app.patch('/users/:name', (req, res) => {
  const userName = parseInt(req.params.name);
  const updatedFields = req.body;

  let user = users.find(user => user.name === userName);
  if (user) {
      Object.assign(user, updatedFields);
      res.status(200).json(user);
  } else {
      res.status(404).send('User not found');
  }
});


app.listen(port, () => {
  console.log('server is running in port 3001');
});
