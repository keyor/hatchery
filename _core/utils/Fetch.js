var Http = require('http');
var UrlUtil = require('url');
var Fetch =  function(Headers, delay, Hatchery){
    this.name = '';
    this.desc = '';
    this._headers = Headers;
    this._delay = delay;
    this._hatchery = Hatchery;
    
}
Fetch.prototype = {
    get:function(url, callback, parent){
        if(!url){
            return ;
        }
        return this._get_ex(url, callback, parent);
        
//        var urlInfo = UrlUtil.parse(url);
//        var opt = {
//            timeout:3,
//            host:urlInfo['host'],
//            path:urlInfo['path'],
//            port:80,
//            headers:{
//                'User-Agent':'test'
//            }
//        }
//        var request = Http.get(opt
//        ,function(response){
//            if(!response){
//                return request.abort();
//            }
//            
//            console.info(url + ' status:' + response.statusCode);
//            parent._hatchery.status()
//            if(response.statusCode !== 200 ){
//                //return request.abort();
//            }
//            
//            var buffers = [], length = 0; 
//            response.on('data', function(chunk){
//                buffers.push(chunk);
//                length += chunk.length;
//            });
//                
//            response.on('end', function(){
//                console.info('['+parent.name + '] fetch ' + url);
//                var buffer = Buffer.concat(buffers);
//                callback(buffer);
//            });
//                
//            response.on('close', function(){
//                response.emit('end');
//                console.info(arguments);
//            });
//        });
//        //        request.setTimeout(4);    
//        request.on('error', function(e){
//			console.error(e);
//			request.emit('end');
//            
//            //request.abort();
//            //            for(var i = 0 ; i< _this._hatchery._units.length;i++){
//            //                _this._hatchery.kill(_this._hatchery._units[i]);
//            //            }
//            //            _this._hatchery.populationCount = 0;
//            //            _this._hatchery.run();
//        });
//        
//        request.on('socket', function (socket) {
//            socket.setTimeout(1000);  
//            socket.on('timeout', function() {
//                console.log('debugger', 'timeout');
//				request.emit('end');
//            });
//			socket.on('error', function(e){
//				console.error(e);
//				request.emit('end');
//			});
//        });
//
//        request.end();
    },
    //timeout 是否可以fork出新的进程来执行
	_get_ex:function(url, callback, parent){
        var urlInfo = UrlUtil.parse(url);
        var options = {
            timeout:3,
            host:urlInfo['host'],
            path:urlInfo['path'],
            port:80,
            headers:{
                'User-Agent':'test'
            },
            method:'GET'
        }
        var req = null, request_timeout = null;
        request_timeout = setTimeout(function() {
            request_timeout = null;
            req.abort();
            callback(new Error('Request timeout'));
        }, 5000);
        
        req = Http.request(options, function(res) {
            console.info(url + ' status:' + res.statusCode);
            clearTimeout(request_timeout);
             var buffers = [],  response_timeout = null;
            response_timeout = setTimeout(function() {
                response_timeout = null;
                req.abort();
                callback(new Error('112 Response timeout'));
            }, 5000);
            res.on('data', function(chunk) {
                buffers.push(chunk);
            }).on('end', function() {
                if(response_timeout) {
                    // node0.5.x及以上：req.abort()会触发res的end事件
                    clearTimeout(response_timeout);
                    console.info('['+parent.name + '] fetch ' + url);
                    var buffer = Buffer.concat(buffers);
                    callback(buffer);
                }
            }).on('error', function(err) {
                clearTimeout(response_timeout);
                console.error(err);
                //callback(err, res);
            }).on('aborted', function() {
                if(response_timeout) {
                    // node0.5.x及以上：当res有效的时候，req.abort()会触发res的aborted事件
                    console.error(new Error('line 132 Response aborted'));
                    //callback(new Error('Response aborted'), res);
                }
            });
        }).on('error', function(err) {
            // node0.5.x及以上，调用req.abort()会触发一次“socket hang up” error
            // 所以需要判断是否超时，如果是超时，则无需再回调异常结果
            if(request_timeout) {
                clearTimeout(request_timeout);
                console.error('line 141',err);
                //callback(err);
            }
        });
        req.end();
	}
}  

module.exports = Fetch;

