const express = require("express");
const { getMedia, getMediaUrl } = require("./utils/instagram");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", {
        ready: false,
        error: false
    });
});

app.post("/", async (req, res) => {
    let url = req.body.url.split("?")[0];
    try {
        let media = await getMedia(url);
        let mediaUrl = await getMediaUrl(media);
        res.render("index", {
            ready: true,
            error: false,
            media,
            mediaUrl
        });
    } catch (err) {
        res.render("index", {
            ready: false,
            error: err
        });
    }
});

app.use("/", (req, res) => {
    res.status(404);
    res.render("errors/error", {
        title: "404",
        message: "Error: 404 Not Found"
    });
});

app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});