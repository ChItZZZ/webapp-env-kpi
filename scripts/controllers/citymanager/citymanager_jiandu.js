'use strict';
/**
 * @ngdoc function
 * @name iocUiApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the iocUiApp
 */
angular.module('app').controller('citymanager_jianducontroller',function($scope,kpiDetailService,dateService){
	kpiDetailService.query("CityManagerJianduData","2015-01-01","2015-01-31",function(data) {
				/*if(dataall.error=="No_Rights_Error"){
					$location.path("/login");
				}*/
				Date.prototype.format = function(format) {
					if (!format) {
						format = "yyyy-MM-dd hh:mm:ss";
					}
					var o = {
							"M+": this.getMonth() + 1, 					 // month
							"d+": this.getDate(), 						 // day
							"h+": this.getHours(),                       // hour
							"m+": this.getMinutes(), 					 // minute
							"s+": this.getSeconds(), 					 // second
							"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
							"S": this.getMilliseconds()					 // millisecond
					};
					if (/(y+)/.test(format)) {
						format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					}
					for (var k in o) {
						if (new RegExp("(" + k + ")").test(format)) {
							format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
						}
					}
					return format;
				}	
	
				$scope.formatDateTime = function(str) {
					return (new Date(parseInt(str))).format("yyyy-MM-dd");
				}
				function formatDateTime(str) {
					return (new Date(parseInt(str))).format("yyyy-MM-dd");
				}
	
	var dataall={data:[]};
	dataall.data.push(data.data[data.data.length-1]);
	$scope.dw = "aaa";
	
	kpiDetailService.getLastestObject('CityManagerJianduData', ['applyTime'], function(datat) {
	var dd = new Date(datat.data.year+"-"+datat.data.month+"-"+datat.data.day);
	//dd.setDate(dd.getDate()-1);
	var yy = dd.getFullYear();
    var mm = dd.getMonth()+1;//获取当前月份的日期
    var ddd = dd.getDate();
	
	function GetDateStr(AddDayCount) {
		var dd = new Date();
	    dd.setFullYear(parseFloat(yy), parseFloat(mm)-1, parseFloat(ddd));
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    return dd.format("yyyy-MM-dd");
	}
	
	function GetDateStrchu(AddDayCount) {
		var dd = new Date();
	    dd.setFullYear(parseFloat(yy), parseFloat(mm)-1, parseFloat(ddd));
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = 1;
	    dd.setFullYear(y,m-1,d);
	    return dd.format("yyyy-MM-dd");
	}
	
	function GetDateStrnian(AddDayCount) {
		var dd = new Date();
	    dd.setFullYear(parseFloat(yy), parseFloat(mm)-1, parseFloat(ddd));
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    return y+"年"+m+"月"+d+"日";
	}
	
	var wanzhengtime = GetDateStrnian(0);

	$scope.riqi = wanzhengtime;
	var nowtime = GetDateStr(0);
	
	var totime = GetDateStr(0);
	var fromtime = GetDateStrchu(0);
	
	var ttime = GetDateStr(0);
	var ftime = GetDateStrchu(0);
	
	kpiDetailService.query("CityManagerJianduData",fromtime,totime,function(datayiyue) {
		
		var data = datayiyue.data;
		var onetimedata = [];
		
		var time = formatDateTime(data[0].applyTime);
		var dataone = {
				time:null,
				data:[]
		}
		for(var i=0;i<data.length;i++){
			if(formatDateTime(data[i].applyTime) == time){
				dataone.time = formatDateTime(data[i].applyTime);
				dataone.data.push(data[i]);
			}else{
				onetimedata.push(dataone);
				var dataone = {
					time:null,
					data:[]
				}
				time = formatDateTime(data[i].applyTime);
				dataone.data.push(data[i]);
			}
			if(i == (data.length-1)){
				onetimedata.push(dataone);
			}
		}
		var data00 = onetimedata;
	kpiDetailService.query("CityManagerJianduBenyueData",ftime,ttime,function(databenyue) {						
	
		var data = databenyue.data;
		var onetimedata = [];
		
		var time = formatDateTime(data[0].applyTime);
		var dataone = {
				time:null,
				data:[]
		}
		for(var i=0;i<data.length;i++){
			if(formatDateTime(data[i].applyTime) == time){
				dataone.time = formatDateTime(data[i].applyTime);
				dataone.data.push(data[i]);
			}else{
				onetimedata.push(dataone);
				var dataone = {
					time:null,
					data:[]
				}
				time = formatDateTime(data[i].applyTime);
				dataone.data.push(data[i]);
			}
			if(i == (data.length-1)){
				onetimedata.push(dataone);
			}
		}
		var data000 = onetimedata;
	
		
	var data01 =  data00;

	var category_jianduzhibiao = ["立案数","总结案数","应处置数","处置数","处置率","按时处置数","按时处置率","超期未处置数","延期数","延期率","返工数","返工率"];
	
	var data_benyue = [];
	var data001 = data000;
	

	
	var dd_benyue = data001;
	for(var i = 0;i<data001.length;i++){
		if(data001[i].time == GetDateStr(0)){
			data_benyue = data001[i].data;
		}
	}
	
	var data_time = [{
		time:null,
		data:null
	}];
	var data = [];
	var dd = data01;
	for(var i=0;i<data01.length;i++){
		if(data01[i].time == nowtime){
			data = data01[i].data;
		}
	}
	

	var sum = 0;
	var sum00 = 0;
	var sum01 = 0;
	for(var i=0;i<data.length;i++){
		sum=sum+parseFloat(data[i].las);
		sum00=sum00+parseFloat(data[i].yczs);
		sum01=sum01+parseFloat(data[i].czs);
	}
	
	$scope.lianshu = sum;
	$scope.yingchuzhishu = sum00;
	$scope.chuzhishu = sum01;
	
	//全市分局展示
	
	//局名称
	var ju_name = [];
	for(var i = 0;i<data.length;i++){
		ju_name.push(data[i].dept);
	}
	
	//立案数
	var lianshu = [];
	for(var i = 0;i<data.length;i++){
		lianshu.push(parseFloat(data[i].las));
	}
	
	//应处置数
	var yingchuzhishu = [];
	for(var i = 0;i<data.length;i++){
		yingchuzhishu.push(parseFloat(data[i].yczs));
	}
	
	//处置率
	var chuzhilv = [];
	for(var i = 0;i<data.length;i++){
		chuzhilv.push(parseFloat(data[i].czl));
	}
	
	//按时处置数
	var anshichuzhishu = [];
	for(var i = 0;i<data.length;i++){
		anshichuzhishu.push(parseFloat(data[i].asczs));
	}
	
	//延期率
	var yanqilv = [];
	for(var i = 0;i<data.length;i++){
		yanqilv.push(parseFloat(data[i].yql));
	}
	
	//返工数
	var fangongshu = [];
	for(var i = 0;i<data.length;i++){
		fangongshu.push(parseFloat(data[i].fgs));
	}
	
	//总结案数
	var zongjieanshu = [];
	for(var i = 0;i<data.length;i++){
		zongjieanshu.push(parseFloat(data[i].zjas));
	}
	
	//按时处置率
	var anshichuzhilv = [];
	for(var i = 0;i<data.length;i++){
		anshichuzhilv.push(parseFloat(data[i].asczl));
	}
	
	//处置数
	var chuzhishu = [];
	for(var i = 0;i<data.length;i++){
		chuzhishu.push(parseFloat(data[i].czs));
	}
	
	//延期数
	var yanqishu = [];
	for(var i = 0;i<data.length;i++){
		yanqishu.push(parseFloat(data[i].fgs));
	}
	
	//超期未处置数
	var chaoqiweichuzhishu = [];
	for(var i = 0;i<data.length;i++){
		chaoqiweichuzhishu.push(parseFloat(data[i].cqwczs));
	}
	
	//返工率
	var fangonglv = [];
	for(var i = 0;i<data.length;i++){
		fangonglv.push(parseFloat(data[i].fgl));
	}
	
	//雷达图-单位
	$scope.danweis=[];
	for(var i=0;i<ju_name.length;i++){
		var danwei = {
				danweiname:null
			}
		danwei.danweiname = ju_name[i];
		$scope.danweis.push(danwei);
	}
	
	//处理雷达图数据集
	
	var chushishuju = [];
	chushishuju.push(parseFloat(data[0].las));
	chushishuju.push(parseFloat(data[0].zjas));
	chushishuju.push(parseFloat(data[0].yczs));
	chushishuju.push(parseFloat(data[0].czs));
	chushishuju.push(parseFloat(data[0].asczs));
	chushishuju.push(parseFloat(data[0].cqwczs));
	chushishuju.push(parseFloat(data[0].fgs));
	chushishuju.push(parseFloat(data[0].fgs));
	
	var chushishuju_rate = [];
	chushishuju_rate.push(parseFloat(data[0].czl));
	chushishuju_rate.push(parseFloat(data[0].fgl));
	chushishuju_rate.push(parseFloat(data[0].asczl));
	chushishuju_rate.push(parseFloat(data[0].yql));
	
	for(var i = 0;i<data.length;i++){
		
	}
	
	
    $scope.nowdate = GetDateStr(0);
	
    //可选单位的雷达图
	$scope.xuanzedanwei = ju_name[0];
	$scope.xuanzedanwei_shijian = $scope.xuanzedanwei;
	$scope.xuanzedanwei_shijian_sd = {
			danweiname:null
	}
	$scope.xuanzedanwei_shijian_sd.danwenname = $scope.xuanzedanwei_shijian;
	
	$scope.danweiClick = function(danweiname){
		var chushishuju = [];
		var chushishuju_rate = [];
		$scope.xuanzedanwei = danweiname;
		for(var i=0;i<data.length;i++){
			if(data[i].dept == danweiname){

				chushishuju.push(parseFloat(data[i].las));
				chushishuju.push(parseFloat(data[i].zjas));
				chushishuju.push(parseFloat(data[i].yczs));
				chushishuju.push(parseFloat(data[i].czs));
				chushishuju.push(parseFloat(data[i].asczs));
				chushishuju.push(parseFloat(data[i].cqwczs));
				chushishuju.push(parseFloat(data[i].fgs));
				chushishuju.push(parseFloat(data[i].fgs));
				
				chushishuju_rate.push(parseFloat(data[i].czl));
				chushishuju_rate.push(parseFloat(data[i].fgl));
				chushishuju_rate.push(parseFloat(data[i].asczl));
				chushishuju_rate.push(parseFloat(data[i].yql));
			}
		}
		
		for(var i=0;i<data_benyue.length;i++){
			if(data_benyue[i].dept == danweiname){
				var chushishuju_benyue = []; 
				chushishuju_benyue.push(parseFloat(data_benyue[i].las));
				chushishuju_benyue.push(parseFloat(data_benyue[i].zjas));
				chushishuju_benyue.push(parseFloat(data_benyue[i].yczs));
				chushishuju_benyue.push(parseFloat(data_benyue[i].czs));
				chushishuju_benyue.push(parseFloat(data_benyue[i].asczs));
				chushishuju_benyue.push(parseFloat(data_benyue[i].cqwczs));
				chushishuju_benyue.push(parseFloat(data_benyue[i].fgs));
				chushishuju_benyue.push(parseFloat(data_benyue[i].fgs));
				
				var chushishuju_benyue_rate = [];
				chushishuju_benyue_rate.push(parseFloat(data_benyue[i].czl));
				chushishuju_benyue_rate.push(parseFloat(data_benyue[i].fgl));
				chushishuju_benyue_rate.push(parseFloat(data_benyue[i].asczl));
				chushishuju_benyue_rate.push(parseFloat(data_benyue[i].yql));
			}
		}
		
		//雷达图03
		$scope.citymanager_jiandu_benyue_moudanwei_option = {
					            
				options:{
					
					chart: {
				        polar: true,
				        type: 'line',
				    },
				    
				    title: {
				        text: danweiname+'数字城管案件月累计处置情况',
				    },
				    
				    pane: {
				    	size: '80%'
				    },
				    
				    xAxis: {
				        categories: ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"],
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				        
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 0,
				        min: 0
				    },
				    
				    tooltip: {
				    	shared: true,
				        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}起</b><br/>'
				    },
				    
				    legend: {
				        align: 'right',
				        verticalAlign: 'top',
				        y: 70,
				        layout: 'vertical',
				        enabled: false
				    },
					credits:{
						enabled:false
					}
				},
				   series: [{
				        name: danweiname,
				        data: chushishuju_benyue,
				        pointPlacement: 'on'
				    }],
				};
		
		//雷达图04
		$scope.citymanager_jiandu_benyue_gedanwei_option = {
					            
				options:{
					
					chart: {
				        polar: true,
				        type: 'line'
				    },
				    
				    title: {
				        text: danweiname+'数字城管案件月累计处置效率情况',
				    },
				    
				    pane: {
				    	size: '80%'
				    },
				    
				    xAxis: {
				        categories: ["处置率","返工率","按时处置率","延期率"],
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				        
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 0,
				        min: 0
				    },
				    
				    tooltip: {
				    	shared: true,
				        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
				    },
				    
				    legend: {
				        align: 'right',
				        verticalAlign: 'top',
				        y: 70,
				        layout: 'vertical',
				        enabled: false
				    },
					credits:{
						enabled:false
					}
				},
				   series: [{
				        name: danweiname,
				        data: chushishuju_benyue_rate,
				        pointPlacement: 'on'
				    }],
				};
		
		//雷达图01
		$scope.citymanager_jiandu_moudanwei_option= {	            
				options:{
					
					chart: {
				        polar: true,
				        type: 'line',
				    },
				    
				    title: {
				        text: danweiname+'数字城管案件处置情况',
				    },
				    
				    pane: {
				    	size: '80%'
				    },
				    
				    xAxis: {
				        categories: ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"],
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				        
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 0,
				        min: 0
				    },
				    
				    tooltip: {
				    	shared: true,
				        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}起</b><br/>'
				    },
				    
				    legend: {
				        align: 'right',
				        verticalAlign: 'top',
				        y: 70,
				        layout: 'vertical',
				        enabled: false
				    },
					credits:{
						enabled:false
					}
				},
				   series: [{
				        name: danweiname,
				        data: chushishuju,
				        pointPlacement: 'on'
				    }],
				};
		
		//雷达图02
		$scope.citymanager_jiandu_gedanwei_option  = {
					            
				options:{
					
					chart: {
				        polar: true,
				        type: 'line'
				    },
				    
				    title: {
				        text: danweiname+'数字城管案件处置效率情况',
				    },
				    
				    pane: {
				    	size: '80%'
				    },
				    
				    xAxis: {
				        categories: ["处置率","返工率","按时处置率","延期率"],
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				        
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 0,
				        min: 0
				    },
				    
				    tooltip: {
				    	shared: true,
				        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
				    },
				    
				    legend: {
				        align: 'right',
				        verticalAlign: 'top',
				        y: 70,
				        layout: 'vertical',
				        enabled: false
				    },
					credits:{
						enabled:false
					}
				},
				   series: [{
				        name: danweiname,
				        data: chushishuju_rate,
				        pointPlacement: 'on'
				    }],
				};
	};
	//单位点击-历史
	$scope.danwei_shijianClick = function(danweiname){
		$scope.xuanzedanwei_shijian = danweiname;
		var categories_data_shijian = [];
		var data_shijian_benyue = [];
		for(var i=0;i<dd_benyue.length;i++){
			var day = new Date(dd_benyue[i].time); 
			categories_data_shijian.push(day.getDate());
			var kk = 0;
			for(var j=0;j<dd_benyue[i].data.length;j++){
				if(dd_benyue[i].data[j].dept == danweiname){
					kk=1;
					switch($scope.jianduzhibiao_shijian)
					{
							case "立案数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].las));
							  break;
							case "应处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].yczs));
							  break;
							case "处置率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].czl));
							  break;
							case "按时处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].asczs));
								break;
							case "延期率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].yql));
								break;
							case "返工数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgs));
								break;
							case "总结案数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].zjas));
							    break;
							case "按时处置率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].asczl));
							    break;
							case "处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].czs));
							    break;
							case "延期数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgs));
							    break;
							case "超期未处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].cqwczs));
								break;
						    case "返工率":
						    	data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgl));
								break;
					}
				}
			}
			if(kk == 0){
				data_shijian_benyue.push(parseFloat(0));
			}
		}
		
		alldata_benyue[0].data = data_shijian_benyue;
		//折线图
		
		var categories_data_shijian = [];
		var data_shijian = [];
		for(var i=0;i<dd.length;i++){
			var day = new Date(dd[i].time); 
			categories_data_shijian.push(day.getDate());
			var kk = 0;
			for(var j=0;j<dd[i].data.length;j++){
				if(dd[i].data[j].dept == danweiname){
					kk=1;
					switch($scope.jianduzhibiao_shijian)
					{
							case "立案数":
								data_shijian.push(parseFloat(dd[i].data[j].las));
							  break;
							case "应处置数":
								data_shijian.push(parseFloat(dd[i].data[j].yczs));
							  break;
							case "处置率":
								data_shijian.push(parseFloat(dd[i].data[j].czl));
							  break;
							case "按时处置数":
								data_shijian.push(parseFloat(dd[i].data[j].asczs));
								break;
							case "延期率":
								data_shijian.push(parseFloat(dd[i].data[j].yql));
								break;
							case "返工数":
								data_shijian.push(parseFloat(dd[i].data[j].fgs));
								break;
							case "总结案数":
								data_shijian.push(parseFloat(dd[i].data[j].zjas));
							    break;
							case "按时处置率":
								data_shijian.push(parseFloat(dd[i].data[j].asczl));
							    break;
							case "处置数":
								data_shijian.push(parseFloat(dd[i].data[j].czs));
							    break;
							case "延期数":
								data_shijian.push(parseFloat(dd[i].data[j].fgs));
							    break;
							case "超期未处置数":
								data_shijian.push(parseFloat(dd[i].data[j].cqwczs));
								break;
						    case "返工率":
						    	data_shijian.push(parseFloat(dd[i].data[j].fgl));
								break;
					}
				}
			}
			if(kk == 0){
				data_shijian.push(parseFloat(0));
			}
		}
		
		alldata[0].data = data_shijian;
		
		$scope.citymanager_jiandu_shijian_option = {
				options:{
					legend: {                                                          
			            enabled: false                                                  
			        },
					chart:{
						margin: [ 60, 50, 100, 80]
					},
					title:{
						text:"当月"+danweiname+'数字城管案件'+$scope.jianduzhibiao_shijian
					},
					yAxis:[{
						title : {
						text : $scope.jianduzhibiao_shijian
					},
					minTickInterval: 1}],
					xAxis:{
						
						title : {text : '日期'},
						categories : categories_data_shijian,
						labels: {
			               
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                }
			            }
					},
					credits:{
						enabled:false
					}
				},
				series:alldata,
				};
		
		$scope.citymanager_jiandu_shijian_benyue_option = {
				options:{
					legend: {                                                          
			            enabled: false                                                  
			        },
					chart:{
						margin: [ 60, 50, 100, 80]
					},
					title:{
						text:"当月"+danweiname+'数字城管案件月累计'+$scope.jianduzhibiao_shijian
					},
					yAxis:[{
						title : {
						text : $scope.jianduzhibiao_shijian
					},
					minTickInterval: 1}],
					xAxis:{
						title : {text : '日期'},
						categories : categories_data_shijian_benyue,
						labels: {
			                
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                }
			            }
					},
					
					credits:{
						enabled:false
					}
				},
				series:alldata_benyue,
				};
	};
	
	//本日各单位展示
	var jiandu_lianshu_data = [{
		"name" : "立案数",
		"data" : lianshu,
		"type" : 'column',
		"tooltip" : {valueSuffix:'起'}
	}];
	
	var category_danwei = ju_name;
	var category_jianduzhibiao = ["立案数","总结案数","应处置数","处置数","处置率","按时处置数","按时处置率","超期未处置数","延期数","延期率","返工数","返工率"];
	
	//各单位展示
	$scope.citymanager_jiandu_lianshu_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					
					type : 'bar',
				},
				title:{
					text:wanzhengtime+'各单位数字城管案件立案数'
				},
				yAxis:[{
					title : {
					text : '立案数'
				}}],
				xAxis:{
					categories : category_danwei,
					labels: {
		                rotation: 0,
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
				},
				 plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0,
			                dataLabels: {                                              
			                    enabled: true                                          
			                } 
			            }                                        
			          },
				credits:{
					enabled:false
				}
			},
			series:jiandu_lianshu_data,
			};
	
	//本月累计-各单位展示
	
	//历史情况
	var alldata = [{
		"name" : "立案数",
		"data" : null,
		"type" : 'line',
		"tooltip" : {valueSuffix:'起'}
	}];
	
	var alldata_benyue = [{
		"name" : "立案数",
		"data" : null,
		"type" : 'line',
		"tooltip" : {valueSuffix:'起'}
	}];
	
	var categories_data_shijian = [];	
	var categories_data_shijian_benyue = [];
	
	var data_shijian = [];
	var data_shijian_benyue = [];
	for(var i=0;i<dd.length;i++){
		var day = new Date(dd[i].time);
		categories_data_shijian.push(day.getDate());
		var kkk=0;
		for(var j = 0;j<dd[i].data.length;j++){
			if(dd[i].data[j].dept == ju_name[0]){
				kkk=1;
				data_shijian.push(parseFloat(dd[i].data[j].las));
			}
		}
		if(kkk == 0){
			data_shijian.push(0);
		}
	}
	
	for(var i=0;i<dd_benyue.length;i++){
		var day = new Date(dd_benyue[i].time);
		categories_data_shijian_benyue.push(day.getDate());
		var kkk=0;
		for(var j = 0;j<dd_benyue[i].data.length;j++){
			if(dd_benyue[i].data[j].dept == ju_name[0]){
				kkk=1;
				data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].las));
			}
		}
		if(kkk == 0){
			data_shijian_benyue.push(0);
		}
	}
	
	alldata[0].data = data_shijian;
	alldata_benyue[0].data = data_shijian_benyue;
	
	$scope.citymanager_jiandu_shijian_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:"当月"+ju_name[0]+'数字城管案件立案数'
				},
				yAxis:[{
					title : {
					text : '立案数'
				},minTickInterval: 1}],
				xAxis:{
					title : {text : '日期'},
					categories : categories_data_shijian,
					labels: {
		                
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
				},
				credits:{
					enabled:false
				}
			},
			series:alldata,
			};
	
	$scope.citymanager_jiandu_shijian_benyue_option = {
			options:{
				
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:"当月"+ju_name[0]+'数字城管案件月累计立案数'
				},
				yAxis:[{
					title : {
					text : '立案数'
				},minTickInterval: 1}],
				xAxis:{
					title : {text : '日期'},
					categories : categories_data_shijian_benyue,
					labels: {
		                
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
				},
				legend: {                                                          
		            enabled: false                                                  
		        },
				credits:{
					enabled:false
				}
			},
			series:alldata_benyue,
			};
	
	//各单位展示-点击事件
	$scope.jianduzhibiaolist = category_jianduzhibiao;
	$scope.jianduzhibiao = "立案数";
	$scope.jianduzhibiaoClick = function(jianduzhibiaoone){
		jiandu_lianshu_data[0].name = jianduzhibiaoone;
		var d = [];
		switch(jianduzhibiaoone)
		{
		case "立案数":
		  d = lianshu;
		  jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
		  break;
		case "应处置数":
		  d = yingchuzhishu;
		  jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
		  break;
		case "处置率":
		  d = chuzhilv;
		  jiandu_lianshu_data[0].tooltip.valueSuffix = '%'
		  break;
				case "按时处置数":
					d = anshichuzhishu;
					jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
					break;
				case "延期率":
					d = yanqilv;
					jiandu_lianshu_data[0].tooltip.valueSuffix = '%'
					break;
				case "返工数":
					d = fangongshu;
					jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
					break;
				case "总结案数":
				    d = zongjieanshu;
				    jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
				    break;
				case "按时处置率":
				    d = anshichuzhilv;
				    jiandu_lianshu_data[0].tooltip.valueSuffix = '%'
				    break;
				case "处置数":
				    d = chuzhishu;
				    jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
				    break;
				case "延期数":
				    d = yanqishu;
				    jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
				    break;
				case "超期未处置数":
					d = chaoqiweichuzhishu;
					jiandu_lianshu_data[0].tooltip.valueSuffix = '起'
					break;
			    case "返工率":
					d = fangonglv;
					jiandu_lianshu_data[0].tooltip.valueSuffix = '%'
					break;
		}
		jiandu_lianshu_data[0].data = d;
		$scope.citymanager_jiandu_lianshu_option = {
				options:{		
					legend: {                                                          
			            enabled: false                                                  
			        },
					chart:{
						type : 'bar',
					},
					title:{
						text:wanzhengtime+'各单位数字城管案件'+jianduzhibiaoone
					},
					yAxis:[{
						title : {
						text : jianduzhibiaoone
					},minTickInterval: 1}],
					xAxis:{
						categories : category_danwei,
						labels: {
			                rotation: 0,
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                }
			            }
					},
					 plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0,
				                dataLabels: {                                              
				                    enabled: true                                          
				                } 
				            }                                        
				          },
					credits:{
						enabled:false
					}
				},
				series:jiandu_lianshu_data,
				};
	}
	//各单位展示-时间-点击事件
	$scope.jianduzhibiao_shijianlist = category_jianduzhibiao;
	$scope.jianduzhibiao_shijian = "立案数";
	$scope.jianduzhibiao_shijianClick = function(jianduzhibiaoone){
		
		var categories_data_shijian = [];
		var categories_data_shijian_benyue = [];
		var data_shijian = [];
		var data_shijian_benyue = [];
		for(var i=0;i<dd.length;i++){
			var day = new Date(dd[i].time);
			categories_data_shijian.push(day.getDate());
			var token = 0;
			for(var j=0;j<dd[i].data.length;j++){
				if(dd[i].data[j].dept == $scope.xuanzedanwei_shijian){
					token = 1;
					switch(jianduzhibiaoone)
					{
							case "立案数":
								data_shijian.push(parseFloat(dd[i].data[j].las));
								alldata[0].tooltip.valueSuffix = '起';
							  break;
							case "应处置数":
								data_shijian.push(parseFloat(dd[i].data[j].yczs));
								alldata[0].tooltip.valueSuffix = '起';
								break;
							case "处置率":
								data_shijian.push(parseFloat(dd[i].data[j].czl));
								alldata[0].tooltip.valueSuffix = '%';
								break;
							case "按时处置数":
								data_shijian.push(parseFloat(dd[i].data[j].asczs));
								alldata[0].tooltip.valueSuffix = '起';
								break;
							case "延期率":
								data_shijian.push(parseFloat(dd[i].data[j].yql));
								alldata[0].tooltip.valueSuffix = '%';
								break;
							case "返工数":
								data_shijian.push(parseFloat(dd[i].data[j].fgs));
								alldata[0].tooltip.valueSuffix = '起';
								break;
							case "总结案数":
								data_shijian.push(parseFloat(dd[i].data[j].zjas));
								alldata[0].tooltip.valueSuffix = '起';
							    break;
							case "按时处置率":
								data_shijian.push(parseFloat(dd[i].data[j].asczl));
								alldata[0].tooltip.valueSuffix = '%';
							    break;
							case "处置数":
								data_shijian.push(parseFloat(dd[i].data[j].czs));
								alldata[0].tooltip.valueSuffix = '起';
							    break;
							case "延期数":
								data_shijian.push(parseFloat(dd[i].data[j].fgs));
								alldata[0].tooltip.valueSuffix = '起';
							    break;
							case "超期未处置数":
								data_shijian.push(parseFloat(dd[i].data[j].cqwczs));
								alldata[0].tooltip.valueSuffix = '起';
								break;
						    case "返工率":
						    	data_shijian.push(parseFloat(dd[i].data[j].fgl));
						    	alldata[0].tooltip.valueSuffix = '%';
								break;
					}
				}
			}
			if(token == 0){
				data_shijian.push(parseFloat(0));
			}
		}
		
		for(var i=0;i<dd_benyue.length;i++){
			var day = new Date(dd_benyue[i].time);
			categories_data_shijian_benyue.push(day.getDate());
			var token = 0;
			for(var j=0;j<dd_benyue[i].data.length;j++){
				if(dd_benyue[i].data[j].dept == $scope.xuanzedanwei_shijian){
					token = 1;
					switch(jianduzhibiaoone)
					{
							case "立案数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].las));
								alldata_benyue[0].tooltip.valueSuffix = '起';
							  break;
							case "应处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].yczs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
								break;
							case "处置率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].czl));
								alldata_benyue[0].tooltip.valueSuffix = '%';
								break;
							case "按时处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].asczs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
								break;
							case "延期率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].yql));
								alldata_benyue[0].tooltip.valueSuffix = '%';
								break;
							case "返工数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
								break;
							case "总结案数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].zjas));
								alldata_benyue[0].tooltip.valueSuffix = '起';
							    break;
							case "按时处置率":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].asczl));
								alldata_benyue[0].tooltip.valueSuffix = '%';
							    break;
							case "处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].czs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
							    break;
							case "延期数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
							    break;
							case "超期未处置数":
								data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].cqwczs));
								alldata_benyue[0].tooltip.valueSuffix = '起';
								break;
						    case "返工率":
						    	data_shijian_benyue.push(parseFloat(dd_benyue[i].data[j].fgl));
						    	alldata_benyue[0].tooltip.valueSuffix = '%';
								break;
					}
				}
			}
			if(token == 0){
				data_shijian_benyue.push(parseFloat(0));
			}
		}
		
		
		alldata[0].data = data_shijian;
		alldata_benyue[0].data = data_shijian_benyue;
		$scope.jianduzhibiao_shijian = jianduzhibiaoone;
		alldata[0].name = jianduzhibiaoone;
		alldata_benyue[0].name = jianduzhibiaoone;
		$scope.citymanager_jiandu_shijian_option = {
				options:{
					legend: {                                                          
			            enabled: false                                                  
			        },
					chart:{
						margin: [ 60, 50, 100, 80]
					},
					title:{
						text:"当月"+$scope.xuanzedanwei_shijian+'数字城管案件'+jianduzhibiaoone
					},
					yAxis:[{
						title : {
						text : jianduzhibiaoone
					},minTickInterval: 1}],
					xAxis:{
						title : {text : '日期'},
						categories : categories_data_shijian,
						labels: {
			                
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                }
			            }
					},
					credits:{
						enabled:false
					}
				},
				series:alldata,
				};
		
		$scope.citymanager_jiandu_shijian_benyue_option = {
				options:{
					legend: {                                                          
			            enabled: false                                                  
			        },
					chart:{
						margin: [ 60, 50, 100, 80]
					},
					title:{
						text:"当月"+$scope.xuanzedanwei_shijian+'数字城管案件月累计'+jianduzhibiaoone
					},
					yAxis:[{
						title : {
						text : jianduzhibiaoone
					},minTickInterval: 1}],
					xAxis:{
						title : {text : '日期'},
						categories : categories_data_shijian_benyue,
						labels: {
			                
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                }
			            }
					},
					credits:{
						enabled:false
					}
				},
				series:alldata_benyue,
				};
		
		}
	
	//雷达图01
	$scope.citymanager_jiandu_moudanwei_option = {
				            
			options:{
				
				chart: {
			        polar: true,
			        type: 'line',
			    },
			    
			    title: {
			        text: ju_name[0]+'数字城管案件处置情况',
			    },
			    
			    pane: {
			    	size: '80%'
			    },
			    
			    xAxis: {
			        categories: ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"],
			        tickmarkPlacement: 'on',
			        lineWidth: 0
			    },
			        
			    yAxis: {
			        gridLineInterpolation: 'polygon',
			        lineWidth: 0,
			        min: 0
			    },
			    
			    tooltip: {
			    	shared: true,
			        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}起</b><br/>'
			    },
			    
			    legend: {
			        align: 'right',
			        verticalAlign: 'top',
			        y: 70,
			        layout: 'vertical',
			        enabled: false
			    },
				credits:{
					enabled:false
				}
			},
			   series: [{
			        name: ju_name[0],
			        data: chushishuju,
			        pointPlacement: 'on'
			    }],
			};
	
	//雷达图02
	var jiandu_yingchuzhishushu_data = [{
		"name" : "应处置数",
		"data" : [1,2,4,2,1,4,2,1,4,1,2,1,2,1,2,3,1,2,1,2,2,2,1,4,2,3,2,1],
		"type" : 'column',
		"tooltip" : {valueSuffix:'起'}
	}];
	$scope.citymanager_jiandu_gedanwei_option = {
				            
			options:{
				
				chart: {
			        polar: true,
			        type: 'line'
			    },
			    
			    title: {
			        text: ju_name[0]+'数字城管案件处置效率情况',
			    },
			    
			    pane: {
			    	size: '80%'
			    },
			    
			    xAxis: {
			        categories: ["处置率","返工率","按时处置率","延期率"],
			        tickmarkPlacement: 'on',
			        lineWidth: 0
			    },
			        
			    yAxis: {
			        gridLineInterpolation: 'polygon',
			        lineWidth: 0,
			        min: 0
			    },
			    
			    tooltip: {
			    	shared: true,
			        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
			    },
			    
			    legend: {
			        align: 'right',
			        verticalAlign: 'top',
			        y: 70,
			        layout: 'vertical',
			        enabled: false
			    },
				credits:{
					enabled:false
				}
			},
			   series: [{
			        name: ju_name[0],
			        data: chushishuju_rate,
			        pointPlacement: 'on'
			    }],
			};
				
				//导入单位
				var category_danwei_benyue = [];
				for(var i=0;i<data_benyue.length;i++){
					category_danwei_benyue.push(data_benyue[i].dept);
				}
				//导入数据
				var benyue_data = [];
				for(var i=0;i<data_benyue.length;i++){
					benyue_data.push(parseFloat(data_benyue[i].las));
				}
				var jiandu_benyue_data = [{
					"name" : "立案数",
					"data" : benyue_data,
					"type" : 'column',
					"tooltip" : {valueSuffix:'起'}
				}];
				//图表构建
				$scope.citymanager_jiandu_benyue_option = {
				options:{
					legend: {                                                          
			            enabled: false                                                  
			        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:'当月累计至'+wanzhengtime+'各单位数字城管案件立案数'
				},
				yAxis:[{
					title : {
					text : '立案数'
				},minTickInterval: 1}],
				xAxis:{
					categories : category_danwei_benyue,
					labels: {
		                rotation: -45,
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
				},
				 plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0,
			                dataLabels: {                                              
			                    enabled: true                                          
			                } 
			            }                                        
			          },
				credits:{
					enabled:false
				}
			},
			series:jiandu_benyue_data,
			}
			$scope.jianduzhibiao_benyuelist = category_jianduzhibiao;
			$scope.jianduzhibiao_benyue = "立案数";
			$scope.jianduzhibiao_benyueClick = function(jianduzhibiaoone){
				var benyue_data = [];
				jiandu_benyue_data[0].name = jianduzhibiaoone;
				switch(jianduzhibiaoone)
				{
						case "立案数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].las)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
							break;
						case "应处置数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].yczs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
							break;
						case "处置率":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].czl)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '%'
							break;
						case "按时处置数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].asczs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
							break;
						case "延期率":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].yql)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '%'
							break;
						case "返工数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].fgs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
							break;
						case "总结案数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].zjas)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
						    break;
						case "按时处置率":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].asczl)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '%'
						    break;
						case "处置数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].czs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
						    break;
						case "延期数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].fgs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
						    break;
						case "超期未处置数":
							for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].cqwczs)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '起'
							break;
					    case "返工率":
					    	for(var i = 0;i<data_benyue.length;i++){
								benyue_data.push(parseFloat(data_benyue[i].fgl)); 
							}
							jiandu_benyue_data[0].tooltip.valueSuffix = '%'
							break;
				}
				jiandu_benyue_data[0].data = benyue_data;
				$scope.citymanager_jiandu_benyue_option = {
						options:{
							legend: {                                                          
					            enabled: false                                                  
					        },
						chart:{
							margin: [ 60, 50, 100, 80]
						},
						title:{
							text:'当月累计至'+wanzhengtime+'各单位数字城管案件'+jianduzhibiaoone
						},
						yAxis:[{
							title : {
							text : jianduzhibiaoone
						},minTickInterval: 1}],
						xAxis:{
							categories : category_danwei_benyue,
							labels: {
				                rotation: -45,
				                align: 'right',
				                style: {
				                    fontSize: '13px',
				                    fontFamily: 'Verdana, sans-serif'
				                }
				            }
						},
						 plotOptions: {
					            column: {
					                pointPadding: 0.2,
					                borderWidth: 0,
					                dataLabels: {                                              
					                    enabled: true                                          
					                } 
					            }                                        
					          },
						credits:{
							enabled:false
						}
					},
					series:jiandu_benyue_data,
					}
			}
			//雷达图01
			var chushishuju_benyue = []; 
			chushishuju_benyue.push(parseFloat(data_benyue[0].las));
			chushishuju_benyue.push(parseFloat(data_benyue[0].zjas));
			chushishuju_benyue.push(parseFloat(data_benyue[0].yczs));
			chushishuju_benyue.push(parseFloat(data_benyue[0].czs));
			chushishuju_benyue.push(parseFloat(data_benyue[0].asczs));
			chushishuju_benyue.push(parseFloat(data_benyue[0].cqwczs));
			chushishuju_benyue.push(parseFloat(data_benyue[0].fgs));
			chushishuju_benyue.push(parseFloat(data_benyue[0].fgs));
			
			var chushishuju_benyue_rate = [];
			chushishuju_benyue_rate.push(parseFloat(data_benyue[0].czl));
			chushishuju_benyue_rate.push(parseFloat(data_benyue[0].fgl));
			chushishuju_benyue_rate.push(parseFloat(data_benyue[0].asczl));
			chushishuju_benyue_rate.push(parseFloat(data_benyue[0].yql));
			
			$scope.citymanager_jiandu_benyue_moudanwei_option = {
						            
					options:{
						
						chart: {
					        polar: true,
					        type: 'line',
					    },
					    
					    title: {
					        text: ju_name[0]+'数字城管案件月累计处置情况',
					    },
					    
					    pane: {
					    	size: '80%'
					    },
					    
					    xAxis: {
					        categories: ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"],
					        tickmarkPlacement: 'on',
					        lineWidth: 0
					    },
					        
					    yAxis: {
					        gridLineInterpolation: 'polygon',
					        lineWidth: 0,
					        min: 0
					    },
					    
					    tooltip: {
					    	shared: true,
					        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}起</b><br/>'
					    },
					    
					    legend: {
					        align: 'right',
					        verticalAlign: 'top',
					        y: 70,
					        layout: 'vertical',
					        enabled: false
					    },
						credits:{
							enabled:false
						}
					},
					   series: [{
					        name: ju_name[0],
					        data: chushishuju_benyue,
					        pointPlacement: 'on'
					    }],
					};
			
			//雷达图02
			$scope.citymanager_jiandu_benyue_gedanwei_option = {
						            
					options:{
						
						chart: {
					        polar: true,
					        type: 'line'
					    },
					    
					    title: {
					        text: ju_name[0]+'数字城管案件月累计处置效率情况',
					    },
					    
					    pane: {
					    	size: '80%'
					    },
					    
					    xAxis: {
					        categories: ["处置率","返工率","按时处置率","延期率"],
					        tickmarkPlacement: 'on',
					        lineWidth: 0
					    },
					        
					    yAxis: {
					        gridLineInterpolation: 'polygon',
					        lineWidth: 0,
					        min: 0
					    },
					    
					    tooltip: {
					    	shared: true,
					        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
					    },
					    
					    legend: {
					        align: 'right',
					        verticalAlign: 'top',
					        y: 70,
					        layout: 'vertical',
					        enabled: false
					    },
						credits:{
							enabled:false
						}
					},
					   series: [{
					        name: ju_name[0],
					        data: chushishuju_benyue_rate,
					        pointPlacement: 'on'
					    }],
					};
			});
	});
	});
	});
});
	
