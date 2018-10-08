//父选框的全选和取消全选
var ischeck=false; //全选标记
$("#checkall").click(function(){
    if(ischeck){
        $(".check1").attr("checked",!ischeck);
        ischeck=false;
    }else{
        $(".check1").attr("checked",!ischeck);
        ischeck=true;
    }
});

//子选框全部选中,父选框选中;子选框不全选中,父选框不选中
var isallcheck=true;//所有的子选框选中的标记
function selectPa(){
$(".check1").each(function(i,o){
if(!$(o).prop("checked")){
isallcheck=false;
return;
}
});
if(isallcheck){
ischeck=true;
$("#checkall").prop("checked",isallcheck);
}else{
ischeck=false;
$("#checkall").prop("checked",isallcheck);
}
isallcheck=true;//恢复所有的子选框选中的默认标记
};
   