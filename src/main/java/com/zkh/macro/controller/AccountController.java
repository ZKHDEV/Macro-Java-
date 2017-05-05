package com.zkh.macro.controller;

import com.zkh.macro.exception.CustomException;
import com.zkh.macro.pojo.User;
import com.zkh.macro.pojo.ViewModel.JsonResult;
import com.zkh.macro.pojo.ViewModel.LoginViewModel;
import com.zkh.macro.service.UserService;
import com.zkh.macro.util.ControllerUtil;
import com.zkh.macro.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ms-zk on 2017-03-15.
 */
@Controller
@RequestMapping("/Account")
public class AccountController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisUtil redisUtil;

    @PostMapping("/login")
    public @ResponseBody JsonResult login(@Valid LoginViewModel loginViewModel, BindingResult bindingResult) throws IOException {
        if(!bindingResult.hasErrors()){
            User user = userService.login(loginViewModel.getUsername().trim(),loginViewModel.getPassword());
            if(user != null){
                redisUtil.set(user.getUserToken(), user, 604800L);
                return Success(String.class,"Success",user.getUserToken());
            }else{
                return Error("Error");
            }
        }else{
            return Error(Map.class,"Error",ControllerUtil.ObjectErrorsToMap(bindingResult.getAllErrors()));
        }
    }

    @GetMapping("/getUserByToken/{token}")
    public @ResponseBody JsonResult getUserByToken(@PathVariable("token") String token) {
        User user = (User)redisUtil.get(token);
        user = user == null ? userService.findByToken(token) : user;

        if(user != null){
            return Success(User.class,"Success",user);
        }else{
            return Error("找不到记录");
        }
    }

    @GetMapping("/logout")
    public JsonResult logout(String token){
        redisUtil.remove(token);
        return Success("Success");
    }
}
