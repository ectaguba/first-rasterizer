const express = require("express"); // API framework
const connectDB = require("./config/db"); // MongoDB
const routes = require("./routes/api/canvasElements"); // API endpoints
const cors = require("cors");
const bodyParser = require("body-parser"); // JSON

const app = express();

// use the cors middleware with the origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware for the /api/books path
app.use("/api/canvasElements", routes);

// connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));