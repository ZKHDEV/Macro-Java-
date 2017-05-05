package com.zkh.macro.controller;

import com.zkh.macro.pojo.Category;
import com.zkh.macro.pojo.Link;
import com.zkh.macro.pojo.User;
import com.zkh.macro.pojo.ViewModel.JsonResult;
import com.zkh.macro.service.CategoryService;
import com.zkh.macro.service.LinkService;
import com.zkh.macro.service.UserService;
import com.zkh.macro.util.ControllerUtil;
import com.zkh.macro.util.RedisUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Created by ms-zk on 2017-05-05.
 */
@Controller
public class IndexController extends BaseController {
    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private LinkService linkService;

    @Autowired
    private CategoryService categoryService;

    private User user;

    @ModelAttribute
    public void setUser(@RequestParam("token") String token){
        user = (User)redisUtil.get(token);
    }

    @GetMapping("/getFavLink")
    public @ResponseBody JsonResult getFavLink(){
        List<Link> list = linkService.selectFavByUserId(user.getUserId());
        return Success(List.class, "Success", list);
    }

    @GetMapping("/removeFavLink/{id}")
    public @ResponseBody JsonResult removeFavLink(@PathVariable("id") Integer id){
        if(linkService.updateFavByIdAndUserId((byte)0, id, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @GetMapping("/addFavLink/{id}")
    public @ResponseBody JsonResult addFavLink(@PathVariable("id") Integer id){
        if(linkService.updateFavByIdAndUserId((byte)1, id, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @GetMapping("/getCategories")
    public @ResponseBody JsonResult getCategories(){
        List<Category> list = categoryService.selectByUserId(user.getUserId());
        return Success(List.class, "Success", list);
    }

    @PostMapping("/createCategory")
    public @ResponseBody JsonResult createCategory(Category category){
        if(categoryService.insertByUserId(category, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @GetMapping("/deleteCategory/{id}")
    public @ResponseBody JsonResult deleteCategory(@PathVariable("id") Integer id){
        if(categoryService.deleteByIdAndUserId(id, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @PostMapping("/updateCategory")
    public @ResponseBody JsonResult updateCategory(Category category){
        if(categoryService.updateByUserId(category, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @GetMapping("/getLinksByCateId/{cateId}")
    public @ResponseBody JsonResult getLinksByCateId(@PathVariable("cateId") Integer cateId){
        List<Link> list = linkService.selectByCateId(cateId);
        return Success(List.class, "Success", list);
    }

    @GetMapping("/deleteLink/{id}")
    public @ResponseBody JsonResult deleteLink(@PathVariable("id") Integer id){
        if(linkService.deleteByIdAndUserId(id, user.getUserId())){
            return Success("Success");
        }else{
            return Error("Error");
        }
    }

    @PostMapping("/updateLink")
    public @ResponseBody JsonResult updateLink(@Valid LinkViewModel linkViewModel, BindingResult bindingResult){
        if(!bindingResult.hasErrors()){
            Link link = new Link();
            BeanUtils.copyProperties(linkViewModel,link);
            if(linkService.updateByUserId(link, user.getUserId())){
                return Success("Success");
            }else{
                return Error("Error");
            }
        }else{
            return Error(Map.class,"Error", ControllerUtil.ObjectErrorsToMap(bindingResult.getAllErrors()));
        }
    }

    @PostMapping("/createLink")
    public @ResponseBody JsonResult createLink(@Valid LinkViewModel linkViewModel, BindingResult bindingResult){
        if(!bindingResult.hasErrors()){
            Link link = new Link();
            BeanUtils.copyProperties(linkViewModel,link);
            if(linkService.insertByUserId(link, user.getUserId())){
                return Success("Success");
            }else{
                return Error("Error");
            }
        }else{
            return Error(Map.class,"Error", ControllerUtil.ObjectErrorsToMap(bindingResult.getAllErrors()));
        }
    }
}
