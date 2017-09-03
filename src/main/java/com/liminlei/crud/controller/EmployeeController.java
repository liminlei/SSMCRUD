package com.liminlei.crud.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liminlei.crud.bean.Employee;
import com.liminlei.crud.bean.Msg;
import com.liminlei.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by liminlei on 2017-8-31.
 */
@Controller
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    /*
    * 查询员工所有数据，分页
    * */
    //@RequestMapping("/emps")
    public String getEmps(@RequestParam(value = "pn",defaultValue = "1")Integer pn, Model model){

        PageHelper.startPage(pn,5);                 //开启分页
        List<Employee> emps = employeeService.getAll();     //紧跟着查询操作
        PageInfo page = new PageInfo(emps,5);   //页面上连续显示5页

        model.addAttribute("pageInfo",page);

        return "list";
    }

    @RequestMapping("/emps")
    @ResponseBody
    public Msg getEmpsWithJson(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,5);
        List<Employee> emps = employeeService.getAll();
        PageInfo page = new PageInfo(emps,5);
        return Msg.success().add("pageInfo",page);
    }

    /**
     * 新增保存
     */
    @RequestMapping(value = "/emp",method = RequestMethod.POST)
    @ResponseBody
    public Msg saveEmp(@Valid Employee employee, BindingResult result){
        if(result.hasErrors()){
            Map<String, Object> map = new HashMap<String, Object>();
            List<FieldError> errors = result.getFieldErrors();
            for (FieldError fieldError : errors) {
                System.out.println("错误的字段名："+fieldError.getField());
                System.out.println("错误信息："+fieldError.getDefaultMessage());
                map.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return Msg.fail().add("errorFields", map);
        }else{
            employeeService.saveEmp(employee);
            return Msg.success();
        }
    }

    @RequestMapping(value = "/checkName")
    @ResponseBody
    public Msg checkEmpName(@RequestParam(value = "empName") String empName){
        boolean b = employeeService.checkName(empName);
        if(b){
            return Msg.success();
        }else {
            return Msg.fail();
        }
    }

    @RequestMapping(value = "/emp/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Msg getEmp(@PathVariable(value = "id") Integer id){
        Employee employee = employeeService.getEmp(id);
        return Msg.success().add("emp",employee);
    }

    @ResponseBody
    @RequestMapping(value = "/emp/{empId}",method = RequestMethod.PUT)
    public Msg updateEmp(Employee employee){
        employeeService.updateEmp(employee);
        return Msg.success();
    }

    @ResponseBody
    @RequestMapping(value = "/emp/{ids}",method = RequestMethod.DELETE)
    public Msg deleteBy(@PathVariable(value = "ids") String ids){
        if(ids.contains("-")){
            //批量删除
            List<Integer> idList = new ArrayList<Integer>();
            String[] strId = ids.split("-");
            for(String id : strId){
                idList.add(Integer.parseInt(id));
            }
            employeeService.deleteBatch(idList);
        }else{
            //单个删除
            Integer id = Integer.parseInt(ids);
            employeeService.deleteById(id);
        }
        return Msg.success();
    }
}
