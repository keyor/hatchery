var Config = require('./Config');
var Common = {
    log:function(){
        if(Config.env === 'production'){
            return ;
        }
        
        console.log(arguments);
    }
}

module.exports = Common;