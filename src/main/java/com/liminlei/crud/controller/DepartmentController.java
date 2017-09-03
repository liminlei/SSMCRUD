package com.liminlei.crud.controller;

import com.liminlei.crud.bean.Department;
import com.liminlei.crud.bean.Msg;
import com.liminlei.crud.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by liminlei on 2017-9-2.
 */
@Controller
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    /**
     *返回所有部门
     */
    @RequestMapping("/depts")
    @ResponseBody
    public Msg getDepts(){
        List<Department> list = departmentService.getDepts();
        return Msg.success().add("depts",list);
    }

}
