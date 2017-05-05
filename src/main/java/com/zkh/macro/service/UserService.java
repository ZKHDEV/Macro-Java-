package com.zkh.macro.service;

import com.zkh.macro.pojo.User;

/**
 * Created by ms-zk on 2017-03-15.
 */
public interface UserService {
    User findByToken(String token);
    User login(String username,String password);
}
