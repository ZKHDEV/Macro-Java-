package com.zkh.macro.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zkh.macro.exception.CustomException;
import com.zkh.macro.pojo.ViewModel.JsonResult;
import org.springframework.http.HttpRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by ms-zk on 2017-03-16.
 */
public class BaseController {

    protected String View(String view) {
        return view;
    }

    protected String View(String view, Model model, Object object) {
        model.addAttribute("model",object);
        return view;
    }

    protected String RedirectTo(String url) {
        return "redirect:" + url;
    }

    protected <T> JsonResult Success(Class<T> c, String info, T data){
        JsonResult<T> result = new JsonResult<T>();
        result.setSuccess(true);
        result.setInfo(info);
        result.setData(data);
        return result;
    }

    protected JsonResult Success(String info){
        JsonResult result = new JsonResult();
        result.setSuccess(true);
        result.setInfo(info);
        return result;
    }

    protected <T> JsonResult Error(Class<T> c, String info, T data){
        JsonResult<T> result = new JsonResult<T>();
        result.setSuccess(false);
        result.setInfo(info);
        result.setData(data);
        return result;
    }

    protected JsonResult Error(String info){
        JsonResult result = new JsonResult();
        result.setSuccess(false);
        result.setInfo(info);
        return result;
    }
}
