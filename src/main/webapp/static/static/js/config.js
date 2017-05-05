/**
 * 全局配置信息
 */
(function(){
    var url = 'http://localhost:8080',
        webUrl = url + '/static',
        assetUrl = webUrl + '/static',
        config = {
        // 网站URL
        url: url,
        // 页面URL
        webUrl: webUrl,
        // 资源文件URL
        assetUrl: assetUrl
    }
    window.CONFIG = config;
})();