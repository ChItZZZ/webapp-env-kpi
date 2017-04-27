'use strict';

angular.module('app').controller('gdsTransCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/GoodsTranspData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var startDate = dateService.formatDate(moment(recentTime).startOf('year'));  //alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));   //alert(endDate);
		var tableName='GoodsTranspData';
		
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
	});
	
	var pieColors = new Array('#009ACD', '#EE4000');
	$scope.gdsTrckNumLastMonthList = [];
	$scope.gdsTrckTngLastMonthList = [];
	$scope.TrckLastMonth;
	
	//charts data
	var monthData = [];
	var gdsTrckNumPieChartData = [];
	$scope.gdsTrckNumList = [];
	$scope.gdsTrckTngList = [];
	
	highchartsConfiguration();
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var processFunction = function(raw){
		
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var ordnryGdsTrckNumList = [];
		var dngrsGdsTrckNumList = [];
		var ordnryGdsTrckTngList = [];
		var dngrsGdsTrckTngList = [];
		
		$scope.displayYear = new Date(data[data.length-1].applyTime).getFullYear();
		
		$scope.gdsTrckNumKindColumnChart.title.text = $scope.displayYear+'年各月份普通货车存量情况';
		$scope.gdsTrckTngKindColumnChart.title.text = $scope.displayYear+'年各月份普通货车吨位数情况';
		
		var applyDate;
		
		for(var i=0; i<data.length; i++){
			ordnryGdsTrckNumList.push(parseInt(data[i].ordnryGdsTrckNum));
			dngrsGdsTrckNumList.push(parseInt(data[i].dngrsGdsTrckNum));
			ordnryGdsTrckTngList.push(parseInt(data[i].ordnryGdsTrckTng));
			dngrsGdsTrckTngList.push(parseInt(data[i].dngrsGdsTrckTng));
			
			applyDate = new Date(data[i].applyTime);
			monthData.push(applyDate.getMonth()+1);
		}
	
		gdsTrckNumPieChartData.push({
			name: '普通货车',
			y: ordnryGdsTrckNumList[data.length-1]
		});
		gdsTrckNumPieChartData.push({
			name: '危险品货车',
			y: dngrsGdsTrckNumList[data.length-1]
		});
		$scope.gdsTrckNumLastMonthList.push({
			name: '普通货车',
			number: ordnryGdsTrckNumList[data.length-1]
		});
		$scope.gdsTrckNumLastMonthList.push({
			name: '危险品货车',
			number: dngrsGdsTrckNumList[data.length-1]
		});
		$scope.gdsTrckNumLastMonthList.push({
			name: '合计',
			number: (ordnryGdsTrckNumList[data.length-1]+dngrsGdsTrckNumList[data.length-1])
		});
		$scope.TrckLastMonth = monthData[data.length-1];
		$scope.gdsTrckNumPieChart.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月货车存量分布情况";
		$scope.gdsTrckNumList.push({
			name: '普通货车',
			data: ordnryGdsTrckNumList
		});
		$scope.gdsTrckNumList.push({
			name: '危险品货车',
			data: dngrsGdsTrckNumList
		});
		$scope.gdsTrckKindSelected = $scope.gdsTrckNumList[0].name;
		$scope.gdsTrckNumKindColumnChart.series[0].data = $scope.gdsTrckNumList[0].data;
		$scope.gdsTrckTngList.push({
			name: '普通货车吨位数',
			data: ordnryGdsTrckTngList
		});
		$scope.gdsTrckTngList.push({
			name: '危险品货车吨位数',
			data: dngrsGdsTrckTngList
		});
		$scope.gdsTrckTngLastMonthList.push({
			name: '普通货车',
			number: ordnryGdsTrckTngList[data.length-1]
		});
		$scope.gdsTrckTngLastMonthList.push({
			name: '危险品货车',
			number: dngrsGdsTrckTngList[data.length-1]
		});
		$scope.gdsTrckTngKindSelected = $scope.gdsTrckTngList[0].name;
		$scope.gdsTrckTngKindColumnChart.series[0].data = $scope.gdsTrckTngList[0].data;
	};
	
	//highcharts
	function highchartsConfiguration(){
		$scope.gdsTrckNumPieChart = {
			    options:{
			        colors: pieColors,
			        credits: {
			            enabled: false
			        },
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false
			        },
			        title: {
			            text: ''
			        },
			        tooltip: {
			    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			                }
			            }
			        }
			    },
			    series: [{
		            type: 'pie',
		            name: '占比',
		            data: gdsTrckNumPieChartData
		        }]
			};
		$scope.gdsTrckNumKindColumnChart = {
				options:{
					credits: {
						enabled: false
						},
					chart: {
			            type: 'column'
			        },
			        xAxis: {
			            title: {
				                text: '月份'
				            },
			            categories: monthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '货车数 (辆)'
			            },
			            labels: {
							formatter: function() {
								return this.value
							}
						}
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.0f}辆</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        },
			        legend: {                                                          
			            enabled: false                                                  
			        }
				},
		        title: {
		            text: ''
		        },
				series: [{
			            name: '货车数',
			            data: []
			    }]
			};
		$scope.gdsTrckTngKindColumnChart = {
				options:{
					credits: {
						enabled: false
						},
					chart: {
			            type: 'column'
			        },
			        xAxis: {
			            title: {
				                text: '月份'
				            },
			            categories: monthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '货车吨位数 (吨)'
			            },
			            labels: {
							formatter: function() {
								return this.value
							}
						}
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.0f}吨</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        },
			        legend: {                                                          
			            enabled: false                                                  
			        }
				},
		        title: {
		            text: ''
		        },
				series: [{
			            name: '吨位数',
			            data: []
			    }]
			};
	}
	//redio 点击事件()
		$scope.gdsTrckKindChange = function(gdsTrckNumOne){
			$scope.gdsTrckNumKindColumnChart.title.text = $scope.displayYear+"年各月份"+gdsTrckNumOne.name+"存量情况";
			$scope.gdsTrckNumKindColumnChart.series[0].data = gdsTrckNumOne.data;
		};
		$scope.gdsTrckTngKindChange = function(gdsTrckTngOne){
			$scope.gdsTrckTngKindColumnChart.title.text = $scope.displayYear+"年各月份"+gdsTrckTngOne.name+"情况";
			$scope.gdsTrckTngKindColumnChart.series[0].data = gdsTrckTngOne.data;
		};

});