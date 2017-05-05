/**
 * 主页业务逻辑类
 * @param {string} token 客户端身份凭证
 */
var Macro = function (token) {
    this.token = token;
    this.user = null;
    this.initUser();
}
Macro.fn = Macro.prototype;

Macro.fn.initUser = function () {
    var that = this;
    // 职责链模式，成功获取用户信息后初始化页面
    $.get(window.CONFIG.url + '/Account/getUserByToken/' + this.token, function (data) {
        if (data.success) {
            that.user = data.data;
            that.initNode();
            that.initModule();
        }
    });
}
Macro.fn.initNode = function () {
    this.$headBtn = $('#head-btn');
    this.$headImg = $('#head-img');
    this.$settingMenu = $('#setting-menu');
    this.$favList = $('.fav-list').first();
    this.$cateList = $('.cate-list').first();
}
Macro.fn.initModule = function () {
    this.initNavbar();
    this.initFavLink();
    this.initBmark();
}
Macro.fn.initNavbar = function () {
    this.$headImg.attr('src','');
    this.$headBtn.off('click').attr('href',window.CONFIG.url + '/person.html');
    var settingItems = ['<li><a href="'+ window.CONFIG.url +'/person.html"><i class="icon-user"></i> 个人中心</a></li>',
        '<li><a href="javascript:void(0);"><i class="icon-magic"></i> 编辑</a></li>',
        '<li class="hr"></li>',
        '<li><a href="javascript:void(0);"><i class="icon-signout"></i> 注销</a></li>'
    ].join('');
    this.$settingMenu.empty().append($(settingItems));
}
Macro.fn.initFavLink = function () {
    var that = this;
    $.get(window.CONFIG.url + '/getFavLink?token=' + this.token, function (data) {
        $.each(data.data, function () {
            var favItems = ['<li>',
                '<a href="' + this.linkUrl + '" target="_blank">',
                '<img src="' + window.CONFIG.assetUrl + '/img/browser-icon-chrome.png" alt="icon">',
                '<hr>',
                '<p><nobr>' + this.linkTitle + '</nobr></p>',
                '</a>',
                '<a href="javascript:void(0);" class="fav-rm-btn"><i class="icon-remove-sign"></i></a>',
                '</li>'
            ].join('');
            that.$favList.prepend($(favItems));
        });
    });
}
Macro.fn.initBmark = function () {
    var that = this;
    // 职责链模式
    $.get(window.CONFIG.url + '/getCategories?token=' + this.token, function (data) {
        $.each(data.data, function () {
            initLinkList(this);
        });
    });

    function initLinkList(cate) {
        var buffer = '';
        $.get(window.CONFIG.url + '/getLinksByCateId/' + cate.categoryId + '?token=' + that.token, function (data) {
            $.each(data.data, function () {
                var linkItem = [
                    '<li>',
                    '<a href="' + this.linkUrl + '" target="_blank" title="' + this.linkTitle + '">',
                    '<nobr>' + this.linkTitle + '</nobr>',
                    '</a>',
                    '<input class="hidden" type="checkbox">',
                    '</li>'
                ].join('');
                buffer += linkItem;
            });
            buffer = '<ul class="link-list">' + buffer + '</ul>';
            buildBmark(cate, buffer);
        });
    }

    function buildBmark(cate, linkList) {
        var cateItems = [
            '<li>',
            '<div class="cate-item">',
            '<div class="cate-item-header">' + cate.categoryName,
            '<a href="#" title="修改名称"><i class="icon-pencil"></i></a>',
            '<a href="#" title="删除分类"><i class="icon-remove-sign"></i></a>',
            '<div class="right-tool pull-right">',
            '<a href="#" title="移动"><i class="icon-move"></i></a>',
            '<a href="#" title="编辑"><i class="icon-pencil"></i></a>',
            '<a href="#" title="删除"><i class="icon-remove-sign"></i></a>',
            '<a href="#" title="添加"><i class="icon-plus-sign"></i></a>',
            '</div>',
            '</div>',
            '<hr>',
            '<div class="link-box">',
            linkList,
            '</div>',
            '</div>',
            '</li>'
        ].join('');
        that.$cateList.prepend($(cateItems));
    }
}