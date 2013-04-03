var Fetch = require('./utils/Fetch');
var Crawler = function(Hatchery){
    this._hatchery = Hatchery;
    this.name = 'Crawler ' + this._hatchery.populationCount,
    this.desc = '网页爬虫，能够将网页变成结构化的数据';
    this._fetch = null;
    this._resource = null;
    //用于存储每一次爬取的工作状态
    this._isWorkDone = [];
}

Crawler.prototype = {
    init:function(){
        this._fetch = new Fetch(this._hatchery._config._Http, this._hatchery._config.delay, this._hatchery);
        
        return this;
    },
    work:function(){
        var _this = this;
        var url = this._resource.get();
        if(false === url ){
            var intervaltime = setInterval(function(){
                if(!_this._isWorkDone.length){
                    clearInterval(intervaltime);
                    _this.done();
                }
            },100);
            
        }
        else{
            this._isWorkDone.push(1);
            this._fetch.get(url, function(buffer){
                if(!buffer instanceof Buffer){
                    console.log('debugger', ' timeout !!!');
                    _this._isWorkDone.pop();
                    return _this.work();
                }
                //获取buffer type if error 则调用work
                _this._parseBuffer(url, buffer, function(json){
                    _this._store(url,json, function(){
                        _this._isWorkDone.pop();
                        setTimeout(function(){
                             _this.work();
                        }, _this._hatchery.delay);
                    });
                });
            }, this, this._hatchery);
        }
    },
    setResource:function(resource){
        this._resource = resource;
    },
    _parseBuffer:function(url, buffer, callback){
        console.info('parse buffer' );
        var formatPlugins = this._hatchery._config._Hooks.parseBuffer;
        formatPlugins['ParseBufferDefault'].init({
            topN:this._hatchery._config.topN
        });
        formatPlugins['ParseBufferDefault'].parse(url, buffer, callback);
    },
    //@todo 语义存在问题，将被抓去资源和抓取完成的资源混为一谈了
    _store:function(url, json, callback){
        //加入新的待爬取的url
        console.info('filter urls' );
        var urls = [];
        var FilterUtil = this._hatchery._config._Hooks.filterUrl['FilterUrlDefault'];
        FilterUtil.init({
            urls:json['urls'],  
            rules:this._hatchery._config._Filters
        });
        urls = FilterUtil.filter();
        this._resource.add(urls);
        delete json['urls'];
        
        console.info('store data' );
        this._resource.update(url, json);
       
        callback();
    },
    done:function(){
        console.log('debugger ' + this.name, this._isWorkDone);
        this._hatchery.kill(this);
    }
}

module.exports  = Crawler;