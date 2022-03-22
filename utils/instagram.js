const { downloader: Downloader } = require("instagram-url-downloader");
const fs = require("fs");
const path = require("path");
const { dirRoot } = require("../config");
const { escapeTags, dateEU } = require("./format-string");

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

const getMedia = (url) => {
    return new Promise((resolve, reject) => {
        const downloader = new Downloader(url);
        const media = downloader.Media;
        if(!media){
            reject("Can't find URL");
            return false;
        }
        media.caption.text = escapeTags(media.caption.text).replace(/\n/gim, "<br>");
        media.takenDate = dateEU(media.takenDate.split(",")[0]) + "," + media.takenDate.split(",")[1];
        resolve(media);
    });
}

const getMediaUrl = (media) => {
    return new Promise((resolve, reject) => {
        let type = media.MediaType.toLowerCase();
        const action = {
            sidecar(){
                return [...media.medias];
            },
            image(){
                return [media.Image.url];
            },
            video(){
                return [media.Video.url];
            }
        };
        if(type === "sidecar" || type === "image" || type === "video"){
            resolve(action[type]());
        }
        reject("Media type not found!");
    });
}

module.exports = { getMedia, getMediaUrl };