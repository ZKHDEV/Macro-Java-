package com.zkh.macro.dao;

import com.zkh.macro.pojo.Extuser;
import com.zkh.macro.pojo.ExtuserExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExtuserMapper {
    long countByExample(ExtuserExample example);

    int deleteByExample(ExtuserExample example);

    int deleteByPrimaryKey(Integer extuserId);

    int insert(Extuser record);

    int insertSelective(Extuser record);

    List<Extuser> selectByExample(ExtuserExample example);

    Extuser selectByPrimaryKey(Integer extuserId);

    int updateByExampleSelective(@Param("record") Extuser record, @Param("example") ExtuserExample example);

    int updateByExample(@Param("record") Extuser record, @Param("example") ExtuserExample example);

    int updateByPrimaryKeySelective(Extuser record);

    int updateByPrimaryKey(Extuser record);
}