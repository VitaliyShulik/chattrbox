var handleError = function (err, res, filePath) {
    res.writeHead(404);
    res.end('Page with file path - "' + filePath + '" not found!');
};

module.exports = handleError;