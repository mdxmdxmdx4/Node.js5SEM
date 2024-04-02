const FORMAT = {
    HTML: 'text/html',
    CSS: 'text/css',
    JS: 'text/javascript',
    PNG: 'image/png',
    DOCX:'application/msword',
    JSON:'application/json',
    XML: 'application/xml',
    MP4: 'video/mp4'
};

exports.FORMAT = FORMAT;

function setHeader(format) {
    return {'Content-Type': format};
}
exports.setHeader = setHeader;

exports.send = (statusCode, response, message, format) => {
    response.writeHead(statusCode, setHeader(format));
    response.end(message);
};