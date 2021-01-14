const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

//routes
app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
