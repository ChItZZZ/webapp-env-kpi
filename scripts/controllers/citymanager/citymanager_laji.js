'use strict';
/**
 * @ngdoc function
 * @name iocUiApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the iocUiApp
 */
angular.module('app').controller('citymanager_lajicontroller',function($scope,kpiDetailService,dateService){
	var category_lajiqingyundian = ["全市","城厢","浮桥","璜泾","金浪","开发区","陆渡","浏河","刘家港","鹿河","牌楼","双凤","沙溪","太仓","新湖","新毛","新塘","岳王","直塘"];
	var category_lajiqingyundian_column = ["城厢","浮桥","璜泾","金浪","开发区","陆渡","浏河","刘家港","鹿河","牌楼","双凤","沙溪","太仓","新湖","新毛","新塘","岳王","直塘"];	
	var lajiqingyuncheshu_alldata = [];
    var lajiqingyundunshu_alldata = [];
	var lajiqingyuncheshu_zhenshishuju = [];
	
	kpiDetailService.getLastestObject('CityManagerLajiData', ['applyTime'], function(datat) {
		
	var dtime = dateService.get_system_time();
	var dd = new Date(dtime);
	var yy = dd.getFullYear();
	var mm = dd.getMonth()+1;//获取当前月份的日期
	var ddd = dd.getDate();
	kpiDetailService.query("CityManagerLajiData",yy+"-"+mm+"-"+ddd,yy+"-"+mm+"-"+ddd,function(datatt) {
	
	var yy,mm,ddd;
	if(datatt.data.length == 0){
		yy = datat.data.year;
	    mm = datat.data.month;
	    ddd = datat.data.day;
	}else{
		yy = datatt.data[0].year;
	    mm = datatt.data[0].month;//获取当前月份的日期
	    ddd = datatt.data[0].day;
	}
	var dd = new Date(yy+"-"+mm+"-"+ddd);
	console.log(JSON.stringify(yy+"-"+mm+"-"+ddd));
	
    $scope.nowdate = yy+"年"+mm+"月"+ddd+"日";
    
	function GetDateStr(AddDayCount) {
		var dd = new Date();
	    dd.setFullYear(parseFloat(yy), parseFloat(mm)-1, parseFloat(ddd));
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    return y+"-"+m+"-"+d;
	}
	
	function GetDateStrDay(AddDayCount) {
		var dd = new Date();
	    dd.setFullYear(parseFloat(yy), parseFloat(mm)-1, parseFloat(ddd));
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    return d;
	}
	var endtime = GetDateStr(-1);
    var starttime = GetDateStr(-7);
    
	function findplace(data){
		var temp = null;
		switch(data){
			case 7001:temp = "cx";break; 	
			case 7002:temp = "fq";break; 	
			case 7003:temp = "hj";break; 	
			case 7004:temp = "jl";break; 	
			case 7005:temp = "kfq";break; 	
			case 7006:temp = "ld";break; 	
			case 7007:temp = "lh";break; 	
			case 7008:temp = "ljg";break; 	
			case 7009:temp = "luh";break; 	
			case 7010:temp = "pl";break; 	
			case 7011:temp = "sf";break; 	
			case 7012:temp = "sum";break; 	
			case 7013:temp = "sx";break; 	
			case 7014:temp = "tc";break; 	
			case 7015:temp = "xh";break; 	
			case 7016:temp = "xm";break; 	
			case 7017:temp = "xt";break; 	
			case 7018:temp = "yw";break; 	
			case 7019:temp = "zt";break; 		
		}
		return temp;
	}
	kpiDetailService.query("CityManagerLajiData",starttime,endtime,function(data) {
		var data = data.data;
		var onetimedata = [];
		
		var time = data[0].applyTime;
		var dataone = {
				data:[]
		}
		for(var i=0;i<data.length;i++){
			if(data[i].applyTime == time){
				//dataone.time = data[i].applyTime;
				dataone.data.push(data[i]);
			}else{
				onetimedata.push(dataone);
				var dataone = {
					data:[]
				}
				dataone.data.push(data[i]);
				time = data[i].applyTime;
			}
			if(i == (data.length-1)){
				onetimedata.push(dataone);
			}
		}
		var data000 = onetimedata;
		var allm = [];
		for(var i=0;i<data000.length;i++){
			var dataallmap = data000[i].data;
			var allmap={
					cxcar:null,cxton:null,
					fqcar:null,fqton:null,
					hjcar:null,hjton:null,
					jlcar:null,jlton:null,
					kfqcar:null,kfqton:null,
					ldcar:null,ldton:null,
					lhcar:null,lhton:null,
					ljgcar:null,ljgton:null,
					luhcar:null,luhton:null,
					plcar:null,plton:null,
					sfcar:null,sfton:null,
					sumcar:null,sumton:null,
					sxcar:null,sxton:null,
					tccar:null,tcton:null,
					xhcar:null,xhton:null,
					xmcar:null,xmton:null,
					xtcar:null,xtton:null,
					ywcar:null,ywton:null,
					ztcar:null,ztton:null
				}
			for(var j=0;j<dataallmap.length;j++){
				var temp = dataallmap;
				var name = findplace(temp[j].lajiqingyundian);
				var cheshu = name+"car";
				var dunshu = name+"ton";
				allmap[cheshu] = temp[j].cheshu;
				allmap[dunshu] = temp[j].dunshu;
				
			}
			
			allm.push(allmap);
		}

		var data = allm;
		var lajiqingyuncheshu_zhenshishuju = [];
		for(var mm=0;mm<data.length;mm++){
			var map = {};
			map = data[mm];
			if(map.sumcar != null){
				lajiqingyuncheshu_zhenshishuju.push(data[mm]);
			}
		}
	
		$scope.cheshu = parseFloat(lajiqingyuncheshu_zhenshishuju[lajiqingyuncheshu_zhenshishuju.length-1].sumcar);
		$scope.dunshu = parseFloat(lajiqingyuncheshu_zhenshishuju[lajiqingyuncheshu_zhenshishuju.length-1].sumton);
		
		var jieguo = "无数据";
		var pingjia = "正常";
		if($scope.dunshu>900){
			pingjia = "不正常";
			jieguo = $scope.dunshu+"吨(实绩)>"+"900"+"吨(警戒值)";
		}else{
			pingjia = "正常";
			jieguo = $scope.dunshu+"吨(实绩)<"+"900"+"吨(警戒值)";
		}
		$scope.laji_dunshu_jieguo = $scope.nowdate+"垃圾清运吨数"+pingjia;
		$scope.laji_dunshu_jieguo02 = jieguo;
		
		var jieguo02 = "无数据";
		var pingjia02 = "正常";
		if($scope.cheshu>170){
			pingjia02 = "不正常";
			jieguo02 = $scope.cheshu+"车次(实绩)>"+"170"+"车次(警戒值)";
		}else{
			pingjia02 = "正常";
			jieguo02 = $scope.cheshu+"车次(实绩)<"+"170"+"车次(警戒值)";
		}
		$scope.laji_cheshu_jieguo = $scope.nowdate+"垃圾清运车次"+pingjia02;
		$scope.laji_cheshu_jieguo02 = jieguo02;
		
	//垃圾清运车数
	var a = [];
	for(var ini = 0;ini<lajiqingyuncheshu_zhenshishuju.length;ini++){
		a.push(parseFloat(lajiqingyuncheshu_zhenshishuju[ini].sumcar));
	}
	lajiqingyuncheshu_alldata.push(a);
	var a = [];
	for(var ini = 0;ini<lajiqingyuncheshu_zhenshishuju.length;ini++){
		a.push(parseFloat(lajiqingyuncheshu_zhenshishuju[ini].sumton));
	}
	lajiqingyundunshu_alldata.push(a);
		
	var sum = [];
	for (var key in lajiqingyuncheshu_zhenshishuju[0]) {  
			
		var a = [];
		
		for(var i = 0;i<lajiqingyuncheshu_zhenshishuju.length;i++){
			if(lajiqingyuncheshu_zhenshishuju[i][key] != null){
				if(key != "sumcar"){
					if(key != "sumton"){
						a.push(parseFloat(lajiqingyuncheshu_zhenshishuju[i][key]));
					}
				}
			}
		}
		if(a.length != 0){
			sum.push(a);
		}
	}
	
	for(var tt = 0;tt<sum.length;tt=tt+2){
		lajiqingyuncheshu_alldata.push(sum[tt]);
		lajiqingyundunshu_alldata.push(sum[tt+1]);
	}
	
	var b = [];
	for (var key in lajiqingyuncheshu_zhenshishuju[0]) {
		if((key != "sumcar")&&(key != "sumton")){
			b.push(lajiqingyuncheshu_zhenshishuju[lajiqingyuncheshu_zhenshishuju.length-1][key]);
		}
	}
	
	var c = [];var c1 = [];
	if(lajiqingyuncheshu_zhenshishuju.length == 7){
		for(var n = 0;n<b.length;n=n+2){
			c.push(parseFloat(b[n]));
			c1.push(parseFloat(b[n+1]));
		}
	}
	var laji_cheshu_data = [{
		"name" : "垃圾清运车次",
		"data" : 	c,
		"type" : 'column',
		"tooltip" : {valueSuffix:'车次'}
	}];
	var laji_dunshu_data = [{
		"name" : "垃圾清运吨数",
		"data" : 	c1,
		"type" : 'column',
		"tooltip" : {valueSuffix:'吨'}
	}];
	
	$scope.citymanager_laji_cheshu_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:$scope.nowdate+'垃圾清运车次'
				},
				yAxis:[
				{
					title : {
					text : '车次'
				}}],
				xAxis:{
					title : {text : '垃圾清运点'},
					categories : category_lajiqingyundian_column,
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
			series:laji_cheshu_data
			};
	
	//垃圾清运车数-垃圾点
	var category_qitian = [];
	for(var mm = 0;mm<7;mm++){
		category_qitian.push(GetDateStrDay(mm-6));
	}

	var laji_cheshu_lajiqingyundian_data = [{
		"name" : "垃圾清运车次",
		"data" :  lajiqingyuncheshu_alldata[0],
		"type" : 'line',
		"tooltip" : {valueSuffix:'车次'}
	}];
	$scope.citymanager_laji_cheshu_lajiqingyundian_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:'近七天全市垃圾清运车次'
				},
				yAxis:[{
					title : {
					text : '车次'
				}
				}],
				xAxis:{
					title : {text : '日期'},
					categories : category_qitian,
					labels: {
		                
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            },
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
			series:laji_cheshu_lajiqingyundian_data,
			};
	
	//垃圾清运吨数
	$scope.citymanager_laji_dunshu_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:$scope.nowdate+'垃圾清运吨数'
				},
				yAxis:[{
					title : {
					text : '吨'
				}}],
				xAxis:{
					title : {text : '垃圾清运点'},
					categories : category_lajiqingyundian_column,
					labels: {
						 rotation: -45,
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
			series:laji_dunshu_data,
			};
	//垃圾清运吨数-垃圾清运点
	var laji_dunshu_lajiqingyundian_data = [{
		"name" : "垃圾清运吨数",
		"data" : lajiqingyundunshu_alldata[0],
		"type" : 'line',
		"tooltip" : {valueSuffix:'吨'}
	}];
	$scope.citymanager_laji_dunshu_lajiqingyundian_option = {
			options:{
				legend: {                                                          
		            enabled: false                                                  
		        },
				chart:{
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:'近七天全市垃圾清运吨数'
				},
				yAxis:[{
					title : {
					text : '吨'
				}}],
				xAxis:{
					title : {text : '日期'},
					categories : category_qitian,
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
			series:laji_dunshu_lajiqingyundian_data,
			};
	
	//点击更换图表
	$scope.lajiqingyundianlist = category_lajiqingyundian;
	$scope.lajiqingyundian = "全市";
	$scope.lajiqingyundianClick = function(lajiqingyundianone){
		for(var i = 0;i<$scope.lajiqingyundianlist.length;i++){
			if($scope.lajiqingyundianlist[i] == lajiqingyundianone){
				laji_cheshu_lajiqingyundian_data[0].data = lajiqingyuncheshu_alldata[i];
	
				
				$scope.citymanager_laji_cheshu_lajiqingyundian_option = {
						options:{
							 legend: {                                                          
						            enabled: false                                                  
						        },
							chart:{
							},
							title:{
								text:'近七天'+lajiqingyundianone+'地区垃圾清运车次'
							},
							yAxis:[{
								title : {
								text : '车次'
							},
							minTickInterval: 1}],
							xAxis:{
								title : {text : '日期'},
								categories : category_qitian,labels: {
					                
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
						series:laji_cheshu_lajiqingyundian_data,
						};
			}
		}
	};
	//点击更换图表
	$scope.lajiqingyundian_01list = category_lajiqingyundian;
	$scope.lajiqingyundian_01 = "全市";
	$scope.lajiqingyundian_01Click = function(lajiqingyundianone){
		
		for(var i = 0;i<$scope.lajiqingyundianlist.length;i++){
			if($scope.lajiqingyundianlist[i] == lajiqingyundianone){	
				laji_dunshu_lajiqingyundian_data[0].data = lajiqingyundunshu_alldata[i];
				
				$scope.citymanager_laji_dunshu_lajiqingyundian_option = {
						options:{
							 legend: {                                                          
						            enabled: false                                                  
						        },
							chart:{
							},
							title:{
								text:'近七天'+lajiqingyundianone+'地区垃圾清运吨数'
							},
							yAxis:[{
								title : {
								text : '吨'
							}}],
							xAxis:{
								title : {text : '日期'},
								categories : category_qitian,
								labels: {
					               
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
						series:laji_dunshu_lajiqingyundian_data,
						};
			}
		}
	};
	});
	});
	});
});