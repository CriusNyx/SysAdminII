const mongoose = require('mongoose')

const dburl = 'mongodb://127.0.0.1:27017/my-file-system'

mongoose.connect( dburl, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
    console.log('Database Connected:', dburl)
})

db.on('error', err => {
    console.error('connection error:', err);
})

const fileSchema = new mongoose.Schema({
    filepath: String,
    binary: Buffer
});

async function Save(user, filepath, data){

    var buffer = {type: 'Buffer', data};

     var FileModel = mongoose.model('FileModel', fileSchema, user);

     const doc = await FileModel.findOne({filepath});

     if(doc == null){
         var file = new FileModel({filepath, binary: buffer});
        file.save();
     }
     else{
         doc.binary = buffer;
         doc.save();
     }
}

async function Open(user, filepath){
    var FileModel = mongoose.model('FileModel', fileSchema, user);

    const doc = await FileModel.findOne({filepath});

    console.log(doc);

    if(doc == null){
        return null
    }
    else{
        var buffer = doc.binary;
        var arr = [...buffer];
        return arr;
    }
}

async function GetAllFiles(user){
    var FileModel = mongoose.model('FileModel', fileSchema, user);

    const doc = await FileModel.find({});

    var files = doc.map(x => x.filepath);

    return files;
}


exports.Save = Save;
exports.Open = Open;
exports.GetAllFiles = GetAllFiles;