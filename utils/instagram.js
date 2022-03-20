const { downloader: Downloader } = require("instagram-url-downloader");
const fs = require("fs");
const path = require("path");
const { dirRoot } = require("../config");
const { escapeTags } = require("./format-string");

const checkDirExist = (pathname) => {
    let dir = path.dirname(pathname);
    if(dir){
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Make directory: ${dir}`);
        }
    }
}

const fileExist = (file) => {
    if(!file) return false;
    return fs.existsSync(file);
}

const removeForce = (file) => {
    if(!fs.existsSync(file)){
        console.log(`removeForce(): File or directory not exists`);
        return false;
    }
    fs.rmSync(file, { recursive: true, force: true });
    console.log(`Delete: ${file}`);
    return true;
}

const getMedia = (url, callback) => {
    const downloader = new Downloader(url);
    const media = downloader.Media;
    media.caption.text = escapeTags(media.caption.text).replace(/\n/gim, "<br>");
    callback(media);
    console.log(media);
}

const downloadMedia = (media) => {
    return new Promise((resolve, reject) => {
        const downloaded = media.download();
        const file = downloaded.File;
        resolve(file);
    });
}

const moveDownloaded = (file, media) => {
    return new Promise((resolve, reject) => {
        if(!fileExist(file)){
            reject("Media not exists");
            return false;
        }
        const newFilename = media.ID + path.extname(file);
        const newpath = path.join(dirRoot, "views", "downloads", newFilename);
        checkDirExist(newpath);
        fs.renameSync(file, newpath);
        console.log(`Move from: ${file}\nMove to: ${newpath}`);
        resolve(newpath)
    });
}

module.exports = { getMedia, downloadMedia, moveDownloaded, removeForce };