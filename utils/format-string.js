const escapeTags = (string) => {
    string = string.replace(/\</gim, "&lt;")
        .replace(/\>/gim, "&gt;");
    return string;
}

const dateEU = (date) => {
    date = date.split("/");
    let ordered = [date[1], date[0], date[2]];
    let euDate = ordered.join("/");
    return euDate;
}

module.exports = { escapeTags, dateEU };