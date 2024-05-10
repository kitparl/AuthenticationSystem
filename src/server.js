import app from "./app.js";

require('dotenv').config();
const port = process.env.port;
console.log(`Your application is running on port: ${port}`);

app.listen(port);