const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Setup event listeners for the mongoose connections
mongoose.connection.on("error", function (err) {
	console.log("Mongoose connection error");
	console.log(err);
});

mongoose.connection.on("disconnected", function () {
	console.log("Mongoose disconnected");
});

mongoose.connection.on("open", function () {
	console.log("Mongoose connected");
});

db = mongoose.connection;

module.exports = {mongoose, db};
