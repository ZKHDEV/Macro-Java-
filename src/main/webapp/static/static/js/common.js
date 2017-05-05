$(function () {
    $('.header').first().load('module/navbar.html', function () {
        // 导航栏设置按钮下拉菜单显示与隐藏
        $('.setting').on('mouseenter', function () {
            $('.setting-menu').removeClass('hidden');
        }).on('mouseleave', function () {
            $('.setting-menu').addClass('hidden');
        });

        // 头像、登录链接点击事件
        $('#login-btn,#head-btn').on('click', function () {
            var loginDialog = DialogFactory.get('login');
            loginDialog.show();
        });
        //注册按钮点击事件
        $('#register-btn').on('click', function () {
            var registerDialog = DialogFactory.get('register');
            registerDialog.show();
        });
    });

    $('.footer-container').first().load('module/footer.html', function () {
        // 页面滚动事件
        $(document).on('scroll', function () {
            scrollTop = Utils.getScrollTop();
            scrollBottom = document.body.scrollHeight - scrollTop;
            // 页面顶部判断
            if (scrollTop >= 5) {
                // 显示顶部导航栏阴影和返回顶部按钮
                $('.header').css('box-shadow', '0 0 16px #E0E0E0');
                $('.scroll-top').removeClass('hidden');
            } else {
                // 隐藏顶部导航栏阴影和返回顶部按钮
                $('.header').css('box-shadow', 'none');
                $('.scroll-top').addClass('hidden');
            }
        });
    });
})