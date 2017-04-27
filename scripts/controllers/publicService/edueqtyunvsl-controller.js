'use strict';

angular.module('app').controller('eduEquityUniversalCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	//var sysTime = new Date(dateService.get_system_time());
	
	var recentTime;
	$http.post("/api/data/EduEquityUniversalData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var startOprtr = new Date(recentTime);
		var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('year')); // alert(endDate);
		var tableName='EduEquityUniversalData';
		
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
	});

	
//	alert(sysTime);
//	alert(startDate);
//	alert(endDate);
	
	//charts data
	var yearData = [];
	$scope.eduUniversalList = [];
	$scope.eduEquityIndexList = [];
//	$scope.eduEquityFundsList = [];
	
	//显示最新一年的数据
	$scope.eduUniversalLastYearList = [];
	$scope.eduEquityIndexLastYearList = [];
//	$scope.eduEquityFundsLastYearList = [];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var processFunction = function(raw){
//		alert(JSON.stringify(data));
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var prschlEduThrYrRateList = [];
		var cmplsryEduStrngthnRateList = [];
		var hghSchlEnrllmntRateList = [];
		var hghrEduEnrllmntRateList = [];
		
		var dffIndxBtwnPrmrySchlCndList = [];
		var dffIndxBtwnMddlSchlCndList = [];
//		var fnclPrschlFndsPrcntgList = [];
//		var fnclHghSchlFndsPrcntgList = [];
		
		var applyDate;
		
		for(var i=0; i<data.length; i++){
			prschlEduThrYrRateList.push(data[i].prschlEduThrYrRate);
			cmplsryEduStrngthnRateList.push(data[i].cmplsryEduStrngthnRate);
			hghSchlEnrllmntRateList.push(data[i].hghSchlEnrllmntRate);
			hghrEduEnrllmntRateList.push(data[i].hghrEduEnrllmntRate);
			
			dffIndxBtwnPrmrySchlCndList.push(data[i].dffIndxBtwnPrmrySchlCnd);
			dffIndxBtwnMddlSchlCndList.push(data[i].dffIndxBtwnMddlSchlCnd);
			
//			fnclPrschlFndsPrcntgList.push(data[i].fnclPrschlFndsPrcntg);
//			fnclHghSchlFndsPrcntgList.push(data[i].fnclHghSchlFndsPrcntg);
			
			applyDate = new Date(data[i].applyTime);
			yearData.push(applyDate.getFullYear());
		}
		
		$scope.eduUniversalLastYear = yearData[data.length-1];
		
		$scope.eduUniversalLastYearList.push({
			name: '学前三年教育毛入园率',
			number: prschlEduThrYrRateList[data.length-1],
			target:0
		});
		$scope.eduUniversalLastYearList.push({
			name: '义务教育巩固率',
			number: cmplsryEduStrngthnRateList[data.length-1],
			target:0
		});
		$scope.eduUniversalLastYearList.push({
			name: '高中阶段教育毛入学率',
			number: hghSchlEnrllmntRateList[data.length-1],
			target:0
		});
		$scope.eduUniversalLastYearList.push({
			name: '十九周岁人口高等教育入学率',
			number: hghrEduEnrllmntRateList[data.length-1],
			target:0
		});
		
		$scope.eduUniversalList.push({
			name: '学前三年教育毛入园率',
			data: prschlEduThrYrRateList,
			comment: ''
		});
		$scope.eduUniversalList.push({
			name: '义务教育巩固率',
			data: cmplsryEduStrngthnRateList,
			comment: ''
		});
		$scope.eduUniversalList.push({
			name: '高中阶段教育毛入学率',
			data: hghSchlEnrllmntRateList,
			comment: ''
		});
		$scope.eduUniversalList.push({
			name: '十九周岁人口高等教育入学率',
			data: hghrEduEnrllmntRateList,
			comment: ''
		});
		$scope.eduUniversalKindSelected = $scope.eduUniversalList[0].name;
		$scope.eduUniversalByKindColumnChart.series[0].data = $scope.eduUniversalList[0].data;
		$scope.eduUniversalByKindColumnChart.series[0].name = $scope.eduUniversalList[0].name;
		$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = $scope.eduUniversalList[0].name+"(%)";
		
		$scope.eduEquityIndexLastYearList.push({
			name: '小学办学条件校际均衡差异系数',
			number: dffIndxBtwnPrmrySchlCndList[data.length-1]
		});
		$scope.eduEquityIndexLastYearList.push({
			name: '初中办学条件校际均衡差异系数',
			number: dffIndxBtwnMddlSchlCndList[data.length-1]
		});
		$scope.eduEquityIndexList.push({
			name: '小学办学条件校际均衡差异系数',
			data: dffIndxBtwnPrmrySchlCndList,
			comment: ''
		});
		$scope.eduEquityIndexList.push({
			name: '初中办学条件校际均衡差异系数',
			data: dffIndxBtwnMddlSchlCndList,
			comment: ''
		});
		$scope.eduEquityIndexKindSelected = $scope.eduEquityIndexList[0].name;
		$scope.eduEquityIndexKindColumnChart.series[0].data = $scope.eduEquityIndexList[0].data;
		$scope.eduEquityIndexKindColumnChart.series[0].name = $scope.eduEquityIndexList[0].name;
		
