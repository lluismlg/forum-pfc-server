const cors = require("cors");
const express = require('express');
const mysql = require("mysql");

/* Herpku already sets a port */
const port = process.env.PORT || 80;

var app = express()

/* SHOW INDEX */
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


/* USE CORS */
// app.use(cors());
app.use(cors({origin: '*'}));

/* LISTEN TO PORT */
app.listen(port, () => console.log(`Listening on port ${port}`));

// /* HEADERS */

// // Website you wish to allow to connect
// // Add headers
// app.use(function (req, res, next) {

// 	// Website you wish to allow to connect
// 	res.setHeader('Access-Control-Allow-Origin', 'https://forum-pfc-client.herokuapp.com/');
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

// 	// Request methods you wish to allow
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// 	// Request headers you wish to allow
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	next();
// });


/* CONNECTION POOL */
const con = mysql.createPool({
	host: "sql7.freemysqlhosting.net",
	user: "sql7338511",
	password: "51PqBI15jJ",
	database: "sql7338511",
});


/* GET POSTS */
app.get("/api/forum", (req, res) => {
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate,postType,postAuthor,postTitle,postImg,postContent,postTopic FROM posts ORDER BY postId DESC`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});

/* GET POST BY ID */
app.get("/api/post", (req, res) => {
	const { postId } = req.query;
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate, postAuthor, postLikes, postTitle, postImg, postContent, postTopic FROM posts WHERE postId=${postId}`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});
/* GET COMMENTS FROM POST */
app.get("/api/comments", (req, res) => {
	const { postId } = req.query;
	con.query(`SELECT DATE_FORMAT(commentDate, "%d-%m-%Y") as commentDate, commentAuthor, commentContent FROM comments WHERE postId=${postId}`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});
/* UPLOAD COMMENT OF POST */
app.get("/api/uploadComment", (req, res) => {
	const { postId, commentDate, commentAuthor, commentContent } = req.query;
	con.query(`INSERT INTO comments (postId, commentDate, commentAuthor, commentContent) VALUES ('${postId}','${commentDate}', '${commentAuthor}','${commentContent}')`, (err, results) => {
		if (err) {
			return res.send(false);
		} else {
			return res.send(true);
		}
	});
});
/* VOTE POST */
app.get("/api/vote", (req, res) => {
	const { postId, vote } = req.query;
	con.query(`UPDATE posts SET postLikes = postLikes + ${vote}  WHERE postId=${postId}`, (err) => {
		if (err) {
			return res.send(err);
		} else {
			return true;
		}
	});
});

/* UPLOAD TEXT POST */
app.get("/api/uploadText", (req, res) => {
	const { postDate, postType, postAuthor, postTitle, postContent } = req.query;
	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postContent) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postContent}')`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});
/* UPLOAD IMAGE POST */
app.get("/api/uploadImage", (req, res) => {
	const { postDate, postType, postAuthor, postTitle, postImage } = req.query;
	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postImage) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postImage}')`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});
/* UPLOAD LINK POST */
app.get("/api/uploadLink", (req, res) => {
	const { postDate, postType, postAuthor, postTitle, postContent } = req.query;
	con.query(`INSERT INTO posts (postDate, postType, postAuthor, postTitle, postContent) VALUES ('${postDate}','${postType}', '${postAuthor}','${postTitle}','${postContent}')`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});