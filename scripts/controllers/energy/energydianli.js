'use strict';

/**
 * @ngdoc function
 * @name iocUiApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the iocUiApp
 */
angular.module('app').controller('energydianlicontroller',function($scope,kpiDetailService,dateService){
	var processFunction = function(data){
	//alert(JSON.stringify(data));
		
	/*if(dataall.error=="No_Rights_Error"){
		$location.path("/login");}*/
	
	var dataall={data:[]};
	dataall.data.push(data.data[data.data.length-1]);
		
	//前段零碎处理
	function GetDateStr(AddDayCount) {
	    var dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    return y+"-"+m+"-"+d;
	}
	 var y = parseFloat(dataall.data[0].year);
	 var m = parseFloat(dataall.data[0].month+1);
	 
	 //alert(m)
	 
	 if(m==1){
		 y=y-1;
	 }
	//总电力消耗-分产业
	var chanye_data = [];
	var chanye_data_column = [];
	var a = [];
	var hangye_data = [];
	var hangye_alldata = [];
	//第一产业数据
	var category_diyichanye = [];
	var diyi_data = [{
					"name" : "第一产业电力消耗量",
					"data" : [],
					"yAxis": 0,
					"type" : 'column',
					"tooltip": {valueSuffix:'万千瓦时'}
				},
				
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
	//第二产业数据
	var category_dierchanye = [];
	var dier_data = [{
					"name" : "第二产业电力消耗量",
					"data" : [],
					"yAxis": 0,
					"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
	//第三产业数据
	var category_disanchanye = [];
	var disan_data = [{
					"name" : "第三产业电力消耗量",
					"data" : [],
					"yAxis": 0,
					"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
	//农林牧渔业电力消耗
	var category_nonglingmuyuhangye = [];
	var nonglingmuyuhangye_data = [{
					"name" : "农、林、牧、渔业电力消耗量",
					"data" : [],
					"yAxis": 0,
					"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];

var category_gongyehangye = [];
	var gongyehangye_data = [{
					"name" : "工业电力消耗量",
					"data" : [],
					"yAxis": 0,
					"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [  ],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];

var category_jianzhuyehangye = [];
	var jianzhuyehangye_data = [{
					"name" : "建筑业电力消耗量",
					"data" : [],
					           "yAxis": 0,
					"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_jtccyzhangye = [];
	var jtccyzhangye_data = [{
					"name" : "交通运输、仓储和邮政业电力消耗量",
					"data" : [],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_xxjsjrjhangye = [];
	var xxjsjrjhangye_data = [{
					"name" : "信息传输、计算机服务和软件业电力消耗量",
					"data" : [ ],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_pflszscyhangye = [];
	var pflszscyhangye_data = [{
					"name" : "批发和零售、住宿和餐饮业电力消耗量",
					"data" : [  ],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [  ],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_jrfdcswjmfwyhangye = [];
	var jrfdcswjmfwyhangye_data = [{
					"name" : "金融、房地产、商务及居民服务业电力消耗量",
					"data" : [ ],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [  ],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_ggsyglhangye = [];
	var ggsyglhangye_data = [{
					"name" : "公共事业及管理组织电力消耗量",
					"data" : [],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_chengzhenshenghuo = [];
	var chengzhenshenghuo_data = [{
					"name" : "城镇生活电力消耗量",
					"data" : [],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [ ],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];
var category_nongcunshenghuo = [];
	var nongcunshenghuo_data = [{
					"name" : "农村生活电力消耗量",
					"data" : [ ],
					           "yAxis": 0,
								"type" : 'column',
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "用电量累计比上年同期增加%",
					"data" : [ ],
					"yAxis": 1,
					"type" : 'spline',
					"tooltip" : {valueSuffix:'%'}
				}];	
	var category_shenghuo = [];
	var shenghuodianli_data = [{
					"name" : "农村生活电力消耗量",
					"data" : [],
					"tooltip" : {valueSuffix:'万千瓦时'}
				},
				{
					"name" : "城镇生活电力消耗量",
					"data" : [],
					"tooltip" : {valueSuffix:'万千瓦时'}
				}];	

	kpiDetailService.getLastestObject('EnergydianliData', ['applyTime'], function(datat) {
	
	var dtime = dateService.get_system_time();
	var dd = new Date(dtime);
	var yy = dd.getFullYear();
    var mm = dd.getMonth()+1;//获取当前月份的日期
    var ddd = dd.getDate();
    
	kpiDetailService.query("EnergydianliData",yy+"-01-01",yy+"-12-31",function(data) {
		 /*if(data.error=="No_Rights_Error"){
			$location.path("/login");}*/
		kpiDetailService.query("EnergydianliData",datat.data.year+"-01-01",datat.data.year+"-12-31",function(datamax) {
		console.log(data.data);
		if(data.data.length == 0){
			data = datamax;
		}
			
		 var data_biaoti = [];
		 data_biaoti = data.data[data.data.length-1];
		
		 $scope.nowyear = data_biaoti.year+"年";
		 $scope.nowmonth = data_biaoti.month+"月";
		
		 $scope.chengxiangyongdianliang_value = data.data[data.data.length-1].zongshenghuo_YONGDIANLIANG-data.data[data.data.length-2].zongshenghuo_YONGDIANLIANG;
		 
		 $scope.chengzhengyongdianliang_value = data.data[data.data.length-1].chengzhengshenghuo_YONGDIANLIANG-data.data[data.data.length-2].chengzhengshenghuo_YONGDIANLIANG;
		 $scope.chengzhengyongdianliang_rate = data.data[data.data.length-1].chengzhengshenghuo_YONGDIANLIANG_RATE;
		 
		 $scope.nongcunyongdianliang_value = data.data[data.data.length-1].nongcunshenghuo_YONGDIANLIANG-data.data[data.data.length-2].nongcunshenghuo_YONGDIANLIANG;
		 $scope.nongcunyongdianliang_rate = data.data[data.data.length-1].nongcunshenghuo_YONGDIANLIANG_RATE;
		 
		 $scope.chengzhenyongdianliang_zongrate = (parseFloat($scope.chengzhengyongdianliang_value/$scope.chengxiangyongdianliang_value).toFixed(3))*100+"%";
		 $scope.nongcunyongdianliang_zongrate = (parseFloat($scope.nongcunyongdianliang_value/$scope.chengxiangyongdianliang_value).toFixed(3))*100;
		 $scope.nongcunyongdianliang_zongrate = parseFloat($scope.nongcunyongdianliang_zongrate).toFixed(1)+"%";
	
		 var  ct_chanye_data = [];
		 ct_chanye_data[0]="第一产业";
		 ct_chanye_data[1]=data.data[data.data.length-1].diyichanye_YONGDIANLIANG-data.data[data.data.length-2].diyichanye_YONGDIANLIANG;
		 chanye_data.push(ct_chanye_data);
		 chanye_data_column.push(ct_chanye_data[1]);
		 $scope.diyichanye_value = ct_chanye_data[1];
		 $scope.diyichanye_rate = data.data[data.data.length-1].diyichanye_YONGDIANLIANG_RATE;
		 
		 var  ct_chanye_data = [];
		 ct_chanye_data[0]="第二产业";
		 ct_chanye_data[1]=data.data[data.data.length-1].dierchanye_YONGDIANLIANG-data.data[data.data.length-2].dierchanye_YONGDIANLIANG;
		 chanye_data.push(ct_chanye_data);
		 chanye_data_column.push(ct_chanye_data[1]);
		 $scope.dierchanye_value = ct_chanye_data[1];
		 $scope.dierchanye_rate = data.data[data.data.length-1].dierchanye_YONGDIANLIANG_RATE;
		 
		 var  ct_chanye_data = [];
		 ct_chanye_data[0]="第三产业";
		 ct_chanye_data[1]=data.data[data.data.length-1].disanchanye_YONGDIANLIANG-data.data[data.data.length-2].disanchanye_YONGDIANLIANG;
		 chanye_data.push(ct_chanye_data);
		 chanye_data_column.push(ct_chanye_data[1]);
		 $scope.disanchanye_value = ct_chanye_data[1];
		 $scope.disanchanye_rate = data.data[data.data.length-1].disanchanye_YONGDIANLIANG_RATE;
		 
         hangye_data = [];
		 hangye_data.push("农、林、牧、渔业");
		 hangye_data.push(data.data[data.data.length-1].hangyeone_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeone_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.nonglingyongdianliang_value = data.data[data.data.length-1].hangyeone_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeone_YONGDIANLIANG
		 $scope.nonglingyongdianliang_rate = data.data[data.data.length-1].hangyeone_YONGDIANLIANG_RATE;
		 $scope.gongyeyongdianliang_value = data.data[data.data.length-1].hangyetwo_YONGDIANLIANG-data.data[data.data.length-2].hangyetwo_YONGDIANLIANG;
		 $scope.gongyeyongdianliang_rate = data.data[data.data.length-1].hangyetwo_YONGDIANLIANG_RATE;
		 //a.push(data.data[data.data.length-1].hangyetwo_YONGDIANLIANG - data.data[data.data.length-1-1].hangyetwo_YONGDIANLIANG);
		 
		 hangye_data = [];
		 hangye_data.push("建筑业");
		 hangye_data.push(data.data[data.data.length-1].hangyethree_YONGDIANLIANG - data.data[data.data.length-1-1].hangyethree_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.jianzhuyeyongdianliang_value = data.data[data.data.length-1].hangyethree_YONGDIANLIANG - data.data[data.data.length-1-1].hangyethree_YONGDIANLIANG;
		 $scope.jianzhuyeyongdianliang_rate = data.data[data.data.length-1].hangyethree_YONGDIANLIANG_RATE;
		 
		 hangye_data = [];
		 hangye_data.push("交通、仓储和邮政业");
		 hangye_data.push(data.data[data.data.length-1].hangyefour_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefour_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.jiaotongyongdianliang_value = data.data[data.data.length-1].hangyefour_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefour_YONGDIANLIANG;
		 $scope.jiaotongyongdianliang_rate = data.data[data.data.length-1].hangyefour_YONGDIANLIANG_RATE;
		 
		 hangye_data = [];
		 hangye_data.push("信息、计算机服务和软件业");
		 hangye_data.push(data.data[data.data.length-1].hangyefive_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefive_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.xingxiyongdianliang_value = data.data[data.data.length-1].hangyefive_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefive_YONGDIANLIANG;
		 $scope.xingxiyongdianliang_rate = data.data[data.data.length-1].hangyefive_YONGDIANLIANG_RATE;
		 
		 hangye_data = [];
		 hangye_data.push("批发、住宿和餐饮业");
		 hangye_data.push(data.data[data.data.length-1].hangyesix_YONGDIANLIANG - data.data[data.data.length-1-1].hangyesix_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.pifayongdianliang_value = data.data[data.data.length-1].hangyesix_YONGDIANLIANG - data.data[data.data.length-1-1].hangyesix_YONGDIANLIANG;
		 $scope.pifayongdianliang_rate = data.data[data.data.length-1].hangyesix_YONGDIANLIANG_RATE;
		 
		 hangye_data = [];
		 hangye_data.push("商务及居民服务业");
		 hangye_data.push(data.data[data.data.length-1].hangyeseven_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeseven_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.jinrongyongdianliang_value = data.data[data.data.length-1].hangyeseven_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeseven_YONGDIANLIANG;
		 $scope.jinrongyongdianliang_rate = data.data[data.data.length-1].hangyeseven_YONGDIANLIANG_RATE;
		 
		 hangye_data = [];
		 hangye_data.push("公共事业及管理组织");
		 hangye_data.push(data.data[data.data.length-1].hangyeeagit_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeeagit_YONGDIANLIANG);
		 hangye_alldata.push(hangye_data);
		 $scope.gonggongyongdianliang_value = data.data[data.data.length-1].hangyeeagit_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeeagit_YONGDIANLIANG;
		 $scope.gonggongyongdianliang_rate = data.data[data.data.length-1].hangyeeagit_YONGDIANLIANG_RATE;
		 
			 a.push(data.data[data.data.length-1].hangyeone_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeone_YONGDIANLIANG);
			 //a.push(data.data[data.data.length-1].hangyetwo_YONGDIANLIANG - data.data[data.data.length-1-1].hangyetwo_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyethree_YONGDIANLIANG - data.data[data.data.length-1-1].hangyethree_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyefour_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefour_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyefive_YONGDIANLIANG - data.data[data.data.length-1-1].hangyefive_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyesix_YONGDIANLIANG - data.data[data.data.length-1-1].hangyesix_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyeseven_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeseven_YONGDIANLIANG);
			 a.push(data.data[data.data.length-1].hangyeeagit_YONGDIANLIANG - data.data[data.data.length-1-1].hangyeeagit_YONGDIANLIANG);
		 
		 
		 for(var i = 0;i<data.data.length;i++){
			 category_shenghuo.push(data.data[i].month);
			 category_diyichanye.push(data.data[i].month);
			 category_dierchanye.push(data.data[i].month);
			 category_disanchanye.push(data.data[i].month);
			 category_nonglingmuyuhangye.push(data.data[i].month);
			 category_gongyehangye.push(data.data[i].month);
			 category_jianzhuyehangye.push(data.data[i].month);
			 category_jtccyzhangye.push(data.data[i].month);
			 category_xxjsjrjhangye.push(data.data[i].month);
			 category_pflszscyhangye.push(data.data[i].month);
			 category_jrfdcswjmfwyhangye.push(data.data[i].month);
			 category_ggsyglhangye.push(data.data[i].month);
			 category_chengzhenshenghuo.push(data.data[i].month);
			 category_nongcunshenghuo.push(data.data[i].month);
			 if(i == 0){
				 diyi_data[0].data.push(data.data[i].diyichanye_YONGDIANLIANG);
				 dier_data[0].data.push(data.data[i].dierchanye_YONGDIANLIANG);
				 disan_data[0].data.push(data.data[i].disanchanye_YONGDIANLIANG);
				 nonglingmuyuhangye_data[0].data.push(data.data[i].hangyeone_YONGDIANLIANG);
				 gongyehangye_data[0].data.push(data.data[i].hangyetwo_YONGDIANLIANG);
				 jianzhuyehangye_data[0].data.push(data.data[i].hangyethree_YONGDIANLIANG);
				 jtccyzhangye_data[0].data.push(data.data[i].hangyefour_YONGDIANLIANG);
				 xxjsjrjhangye_data[0].data.push(data.data[i].hangyefive_YONGDIANLIANG);
				 pflszscyhangye_data[0].data.push(data.data[i].hangyesix_YONGDIANLIANG);
				 jrfdcswjmfwyhangye_data[0].data.push(data.data[i].hangyeseven_YONGDIANLIANG);
				 ggsyglhangye_data[0].data.push(data.data[i].hangyeeagit_YONGDIANLIANG);
				 chengzhenshenghuo_data[0].data.push(data.data[i].chengzhengshenghuo_YONGDIANLIANG);
				 nongcunshenghuo_data[0].data.push(data.data[i].nongcunshenghuo_YONGDIANLIANG);
				 shenghuodianli_data[0].data.push(data.data[i].nongcunshenghuo_YONGDIANLIANG);
				 shenghuodianli_data[1].data.push(data.data[i].chengzhengshenghuo_YONGDIANLIANG);
			 }else{
				 diyi_data[0].data.push(data.data[i].diyichanye_YONGDIANLIANG-data.data[i-1].diyichanye_YONGDIANLIANG);
				 dier_data[0].data.push(data.data[i].dierchanye_YONGDIANLIANG-data.data[i-1].dierchanye_YONGDIANLIANG);
				 disan_data[0].data.push(data.data[i].disanchanye_YONGDIANLIANG-data.data[i-1].disanchanye_YONGDIANLIANG);
				 nonglingmuyuhangye_data[0].data.push(data.data[i].hangyeone_YONGDIANLIANG - data.data[i-1].hangyeone_YONGDIANLIANG);
				 gongyehangye_data[0].data.push(data.data[i].hangyetwo_YONGDIANLIANG - data.data[i-1].hangyetwo_YONGDIANLIANG);
				 jianzhuyehangye_data[0].data.push(data.data[i].hangyethree_YONGDIANLIANG - data.data[i-1].hangyethree_YONGDIANLIANG);
				 jtccyzhangye_data[0].data.push(data.data[i].hangyefour_YONGDIANLIANG - data.data[i-1].hangyefour_YONGDIANLIANG);
				 xxjsjrjhangye_data[0].data.push(data.data[i].hangyefive_YONGDIANLIANG - data.data[i-1].hangyefive_YONGDIANLIANG);
				 pflszscyhangye_data[0].data.push(data.data[i].hangyesix_YONGDIANLIANG - data.data[i-1].hangyesix_YONGDIANLIANG);
				 jrfdcswjmfwyhangye_data[0].data.push(data.data[i].hangyeseven_YONGDIANLIANG - data.data[i-1].hangyeseven_YONGDIANLIANG);
				 ggsyglhangye_data[0].data.push(data.data[i].hangyeeagit_YONGDIANLIANG - data.data[i-1].hangyeeagit_YONGDIANLIANG);
				 chengzhenshenghuo_data[0].data.push(data.data[i].chengzhengshenghuo_YONGDIANLIANG - data.data[i-1].chengzhengshenghuo_YONGDIANLIANG);
				 nongcunshenghuo_data[0].data.push(data.data[i].nongcunshenghuo_YONGDIANLIANG - data.data[i-1].nongcunshenghuo_YONGDIANLIANG);
				 shenghuodianli_data[0].data.push(data.data[i].nongcunshenghuo_YONGDIANLIANG - data.data[i-1].nongcunshenghuo_YONGDIANLIANG);
				 shenghuodianli_data[1].data.push(data.data[i].chengzhengshenghuo_YONGDIANLIANG - data.data[i-1].chengzhengshenghuo_YONGDIANLIANG);
			 }
			 diyi_data[1].data.push(data.data[i].diyichanye_YONGDIANLIANG_RATE);
			 dier_data[1].data.push(data.data[i].dierchanye_YONGDIANLIANG_RATE);
			 disan_data[1].data.push(data.data[i].disanchanye_YONGDIANLIANG_RATE);
			 nonglingmuyuhangye_data[1].data.push(data.data[i].hangyeone_YONGDIANLIANG_RATE);
			 gongyehangye_data[1].data.push(data.data[i].hangyetwo_YONGDIANLIANG_RATE);
			 jianzhuyehangye_data[1].data.push(data.data[i].hangyethree_YONGDIANLIANG_RATE);
			 jtccyzhangye_data[1].data.push(data.data[i].hangyefour_YONGDIANLIANG_RATE);
			 xxjsjrjhangye_data[1].data.push(data.data[i].hangyefive_YONGDIANLIANG_RATE);
			 pflszscyhangye_data[1].data.push(data.data[i].hangyesix_YONGDIANLIANG_RATE);
			 jrfdcswjmfwyhangye_data[1].data.push(data.data[i].hangyeseven_YONGDIANLIANG_RATE);
			 ggsyglhangye_data[1].data.push(data.data[i].hangyeeagit_YONGDIANLIANG_RATE);
			 chengzhenshenghuo_data[1].data.push(data.data[i].chengzhengshenghuo_YONGDIANLIANG_RATE);
			 nongcunshenghuo_data[1].data.push(data.data[i].nongcunshenghuo_YONGDIANLIANG_RATE);
		 }
	    });
	$scope.energydianli_shenghuo_option = {
	            options : {
	                colors: ['#0787C8','#3795BC','#1FC22B','#B5DF15','#F6CD00','#FB9705','#F26200'],
	                chart: {
	                    type: 'area',
	                },
	                title: {
	                    text: '城乡生活电力消耗百分比'
	                },
	                xAxis: {
	                	title : {text : '月份'},
	                    categories: category_shenghuo,
	                    tickmarkPlacement: 'on'
	                },
	                yAxis: {
	                    title: {
	                        text: '城乡生活电力消耗百分比(%)'
	                    }
	                },
	                tooltip: {
	                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} 万千瓦时)<br/>',
	                    shared: true
	                },
	                plotOptions: {
	                    area: {
	                        stacking: 'percent',
	                        lineColor: '#ffffff',
	                        lineWidth: 1,
	                        marker: {
	                            lineWidth: 1,
	                            lineColor: '#ffffff'
	                        }
	                    }
	                },
	                credits: {
	                    enabled: false
	                }
	            },
	            series: shenghuodianli_data
	    };

	var pieColors = ['#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200'];
	$scope.energydianli_chanye_option = {
			options: {
				colors:pieColors,
				chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: '分产业电力消耗百分比'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '{point.percentage:.1f} %'
		                },
	                    showInLegend: true
	                }
	            },
	            credits: {
                    enabled: false
                },
			},
			series: [{
	            type: 'pie',
	            data: chanye_data
	        }]
	}
	
	$scope.energydianli_chanye_column_option={
			options:{
				chart:{
					type:'column',
				},
				title:{
					text:'分产业电力消耗量'
				},
				yAxis:[{
					title : {
					text : '电力消耗量(万千瓦时)'
				}}],
				xAxis:{
				
					categories : ["第一产业","第二产业","第三产业"]
				},
				credits:{
					enabled:false
				}
			},
			series:[{
				"name" : "电力消耗量(万千瓦时)",
				"data" : chanye_data_column,
							"type" : 'column',
				"tooltip" : {valueSuffix:'万千瓦时'}
			}]
			};
	
	$scope.energydianli_hangye_option = {
			options: {
				chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            margin: [ 60, 50, 100, 80]
		        },
		        title: {
		            text: '分行业电力消耗百分比(除工业)'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '{point.percentage:.1f} %'
		                },
	                    showInLegend: true
	                }
	            },
	            credits: {
                    enabled: false
                },
			},
			series: [{
	            type: 'pie',
	            data: hangye_alldata
	        }]
	}
	
	$scope.energydianli_hangye_column_option={
			options:{
				 legend: {                                                          
			            enabled: false                                                  
			        },
				chart:{
					type:'column',
					margin: [ 60, 50, 100, 80]
				},
				title:{
					text:'分行业电力消耗量(除工业)'
				},
				yAxis:[{
					title : {
					text : '电力消耗量(万千瓦时)'
				}}],
				xAxis:{
					title : {text : '行业'},
					categories : ["农、林、牧、渔业"
					              ,"建筑业"
					              ,"交通、仓储和邮政业"
					              ,"信息、计算机服务和软件业"
					              ,"批发、住宿和餐饮业"
					              ,"商务及居民服务业"
					              ,"公共事业及管理组织"],
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
			series:[{
				"name" : "电力消耗量(万千瓦时)",
				"data" : a,
							"type" : 'column',
				"tooltip" : {valueSuffix:'万千瓦时'}
			}]
			};
	
	//第一产业图表
	$scope.energydianli_diyichanye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'第一产业电力消耗量'
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_diyichanye
		},
		credits:{
			enabled:false
		}
	},
	series:diyi_data,
	};
	
	//第二产业电力消耗量
	$scope.energydianli_dierchanye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'第二产业电力消耗量'
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_dierchanye
		},
		credits:{
			enabled:false
		}
	},
	series:dier_data,
	};
	
	//第三产业电力消耗量
	$scope.energydianli_disanchanye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'第三产业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_disanchanye
		},
		credits:{
			enabled:false
		}
	},
	series:disan_data,
	};
	
	//农林牧渔业电力消耗
	$scope.energydianli_nonglingmuyuhangye_option={
	options:{
		chart:{
			type:'line',
			
		},
		title:{
			text:'农、林、牧、渔业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_nonglingmuyuhangye
		},
		credits:{
			enabled:false
		}
	},
	series:nonglingmuyuhangye_data,
	};
	
	//工业用电量
	$scope.energydianli_gongyehangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'工业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_gongyehangye
		},
		credits:{
			enabled:false
		}
	},
	series:gongyehangye_data,
	};
	
	//建筑业用电量
	$scope.energydianli_jianzhuyehangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'建筑业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_jianzhuyehangye
		},
		credits:{
			enabled:false
		}
	},
	series:jianzhuyehangye_data,
	};
	
	//交通运输、仓储和邮政业用电量
	$scope.energydianli_jtccyzhangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'交通运输、仓储和邮政业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_jtccyzhangye
		},
		credits:{
			enabled:false
		}
	},
	series:jtccyzhangye_data,
	};
	
	//信息传输、计算机服务和软件业用电量
	$scope.energydianli_xxjsjrjhangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'信息传输、计算机服务和软件业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_xxjsjrjhangye
		},
		credits:{
			enabled:false
		}
	},
	series:xxjsjrjhangye_data,
	};
	
	//批发和零售、住宿和餐饮业用电量
	$scope.energydianli_pflszscyhangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'批发和零售、住宿和餐饮业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_pflszscyhangye
		},
		credits:{
			enabled:false
		}
	},
	series:pflszscyhangye_data,
	};
	
	//金融、房地产、商务及居民服务业用电量
	$scope.energydianli_jrfdcswjmfwyhangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'金融、房地产、商务及居民服务业电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_jrfdcswjmfwyhangye
		},
		credits:{
			enabled:false
		}
	},
	series:jrfdcswjmfwyhangye_data,
	};
	
	//公共事业及管理组织用电量
	$scope.energydianli_ggsyglhangye_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'公共事业及管理组织电力消耗量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_ggsyglhangye
		},
		credits:{
			enabled:false
		}
	},
	series:ggsyglhangye_data,
	};
	
	//城镇生活用电量
	$scope.energydianli_chengzhenshenghuo_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'城镇生活用电量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_chengzhenshenghuo
		},
		credits:{
			enabled:false
		}
	},
	series:chengzhenshenghuo_data,
	};
	
	//农村生活用电量
	$scope.energydianli_nongcunshenghuo_option={
	options:{
		chart:{
			type:'line',
		},
		title:{
			text:'农村生活用电量',
		},
		yAxis:[{
			title : {
			text : '电力消耗量(万千瓦时)'
		}},
		{
			title : {
			text : '用电量累计比上年同期增加%'
		},opposite: true}],
		xAxis:{
			title : {text : '月份'},
			categories : category_nongcunshenghuo
		},
		credits:{
			enabled:false
		}
	},
	series:nongcunshenghuo_data,
	};
	});
	});	
	}
	
	kpiDetailService.query("EnergydianliData","2014-01-01","2014-12-31",processFunction);
});