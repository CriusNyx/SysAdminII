const database = require('./database.js');

function SaveFile (filepath, byteArray) {
    database.Save('rjreynoldsw@gmail.com', filepath, byteArray);
}

exports.SaveFile = SaveFile