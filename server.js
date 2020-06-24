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


/* CONNECTION POOL */
const con = mysql.createPool({
	host: "sql7.freemysqlhosting.net",
	user: "sql7338511",
	password: "51PqBI15jJ",
	database: "sql7338511",
});


/* GET POSTS */
app.get("/api/forum", (req, res) => {
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate,postType,postAuthor,postTitle,postImage,postContent,postTopic FROM posts ORDER BY postId DESC`, (err, results) => {
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
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate, postAuthor, postLikes, postTitle, postImage, postContent, postTopic FROM posts WHERE postId=${postId}`, (err, results) => {
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

/* UPLOAD TEXT */
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
/* UPLOAD IMAGE */
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
/* UPLOAD LINK */
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

/* SEARCH POSTS BY TITLE */
app.get("/api/searchTitle", (req, res) => {
	const { searchTitle } = req.query;
	con.query(`SELECT postId, DATE_FORMAT(postDate, "%d-%m-%Y") as postDate, postAuthor, postLikes, postTitle, postImage, postContent, postTopic FROM posts WHERE postTitle LIKE ${searchTitle}`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});