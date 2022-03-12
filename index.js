const express = require("express");
const { downloader: Downloader } = require("instagram-url-downloader");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index", {
        ready: false
    });
});

app.post("/", (req, res) => {
    res.send(req.body);
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server running at port ${port}...`);
});