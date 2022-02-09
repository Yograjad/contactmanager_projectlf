require("dotenv").config({path: "./config.env"});
require("./db/setting");

const express = require("express");
const app = express();
const cors = require("cors");
const homeRoute = require("./routes/home");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const contactRoute = require("./routes/contact");

const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", homeRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/contacts", contactRoute);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
