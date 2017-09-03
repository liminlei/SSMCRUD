/**
 * Created by liminlei on 2017-9-1.
 */
var totalRecord;
var currentPage;
$(function () {
    to_page(1);
});

function to_page(pn) {
    var app_path = $("#APP_PATH").val();
    $.ajax({
        url:app_path+"/emps",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            //解析并显示表格数据
            createTable(result);
            //解析并显示分页信息
            createPageInfo(result);
            //解析并显示分页条
            createPageNav(result);
        }
    });
}
//生成表格内容
function createTable(result){
    $("#tbody").empty();
    var emps = result.extend.pageInfo.list;
    $.each(emps,function (index,item) {
        //var checkBox = $("<td><input type='checkbox' class='check_item'/></td>");
        var checkbox = $("<td><input type='checkbox' class='check_item'/></td>")
        var empIdTd = $("<td></td>").append(item.empId);
        var empNameTd = $("<td></td>").append(item.empName);
        var genderTd = $("<td></td>").append(item.gender=='M'?"男":"女");
        var emailTd = $("<td></td>").append(item.email);
        var deptNameTd = $("<td></td>").append(item.department.deptName);

        var editBtn = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn")
            .append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        //为编辑按钮添加一个自定义的属性，来表示当前员工id
        editBtn.attr("edit-id",item.empId);
        var delBtn =  $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
            .append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        //为删除按钮添加一个自定义的属性来表示当前删除的员工id
        delBtn.attr("del-id",item.empId);
       var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
        $("<tr></tr>").append(checkbox)
                      .append(empIdTd)
                      .append(empNameTd)
                      .append(genderTd)
                      .append(emailTd)
                      .append(deptNameTd)
                      .append(btnTd)
                      .appendTo("#tbody");
    });
}

//生成分页信息
function createPageInfo(result){
    $("#pageInfo").empty()
                .append("当前第"+result.extend.pageInfo.pageNum+"页,共"+result.extend.pageInfo.pages+"页,"+result.extend.pageInfo.total+"条信息。");
    totalRecord = result.extend.pageInfo.total;
    currentPage = result.extend.pageInfo.pageNum;
}

//生成分页条
function createPageNav(result){

    //分页导航条
    var $ul = $("<ul></ul>").addClass("pagination");
    var $nav = $("<nav></nav>");
    //首页和前一页，需要判断是否第一页
    var firstPageLi = $("<li></li>").append($("<a></a>").append("首页"));
    var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.pageInfo.hasPreviousPage == false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else{
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.extend.pageInfo.pageNum-1);
        });
    }
    $ul.append(firstPageLi).append(prePageLi);
    //中间数字页，当前页高亮
    $.each(result.extend.pageInfo.navigatepageNums,function (index,item) {
        var numli = $("<li></li>").append($("<a></a>").append(item));
        if(result.extend.pageInfo.pageNum == item){
            numli.addClass("active");
        }
        numli.click(function () {
           to_page(item);
        });
        numli.appendTo($ul);
    })
    //下一页和末页
    var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi = $("<li></li>").append($("<a></a>").append("末页"));
    if(result.extend.pageInfo.hasNextPage == false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else{
        nextPageLi.click(function () {
            to_page(result.extend.pageInfo.pageNum+1);
        });
        lastPageLi.click(function(){
            to_page(result.extend.pageInfo.pages);
        });
    }

    $ul.append(nextPageLi).append(lastPageLi);

    //整合
    $nav.append($ul);
    $("#pageNav").empty().append($nav);
}
//新增模态框
$(function () {
    $("#add").click(function () {
        reset_form("#addModal form");
        //获取部门的下拉框
        getDepts("#add_dept_select");
        $("#addModal").modal({
            backdrop:false
        });
        $("#add_empName").change(function () {
            var empName = this.value;
            $.ajax({
                url :  $("#APP_PATH").val()+"/checkName",
                data : "empName="+empName,
                type : "POST",
                success : function (result) {
                    if(result.code==100){
                        show_validate_msg("#add_empName","success","用户名可用");
                        $("#add_save").attr("ajax-va","success");
                    }else{
                        show_validate_msg("#add_empName","error","用户名不可用");
                        $("#add_save").attr("ajax-va","error");
                    }
                }
            });
        });
        //保存按钮
        $("#add_save").click(function () {
            if($(this).attr("ajax-va")=="error"){
                return false;
            }
            if(!validate_add_form()){
                return false;
            }
            $.ajax({
               url :  $("#APP_PATH").val()+"/emp",
                type : "POST",
                data : $("#addModal form").serialize(),
                success : function (result) {
                    if(result.code == 100){
                        //员工保存成功；
                        //1、关闭模态框
                        $("#addModal").modal('hide');

                        //2、来到最后一页，显示刚才保存的数据
                        //发送ajax请求显示最后一页数据即可
                        to_page(totalRecord);
                    }else{
                        //显示失败信息
                        //console.log(result);
                        //有哪个字段的错误信息就显示哪个字段的；
                        if(undefined != result.extend.errorFields.email){
                            //显示邮箱错误信息
                            show_validate_msg("#add_email", "error", result.extend.errorFields.email);
                        }
                        if(undefined != result.extend.errorFields.empName){
                            //显示员工名字的错误信息
                            show_validate_msg("#add_empName", "error", result.extend.errorFields.empName);
                        }
                    }
                }
            });
        });

    });
});
//重置modal
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}
//获取部门的下拉框
function getDepts(ele) {
    var app_path = $("#APP_PATH").val();
    $.ajax({
       url:app_path+"/depts",
        type:"get",
        success:function (result) {
            $(ele).empty();
            $.each(result.extend.depts,function (index,item) {
                var $option = $("<option></option>").append(item.deptName).val(item.deptId);
                $(ele).append($option);
            })
        }
    });
}
//校验
function validate_add_form(){
    var empName = $("#add_empName").val();
    var regName = /(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})/;
    if(!regName.test(empName)){
        show_validate_msg("#add_empName", "error", "用户名可以是2-5位中文或者6-16位英文和数字的组合");
        return false;
    }else {
        show_validate_msg("#add_empName", "success", "");
    }

    var email = $("#add_email").val();
    var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if(!regEmail.test(email)){
        //alert("邮箱格式不正确");
        //应该清空这个元素之前的样式
        show_validate_msg("#add_email", "error", "邮箱格式不正确");
        return false;
    }else{
        show_validate_msg("#add_email", "success", "");
    }
    return true;
}
//显示校验信息
function show_validate_msg(ele,status,msg) {
    $(ele).parent().removeClass("has-success has-error");
    $(ele).next("span").text("");
    if(status == "success"){
        $(ele).parent().addClass("has-success");
        $(ele).next("span").text(msg);
    }else{
        $(ele).parent().addClass("has-error");
        $(ele).next("span").text(msg);
    }
}

