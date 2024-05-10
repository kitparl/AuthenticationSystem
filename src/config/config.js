import mongoose from 'mongoose';

// const mongoPassword = process.env.DB_PWD;
// console.log(mongoPassword);
// const mongoUser = process.env.DB_USER;
// console.log(mongoUser);
// const mongoAppName = process.env.DB_APP_NAME;
// console.log(mongoAppName);
// const databaseName = process.env.DB_NAME;
// console.log(databaseName);
// import {LOGGER} from '../common/logger.js';

// let URI = `mongodb+srv://${mongoUser}:${mongoPassword}@authentication-system.jknkql6.mongodb.net/?retryWrites=true&w=majority&appName=${mongoAppName}`

const db = async () => {
    const URI = process.env.MONGO_URL;
    mongoose.connect(URI).then(() => {
        console.log("DB connected successfully.")
    }).catch(err => {
        console.log(err);
        process.exit(1);
    })
}
export default db;