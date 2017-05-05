package com.zkh.macro.service;

import com.zkh.macro.pojo.Category;
import com.zkh.macro.pojo.Link;

import java.util.List;

/**
 * Created by ms-zk on 2017-05-05.
 */
public interface LinkService {
    List<Link> selectFavByUserId(Integer userId);
    List<Link> selectByCateId(Integer cateId);
    Boolean updateFavByIdAndUserId(Byte favFlag, Integer id, Integer userId);
    Boolean deleteByIdAndUserId(Integer id, Integer userId);
    Boolean updateByUserId(Link link, Integer userId);
    Boolean insertByUserId(Link link, Integer userId);
}
