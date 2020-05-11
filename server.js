const cors = require("cors");
const express = require('express');
const mysql = require("mysql");

const port = process.env.PORT || 80;

var app = express()
	// , server = require('https').createServer(app)

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// server.listen(80, () => {
// 	console.log(`App server now listening on port 80`);
// });

// Use CORS
// app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

//app.get('/express_backend', (req, res) => {
//res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
//});

// Connection pool
const con = mysql.createPool({
	host: "sql7.freemysqlhosting.net",
	user: "sql7338511",
	password: "51PqBI15jJ",
	database: "sql7338511",
});

// Log to know the port (8000, Defined in docker-compose)
// app.listen(80, () => {
// 	console.log(
// 		`App server now listening on port 8000`
// 	);
// });

// SHOW PAGE
// app.get('/', function (req, res) {
// res.sendFile(__dirname + '/index.html'); // change the path to your index.html
// });

// GET POSTS 
app.get("/api/forum", (req, res) => {
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate,postType,postAuthor,postTitle,postImg,postContent,postTopic FROM posts ORDER BY postId DESC`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});

// // GET POST BY ID
// app.get("/post", (req, res) => {
// 	const { postId } = req.query;
// 	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate, postAuthor, postLikes, postTitle, postImg, postContent, postTopic FROM posts WHERE postId=${postId}`, (err, results) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return res.send(results);
// 		}
// 	});
// });
// // GET COMMENTS FROM POST
// app.get("/comments", (req, res) => {
// 	const { postId } = req.query;
// 	con.query(`SELECT DATE_FORMAT(commentDate, "%d-%m-%Y") as commentDate, commentAuthor, commentContent FROM comments WHERE postId=${postId}`, (err, results) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return res.send(results);
// 		}
// 	});
// });
// // UPLOAD COMMENT OF POST
// app.get("/uploadComment", (req, res) => {
// 	const { postId, commentDate, commentAuthor, commentContent } = req.query;
// 	con.query(`INSERT INTO comments (postId, commentDate, commentAuthor, commentContent) VALUES ('${postId}','${commentDate}', '${commentAuthor}','${commentContent}')`, (err, results) => {
// 		if (err) {
// 			return res.send(false);
// 		} else {
// 			return res.send(true);
// 		}
// 	});
// });

// // VOTE POST BY ID
// app.get("/vote", (req, res) => {
// 	const { postId, vote } = req.query;
// 	con.query(`UPDATE posts SET postLikes = postLikes + ${vote}  WHERE postId=${postId}`, (err) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return true;
// 		}
// 	});
// });

// // UPLOAD TEXT POST
// app.get("/uploadText", (req, res) => {
// 	const { postDate, postType, postAuthor, postTitle, postContent } = req.query;
// 	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postContent) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postContent}')`, (err, results) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return res.send(results);
// 		}
// 	});
// });
// // UPLOAD IMAGE POST
// app.get("/uploadImage", (req, res) => {
// 	const { postDate, postType, postAuthor, postTitle, postImage } = req.query;
// 	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postImage) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postImage}')`, (err, results) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return res.send(results);
// 		}
// 	});
// });
// // UPLOAD LINK POST
// app.get("/uploadLink", (req, res) => {
// 	const { postDate, postType, postAuthor, postTitle, postContent } = req.query;
// 	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postContent) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postContent}')`, (err, results) => {
// 		if (err) {
// 			return res.send(err);
// 		} else {
// 			return res.send(results);
// 		}
// 	});
// });