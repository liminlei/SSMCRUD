package com.liminlei.crud.dao;

import com.liminlei.crud.bean.Department;
import com.liminlei.crud.bean.Employee;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.UUID;

/**
 * Created by liminlei on 2017-8-31.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class MapperTest {

    @Autowired
    DepartmentMapper departmentMapper;

    @Autowired
    EmployeeMapper employeeMapper;

    @Autowired
    SqlSessionTemplate sqlSession;
    @Test
    public void testCRUD(){
//        departmentMapper.insertSelective(new Department(null,"开发部"));
//        departmentMapper.insertSelective(new Department(null,"测试部"));
//        employeeMapper.insertSelective(new Employee(null,"ted","M","Ted@ted.com",1));
//        employeeMapper.insertSelective(new Employee(null,"barney","M","barnety@barney",2));
        EmployeeMapper mapper = (EmployeeMapper) sqlSession.getMapper(EmployeeMapper.class);
        for(int i = 0; i < 1000; ++i){
            String uid = UUID.randomUUID().toString().substring(0,5)+i;
            mapper.insert(new Employee(null,uid,"F",uid+"@"+uid+".com",1));
        }
    }

}
