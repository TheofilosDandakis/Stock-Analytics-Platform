require("dotenv").config();         //load environment variables from .env
const app = require("./app")        //import the express application from app.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  //start backend server listening on this por
});