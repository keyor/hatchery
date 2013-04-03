var FilterUrl = {
    init:function(options){
        this._urls = options.urls;
        if('string' == typeof this._urls){
            this._urls = [this._urls];
        }
        this._rules = options.rules;
    },
    filter:function(){
        if(!this._rules){
            return this._urls;
        }
        
        var validUrls = [];
       
        for(var i=0; i< this._urls.length; i++){
            if(this._isValid(this._urls[i]['url'])){
                validUrls.push(this._urls[i]); 
            }
        }
        
        return validUrls;
    },
    _isValid:function(url){
        var allowRules = this._rules['allow'];
        
//        var disallowRules = this._rules['disallow'];
        for(var i=0 ; i< allowRules.length ; i++){
            if(allowRules[i].test(url)){
                return true;
            }
        }
        
//        for(var j = 0; j<disallowRules.length; j++){
//            if(disallowRules[j].test(url)){
//                return false;
//            }
//        }
//        
        return false;
    }
}
module.exports = FilterUrl;