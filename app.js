const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;

const _ = require('lodash');
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla vel aliquam tincidunt, velit nisl lacinia nulla, vel ultricies velit nibh vel sapien. Vivamus euismod velit vel diam tincidunt, euismod tempus justo. Nulla facilisi. Nam auctor velit vel velit tincidunt, euismod tempus justo. Nulla facilisi.";
const aboutContent = "Welcome to our website! We are a team of passionate individuals dedicated to providing the best products and services to our customers. Our company was founded in 2010 with the goal of making a difference in the world. We believe in quality, innovation, and customer satisfaction. Our team is constantly striving to improve and grow, and we are proud of the work we do. Thank you for choosing us!";
const contactContent = "Thank you for visiting our website! If you have any questions or comments, please don’t hesitate to contact us. You can reach us by phone at 555-1234 or by email at info@ourwebsite.com. Our customer service team is available Monday through Friday from 9am to 5pm to assist you. We look forward to hearing from you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];




// Webpages Related code
app.get('/', (req, res) => {
  res.render("home", {homeParagraph: homeStartingContent, posts:posts});
});


app.get('/contact', (req, res) => {
    res.render("contact", {contactParagraph: contactContent});
  });

app.get('/compose', (req, res) => {
    res.render("compose");
  });

app.post('/compose', function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };
    posts.push(post);
    res.redirect("/");
  });

app.get('/about', (req, res) => {
    res.render("about", {aboutParagraph: aboutContent});
  });


app.get("/posts/:postName", (req, res) =>  {
    const requestedTitle = _.lowerCase(req.params.postName)

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }

    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


console.log("tesing");