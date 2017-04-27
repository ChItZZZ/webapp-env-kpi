'use strict';

angular.module('app').controller('DriverTrainCtrl', function($scope,kpiDetailService,inform,dateService,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/DriveTrainData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var tableName ='DriveTrainData';
		var startDate = dateService.formatDate(moment(recentTime).startOf('year')); // alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));  // alert(endDate);
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
	});
	
	//var aa = moment(dateService.get_system_time()).endOf('month');
	
	//alert(startDate);
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	
	$scope.driverTrainLastMonth = [];
	$scope.driverTrainMsgLastMonthList = [];
	$scope.driverTrainList = [];
	var monthData = [];
	var processFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var newDriverNumList = [];
		var coachNumList = [];
		var coachCarNumList = [];
		var prcntgList = [];
		
		var applyDate;
		
		$scope.displayYear = new Date(data[data.length-1].applyTime).getFullYear();
		
		for(var i=0; i<data.length; i++){
			newDriverNumList.push(parseInt(data[i].newDriverNum));
			coachNumList.push(parseInt(data[i].coachNum));
			coachCarNumList.push(parseInt(data[i].coachCarNum));
			prcntgList.push(parseFloat(data[i].prcntgOfNewEnrgyRsrcsCoachCar));
			applyDate = new Date(data[i].applyTime);
			//alert(applyDate.getMonth());
			monthData.push(applyDate.getMonth()+1);
		}
		
		$scope.driverTrainMsgLastMonthList.push({
			name: '毕业学员数',
			number: newDriverNumList[data.length-1]+"人"
		});
		$scope.driverTrainMsgLastMonthList.push({
			name: '教练员数',
			number: coachNumList[data.length-1]+"人"
		});
		$scope.driverTrainMsgLastMonthList.push({
			name: '教练车数',
			number: coachCarNumList[data.length-1]+"辆"
		});
		$scope.driverTrainMsgLastMonthList.push({
			name: '新(清洁)能源车占比',
			number: prcntgList[data.length-1]+"%"
		});
		$scope.driverTrainLastMonth = monthData[data.length-1];
		
		$scope.driverTrainList.push({
			name: '毕业学员数',
			data: newDriverNumList
		});
		$scope.driverTrainList.push({
			name: '教练员数',
			data: coachNumList
		});
		$scope.driverTrainList.push({
			name: '教练车数',
			data: coachCarNumList
		});
		$scope.driverTrainList.push({
			name: '教练车中新(清洁)能源车占比',
			data: prcntgList
		});
		
		$scope.driverTrainKindSelected = $scope.driverTrainList[0].name;
		$scope.driverTrainKindColumnChart.series[0].data = $scope.driverTrainList[0].data;
		$scope.driverTrainKindColumnChart.series[0].name = $scope.driverTrainList[0].name;
		$scope.driverTrainKindColumnChart.title.text = $scope.displayYear+"年各月份毕业学员数情况";
	};
	
	//highcharts
	$scope.driverTrainKindColumnChart = {
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
		                text: '毕业学员数 (人)'
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
		                '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>',
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
		            name: '',
		            data: []
		    }]
		};
	
	//redio 点击事件()
		$scope.driverTrainKindChange = function(driverTrainOne){
			$scope.driverTrainKindColumnChart.title.text = $scope.displayYear+"年各月份"+driverTrainOne.name+"情况";
			$scope.driverTrainKindColumnChart.series[0].name = driverTrainOne.name;
			$scope.driverTrainKindColumnChart.series[0].data = driverTrainOne.data;
			
			switch(driverTrainOne.name.trim()){
			case '毕业学员数':
				{
				$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(人)";
				$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>';
				}
				
				break;
			case '教练员数':
				{
				$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(人)";
				$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>';
				}
				
				break;
			case '教练车数':
				{
				$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(辆)";
				$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}辆</b></td></tr>';
				}
				
				break;
			case '教练车中新(清洁)能源车占比':
				{
				$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(%)";
				$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>';
				}
				
				break;
			}
			
		};

});