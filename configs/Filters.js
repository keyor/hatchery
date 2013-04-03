var Filters = {
    allow:[
//        new RegExp('http://www.duwenzhang.com/wenzhang/.*?[0-9]+/\.html'),
//        new RegExp('http://www.duwenzhang.com/wenzhang/[a-z0-9]+/'),
//        new RegExp('http://www.duwenzhang.com/huati/.*\.html'),
//        new RegExp('http://www.etourer.com/.*?show/id/.+')
//        new RegExp('http://www\.alibaba\.com/catalogs/products/CID52806--CN'),
//        new RegExp('http://www\.alibaba\.com/catalogs/products/CID52806\-\-CN/[0-9]+', 'i'),
//        new RegExp('http://www.alibaba.com/product-gs/[0-9]+/.*?solar.*?\.html', 'i'),
//        new RegExp('http://[a-z-0-9_]+\.en\.alibaba\.com', 'i'),
//        new RegExp('http://[a-z-0-9_]+\.en\.alibaba\.com/contactinfo.html', 'i')
        new RegExp('http://blog\.onlylady\.com/blog-[0-9]+-[0-9]+\.html', 'i'),
        new RegExp('http://blog.onlylady.com/home\.php\?mod\=space&uid=[0-9]+&do\=blog&view\=me&from\=space&page\=[0-9]+', 'i'),
    ]
}

module.exports = Filters;