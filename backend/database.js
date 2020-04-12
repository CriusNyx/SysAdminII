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

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model('UserModel', userSchema, 'users');

async function Save(auth, filepath, data){

    const { username, password } = auth;

    const valid = await Validate(username, password);

    if(valid){
        var buffer = {type: 'Buffer', data};
    
         var FileModel = mongoose.model('FileModel', fileSchema, username);
    
         const doc = await FileModel.findOne({filepath});
    
         if(doc == null){
             var file = new FileModel({filepath, binary: buffer});
            file.save();
         }
         else{
             doc.binary = buffer;
             doc.save();
         }

         return true;
    }
    else{
        return false;
    }

}

async function Open(auth, filepath){

    const { username, password } = auth; 

    const valid = await Validate(username, password);

    if(valid){
        var FileModel = mongoose.model('FileModel', fileSchema, username);

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
    else{
        return null;
    }
}

async function GetAllFiles(auth){

    const { username, password } = auth;

    const valid = await Validate(username, password);

    if(valid){
        var FileModel = mongoose.model('FileModel', fileSchema, username);

        const doc = await FileModel.find({});

        var files = doc.map(x => x.filepath);

        return files;
    }
    else{
        return null;
    }
}

async function Validate(username, password){
    const doc = await UserModel.findOne({username, password});

    console.log(doc);

    if(doc === null){
        return false;
    }
    else if(doc === []){
        return false;
    }
    else{
        if(doc.username !== username){
            return false;
        }
        else if(doc.password !== password){
            return false;
        }
        else{
            return true;
        }
    }
}


exports.Save = Save;
exports.Open = Open;
exports.Validate = Validate;
exports.GetAllFiles = GetAllFiles;