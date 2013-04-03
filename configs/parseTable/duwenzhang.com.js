var Cheerio = require('cheerio');
var Iconv = require('iconv-lite');
var Path = require('path');
var UrlUtil = require('url');
var ParseTable = {
    parse:function(buffer, topN){
        var json = {};
         
        var encode = this._getEncode();
         
        var html = Iconv.decode(buffer, encode);
        json['html'] = html;
        json['urls'] = [];
        var host = 'http://' + Path.basename(__filename);
        host = host.replace('.js', '');
        var $ = Cheerio.load(html);
        $('a').each(function(index, item){
            if(index > topN - 1){
                return false;
            }
            
            var tmpUrl = $(item).attr('href');
            if(!tmpUrl){
                return true;
            }
            
            if(-1 !== tmpUrl.indexOf('javascript')){
                return true;
            }
            var tmpOp = UrlUtil.parse(tmpUrl);
            if(!tmpOp['hostname']){
                if(!tmpOp['pathname']){
                    return true;
                }
                if(tmpOp['pathname'].substr(0,1) === '/'){
                    tmpUrl = host + tmpUrl;
                }
                else{
                    tmpUrl = host + '/' + tmpUrl;
                }
            }
//            
            var url = {
                url:tmpUrl
            };
            json['urls'].push(url);
        });
//         Fs.writeFile('t.html', json['urls'].join("\n"));
        json['format'] = this._format($);
        return json;
    },
    _format:function($){
        var json = {};
        if(!$('#wenzhangziti').length){
            return json;
        }
        
        json['title'] = $('h1').html();
        json['content'] = $('#wenzhangziti').html();
        json['type'] = 'detail';
        return json;
        //格式化需要的东西
    },
    _getEncode:function(){
         return  'gbk';
    }
}

module.exports = ParseTable;