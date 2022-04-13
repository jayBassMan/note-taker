const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/db.json');
const PORT = process.env.PORT || 3000;
const fs = require('fs')
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.use(express.json());
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/api/notes', function(req, res){
    res.json(db)
})
app.post('/api/notes', function(req, res){
    db.push(req.body)
   fs.writeFileSync('./db/db.json', JSON.stringify(db, null, '\t'))
  res.json(db)
})
app.listen(PORT, function(){
    console.log('local host is listening on port ' + PORT)
});

