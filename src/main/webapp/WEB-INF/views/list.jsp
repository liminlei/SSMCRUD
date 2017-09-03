
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
</head>
<body>
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
                <button class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span>新增</button>
                <button class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>删除</button>
            </div>
        </div>
        <%--表格--%>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-hover">
                    <tr>
                        <th>#</th>
                        <th>empName</th>
                        <th>gender</th>
                        <th>email</th>
                        <th>deptName</th>
                        <th>操作</th>
                    </tr>
                    <c:forEach items="${pageInfo.list}" var="emp">
                        <tr>
                            <td>${emp.empId}</td>
                            <td>${emp.empName}</td>
                            <td>${emp.gender == "M" ? "男" : "女"}</td>
                            <td>${emp.email}</td>
                            <td>${emp.department.deptName}</td>
                            <td>
                                <button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span>编辑</button>
                                <button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>删除</button>
                            </td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
        </div>
        <%--分页--%>
        <div class="row">
            <div class="col-md-6">
                当前第${pageInfo.pageNum}页,共${pageInfo.pages}页,${pageInfo.total}条信息。
            </div>
            <div class="col-md-6">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li><a href="${APP_PATH }/emps?pn=1">首页</a></li>
                        <c:if test="${pageInfo.hasPreviousPage }">
                            <li><a href="${APP_PATH }/emps?pn=${pageInfo.pageNum-1}"
                                   aria-label="Previous"> <span aria-hidden="true">&laquo;</span>
                            </a></li>
                        </c:if>
                        <c:forEach items="${pageInfo.navigatepageNums}" var="page_Num">
                            <c:if test="${page_Num == pageInfo.pageNum}">
                                <li class="active"><a href="#">${page_Num }</a></li>
                            </c:if>
                            <c:if test="${page_Num != pageInfo.pageNum}">
                                <li><a href="${APP_PATH }/emps?pn=${page_Num }">${page_Num }</a></li>
                            </c:if>
                        </c:forEach>
                        <c:if test="${pageInfo.hasNextPage }">
                            <li><a href="${APP_PATH }/emps?pn=${pageInfo.pageNum+1 }"
                                   aria-label="Next"> <span aria-hidden="true">&raquo;</span>
                            </a></li>
                        </c:if>
                        <li><a href="${APP_PATH }/emps?pn=${pageInfo.pages}">末页</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</body>
</html>
