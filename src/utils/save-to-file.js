var fs = require('fs');

function saveToFile(obj, fileName) {
    fs.writeFile('tmp/' + fileName, JSON.stringify(obj), function (err) {
        if (err) throw err;
        console.log(`Object saved to ${fileName}!`);
    });
}

module.exports = {
    saveToFile
};
