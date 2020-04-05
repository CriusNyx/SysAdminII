const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const port = 8000;
const responsedelay = 50;   // miliseconds
const BodyParser = require('body-parser')
const database = require('./database.js')

const SaveFile = require('./save.js')

var cors = require('cors');

app.use(cors());

//app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());


// static folders
app.use(express.static('js'));
app.use(express.static('userfiles'));
app.use(express.static('view'));

// home page
app.get('/', function(req, res)
{
    res.sendFile('view/index.html');
});


//files-list is url
router.post('/files-list', function(req, res)
{
    console.log('/files-list')
    let folder = req.query.folder;
    let contents = '';

    let readingdirectory = `./userfiles/${folder}`;

    fs.readdir(readingdirectory, function(err, files)
    {
        if(err) { console.log(err); }
        else if(files.length > 0)
        {
            files.forEach(function(value, index, array)
            {
                fs.stat(`${readingdirectory}/${value}`, function(err, stats)
                {
                    let filesize = ConvertSize(stats.size);
                    contents += '<tr><td><a href="/' + folder + '/' + encodeURI(value) + '">' + value + '</a></td><td>' + filesize + '</td><td>/' + folder + '/' + value + '</td></tr>' + '\n';
                    
                    if(index == (array.length - 1)) { setTimeout(function() {res.send(contents);}, responsedelay); }
                });
            });
        }
        else
        {
            setTimeout(function() {res.send(contents);}, responsedelay);
        }
    });
});

//Save: input file
router.post('/save', function(req,res){
    console.log('Save: ' + JSON.stringify(req.body));
    var body = req.body
    var username = body.username;
    var filepath = body.filepath;
    var bytes = body.bytes;
    database.Save(username, filepath, bytes);
})


//Open
router.post('/open', async function(req,res){
    console.log('Open: ' + JSON.stringify(req.body));
    var body = req.body
    var username = body.username;
    var filepath = body.filepath;
    var result = await database.Open(username, filepath);
    res.json({result});
})





function ConvertSize(number)
{
    if(number <= 1024) { return (`${number} Byte`); }
    else if(number > 1024 && number <= 1048576) { return ((number / 1024).toPrecision(3) + ' KB'); }
    else if(number > 1048576 && number <= 1073741824) { return ((number / 1048576).toPrecision(3) + ' MB'); }
    else if(number > 1073741824 && number <= 1099511627776) { return ((number / 1073741824).toPrecision(3) + ' GB'); }
}

// start server

app.listen(port, function()
{
    console.log(`Server is started on port: ${port}`);
}

);

app.use('/api', router);