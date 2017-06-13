/**
 * Created by yeyangmei on 2017/6/1.
 * 
 */

var express =require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: '/tmp/'}).single('zhaojiao'));

app.get('/', function (req, res) {
  res.send('Hello, nice to meet you, Mavis');
});

app.get('/example.html', function(req, res) {
  res.sendFile(`${__dirname}/example.html`);
});

app.get('/src/template/react-toggle.html', function(req, res) {
  res.sendFile(`${__dirname}/src/template/react-toggle.html`);
});

app.get('/src/template/js-node.html', function(req, res) {
  res.sendFile(`${__dirname}/src/template/js-node.html`);
});

app.get('/src/template/upload-file.html', function(req, res) {
  res.sendFile(`${__dirname}/src/template/upload-file.html`);
});

app.get('/process_get', function (req, res) {
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post('/process_post', urlencodedParser, function (req, res) {
  console.log(req.body);
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post('/file_upload', function (req, res) {
  console.log(req.file);
  var file = `${__dirname}/public/image/${req.file.originalname}`;
  fs.readFile(req.file.path, function (err, data) {
    console.log(data);
    fs.writeFile(file, data, function (err) {
      if(err) {
        console.log(err);
      } else {
        response = {
          message: 'File upload successfully',
          filename: req.file.filename,
        }
      }
      console.log(response);
      res.end(JSON.stringify(response));
    })
  })
});

app.post('/file_up', function(req, res) {
  console.log(req.body);
  response = {
    x: req.body.x,
    y: req.body.y,
    width: req.body.width,
    height: req.body.height,
  };
  res.end(JSON.stringify(response));
});

var server = app.listen(2733, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('example app listening at http://s%:s%', host, port);
});


