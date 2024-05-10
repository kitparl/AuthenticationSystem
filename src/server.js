import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config(); // This loads environment variables from a `.env` file
// starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });