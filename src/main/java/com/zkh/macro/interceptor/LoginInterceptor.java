package com.zkh.macro.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.zkh.macro.pojo.User;
import com.zkh.macro.pojo.ViewModel.JsonResult;
import com.zkh.macro.service.UserService;
import com.zkh.macro.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录过滤器（可使用shiro代替）
 */
public class LoginInterceptor implements HandlerInterceptor {

	@Autowired
	private RedisUtil redisUtil;

	@Autowired
	private UserService userService;

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception exception)
			throws Exception {
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {

		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");

		String token = request.getParameter("token").toString();
		if(token != null){
			if(redisUtil.exists(token)){
				return true;
			}else{
				User user = userService.findByToken(token);
				if(user != null){
					redisUtil.set(token, user, 604800L);
					return true;
				}
			}
		}

		JsonResult result = new JsonResult();
		result.setSuccess(false);
		result.setInfo("Token 错误！");
		response.getWriter().write(JSONObject.toJSONString(result));

		return false;
	}

}
