// I did not create this Regular expression pattern - Found HERE -> https://regexr.com/39nr7 [Credit - gskinner]
const imageUrlRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
const defaultImageUrl = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/movies-to-watch-1585258004.jpg'

// return Header Text depending on existing document or adding a new one
function pageHeaderText(edit, title) {
    if (edit) {
        return ("Edit - " + title);
    } else {
        return "Add a New Title";
    }
}

// Verify image link provided using regex
function verifyImageLink(url) {
    if (imageUrlRegExp.exec(url)) { // Image link appears valid return it
        return url;
    } else { // Link doesn't appear valid return the default image link
        return defaultImageUrl;
    }
}

// If no text was added for synopsis use default text
function defaultSynopsisText(synopsis, title) {
    if (synopsis.length > 0) {
        return synopsis;
    } else { 
        return ("A synopsis has not yet been added for " + title);
    }
}

// check if type is set to "None Selected"
function checkTypeSelected(type) {
    if (type !== "None Selected") { // String fine return to output
        return (type + " ");
    } else { // if None Selected is value return null so not outputted
        return null;
    }
}

// export functions
export { pageHeaderText, verifyImageLink, defaultSynopsisText, checkTypeSelected }