//var mongodb = require('mongodb');
//var client = mongodb.MongoClient;
//client.connect("mongodb://127.0.0.1:27017/crawler", function(err, db) {
//    db.collection('test', function(err, collection) {
//       collection.find({url:'ddd2dd'}).toArray(function(err, docs){
//           console.log(err, docs.length);
//       });      
////         collection.update({url:'ddddd'}, {url:'ddddd'}, {upsert:true}, function(err, db){
////             console.log(err, db);
////         });
//    });
//});

//var http = require('http');
//var opt = {
//    host:'www.etourer.com',
//    path:'/',
//    port:80,
//    headers:{
//        'user-agent':'test'
//    },
//    timeout:3
//};
//setInterval(function(){
//    var request = http.get('http://www.etourer.com/', function(err, res){
//        console.log('debugger get', err,res);
//        if(!res){
//            return ;
//        }
//        var buf = [];
//        res.on('data', function(chunk){
//            buf.push(chunk);
//        });
//        res.on('end', function(){
//            console.log('length ',buf.length);
//        });
//    }).on('error', function(err, status){
//        console.log('debugger error', status, err);
//    });
//},1000);

//var Iconv = require('iconv-lite');
//var Fs = require('fs');
//var Cheerio = require('cheerio');
//
//http.get("http://www.duwenzhang.com/", function(res) {
//    var buffers = [], length = 0; 
//    res.on('data', function(chunk){
//        buffers.push(chunk);
//      
//        length += chunk.length;
//    });
//    res.on('end', function(){
//        var buffer = Buffer.concat(buffers);
//        var html = Iconv.decode(buffer, 'gbk');
//         html.toString();
//         Fs.writeFile('t.html', html);
//       
//        var $ = Cheerio.load(html);
//        console.log($('a').eq(0).html());
////        var aAr = $('a');
////        console.log(aAr);
//        
//    });
//}).on('error', function(e) {
//    console.log("Got error: " + e.message);
//});
//
//
var UrlUtil = require('url');
var path = require('path');
console.log(UrlUtil.parse('http://rilin.en.alibaba.com'));
