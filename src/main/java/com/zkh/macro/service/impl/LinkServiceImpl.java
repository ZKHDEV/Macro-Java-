package com.zkh.macro.service.impl;

import com.zkh.macro.dao.LinkMapper;
import com.zkh.macro.pojo.Link;
import com.zkh.macro.pojo.LinkExample;
import com.zkh.macro.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by ms-zk on 2017-05-05.
 */
public class LinkServiceImpl implements LinkService {

    @Autowired
    private LinkMapper linkMapper;

    @Override
    public List<Link> selectFavByUserId(Integer userId) {
        LinkExample linkExample = new LinkExample();
        linkExample.createCriteria().andLinkUserIdEqualTo(userId).andLinkFavflagEqualTo((byte)1);
        return linkMapper.selectByExampleWithBLOBs(linkExample);
    }

    @Override
    public List<Link> selectByCateId(Integer cateId) {
        LinkExample linkExample = new LinkExample();
        linkExample.createCriteria().andLinkCategoryIdEqualTo(cateId);
        return linkMapper.selectByExampleWithBLOBs(linkExample);
    }

    @Override
    public Boolean updateFavByIdAndUserId(Byte favFlag, Integer id, Integer userId) {
        LinkExample linkExample = new LinkExample();
        linkExample.createCriteria().andLinkUserIdEqualTo(id)
                .andLinkFavflagNotEqualTo(favFlag)
                .andLinkIdEqualTo(id);
        List<Link> list = linkMapper.selectByExample(linkExample);
        if(list.size() > 0){
            Link link = list.get(0);
            link.setLinkFavflag(favFlag);
            return linkMapper.updateByPrimaryKey(link) > 0;
        }
        return false;
    }

    @Override
    public Boolean deleteByIdAndUserId(Integer id, Integer userId) {
        LinkExample linkExample = new LinkExample();
        linkExample.createCriteria().andLinkIdEqualTo(id)
                .andLinkUserIdEqualTo(userId);
        return linkMapper.deleteByExample(linkExample) > 0;
    }

    @Override
    public Boolean updateByUserId(Link link, Integer userId) {
        link.setLinkUserId(userId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        link.setLinkModifiedon(dateFormat.format(new Date()));
        return linkMapper.updateByPrimaryKeyWithBLOBs(link) > 0;
    }

    @Override
    public Boolean insertByUserId(Link link, Integer userId) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        link.setLinkUserId(userId);
        link.setLinkFavflag((byte)0);
        link.setLinkDatetime(dateFormat.format(new Date()));
        link.setLinkModifiedon(dateFormat.format(new Date()));
        return linkMapper.insert(link) > 0;
    }
}
