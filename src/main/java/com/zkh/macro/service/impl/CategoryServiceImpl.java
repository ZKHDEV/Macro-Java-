package com.zkh.macro.service.impl;

import com.zkh.macro.dao.CategoryMapper;
import com.zkh.macro.pojo.Category;
import com.zkh.macro.pojo.CategoryExample;
import com.zkh.macro.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by ms-zk on 2017-05-05.
 */
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> selectByUserId(Integer userId) {
        CategoryExample categoryExample = new CategoryExample();
        categoryExample.createCriteria().andCategoryUserIdEqualTo(userId);
        return categoryMapper.selectByExample(categoryExample);
    }

    @Override
    public Boolean insertByUserId(Category category, Integer userId) {
        category.setCategoryUserId(userId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        category.setCategorySubtime(dateFormat.format(new Date()));
        return categoryMapper.insert(category) > 0;
    }

    @Override
    public Boolean deleteByIdAndUserId(Integer id, Integer userId) {
        CategoryExample categoryExample = new CategoryExample();
        categoryExample.createCriteria().andCategoryIdEqualTo(id)
                .andCategoryUserIdEqualTo(userId);
        return categoryMapper.deleteByExample(categoryExample) > 0;
    }

    @Override
    public Boolean updateByUserId(Category category, Integer userId) {
        category.setCategoryUserId(userId);
        return categoryMapper.updateByPrimaryKey(category) > 0;
    }
}
