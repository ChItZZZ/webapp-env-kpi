'use strict';

/**
 * @ngdoc function
 * @name iocUiApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the iocUiApp
 */
angular.module('app').controller('dianlixiaohaoBI', function($scope,kpiDetailService,dateService) {
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var category_yuefen = [1,2,3,4,5,6,7,8,9,10,11,12];
	
		var tableName='EduGuaranteeData';
		
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
		var processFunction = function(data){
			console.log(JSON.stringify(data));}
		
	 $http.get(
      "/KPIData/TableLastestDate?kpitype=year_month&tableName=com.tj.kpi.entity.data.ElcBIData",{params : {'token' : $rootScope.token}}).success(
			function(data) {
				data = data.data[0];
				//alert(JSON.stringify(data));
				var fromyear = parseFloat(data.year)-1;
				var toyear = fromyear+1;
				var tableName='dianlixiaohaoBIData';
				
				kpiDetailService.query(tableName,startDate,endDate,processFunction);
						//alert(JSON.stringify(data));
						var year = toyear;
						var allsetelc = [];
						var allseteco = [];
						var trainsetelc = [];
						var trainseteco = [];
						for(var i=0;i<data.length;i++){
							if(data[i].name == 'a'){
								allsetelc.push(data[i].elc);
								allseteco.push(data[i].eco);
							}
						}
						
						var a=0;
						if(allsetelc.length>12){
							a=12;
						}else{
							a=allsetelc.length;
						}
 						for(var i=a;i>0;i--){
							trainsetelc.push(allsetelc[allsetelc.length-i]);
							trainseteco.push(allseteco[allseteco.length-i]);
						}
 						
 						 $http.get("/KPIData/CalculateData/7003"+"?trainsetelc="+trainsetelc+"&trainseteco="+trainseteco+"&type=1",{params : {'token' : $rootScope.token}}).success(function(redata) {
 							if(redata.error=="No_Rights_Error"){
 								$location.path("/login");}
 							//alert(JSON.stringify(redata));
 							redata=eval(redata.data);
 							var x=[];
 							var y=[];
 					
 							for(var i=0;i<redata.length/2;i++){
 								x.push(parseFloat(redata[i]));
 								y.push(parseFloat(redata[i+redata.length/2]));
 							}
 						
 							//一句话解读
 							$scope.nextelc = x[x.length-1];
 							$scope.nexteco = y[y.length-1];
 							$scope.bizhi = parseFloat($scope.nextelc/$scope.nexteco).toFixed(2);
 							var an = parseFloat(($scope.bizhi-(x[x.length-2]/y[y.length-2]))/(x[x.length-2]-y[y.length-2])).toFixed(2);
 							if(an>0.2){
 								$scope.an = "会";
 							}else{
 								$scope.an = "不会";
 							}
 							
 							for(var i=0;i<y.length-1;i++){
 								y[i]={y:y[i],name:(i+1)+'月份实际值'}
 							}
 							
 							var yuce = {y:y[y.length-1],color:'#1FC22B',name:y.length+'月份预测值'};
 							y[y.length-1] = yuce;
 							$scope.dianli_chanzhi_option={
 									options:{
 										legend: {                                                          
 								            enabled: false                                                  
 								        },
 										chart:{
 											type:'line',
 										},
 										title:{
 											text:null,
 										},
 										yAxis:[{
 											title : {
 											text : '产值(万元)'
 										}}],
 										xAxis:{
 											title : {text : '用电量(万千瓦时)'},
 											categories : x
 										},
 										tooltip: {
 								            pointFormat: '{point.category}万千瓦时<br>{point.y} '
 								        },
 								       
 										credits:{
 											enabled:false
 										}
 									},
 									series:[{
 										"name" : "产值",
 										"data" : y,
 										"type" : 'line',
 										"tooltip" : {valueSuffix:'万元'}
 									}]
 									}
 							var x1=[]
 							for(var i=0;i<x.length-1;i++){
 								x1[i]={y:x[i],name:(i+1)+'月份实际值'}
 							}
 							var yucex = {y:x1[x.length-1],color:'#1FC22B',name:x.length+'月份预测值'};
 							x1[x.length-1] = yuce;
 							var dianli_chanzhi_shijian_data = [{
 								"name" : "用电量",
 								"data" : x1,
 								"yAxis": 0,
 								"type" : 'column',
 								"tooltip" : {valueSuffix:'万千瓦时'}
 							},
 							{
 								"name" : "产值",
 								"data" : y,
 								"yAxis": 1,
 								"type" : 'spline',
 								"tooltip" : {valueSuffix:'万元'}
 							}];
 							$scope.dianli_chanzhi_shijian_option={
 									options:{
 										legend: {                                                          
 								            enabled: false                                                  
 								        },
 										chart:{
 											type:'line',
 										},
 										title:{
 											text:null,
 										},
 										yAxis:[{
 											title : {
 											text : '电力消耗量(万千瓦时)'
 										}},
 										{
 											title : {
 											text : '产值(万元)'
 										},opposite: true}],
 										xAxis:{
 											title : {text : '月份'},
 											categories : category_yuefen
 										},
 										credits:{
 											enabled:false
 										}
 									},
 									series:dianli_chanzhi_shijian_data,
 									};
 						$http.get('/KPIData/DetailsSpanData/7003'+'?fromYear='+toyear+'&toYear='+toyear+'&fromMonth='+month+'&toMonth='+month,{params : {'token' : $rootScope.token}}).success(function(dataone) {
 								if(dataone.error=="No_Rights_Error"){
 									$location.path("/login");}
 								dataone = dataone.data;
 								$scope.eps = [];
 								var onetrainsetelc=[];
	 							var onetrainseteco=[];
	 							var name=[];
 								for(var i=0;i<dataone.length;i++){
 									var onesetelc=[];
 	 								var oneseteco=[];
 	 								name.push(dataone[i].name);
 									for(var j=0;j<data.length;j++){
 										if(data[j].name == dataone[i].name){
 											onesetelc.push(data[j].elc);
 											oneseteco.push(data[j].eco);
 										}
 									}
 									var a=0;
 									if(onesetelc.length>12){
 										a=12;
 									}else{
 										a=onesetelc.length;
 									}
 									onetrainsetelc[i]={
 										name:null,
 										data:[]
 									};
 									onetrainseteco[i]={
 	 									name:null,
 	 									data:[]
 	 								};
 			 						for(var m=a;m>0;m--){
 			 							onetrainsetelc[i].name = dataone[i].name;
 			 							onetrainseteco[i].name = dataone[i].name;
 										onetrainsetelc[i].data.push(onesetelc[onesetelc.length-m]);
 										onetrainseteco[i].data.push(oneseteco[oneseteco.length-m]);
 									}
 								}
 								//alert(JSON.stringify(onetrainsetelc));
 								
 									$http.get("/KPIData/CalculateData/7003"+"?trainsetelc="+name+"&trainseteco=0"+"&type=0",{params : {'token' : $rootScope.token}}).success(function(onedata) {
 										if(onedata.error=="No_Rights_Error"){
 											$location.path("/login");}
 										onedata=eval(onedata.data);
 										$scope.epsdata =onedata;
 										for(var i=0;i<onedata.length;i++){
	 										var ep = {
	 		 			 							name:null,
	 		 			 							benyueelc:null,
	 		 			 							benyueeco:null,
	 		 			 							xiayueelc:null,
	 		 			 							xiayueeco:null
	 		 			 						};
	 									
	 										
	 										ep.name = onedata[i].name;
	 										ep.benyueelc = onedata[i].xdata[onedata[i].xdata.length-2];
	 										ep.benyueeco = onedata[i].ydata[onedata[i].ydata.length-2];
	 										ep.xiayueelc = onedata[i].xdata[onedata[i].xdata.length-1];
	 										ep.xiayueeco = onedata[i].ydata[onedata[i].ydata.length-1];
	 										$scope.eps.push(ep);
 										}
 									});
 								
 								
 							});
 							
 						});
 						
				});
			});
	
	$scope.epdetails=function(ep){		
			var x = [];
			var y = [];
			$scope.name=ep.name;
			for(var i=0;i<$scope.epsdata.length;i++){
				if(ep.name == $scope.epsdata[i].name){
					for(var j=0;j<$scope.epsdata[i].xdata.length;j++){
						x.push($scope.epsdata[i].xdata[j]);
						y.push($scope.epsdata[i].ydata[j]);
					}
				}
			}
			var tempx=x.concat();
			var tempy=y.concat();
			for(var i=0;i<y.length-1;i++){
					y[i]={y:y[i],name:(i+1)+'月份实际值'}
				}
			var yuce = {y:y[y.length-1],color:'#1FC22B',name:y.length+'月份预测值'};
			y[y.length-1] = yuce;
			$scope.dianli_chanzhi_one_option={
					options:{
						legend: {                                                          
				            enabled: false                                                  
				        },
						chart:{
							type:'line',
						},
						title:{
							text:null,
						},
						yAxis:[{
							title : {
							text : '产值(万元)'
						}}],
						xAxis:{
							title : {text : '用电量(万千瓦时)'},
							categories : x
						},
						tooltip: {
				            pointFormat: '{point.category}万千瓦时<br>{point.y} '
				        },
				       
						credits:{
							enabled:false
						}
					},
					series:[{
						"name" : "产值",
						"data" : y,
						"type" : 'line',
						"tooltip" : {valueSuffix:'万元'}
					}]
					}
			var x1=[]
			for(var i=0;i<x.length-1;i++){
				x1[i]={y:x[i],name:(i+1)+'月份实际值'}
			}
			var yucex = {y:x1[x.length-1],color:'#1FC22B',name:x.length+'月份预测值'};
			x1[x.length-1] = yuce;
			var dianli_chanzhi_shijian_data = [{
				"name" : "用电量",
				"data" : x1,
				"yAxis": 0,
				"type" : 'column',
				"tooltip" : {valueSuffix:'万千瓦时'}
			},
			{
				"name" : "产值",
				"data" : y,
				"yAxis": 1,
				"type" : 'spline',
				"tooltip" : {valueSuffix:'万元'}
			}];
			
			$scope.dianli_chanzhi_shijian_one_option={
					options:{
						legend: {                                                          
				            enabled: false                                                  
				        },
						chart:{
							type:'line',
						},
						title:{
							text:null,
						},
						yAxis:[{
							title : {
							text : '电力消耗量(万千瓦时)'
						}},
						{
							title : {
							text : '产值(万元)'
						},opposite: true}],
						xAxis:{
							title : {text : '月份'},
							categories : category_yuefen
						},
						credits:{
							enabled:false
						}
					},
					series:dianli_chanzhi_shijian_data,
					};
			
			var allx = [];
			var ally = [];
			for(var i=0;i<$scope.epsdata.length;i++){
				if($scope.epsdata[i].name == "a"){
					for(var j=0;j<$scope.epsdata[i].xdata.length;j++){
						allx.push($scope.epsdata[i].xdata[j]);
						ally.push($scope.epsdata[i].ydata[j]);
					}
				}
			}
			$scope.epp_dianli_data = [['预计该企业用电量',tempx[tempx.length-1]],['预计其他企业用电量',allx[allx.length-1]-tempx[tempx.length-1]]];
			$scope.epp_dianli_option = {
					options: {
						chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false
				        },
				        title: {
				            text: null
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
			            data: $scope.epp_dianli_data
			        }]
			}
			$scope.epp_chanzhi_data = [['预计该企业产值',tempy[tempy.length-1]],['预计其他企业产值',ally[ally.length-1]-tempy[tempy.length-1]]];
			$scope.epp_chanzhi_option = {
					options: {
						chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false
				        },
				        title: {
				            text: null
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
			            data: $scope.epp_chanzhi_data
			        }]
			}
			
		
		$scope.elc=tempx[tempx.length-1];
		$scope.elc_rate=parseFloat((tempx[tempx.length-1]-tempx[tempx.length-2])/tempx[tempx.length-2]).toFixed(2);
		$scope.eco=tempy[tempy.length-1];
		$scope.eco_rate=parseFloat((tempy[tempy.length-1]-tempy[tempy.length-2])/tempy[tempy.length-2]).toFixed(2);
		$('#detailsModal').modal();
	};
});