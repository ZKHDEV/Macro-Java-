package com.zkh.macro.service;

import com.zkh.macro.pojo.Category;

import java.util.List;

/**
 * Created by ms-zk on 2017-05-05.
 */
public interface CategoryService {
    List<Category> selectByUserId(Integer userId);
    Boolean insertByUserId(Category category, Integer userId);
    Boolean deleteByIdAndUserId(Integer id, Integer userId);
    Boolean updateByUserId(Category category, Integer userId);
}
