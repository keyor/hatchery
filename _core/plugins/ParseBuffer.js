var UrlUtil = require('url');
var ParseBuffer = {
    init:function(options){
        options = options || {};
        this._topN = options.topN || 100;
    },
    parse:function(url, buffer ,callback){
        var urlOptions = UrlUtil.parse(url);
        var tmp = urlOptions['hostname'].split('.');
        var domain = tmp[tmp.length - 2] + '.' + tmp[tmp.length - 1];
        var ParseTable = require('../../configs/parseTable/'+domain + '.js');
        var json = ParseTable.parse(buffer, urlOptions['hostname'], this._topN)
        callback(json);
    }
}

module.exports = ParseBuffer;