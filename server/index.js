const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

//routes
app.use("/dashboard", require("./routes/dashboard"));
//register and Login
app.use("/auth", require("./routes/jwtAuth"))
app.listen(5000, () => {
  console.log(`Server is started on port 5000`);
});
