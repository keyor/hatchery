var Mongodb = require('mongodb');

var ResourceWebpage  = function(config, seeds){
    this.name = '网页资源';
    this.desc = '用于存放网页资源';
    this._urls = [];
    this._urlsCount = 0;
    this._config = config;
    this._seeds = seeds;
    this._client = null;
    this._collection = null;
    this._docs = null;
}

ResourceWebpage.prototype = {
    init:function(callback){
        var _this = this;
        
        if(!this._client){
            this._client = Mongodb.MongoClient;
        }
        this._client.connect("mongodb://"+ this._config.host +":"+this._config.port
            +"/" + this._config.dbname, function(err, db) {
                if(err) {
                    console.error(err);
                    return false;
                }
            
                db.collection(_this._config.tablename, function(err, collection) {
                    if(err) {
                        console.error(err);
                        return false;
                    }
                    //                    console.log(_this._seeds);
                    for(var i=0; i<_this._seeds.length; i++){
                        collection.find({
                            url:_this._seeds[i]
                        },{
                            url:1
                        }, function(err, cursor){
                            cursor.toArray(function(err, docs){
                                if(!docs.length){
                                    collection.insert({
                                        url:cursor.selector.url
                                    }, function(err, doc){
                                        
                                        });
                                }
                            });
                        });
                    }
                    
                    //@todo 网页数量达到一定级别后，资源对象需要做优化
                    setTimeout(function(){
                        collection.find({
                            status:null
                        },{
                            url:1
                        }).toArray(function(err, docs){
                            if(!err){
                                _this._docs = docs;
								if(docs.length){
									 callback(_this);
								}
                                else{
									callback(false);
								}
                            }
                        });
                    }, 100);
                    
                    
                    
                    _this._collection = collection;
                });
            });
    },
    get:function(){
        var url = '';
        var doc = this._docs.shift();
        if(!doc){
            url = false;
        }
        else{
            url = doc.url;
        }
        
        return url;
    },
    add:function(urls){
        if(!urls){
            return false;
        }
        var _this = this;
        
        if('string' === typeof urls){
            urls = [urls];
        }
        
        for(var i=0; i<urls.length; i++){
            _this._collection.insert(urls[i], function(err,status){
                if(err){
                    // console.error(err);
                    return ;
                }
            });
        }
    },
    update:function(url,data, callback){
        data['url'] = url;
        if(!url || !data){
            return false;
        }
        var _this = this;
        data['status'] = 1;
        this._collection.update({
            url:url
        },data, function(err, status){
                    
            });
    }
}
module.exports = ResourceWebpage;
