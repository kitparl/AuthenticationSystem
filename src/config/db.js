import mongoose from 'mongoose';
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