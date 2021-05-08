const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(cors());

const dataObj = require("./data/data.json");

app.get('/api/categories', function(req, res) {
    res.json(dataObj.categories);
});

app.get('/api/category/*', function(req, res) {
    res.json(dataObj.articles);
});

app.get('/api/author/*', function(req, res) {
    let author = {};
    const authorId = req.params['0'];

    for (let index = 0; index < dataObj.authors.length; index++) {
        if (dataObj.authors[index].id === authorId) {
            author = dataObj.authors[index];
            break;
        }

    }
    res.json(author);
});

app.get('/api/search/*', function(req, res) {
    res.json(dataObj.articles);
});

const port = process.env.port || 3001;
app.listen(port, () => {
    console.log("server is running at ", port)
})