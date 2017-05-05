$.validator.addMethod("userName", function (value, element) {
    var uname = /^[a-zA-Z0-9_]{5,45}$/;
    return this.optional(element) || (uname.test(value));
}, "");
$.validator.addMethod("userPwd", function (value, element) {
    var upwd = /^[\A-Za-z0-9\!\#\$\%\^\&\*\.\~]{5,32}$/;
    return this.optional(element) || (upwd.test(value));
}, "");
$.validator.addMethod("mobile", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "");

// 登录表单验证器
var loginFormValidator = {
    event: 'keyup',
    rules: {
        username: { required: true, userName: true },
        password2: { required: true }
    },
    messages: {
        username: { required: '用户名必填。', userName: '用户名长度须为5-45，只可包括以下字符: 大写字母、小写字母、数字和下划线。' },
        password2: { required: '密码必填。' }
    },
    errorPlacement: function (error, element) {
        var info = $('#login-form-info');
        info.empty();
        error.appendTo(info);
    },
    submitHandler: function (form) {
        $('#login-form-info').empty();
        $('#password').val($.md5($('#password2').val()));
        $('#password2').attr('disabled', true);
        $.post(window.CONFIG.url + '/Account/login', Utils.serializeObject(form), function (data) {
            if (data.success) {
                DaoFactory.set('macro_','token',data.data);
                window.location.href = './index.html';
            } else {
                $('#password2').attr('disabled', false);
                $('#password,#password2').val('');
                var info = '';
                for(var field in data.data){
                    info += data.data[field];
                }
                $('#login-form-info').empty().html(info);
            }
        });
    }
};