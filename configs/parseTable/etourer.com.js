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
        var tmp = '';
        $('a').each(function(index, item){
            if(index > topN - 1){
                return false;
            }
            
            var tmpUrl = $(item).attr('href');
            tmp += " \t" + tmpUrl;
            var tmpOp = UrlUtil.parse(tmpUrl);
            if(!tmpOp['hostname']){
                if(tmpOp['path'].substr(0,1) === '/'){
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
        if(!$('h1').length){
            return json;
        }
        
        json['title'] = $('h1').html();
       
        return json;
        //格式化需要的东西
    },
    _getEncode:function(){
         return  'utf8';
    }
}

module.exports = ParseTable;