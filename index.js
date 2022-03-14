const express = require("express");
const path = require("path");
const { getMedia, downloadMedia, moveDownloaded } = require("./utils/instagram");
const { dirRoot } = require("./config");
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

app.post("/", (req, res) => {
    let url = req.body.url.split("?")[0];
    try {
        getMedia(url, async (media) => {
            const file = await downloadMedia(media);
            const movedFilePath = moveDownloaded(file, media);
            const movedFile = path.basename(movedFilePath);
            res.render("index", {
                ready: true,
                error: false,
                movedFile,
                media
            });
        });
    } catch (err) {
        res.render("index", {
            ready: false,
            error: err.message
        });
    }
});

app.get("/download/:file", (req, res) => {
    const file = req.params.file;
    const filepath = `${path.join(dirRoot, "views/downloads")}/${file}`;
    res.sendFile(filepath);
});

app.use("/", (req, res) => {
    res.status(404);
    res.send("Error 404 Not Found");
});

app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});