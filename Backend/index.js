const express = require('express');
const mongoose = require('mongoose');
const Guest = require('./models/guest');

const app = express();
const cors = require('cors');

const MONGO_DB_URL = 'mongodb+srv://ciro:ciro@cluster0.5izgbwo.mongodb.net/graduation-invitation';

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const guests = await Guest.find();
        res.json(guests);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { participate } = req.body;

        const updatedGuest = await Guest.findByIdAndUpdate(id, { participate }, { participate: {participate} });

        if (!updatedGuest) {
            return resp.status(404).json({ message: "Guest not found" });
        }

        const guests = await Guest.find();
        res.json(guests);
    } catch (error) {
        console.error(error);
        resp.status(500).send("Server Error");
    }
});


mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(9000, () => {
            console.log('Server is running on port 9000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });