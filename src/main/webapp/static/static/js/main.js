/**
 * 主要业务逻辑相关
 */
var macro = null;

/**
 * 验证登录状态并实例化主要业务类
 */
(function () {
    var data = DaoFactory.get('macro_','token');
    data.status > 0 || (macro = new Macro(data.value));
}());

