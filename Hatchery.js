var Config = require('./_core/Config');
Config.init(process.argv);

var ResourceWebpage = require('./_core/ResourceWebpage');

var Crawler = require('./_core/Crawler');

function Hatchery(config){
    this.name = '母巢';
    this.desc = '母巢产生不同虫子，虫子完成工作，母巢维持状态';
    this.populationCount = 0;
    this._config = config;
    this._units = [];
    this._resources = {};
    
    this.delay = this._config.delay;
}

Hatchery.prototype = {
    init:function(){
        console.info('start' );
        //暂时只获取网页资源
        this._units['crawler'] = {};
        
        return this;
    },
    run:function(){
        this._getRourceWebPage();
    },
    kill:function(unit){
        this.populationCount--;

        console.info( unit.name + " work done! \t" +  this.populationCount 
            + ' workInsect still working depth =  ' + this._config.depth);

        if(this.populationCount > 0){
            return ;
        }
        
        if(this._config.depth === -1){
            console.log('[depath is -1 so run again]');
            this.run();
            return ;
        }
        
        this._config.depth--;
        if(this._config.depth > 0 ){
            console.log('[depath is > 0 so run again]');
            this.run();
            return;
        }
        else{
            this.done();
        }
    },
    done:function(){
        console.info('done');
        process.exit(0);
    },
    status:function(){
        console.info('workInsect num  is ' + this.populationCount );
    },
    //获取网页资源
    _getRourceWebPage:function(){
        console.info('start get Resource Webpage');
        var _this = this;
        
        var resourceWebPage = new ResourceWebpage(this._config._Mongodb, this._config._Seeds);
        
        resourceWebPage.init(function(resource){
            if(false === resource){
                console.info('[no web page url]');
                _this.done();
            }
            console.info('web page url init ', typeof resource);
            //初始化N个虫子来工作来获取资源
            var P = parseInt(_this.delay / _this._config.threads);
            for(var i = 0; i < _this._config.threads; i++){
                var unit = _this._larva('crawler');
                unit.init();
                unit.setResource(resource);
                //                setTimeout(function(){
                unit.work();
            //                }, i*P);
            }
        });
    },
    _larva:function(type){
        var unit = null;
        switch(type){
            case 'crawler':
                unit = new Crawler(this);
                break;
            default:
                unit = new Crawler(this);
                break;
        }
        
        this._units[this.populationCount] = unit;
        this.populationCount++
        
        return unit;
    }
}

//一个cpu一个基地
var hatchery = new Hatchery(Config);
hatchery.init();
hatchery.run();