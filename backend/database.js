const mongoose = require('mongoose')

const dburl = 'mongodb://127.0.0.1:27017/game-of-thrones'

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


exports.Save = Save;
exports.Open = Open;