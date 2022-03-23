const { downloader: Downloader } = require("instagram-url-downloader");
const fs = require("fs");
const path = require("path");
const { dirRoot } = require("../config");
const { escapeTags, dateEU } = require("./format-string");

const getMedia = (url) => {
    console.log("getMedia...");
    return new Promise((resolve, reject) => {
        const downloader = new Downloader(url);
        const media = downloader.Media;
        media.caption.text = escapeTags(media.caption.text).replace(/\n/gim, "<br>");
        media.takenDate = dateEU(media.takenDate.split(",")[0]) + "," + media.takenDate.split(",")[1];
        resolve(media);
        console.log("getMedia: success");
    });
}

const getMediaUrl = (media) => {
    console.log("getMediaUrl...");
    return new Promise((resolve, reject) => {
        let type = media.MediaType.toLowerCase();
        const action = {
            sidecar(){
                return [...media.medias];
            },
            image(){
                return [media.Image];
            },
            video(){
                return [media.Video.url];
            }
        };
        if(type === "sidecar" || type === "image" || type === "video"){
            resolve(action[type]());
            console.log("getMediaUrl: success");
            return false;
        }
        reject("Media type not found!");
        console.log("getMediaUrl: failed");
    });
}

module.exports = { getMedia, getMediaUrl };