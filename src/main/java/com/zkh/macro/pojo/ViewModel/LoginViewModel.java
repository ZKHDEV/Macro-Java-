package com.zkh.macro.pojo.ViewModel;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * Created by ms-zk on 2017-03-15.
 */
public class LoginViewModel {
    @NotEmpty(message="{login.username.length.error}")
    private String username;
    @NotEmpty(message="{login.password.length.error}")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
