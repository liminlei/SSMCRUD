
<%--
  Created by IntelliJ IDEA.
  User: liminlei
  Date: 2017-8-31
  Time: 下午 04:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>员工列表</title>
    <%
        request.setAttribute("APP_PATH",request.getContextPath());
    %>
    <link href="${APP_PATH}/static/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="${APP_PATH}/static/js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="${APP_PATH}/static/bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${APP_PATH}/static/js/index.js"></script>
</head>
<body>
    <input type="hidden" id="APP_PATH" value="${APP_PATH}"/>
    <div class="container">
        <%--标题--%>
        <div class="row">
            <div class="col-md-12">
                <h1>SSM_CRUD</h1>
            </div>
        </div>
        <%--按钮--%>
        <div class="row">
            <div class="col-md-4 col-md-offset-8">
                <button class="btn btn-primary" id="add"><span class="glyphicon glyphicon-pencil"></span>新增</button>
                <button class="btn btn-danger" id="deleteAll"><span class="glyphicon glyphicon-trash"></span>删除</button>
            </div>
        </div>
        <%--表格--%>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="checkAll"/></th>
                            <th>#</th>
                            <th>empName</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>deptName</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">

                    </tbody>
                    
                </table>
            </div>
        </div>
        <%--分页--%>
        <div class="row">
            <div class="col-md-6" id="pageInfo">

            </div>
            <div class="col-md-6" id="pageNav">
               
            </div>
        </div>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">新增</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="add_empName" class="col-sm-2 control-label">empName</label>
                            <div class="col-sm-10">
                                <input type="text" name="empName" class="form-control" id="add_empName" placeholder="empName">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">gender</label>
                            <div class="col-sm-10">
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender_F" value="F" checked="checked"> 女
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender_M" value="M"> 男
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add_email" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" name="email" class="form-control" id="add_email" placeholder="email">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">department</label>
                            <div class="col-sm-10">
                                <select name="dId" class="form-control" id="add_dept_select">

                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="add_save">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">更新</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="update_empName" class="col-sm-2 control-label">empName</label>
                            <div class="col-sm-10">
                                <p id="update_empName" class="form-control-static"></p>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">gender</label>
                            <div class="col-sm-10">
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="update_gender_F" value="F" checked="checked"> 女
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="update_gender_M" value="M"> 男
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="update_email" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" name="email" class="form-control" id="update_email" placeholder="email">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">department</label>
                            <div class="col-sm-10">
                                <select name="dId" class="form-control" id="update_dept_select">

                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="update_save">更新</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
