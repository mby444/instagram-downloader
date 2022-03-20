const escapeTags = (string) => {
    string = string.replace(/\</gim, "&lt;")
        .replace(/\>/gim, "&gt;");
    return string;
}

module.exports = { escapeTags };