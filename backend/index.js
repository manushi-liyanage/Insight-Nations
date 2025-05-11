const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoute");
const favouriteRoutes = require('./routes/favouriteRoutes');
//express app
const app = express()

//middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173', // for local dev
  'https://luminous-crostata-426d7f.netlify.app' // your Netlify production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if you're using cookies or authorization headers
}));


app.use('/api', authRoutes);
app.use('/api', favouriteRoutes);
//connect to mongodb
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    })
    .catch(error => console.error('MongoDB connection error:', error))

