import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoPassword = process.env.DB_PWD;
const mongoUser = process.env.DB_USER;
const mongoAppName = process.env.DB_APP_NAME;
const mongoDbUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@authentication-system.jknkql6.mongodb.net/?retryWrites=true&w=majority&appName=${mongoAppName}`;


// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handlers for Mongoose connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // Your database operations here
});

export default db;
