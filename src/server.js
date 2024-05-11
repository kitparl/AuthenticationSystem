import app from "./app.js";
import db from './config/db.js';
import passport from 'passport';
import passportConfig from './config/passport.js';

passportConfig(passport);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  db();
    console.log(`Server is running on port ${PORT}`);
  });