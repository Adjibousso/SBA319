const express = require('express');
const router = express.Router();
const User = require('../models/users');
const app = express();

const mongoose= require("mongoose")
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        
        
    });

    
module.exports = mongoose.model("User", userSchema)


// Create
app.post('/models/users', async (req, res) => {
    try {
        const user = new User (req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read
app.get('/models/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.patch('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      Object.keys(req.body).forEach(key => {
        user[key] = req.body[key];
      });
  
      await user.save();
      res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });

// Delete
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
