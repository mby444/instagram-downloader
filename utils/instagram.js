const { downloader: Downloader } = require("instagram-url-downloader");
const fs = require("fs");
const path = require("path");
const { dirRoot } = require("../config");

const checkDirExist = (pathname) => {
    let dir = path.dirname(pathname);
    if(dir){
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}

// 'C:\\node-project\\instagram-downloader\\Medias\\CZhMnAVlzTd\\Image.jpg'

const getMedia = (url, callback) => {
    const downloader = new Downloader(url);
    const media = downloader.Media;
    callback(media);
}

const downloadMedia = (media) => {
    return new Promise((resolve, reject) => {
        const downloaded = media.download();
        const file = downloaded.File;
        resolve(file);
    });
}

const moveDownloaded = (file, media) => {
    const newFilename = media.ID + path.extname(file);
    const newpath = path.join(dirRoot, "views/downloads") + "/" + newFilename;
    checkDirExist(newpath);
    fs.renameSync(file, newpath);
    return newpath;
}

module.exports = { getMedia, downloadMedia, moveDownloaded };