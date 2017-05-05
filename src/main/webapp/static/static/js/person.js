/**
 * 个人中心业务逻辑类
 * @param {string} token 客户端身份凭证
 */
var Macro = function (token) {
    this.token = token;
    this.user = null;
    this.loadPage();
    if (this.checkLogin()) return;
    this.initNode();
    this.initModule();
}
Macro.fn = Macro.prototype;

Macro.fn.loadPage = function(){
    // $('.header').first().load('module/navbar.html');
    // $('.footer-container').first().load('module/footer.html');
}
Macro.fn.checkLogin = function () {
    $.get(window.CONFIG.url + '/getUserByToken' + '?token=' + this.token, function (data) {
        data.success && (this.user = data.value);
    });
    return this.user ? false : true;
}
Macro.fn.initNode = function () {
    this.$headImg = $('#head-img');
    this.$settingMenu = $('#setting-menu');
    this.$headerContainer = $('.header-container').first();
    this.$personForm = $('#person-form');
    this.$pinfoList = $('#pinfo-list');
    this.$ainfoList = $('#ainfo-list');
}
Macro.fn.initModule = function () {
    this.initNavbar();
    this.initHeader();
    this.initPersonCard();
    this.initAccountCard();
}
Macro.fn.initNavbar = function () {
    this.$headImg.src = '../upload/avatar/' + this.user.avatar;
    var settingItems = ['<li><a href="person.html"><i class="icon-user"></i> 个人中心</a></li>',
        '<li><a href="javascript:void(0);"><i class="icon-magic"></i> 编辑</a></li>',
        '<li class="hr"></li>',
        '<li><a href="javascript:void(0);"><i class="icon-signout"></i> 注销</a></li>'
    ].join('');
    this.$settingMenu.empty().append($(settingItems));
}
Macro.fn.initHeader = function () {
    this.$headerContainer.find('img').attr('src', '../upload/avatar/' + this.user.avatar);
    this.$headerContainer.find('p').html(this.user.name);
}
Macro.fn.initPersonCard = function () {
    var tpl = [
        '<dt>姓名：</dt>',
        '<dd>{#name#}</dd>',
        '<dd class="hidden"><input type="text" name="name" value="{#name#}"></dd>',
        '<dt>年龄：</dt>',
        '<dd>{#age#}</dd>',
        '<dd class="hidden"><input type="number" name="age" value="{#age#}"></dd>',
        '<dt>性别：</dt>',
        '<dd>{#sex#}</dd>',
        '<dd class="hidden"><input type="text" name="sex" value="{#sex#}"></dd>',
        '<dt>国家：</dt>',
        '<dd>{#country#}</dd>',
        '<dd class="hidden"><input type="text" name="country" value="{#country#}"></dd>',
        '<dt>城市：</dt>',
        '<dd>{#city#}</dd>',
        '<dd class="hidden"><input type="text" name="city" value="{#city#}"></dd>',
        '<dt>职位：</dt>',
        '<dd>{#post#}</dd>',
        '<dd class="hidden"><input type="text" name="post" value="{#post#}"></dd>',
        '<dt>邮箱：</dt>',
        '<dd>{#email#}</dd>',
        '<dd class="hidden"><input type="text" name="email" value="{#email#}"></dd>',
        '<dt>手机：</dt>',
        '<dd>{#phone#}</dd>',
        '<dd class="hidden"><input type="text" name="phone" value="{#phone#}"></dd>',
        '<dt>爱好：</dt>',
        '<dd>{#hobby#}</dd>',
        '<dd class="hidden"><input type="text" name="hobby" value="{#hobby#}"></dd>'
    ].join('');
    tpl = Utils.formatString(tpl, this.user);
    this.$pinfoList.empty().append($(tpl));
}
Macro.fn.initAccountCard = function () {
    var tpl = [
        '<dt>用户名：</dt>',
        '<dd>{#username#} <a href="javascript:void(0)"><i class="icon-pencil"></i></a> <a href="javascript:void(0)"><i class="icon-key"></i></a></dd>',
        '<dt>注册邮箱：</dt>',
        '<dd>{#useremail#} <a href="javascript:void(0)"><i class="icon-pencil"></i></a> <a class="text-danger" href="javascript:void(0)">未激活</a></dd>',
        '<dt>注册时间：</dt>',
        '<dd>{#subtime#}</dd>'
    ].join('');
    tpl = Utils.formatString(tpl, this.user);
    this.$ainfoList.empty().append($(tpl));
}