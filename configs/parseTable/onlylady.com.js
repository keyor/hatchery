var Cheerio = require('cheerio');
var Iconv = require('iconv-lite');
var Path = require('path');
var UrlUtil = require('url');
var ParseTable = {
    parse:function(buffer, host, topN){
        var json = {};
         
        var encode = this._getEncode();
         
        var html = Iconv.decode(buffer, encode);
        
        json['urls'] = [];
        var $ = Cheerio.load(html);
        $('a').each(function(index, item){
            if(index > topN - 1){
                return false;
            }
            
            var tmpUrl = $(item).attr('href');
            if( !tmpUrl || tmpUrl.indexOf('javascript') !== -1 ){
                return true;
            }
            var tmpOp = UrlUtil.parse(tmpUrl);
            
            if(!tmpOp['path']){
                return true;
            }
            
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
        json['from'] = host;
        json['format'] = this._format($);
        if(json['format']['title']){
            json['html'] = html;
        }
        else{
            delete json['format'];
        }
       
        return json;
    },
    _format:function($){
        var json = {};
         
        if(!$('.ph').length){
            return json;
        }
        
        var tmp = $('h1').eq(1).text();
        
        tmp = tmp.split('(');
        if(tmp.length){
            json['title']  = tmp[0];
        }
       
        tmp = tmp[1].split(')');
        if(tmp.length){
            json['time'] = tmp[0];
        }
        if(!json['title']){
            return {};
        }
        var xg1 = $('.xg1');
        
        json['click_count'] = /([0-9]+)/.exec(xg1.eq(1).text())[1];
        json['review_count'] = /([0-9]+)/.exec(xg1.eq(2).text())[1];
        json['content'] = $('#blog_article').html();
        json['type'] = 'detail';
        return json;
    },
    _trim:function(str){
        if(!str){
            return '';
        }
        return str.replace(/\s+/g,'');
    },
    _getEncode:function(){
        return  'gbk';
    }
}

module.exports = ParseTable;