//需要考虑文章存在分页的情况，或者存在分页的文章不抓取
var Config = require('Config');
var Store = {
    name:'存储层',
    desc:'用户存取数据',
    _db:null,
    _table:null,
    _dbType:'',
    init:function(dbtype){
        this._dbType = dbtype || 'mongodb';
        
        switch(this._dbType){
            case 'mongodb':
                this._db = require('mongoose');
                this._db.connect('mongodb://127.0.0.1::27107');
                break;
            default:
                break;
        }
        
        return this;
    },
    selectDb:function(dbname){
        dbname = dbname || 'webpage';
        switch(this._dbType){
            case 'mongodb':
                this._db.connect('mongodb://127.0.0.1::27107');
                break;
            default:
                break;
        }
    },
    selectTable:function(tablename){
        
    },
    fetchOne:function(where, fileds){
        
    },
    fetchAll:function(where, fileds){
        
    },
    find:function(id){
        
    },
    save:function(data){
        
    }
}
module.exports = Store;