$(function () {
    $(document).on("click",".edit_btn",function () {
        $("#update_save").attr("edit-id",$(this).attr("edit-id"));
        $("#updateModal").modal({
            backdrop : false
        });
        getDepts("#update_dept_select");
        getEmp($(this).attr("edit-id"));
    });

    $(document).on("click",".delete_btn",function () {
        var empName = $(this).parents("tr").find("td:eq(2)").text();
        var empId = $(this).attr("del-id");
        if(confirm("确认删除【"+empName+"】吗?")){
            $.ajax({
                url:$("#APP_PATH").val()+"/emp/"+empId,
                type:"DELETE",
                success:function(result){
                    alert(result.msg);
                    to_page(currentPage);
                }
            })
        }
    });
    //编辑保存
    $("#update_save").click(function () {
        $.ajax({
            url: $("#APP_PATH").val()+"/emp/"+$(this).attr("edit-id"),
            type: "POST",
            data:$("#updateModal form").serialize()+"&_method=PUT",
            success:function (result) {
                alert(result.msg);
                $("#updateModal").modal('hide');
                to_page(currentPage);
            }
        });
    });
});
function getEmp(id) {
    $.ajax({
        url:$("#APP_PATH").val()+"/emp/"+id,
        type:"GET",
        success:function (result) {
            $("#update_empName").text(result.extend.emp.empName);
            $("#update_email").val(result.extend.emp.email);
            $("#update_dept_select").val(result.extend.emp.dId);
            $("#updateModal input[name=gender]").val([result.extend.emp.gender]);
        }
    })
}

$(function () {
    $("#checkAll").click(function () {
        $(".check_item").prop("checked",$(this).prop("checked"));
    });
});
$(document).on("click",".check_item",function(){
        if($(".check_item:checked").length==$(".check_item").length){
            $("#checkAll").prop("checked",true);
        }else{
            $("#checkAll").prop("checked",false);
        }
    }
);
$(function () {
    $("#deleteAll").click(function(){
       var empNames = "";
       var empIds = "";
       $.each($(".check_item:checked"),function () {
           empNames += $(this).parents("tr").find("td:eq(2)").text()+",";
           empIds += $(this).parents("tr").find("td:eq(1)").text()+"-";
       });
       empNames = empNames.substring(0,empNames.length-1);
       empIds = empIds.substring(0,empIds.length-1);
       if(confirm("确定删除以下这些人吗？\n"+empNames)){
           $.ajax({
               url:$("#APP_PATH").val()+"/emp/"+empIds,
               type:"DELETE",
               success:function(result){
                   alert(result.msg);
                   //回到当前页面
                   to_page(currentPage);
               }
           });
       }
    });
})