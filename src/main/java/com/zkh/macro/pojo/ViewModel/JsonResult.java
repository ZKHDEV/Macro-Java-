package com.zkh.macro.pojo.ViewModel;

/**
 * Created by ms-zk on 2017-05-03.
 */
public class JsonResult<T> {
    private Boolean success;
    private String info;
    private T data;

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