//		$scope.eduEquityFundsLastYearList.push({
//			name: '财政性学前教育经费占同级财政性教育经费的比例',
//			number: fnclPrschlFndsPrcntgList[data.length-1]
//		});
//		$scope.eduEquityFundsLastYearList.push({
//			name: '高中阶段财政性教育经费占高中阶段教育经费比例',
//			number: fnclHghSchlFndsPrcntgList[data.length-1]
//		});
//		$scope.eduEquityFundsList.push({
//			name: '财政性学前教育经费占同级财政性教育经费的比例',
//			data: fnclPrschlFndsPrcntgList,
//			comment: ''
//		});
//		$scope.eduEquityFundsList.push({
//			name: '高中阶段财政性教育经费占高中阶段教育经费比例',
//			data: fnclHghSchlFndsPrcntgList,
//			comment: ''
//		});
//		$scope.eduEquityFundsKindSelected = $scope.eduEquityFundsList[0].name;
//		$scope.eduEquityFundsKindColumnChart.series[0].data = $scope.eduEquityFundsList[0].data;
//		$scope.eduEquityFundsKindColumnChart.series[0].name = $scope.eduEquityFundsList[0].name;
		
		
	};
	
	//highcharts
	$scope.eduUniversalByKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {text : '年份'},
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年学前三年教育毛入园率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	
	$scope.eduEquityIndexKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '办学条件校际均衡差异系数'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
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
	            text: '近五年小学办学条件校际均衡差异系数情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	
//	$scope.eduEquityFundsKindColumnChart = {
//			options:{
//				credits: {
//					enabled: false
//					},
//				chart: {
//		            type: 'column'
//		        },
//		        xAxis: {
//		            title: {
//			                text: '年份'
//			            },
//		            categories: yearData
//		        },
//		        yAxis: {
//		            min: 0,
//		            title: {
//		                text: '教育经费占比(%)'
//		            }
//		        },
//		        tooltip: {
//		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
//		            footerFormat: '</table>',
//		            shared: true,
//		            useHTML: true
//		        },
//		        plotOptions: {
//		            column: {
//		                pointPadding: 0.2,
//		                borderWidth: 0
//		            }
//		        },
//		        legend: {                                                          
//		            enabled: false                                                  
//		        }
//			},
//	        title: {
//	            text: '近五年财政性学前教育经费占同级财政性教育经费的比例情况'
//	        },
//			series: [{
//		            name: '',
//		            data: []
//		    }]
//		};
	
	//redio 点击事件
		$scope.eduUniversalKindChange = function(eduUniversalOne){
			$scope.eduUniversalByKindColumnChart.title.text = "近五年"+eduUniversalOne.name+"情况";
			$scope.eduUniversalByKindColumnChart.series[0].data = eduUniversalOne.data;
			$scope.eduUniversalByKindColumnChart.series[0].name = eduUniversalOne.name;
			$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = eduUniversalOne.name+"(%)";
			$scope.eduUniversalCommentSelected = eduUniversalOne.comment;
		};

		$scope.eduEquityIndexKindChange = function(eduEquityIndexOne){
			$scope.eduEquityIndexKindColumnChart.title.text = "近五年"+eduEquityIndexOne.name+"情况";
			$scope.eduEquityIndexKindColumnChart.series[0].name = eduEquityIndexOne.name;
			$scope.eduEquityIndexKindColumnChart.series[0].data = eduEquityIndexOne.data;
			$scope.eduEquityIndexCommentSelected = eduEquityIndexOne.comment;
		};
		
//		$scope.eduEquityFundsKindChange = function(eduEquityFundsOne){
//			$scope.eduEquityFundsKindColumnChart.title.text = "近五年"+eduEquityFundsOne.name+"情况";
//			$scope.eduEquityFundsKindColumnChart.series[0].name = eduEquityFundsOne.name;
//			$scope.eduEquityFundsKindColumnChart.series[0].data = eduEquityFundsOne.data;
//			$scope.eduEquityFundsCommentSelected = eduEquityFundsOne.comment;
//		};

});