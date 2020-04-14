/*!
 * JS工具类tenet-util
 * 注意: 以下方法很多需要jQuery插件支持
 * 调用方式: $.MethodName()
 * 例如: $.TU_show("id","color","msg"); 或 $("#txtId").TU_focus();
 * author: Qiuyongda
 * date: 2014/07/31 v1.0
 */
function $$(id){ return document.getElementById(id); }
(function($){

// $.MethodName()
$.extend({
// 获取存放在Cookie的tenantId
TU_getVTenantId: function(){
	  try{
		var tenantId = $.TU_getCookie("viewTenantId");
		if(tenantId==null){
			tenantId = 0;  
		}
		return tenantId;
	  }catch(e){
		return 0;
	  }
	},

// 设置存放在Cookie的tenantId
TU_setVTenantId: function(tenantId){
	 try{
		$.TU_setCookie("viewTenantId",tenantId,30);
	  }catch(e){
	  }
	},
// 获取存放在Cookie的Tenantname
TU_getVTenantname: function(){
	  try{
		var tenantname = $.TU_getCookie("viewTenantname");
		if(tenantname==null){
			tenantname = 0;  
		}
		return tenantname;
	  }catch(e){
		return 0;
	  }
	},

// 设置存放在Cookie的Tenantname
TU_setVTenantname: function(tenantname){
	 try{
		$.TU_setCookie("viewTenantname",tenantname,30);
	  }catch(e){
	  }
	},
// 获取存放在Cookie的PunitId
TU_getVPunitId: function(){
  try{
	var punitId = $.TU_getCookie("viewPunitId");
	if(punitId==null){
		punitId = 0;  
	}
	return punitId;
  }catch(e){
	return 0;
  }
},

// 设置存放在Cookie的PunitId
TU_setVPunitId: function(punitId){
 try{
	$.TU_setCookie("viewPunitId",punitId,30);
  }catch(e){
  }
},

// 获取VPNIP
TU_getVpnIp: function(){
  try{
	var vpnIp = $.TU_getCookie("viewVpnIp");
	if(vpnIp==null){
		vpnIp = "";  
	}
	
	return vpnIp;
  }catch(e){
	return "";
  }
},

//设置存放在Cookie的vpnIp
TU_setVpnIp: function(vpnIp){
 try{
	$.TU_setCookie("viewVpnIp", vpnIp, 30);
  }catch(e){
  }
},
TU_getVNoPrompt:function(){
  try{
	var noPrompt = $.TU_getCookie("noPrompt");
	if(noPrompt==null){
		noPrompt = 0;  
	}
	return noPrompt;
  }catch(e){
	return 0;
  }
},
TU_setVNoPrompt:function(){
 try{
	$.TU_setCookie("noPrompt", 1, 30);
  }catch(e){
  }
},

// 获取存放在Cookie的PunitName
TU_getVPunitName: function(){
  try{
	var punitId = $.TU_getCookie("viewPunitName");
	if(punitId==null){
		punitId = 0;  
	}
	return punitId;
  }catch(e){
	return 0;
  }
},
// 设置存放在Cookie的PunitName
TU_setVPunitName: function(punitName){
 try{
	$.TU_setCookie("viewPunitName",punitName,30);
  }catch(e){
  }
},

// 指定ID显示信息
TU_show: function(id,color,msg){
  try{
    if(color.length==0){ document.getElementById(id).innerHTML=msg;
    }else{ document.getElementById(id).innerHTML="<font color='"+color+"'>"+msg+"</font>"; }
  }catch(e){}
  return this;
},

// 清除左右空格
TU_trim: function(str){
  return $.trim(str);
},

// 若传递的是null就转空字符,非null,原样输出
TU_TranNull: function(str){
  if(str==null){
  	return "";
  }
  return str;
},

// 判断是否修改成功了,成功返回true,反之false, 注意:此方法已经关闭异步
TU_isUpdate: function(url,data){
    return this.TU_isExist(url,data);
},

// 判断是否存在,存在返回true,反之false, 注意:此方法已经关闭异步
TU_isExist: function(url,data){
	var exist = false;
	$.ajax({
		headers: {
			"X_TENET_AJAX": true
		},
		async: false, 
		url: url,
		data: $.TU_filter(data),
		cache: false,
		success: function(data){
			exist = data.pass;
		}
	});
	return exist;
},

// 获取href参数值
TU_getQueryParam: function(href,name){
  try{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = href.match(reg);
	if (r != null) {
		 return unescape(r[2]);    
	}
	return "";
  }catch(e){}
},

// 复选框全选中
TU_checkedCheckbox: function(ischeckedAllid,checkboxid){
  try{
    if($("#"+ischeckedAllid).attr("checked")){
      $("input[name='"+checkboxid+"']").attr("checked","checked");
    }else{
      $("input[name='"+checkboxid+"']").removeAttr("checked");
    }
  }catch(e){}
  return this;
},

// 获取复选框选中的值,多个以逗号隔开
TU_getCKCheckedVals: function(checkboxid){
  try{
    var checkedVals="";
    $("input[name='"+checkboxid+"']").each(function(){
        if ($(this).attr("checked")) {
          checkedVals += $(this).attr('value')+",";
        }
    });
    if(checkedVals.length>0){
        checkedVals = checkedVals.substr(0,checkedVals.length-1);
    }
    return checkedVals;
  }catch(e){}
},

// 获取复选框选中的值-第一个
TU_getCKCheckedValOne: function(checkboxid){
  try{
    var checkedVal="";
    $("input[name='"+checkboxid+"']").each(function(){
        if ($(this).attr("checked")) {
          checkedVal = $(this).attr('value');
          return false;//跳出循环
        }
    });
    return checkedVal;
  }catch(e){}
},

// 获取多行下拉列表的所有值
TU_getSelectListVals: function(selectid){
  try{
    var checkedVals="";
    $("#"+selectid+" option").each(function(){
         checkedVals += $(this).attr('value')+",";
    });
    if(checkedVals.length>0){
        checkedVals = checkedVals.substr(0,checkedVals.length-1);
    }
    return checkedVals;
  }catch(e){}
},

// 设置Cookie(对象名称,值,保存天数)
TU_setCookie: function(objName,cvalue,cdays){
  try{
    //添加cookie
    var str = objName+"="+cvalue;
    //为0时不设定过期时间,浏览器关闭时cookie自动消失
    if (cdays>0) {
        var date=new Date();
        var ms;
        try{
            ms=cdays*24*3600*1000;
        }catch(err){
            ms=0*24*3600*1000;
        }
        date.setTime(date.getTime()+ms);
        //str+=";expires="+date.toGMTString()+";path=/;domain=deliyun.cn";//设置该域名后,所有二级域名都可获取
        str+=";expires="+date.toGMTString()+";path=/";
    }
    document.cookie=str;
  }catch(e){}
  return this;
},

// 删除Cookie(对象名称)
TU_removeCookie: function(objName){
  try{
    var str = objName+"=";
    var date=new Date();
    date.setTime(date.getTime()-1);
    //str+=";expires="+date.toGMTString()+";path=/;domain=deliyun.cn";//设置该域名后,所有二级域名都可获取
    str+=";expires="+date.toGMTString()+";path=/";
    document.cookie=str;
  }catch(e){}
  return this;
},

// 获取Cookie(对象名称)
TU_getCookie: function(objName){
  try{
    var arr,reg=new RegExp("(^| )"+objName+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  }catch(e){}
},

// 显示加载提示框(图片绝对路径 MAT_HOST:取于/(m/w)/config.js文件)
TU_showLoading: function(position,content){
  try{
    var pClass='';//展现位置样式(默认顶部中间)
    if(position=='TL'){//顶部左侧
        pClass=' topleft';
    }else if(position=='TR'){//顶部右侧
        pClass=' topright';
    }else if(position=='M'){//全局居中
        pClass=' middle';
    }
    var infoContent='加载中..';//显示内容
    if(content!=null && content.length>0){
        infoContent=content;//自定义内容
    }
    var imgUrl = MAT_HOST+'/public/images/loading.gif';//加载图URL
    var topHTML = '<div class="tenet-loading'+pClass+'"><span data-dismiss="alert"><img src="'+imgUrl+'"/>'+infoContent+'</span></div>';
    $(".tenet-loading").remove();
    $("body").append(topHTML);
    if(position!='M'){
        $(".tenet-loading").animate({height:"32px"},200);   
    }
  }catch(e){}
  return this;
},

// 隐藏加载提示框 obj表示要隐藏的选择器(默认:$(".tenet-loading"))
TU_hideLoading: function(obj){
  obj = obj?obj:$(".tenet-loading");
  try{
    if(obj.hasClass("middle")){
     obj.fadeOut();//隐藏无效果
    }else{
     obj.animate({height:"0px"},100);//默认隐藏效果(向上隐藏)
    }
  }catch(e){}
  return this;
},

// 提交表单时,锁定提交按钮
TU_lockSubBtn: function(){
  try{
	$("#btnSub").attr("disabled","disabled");
	$("#btnCancel").attr("disabled","disabled");
	$.TU_show("msgID","green","提交中,请稍候...");
  }catch(e){}
},

// 解锁提交按钮
TU_unlockSubBtn: function(){
  try{
	$("#btnSub").removeAttr("disabled");
	$("#btnCancel").removeAttr("disabled");
	$.TU_show("msgID","","");
  }catch(e){}
},

// 小数段保留两位数
TU_toFixed: function(keepTowNum){
	if(keepTowNum == null || keepTowNum == ""){
		return 0.00;
	}else{
		return keepTowNum.toFixed(2);
	}
},

// 定义提示框dialog插件-成功提示
TU_showDialogSuccessExe: function(title,content,isreload,callbackMethod){
  try{
    dialog({
      title: title,
      content: '<div><p style="float:left;"><i class="fa fa-check-circle" style="font-size:50px;color:green;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + content + '</p></div>',
      ok: function(){
          if(callbackMethod.length>0){
              if(callbackMethod.indexOf("(")!=-1){
                $.globalEval(callbackMethod);//回调
              }else{
                $.globalEval(callbackMethod+"()");//回调
              }
          }else if(isreload){
              parent.location.reload();
          }
      },
      cancel: false
    }).showModal();
  }catch(e){
      alert(content);
      if(callbackMethod.length>0){
          if(callbackMethod.indexOf("(")!=-1){
            $.globalEval(callbackMethod);//回调
          }else{
            $.globalEval(callbackMethod+"()");//回调
          }
      }else if(isreload){
          parent.location.reload();
      }
  }
  return this;
},
// 成功提示(参数:标题,内容)
TU_showDialogSuccess: function(title,content){
  this.TU_showDialogSuccessExe(title,content,false,"");
  return this;
},
// 成功提示-刷新页面(参数:标题,内容)
TU_showDialogSuccessReload: function(title,content){
   this.TU_showDialogSuccessExe(title,content,true,"");
   return this;
},
// 成功提示-回调方法(参数:标题,内容,回调方法名称)
TU_showDialogSuccessCallback: function(title,content,callbackMethod){
  this.TU_showDialogSuccessExe(title,content,false,callbackMethod);
  return this;
},

// 定义提示框dialog插件-警告
TU_showDialogWarningExe: function(title,content,isreload,callbackMethod){
  try{
    dialog({
      title: title,
      content: '<div><p style="float:left;"><i class="fa fa-exclamation-circle" style="font-size:50px;color:#f0ad4e;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + content + '</p></div>',
      ok: function(){
          if(callbackMethod.length>0){
              if(callbackMethod.indexOf("(")!=-1){
                $.globalEval(callbackMethod);//回调
              }else{
                $.globalEval(callbackMethod+"()");//回调
              }
          }else if(isreload){
              parent.location.reload();
          }
      },
      cancel: false
    }).showModal();
  }catch(e){
      alert(content);
      if(callbackMethod.length>0){
          if(callbackMethod.indexOf("(")!=-1){
            $.globalEval(callbackMethod);//回调
          }else{
            $.globalEval(callbackMethod+"()");//回调
          }
      }else if(isreload){
          parent.location.reload();
      }
  }
  return this;
},
// 警告(参数:标题,内容)
TU_showDialogWarning: function(title,content){
  this.TU_showDialogWarningExe(title,content,false,"");
  return this;
},
// 警告-刷新页面(参数:标题,内容)
TU_showDialogWarningReload: function(title,content){
  this.TU_showDialogWarningExe(title,content,true,"");
  return this;
},
// 警告-回调方法(参数:标题,内容,回调方法名称)
TU_showDialogWarningCallback: function(title,content,callbackMethod){
  this.TU_showDialogWarningExe(title,content,false,callbackMethod);
  return this;
},

// 定义提示框dialog插件-错误提示
TU_showDialogErrorExe: function(title,content,isreload,callbackMethod){
  try{
    dialog({
      title: title,
      content: '<div><p style="float:left;"><i class="fa fa-times-circle" style="font-size:50px;color:red;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + content + '</p></div>',
      ok: function(){
          if(callbackMethod.length>0){
              if(callbackMethod.indexOf("(")!=-1){
                $.globalEval(callbackMethod);//回调
              }else{
                $.globalEval(callbackMethod+"()");//回调
              }
          }else if(isreload){
              parent.location.reload();
          }
      },
      cancel: false
    }).showModal();
  }catch(e){
      alert(content);
      if(callbackMethod.length>0){
          if(callbackMethod.indexOf("(")!=-1){
            $.globalEval(callbackMethod);//回调
          }else{
            $.globalEval(callbackMethod+"()");//回调
          }
      }else if(isreload){
          parent.location.reload();
      }
  }
  return this;
},
// 错误提示(参数:标题,内容)
TU_showDialogError: function(title,content){
  this.TU_showDialogErrorExe(title,content,false,"");
  return this;
},
// 错误提示-刷新页面(参数:标题,内容)
TU_showDialogErrorReload: function(title,content){
  this.TU_showDialogErrorExe(title,content,true,"");
  return this;
},
// 错误提示-回调方法(参数:标题,内容,回调方法名称)
TU_showDialogErrorCallback: function(title,content,callbackMethod){
  this.TU_showDialogErrorExe(title,content,false,callbackMethod);
  return this;
},

// 定义提示框dialog插件-警告没有权限
TU_showDialogNoPermissionExe: function(isreload){
  try{
    dialog({
      title: '提示',
      content: '<div><p style="float:left;"><i class="fa fa-exclamation-circle" style="font-size:50px;color:red;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">对不起, 您没有权限执行此操作</p></div>',
      ok: function(){ if(isreload){ parent.location.reload(); } },
      cancel: false
    }).showModal();
  }catch(e){ alert(content); if(isreload){ parent.location.reload(); } }
  return this;
},
TU_showDialogNoPermission: function(){
  this.TU_showDialogNoPermissionExe(false);
  return this;
},
TU_showDialogNoPermissionReload: function(){
  this.TU_showDialogNoPermissionExe(true);
  return this;
},

// 确认提示(参数:标题,内容,点击确认后回调方法)
TU_showDialogConfirm: function(title,content,callbackMethod){
  try{
    dialog({
        title: title,
        content: '<div><p style="float:left;"><i class="fa fa-question-circle" style="font-size:50px;color:red;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + content + '</p></div>',
        button: [{
            value: '确认',
            autofocus: true,
            callback: function(){
                if(callbackMethod.length>0){
                    if(callbackMethod.indexOf("(")!=-1){
                        $.globalEval(callbackMethod);//回调
                    }else{
                        $.globalEval(callbackMethod+"()");//回调
                    }
                }
            }
        },{
            value: '取消',
        }]
    }).showModal();
  }catch(e){
    var infoContent=content.replace("<br/>","\n");
    if(confirm(infoContent)){
        if(callbackMethod.length>0){
            if(callbackMethod.indexOf("(")!=-1){
                $.globalEval(callbackMethod);//回调
            }else{
                $.globalEval(callbackMethod+"()");//回调
            }
        }
    }
  }
  return this;
},

// 关闭jDialog方法
TU_closejDialog: function(){
  try{
    parent.$.jDialog.removeBox();
  }catch(e){}
  return this;
},

// 复制文本/网址到粘贴板
TU_copyTextToPaste: function(text){
  try{
    if(window.clipboardData){
        window.clipboardData.setData("Text", text);
        alert("已复制到您的粘贴板上，按 Ctrl+V 或 鼠标右键粘贴。");
    }else if(window.netscape){
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext=text;
        str.data=copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
        alert("已复制到您的粘贴板上，按 Ctrl+V 或 鼠标右键粘贴。");
    }else{
        alert("您的浏览器设置为不允许复制！");
    }
  }catch(e){
    alert("您的浏览器设置为不允许复制！\n如果需要此操作，请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true',再重试复制操作!\n\n或直接复制以下文本：\n\n"+text);
  }
  return this;
},
 
// 判断是否为邮箱
TU_isEmail: function(val){
	var r = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	return r.test(val);
},

// 判断是否为手机号
TU_isMobile: function(val){
	var r = /^1[3|5|8|7|4]\d{9}$/;
	return r.test(val);
},

// 验证固定电话
TU_isTel: function(val){
    if(val.length==0){ return false; }
    var r1=/^0\d{2,3}-?\d{7,8}$/;
    var r2=/^0\d{2,3}-?\d{7,8}-?\d{3,4}$/;
    return r1.test(val) || r2.test(val);
},

// 验证号码(固定电话或手机号均有效)
TU_isPhone: function(val){
    if(val.length==0){ return false; }
    var r1=/^0\d{2,3}-?\d{7,8}$/;
    var r2=/^1[3|5|8|7|4|6|9]\d{9}$/;
    return r1.test(val) || r2.test(val);
},

// 判断是否为身份证
TU_isIDCard: function(val){
	if(val.length==0){ return false; }
	if(val.length>=8 && val.length<=12){ return true; } //香港澳门身份证号,只判断位数不做详细验证
	
	var idcardRE1=/^\d{15}$/;
	var idcardRE2=/^\d{17}(\d|x|X)$/;   
	if(!idcardRE1.test(val) && !idcardRE2.test(val)){ return false; } //字符位数15或18
	
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	
	val=val.replace(/x$/i,"a");
	if(aCity[parseInt(val.substr(0,2))]==null){ return false; } //非法地区
	
	//15位
	if (val.length==15){
		if (val=="111111111111111"){ return false; } //非法证号
		var idcardRE;
		if ((parseInt(val.substr(6,2))+1900) % 4 == 0 || ((parseInt(val.substr(6,2))+1900) % 100 == 0 && (parseInt(val.substr(6,2))+1900) % 4 == 0 )){
			idcardRE=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
		} else {
			idcardRE=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
		}
		if(!idcardRE.test(val)){ return false; } //非法证号
		return true;
	}
	//18位
	if (val.length==18){
		var sBirthday=val.substr(6,4)+"-"+Number(val.substr(10,2))+"-"+Number(val.substr(12,2));
		var d=new Date(sBirthday.replace(/-/g,"/"));
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){ return false; } //非法生日
		
		var iSum=0;
		for(var i=17; i>=0; i--) {
			iSum += (Math.pow(2,i) % 11) * parseInt(val.charAt(17-i),11);
		}
		if(iSum%11!=1){ return false; } //非法证号
		return true;
	}
	return true;
},

// 金额保留指定小数点位数
TU_getFloatDecimal: function(val){
	var num=0.00;
	try{
		num = parseFloat(val);
	}catch(e){
		num=0.00;	
	}
	return num.toFixed(2);
	//var re = /([0-9]+\.[0-9]{2})[0-9]*/;
	//var aNew = val.replace(re,"$1");
	//return aNew;
},

// 将金额用逗号隔开()
TU_fmoney: function(s,n){
    n = n > 0 && n <= 20 ? n : 2; 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
	t = ""; 
	for (i = 0; i < l.length; i++) { 
	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
	} 
	return t.split("").reverse().join("") + "." + r; 
},

// 获取当前时间年月日时分秒
TU_getDataGBK: function(){
    var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	
	if(hour<=9){
		hour="0"+hour;	
	}
	if(minute<=9){
		minute="0"+minute;	
	}
	if(second<=9){
		second="0"+second;	
	}
	return year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
},

// 获取传入日期在一年中第几周
TU_getYearWeek: function(date){
    var y = date.substring(0,4);
	var m = date.substring(5,7);
	var d = date.substring(8);
    var d1 = new Date(y, m-1, d);
	var d2 = new Date(y, 0, 1);
    var d = Math.round((d1 - d2) / 86400000); 
    return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
},


// 根据秒值返回:N天N小时N分钟N秒
TU_getSecToDHMS: function(_sec){
    var day = 0, hour = 0, minute = 0, second = 0;
	
	var sec = _sec;// 总秒数
	if (sec >= 86400) {
		day = parseInt(sec / 86400);
		sec = sec % 86400;
	}
	if (sec >= 3600) {
		hour = parseInt(sec / 3600);
		sec = sec % 3600;
	}
	if (sec >= 60) {
		minute = parseInt(sec / 60);
		sec = sec % 60;
	}
	if (sec > 0) {
		second = sec;
	}

	var str = "";
	if (day > 0) {
		str += day + "天";
	}
	if (hour > 0) {
		str +=  hour + "小时";
	}
	if (minute > 0) {
		str += minute + "分";
	}
	if (second >0) {
		str += second + "秒";
	}
	return str;
},

// by meigh@nenet.com --- start-----------------------------------------------

// 操作前,在此确认. 参数说明:标题,内容,回调函数
TU_artConfirm: function(title,content,callback){
    dialog({
        title: title,
        content: '<div><p style="float:left;"><i class="fa fa-question-circle" style="font-size:50px;color:red;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + content + '</p></div>',
        button: [{
            value: '确认',
            autofocus: true,
            callback: function(){
            	callback.call();
            }
        },{
            value: '取消',
        }]
    }).showModal();
},

// 转换成时间戳,如把2014-10-13 10:30转化成时间戳,不传入任何参数或者传递null,则返回当前时间戳
// 如果传递"",则返回 "" (这个很有用)
// 注意:只精确到秒
TU_tstamp: function(timeStr){
	if(timeStr==undefined||timeStr == null){
		return parseInt(new Date().getTime()/1000);
	}else{
		return timeStr==""?"":parseInt((new Date(timeStr.replace(/-/g,"/"))).getTime()/1000);
	}
},

//  传递obj对象,过虑空值(""),null和 undefined 
TU_ignoreEmptyAndNull : function(obj){
     var ns = "{" , val,json;
     for( var p in obj){
         val = obj[p];
         if( (String(val) != "") && (val != null) && (val != undefined) ) {
              if($.type(val)==="string"){
                  val = "\""+val+"\"";
              }
              ns += "\"" + p + "\": " + val +",";   
         }
     }
     ns += "}";
     ns = ns.replace(",}","}");
     // alert(ns);
     json = $.parseJSON(ns);
     // alert( JSON.stringify(json) ); 
     return json;
},

TU_lock : function(options){
	
    var defaults = {
    		
        lockSelector: $("#btnSub,#btnCancel"),
        
         msgSelector: $("#msgID"),
         
         after : function(){  // 锁住之后
               this.msgSelector.TU_show({msg:"数据正在装载...",color:"green"});
         }, 
        
         unlockAfter:function(){ // 解锁之后
            this.msgSelector.fadeOut();
         },
         
         unlock:function(){
           this.lockSelector.each(function(){
                $(this).removeAttr("disabled");
            });
           this.unlockAfter();
           return this;
         },
         
        relock:function(){
            this.lockSelector.each(function(){
                $(this).attr("disabled","disabled");
            });
          this.after();
          return this;
        }
    };

    return $.extend(defaults, options).relock();
},

// 过时了,以后要删除的
TU_unlock : function(lock){
    return lock.unlock();
},

//过时了,以后要删除的
TU_relock : function(lock){
      return lock.relock();
},

TU_hrefSearch : function(){ // 获取地址栏的search部分,不包括开头的^
    return window.location.search.replace(/^\?/,"");
},

TU_tmpl: function(tmpl, data) {
	return tmpl.replace(/\{([\w\.\[\]]*)\}/g,function(f,d){var e=d.replace(/\[|\]/g,".").replace(/\.+/g,".").replace(/\.$/,"").split("."),b=data[e.shift()];for(var c=0,a=e.length;c<a;c++){b=b[e[c]];}return(typeof b!=="undefined"&&b!==null)?b:"";});
},

TU_tmplCtr:function(){
	var defaults = {
		tmplCtr : $("#tmplCtr"), // 模板控制点
		load: function(ctr){
			if(ctr != undefined){
				this.tmplCtr = ctr;
			}
			$.TU_showLoading('M');
			//this.tmplCtr.css("visibility","hidden");
			return this;
		},
		get:function(selector){
			return this.tmplCtr.find(selector);
		},
		render:function(data){
			this.tmplCtr.html( $.TU_tmpl(this.tmplCtr.html(),data) ).css("visibility","visible");
			$.TU_hideLoading();
			return this;
		}
	};
	return defaults;
},

TU_selectOption : function(selector,val){
	$(selector+" option[value='"+val+"']").attr("selected",true);
},

// 过虑规则: 忽略空和null,去除首位空格,字符串编码,过虑一些特殊字符
TU_filter : function(data){
	
	for(var d in data) {
		if( (data[d] == "") || (data[d] == null) || (data[d] == undefined )  ) {
			delete data[d];
		} else {
			if( $.type(data[d]) === "string"){
				
				// 过虑 ;/?:&=+$,
				data[d] = data[d].replace(/\/|\?|\:|\&|\=|\+|\$|\,/g, "");
				
				// 先去除首位空格,将字符串进行转码
				data[d] = encodeURIComponent($.trim(data[d]));
				// encodeURIComponent 明确说明 不对英文字符和数字,以及- _ . ! ~ * ' ( ) 这些符号进行编码
				
				// 把 %40 换成 @, 因为有时候需要根据@进行搜索
				data[d] = data[d].replace(/\%40/g, "@");
				
			}
		}
	}
	
	return data;
},

// tenet 验证码
TU_jcaptcha:function(options){
	var defaults = {
		imgSelector:$("#tenet_jcaptcha_image"), // 验证码图片选择器
		inputSelector:$("#vcode"),// 输入验证码的框
		changeImg: function(isfocus){ // 重置/改变验证码
			 this.imgSelector.attr("src",PATH + "/jcaptcha/tenet_jcaptcha_image?timestamp=" + new Date().getTime());
			 if(isfocus){
				this.inputSelector.val("").focus();  
			}	 
		}
	};
	var opts = $.extend(defaults, options);
	opts.changeImg();
	opts.imgSelector.unbind("click").click(function(){
		opts.changeImg(true);
	});
	return opts;
},

// okAfter      - (默认:刷新父级窗口) 点击确定后要做的事情. 请特别注意,该方法的上下文对象为window.不管调用什么都需要带上this, okAfter的参数dobj为当前dialog对象
TU_artSuccess: function(options){
    var defaults = {
        title : "提示",
        content : "操作成功",
        okAfter: function(dobj){ 
             this.location.reload();
       }
    };
    var opts = $.extend(defaults, options);
    
    dialog({
      title: opts.title,
      content: '<div><p style="float:left;"><i class="fa fa-check-circle" style="font-size:50px;color:green;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + opts.content + '</p></div>',
      ok: function(){
    	  opts.okAfter.call(window,this);  // 测试阶段,暂且不用捕捉异常
      },
      cancel: false
    }).showModal();
    
    return $;
},

// 错误提示, msg:错误信息, callback回调函数(可以不传)
TU_atrErrorCallback:function(msg,callback){
	  dialog({
          title: '提示',
          content: '<div><p style="float:left;"><i class="fa fa-times-circle" style="font-size:50px;color:red;"></i></p><p style="float:left;line-height:30px;padding:10px 0 10px 10px;">' + msg + '</p></div>',
          ok: function(){
        	  if(callback!=undefined){
        		  callback.call();
        	  }
          },
          cancel: false
        }).showModal();
},
// 将一个json转换成字符串
// 注意: json的格式只能是 {"键1":基本类型的值,"键2":基本类型的值,"键3":基本类型的值} 值只能是基本类型.
TU_json2Str : function(json){
	var s = "{";
	$.each(json,function(i){
		s += "\"" + i + "\"" + ":" + json[i] + ",";
	});
	return s.substring(0,s.length-1) + "}";
}

//by meigh@nenet.com --- end --------------------------------------------

});
$.artSuccess=$.TU_artSuccess;
// $.MethodName() - end...



// $.fn.MethodName()
$.fn.extend({

// 指定ID显示信息
TU_show: function(options){  
	var defaults = {
		color: "red",                      // (可选项) 提示语颜色
		msg: "非法操作(比如:红色*号为必选项).", // (可选项) 提示信息
	};
	var opts = $.extend(defaults, options);
	this.html("<span style=\"color:"+opts.color+"\">"+opts.msg+"</span>").show();
	return this;
},

// 光标在输入框最后面
TU_focus: function(options){
   var thisObj = this;
   var defaults = {
	  focusAfter: $.noop  // (默认:什么都不干)聚焦成功后要做的事情.它的上下文对象是_tenetFocus中的this
   };
   var opts = $.extend(defaults, options);
   // 聚焦之前清除控件的首位空格
   thisObj.val($.trim(thisObj.val()));
   thisObj.focus();
   opts.focusAfter.call(thisObj);
   return thisObj;
},

// 限制只能输入数字和字母
TU_onlyNumAlpha: function () {
	var reg = /^(\d|[a-zA-Z])+$/;
	var thisObj = this;
	try{
		$(this).keypress(function (event) {
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (keyCode==8))
			return true;
		else
			return false;
		}).focus(function () {
			this.style.imeMode = 'disabled';
		}).bind("paste", function () {
			var clipboardDataObj = window.clipboardData;
			if(clipboardDataObj){
				var clipboard = clipboardDataObj.getData("Text");
				return (reg.test(clipboard)) ? true : false;
			}
		}).blur(function(){
			if(!reg.test( $.trim(thisObj.val()) )) {
				thisObj.prev("._tip").html("<span style=\"color:red\">只能输入字母和数字</span>").show(); // 提示后就消灭内容
				thisObj.val("");
			}
		});
	} catch(e){
	}
	return this;
}

});
// $.fn.MethodName() - end...

})(jQuery);