const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Use cors middleware
app.use(cors());

// Serve static files if in production mode
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

// API route to fetch casino data
app.get("/api/casinos", (req, res) => {
	// File system read the JSON file
	fs.readFile(
		path.join(__dirname, "response_data.json"),
		"utf8",
		(err, data) => {
			if (err) {
				console.error("Error reading the JSON file:", err);
				return res.status(500).send("Internal server error");
			}
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	);
});

// Serve the index.html file for any unknown routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
