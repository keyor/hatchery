var Cheerio = require('cheerio');
var Iconv = require('iconv-lite');
var Path = require('path');
var UrlUtil = require('url');
var ParseTable = {
    parse:function(buffer,host, topN){
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
        //         Fs.writeFile('t.html', json['urls'].join("\n"));
        json['format'] = this._format($);
        if(json['format']['type']){
            json['html'] = html;
        }
        delete json['format'];
        return json;
    },
    _format:function($){
        var json = {};
        if(!$('#contact-person').length){
            return json;
        }
        
        var likename = $('h5').html();
        if(!likename){
            return json;
        }
        
        json['linkname'] = likename.replace(/\s+/g,'');
        var dt  = $('#sub-person-info-list dt');
        var dd  = $('#sub-person-info-list dd');
        for(var i = 0;i<dt.length;i++){
            if(dd.eq(i).length){
                json[dt.eq(i).html()] = dd.eq(i).html();
            }
        }
        
        json['Company Name'] = $('th:contains("Company Name:")').next('td').text();
        json['Operational Address'] = $('th:contains("Operational Address:")').next('td').text();
        json['Website'] = this._trim($('th:contains("Website:")').next('td').find('a').html());
        json['Website on alibaba.com'] = $('th:contains("Website on alibaba.com:")').next('td').text();
        
        json['Main Products'] = this._trim($('#main-products').find('div').eq(0).html());
        json['Business Type'] = this._trim($('#business-type').find('.business-type-text').html());
        
        //标志位        
        json['type'] = 'contact';
        return json;
    },
    _trim:function(str){
        if(!str){
            return '';
        }
        return str.replace(/\s+/g,'');
    },
    _getEncode:function(){
        return  'utf8';
    }
}

module.exports = ParseTable;