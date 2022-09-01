const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

const connectDb = require("./connection/dbconfig");
connectDb();

const UploadRoute = require("./routes/upload");
app.use("/", UploadRoute);

// Listen PORT
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(
    `Server Started at PORT: ${port}\nServer Url: http://localhost:${port}`
  );
});
