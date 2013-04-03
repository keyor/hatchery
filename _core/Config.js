var Filters = require('../configs/Filters');
var Hooks = require('../configs/Hooks');
var Seeds = require('../configs/Seeds');
var Mongodb = require('../configs/Mongodb');

var Config = {
    name:'smallCrawler',
    desc:'a simple crawler for get webpage',
    author:'liuleivstimes@gmail.com',
    site:'http://www.domain.com',
    //当depth为-1 时候， 表示一直抓取
    depth:-1,
    topN:1000,
    threads:5,
    //抓取延时, 这个延时是不准确的，会因为线程增多而减少 
    delay:1000,
    env:'development',
    _Filters:Filters,
    _Hooks:Hooks,
    _Seeds:Seeds,
    _Mongodb:Mongodb,
    init:function(argv){
        if(argv.length < 2){
            return true;
        }
        
        for(var key in argv){
            if(key < 2){
                continue;
            }
            if(key % 2 === 0){
                var option = argv[1*key + 1] || false;
                this[argv[key].substr(1)] = option;
            }
        }
        
        return true;
    }
}

module.exports = Config;