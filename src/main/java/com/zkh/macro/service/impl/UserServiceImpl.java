package com.zkh.macro.service.impl;

import com.zkh.macro.dao.UserMapper;
import com.zkh.macro.pojo.User;
import com.zkh.macro.pojo.UserExample;
import com.zkh.macro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by ms-zk on 2017-03-15.
 */
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(String username, String password) {
        UserExample userExample = new UserExample();
        userExample.createCriteria().andUserNameEqualTo(username);
        List<User> users = userMapper.selectByExample(userExample);
        if(users.size() > 0){
            return users.get(0);
        }
        return null;
    }

    @Override
    public User findByToken(String token) {
        UserExample userExample = new UserExample();
        userExample.createCriteria().andUserTokenEqualTo(token);
        List<User> users = userMapper.selectByExample(userExample);
        if(users.size() > 0){
            return users.get(0);
        }
        return null;
    }
}
