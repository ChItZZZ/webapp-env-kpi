'use strict';

angular.module('app').controller('eduQualityContribCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/EduQualityContribData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var startOprtr = new Date(recentTime);
		var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('year'));  //alert(endDate);
		var tableName='EduQualityContribData';
		
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
	});
	
	//table data
	$scope.studyQualityLastYearList =[];
	$scope.schoolQualityLastYearList =[];
	$scope.contribLastYearList =[];
	$scope.enrollLastYearList =[];//
	
	//chartData
	var yearData = [];
	$scope.studyQuality = [];
	$scope.schoolQuality = [];
	$scope.contrib = [];
	$scope.enroll=[];//
	
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var processFunction = function(raw){
		
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var prmryPssRateList = [];
		var mdlPssRateList = [];
		var hghPssRateList = [];
		var trdSchlDblCrtfctRateList = [];
		
		var hghQultyKndrgrtnPrcntgList = [];
		var stndrdCmplsryEduSchlPrcntgList = [];
		var thrStrLvlHghSchlPrcntgList = [];
		
		var newLaborAvrgEduYearList = [];
		var mainLaborAvrgEduYearList = [];
		var mainLaborHghEduPrcntgList = [];
		var trdSchlGrdtEmplymntRateList = [];
		
		var commonCollegeEnrollRateList=[];//
		var commonCollegeUgrEnrollRateList=[];//
		var highSchlGrdtEmplymntRateList=[];//
		
		var applyDate;
		
		for(var i=0; i<data.length; i++){
			
			prmryPssRateList.push(data[i].prmryPssRate);
			mdlPssRateList.push(data[i].mdlPssRate);
			hghPssRateList.push(data[i].hghPssRate);
			trdSchlDblCrtfctRateList.push(data[i].trdSchlDblCrtfctRate);
			
			hghQultyKndrgrtnPrcntgList.push(data[i].hghQultyKndrgrtnPrcntg);
			stndrdCmplsryEduSchlPrcntgList.push(data[i].stndrdCmplsryEduSchlPrcntg);
			thrStrLvlHghSchlPrcntgList.push(data[i].thrStrLvlHghSchlPrcntg);
			
			newLaborAvrgEduYearList.push(data[i].newLaborAvrgEduYear);
			mainLaborAvrgEduYearList.push(data[i].mainLaborAvrgEduYear);
			mainLaborHghEduPrcntgList.push(data[i].mainLaborHghEduPrcntg);
			trdSchlGrdtEmplymntRateList.push(data[i].trdSchlGrdtEmplymntRate);
			
			commonCollegeEnrollRateList.push(data[i].commonCollegeEnrollRate);//
			commonCollegeUgrEnrollRateList.push(data[i].commonCollegeUgrEnrollRate);//
			highSchlGrdtEmplymntRateList.push(data[i].highSchlGrdtEmplymntRate);//
			
			applyDate = new Date(data[i].applyTime);
			yearData.push(applyDate.getFullYear());
		}
		$scope.lastYear = yearData[data.length-1];
		$scope.studyQuality.push({
			name: '小学学业合格率',
			data: prmryPssRateList,
			comment: ''
		});
		$scope.studyQuality.push({
			name: '初中学业合格率',
			data: mdlPssRateList,
			comment: ''
		});
		$scope.studyQuality.push({
			name: '普通高中学业合格率',
			data: hghPssRateList,
			comment: ''
		});
		$scope.studyQuality.push({
			name: '中等职业学校毕业生双证书获取率',
			data: trdSchlDblCrtfctRateList,
			comment: ''
		});
		$scope.studyQualityKindSelected = $scope.studyQuality[0].name;
		$scope.studyQualityByKindColumnChart.series[0].name = $scope.studyQuality[0].name;
		$scope.studyQualityByKindColumnChart.series[0].data = $scope.studyQuality[0].data;
		$scope.studyQualityByKindColumnChart.options.yAxis.title.text = $scope.studyQuality[0].name+"(%)";
		
		$scope.studyQualityLastYearList.push({
			name: '小学学业合格率',
			number: prmryPssRateList[data.length-1]
		});
		$scope.studyQualityLastYearList.push({
			name: '初中学业合格率',
			number: mdlPssRateList[data.length-1]
		});
		$scope.studyQualityLastYearList.push({
			name: '普通高中学业合格率',
			number: hghPssRateList[data.length-1]
		});
		$scope.studyQualityLastYearList.push({
			name: '中等职业学校毕业生双证书获取率',
			number: trdSchlDblCrtfctRateList[data.length-1]
		});
		
		$scope.schoolQuality.push({
			name: '省优质幼儿园的比例',
			data: hghQultyKndrgrtnPrcntgList,
			comment: ''
		});
		$scope.schoolQuality.push({
			name: '义务教育学校达省现代化学校办学标准的比例',
			data: stndrdCmplsryEduSchlPrcntgList,
			comment: ''
		});
		$scope.schoolQuality.push({
			name: '高中阶段达省定三星级以上学校的比例',
			data: thrStrLvlHghSchlPrcntgList,
			comment: ''
		});
		$scope.schoolQualityKindSelected = $scope.schoolQuality[0].name;
		$scope.schoolQualityByKindColumnChart.series[0].name = $scope.schoolQuality[0].name;
		$scope.schoolQualityByKindColumnChart.series[0].data = $scope.schoolQuality[0].data;
		$scope.schoolQualityByKindColumnChart.options.yAxis.title.text = $scope.schoolQuality[0].name+"(%)";
		
		$scope.schoolQualityLastYearList.push({
			name: '省优质幼儿园的比例',
			number: hghQultyKndrgrtnPrcntgList[data.length-1]
		});
		$scope.schoolQualityLastYearList.push({
			name: '义务教育学校达省现代化学校办学标准的比例',
			number: stndrdCmplsryEduSchlPrcntgList[data.length-1]
		});
		$scope.schoolQualityLastYearList.push({
			name: '高中阶段达省定三星级以上学校的比例',
			number: thrStrLvlHghSchlPrcntgList[data.length-1]
		});
		
		$scope.contrib.push({
			name: '新增劳动力人均受教育年限',
			data: newLaborAvrgEduYearList,
			comment: ''
		});
		$scope.contrib.push({
			name: '主要劳动年龄人口平均受教育年限',
			data: mainLaborAvrgEduYearList,
			comment: ''
		});
		$scope.contrib.push({
			name: '主要劳动年龄人口受过高等教育的比例',
			data: mainLaborHghEduPrcntgList,
			comment: ''
		});
		$scope.contrib.push({
			name: '中等职业学校毕业生就业率',
			data: trdSchlGrdtEmplymntRateList,
			comment: ''
		});
		$scope.eduContribKindSelected = $scope.contrib[0].name;
		$scope.eduContribByKindBarChart.series[0].name = $scope.contrib[0].name;
		$scope.eduContribByKindBarChart.series[0].data = $scope.contrib[0].data;
		$scope.eduContribByKindBarChart.options.yAxis.title.text = $scope.contrib[0].name+"(年)";
		$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
		
		$scope.contribLastYearList.push({
			name: '新增劳动力人均受教育年限',
			number: newLaborAvrgEduYearList[data.length-1]
		});
		$scope.contribLastYearList.push({
			name: '主要劳动年龄人口平均受教育年限',
			number: mainLaborAvrgEduYearList[data.length-1]
		});
		$scope.contribLastYearList.push({
			name: '主要劳动年龄人口受过高等教育的比例',
			number: mainLaborHghEduPrcntgList[data.length-1]
		});
		$scope.contribLastYearList.push({
			name: '中等职业学校毕业生就业率',
			number: trdSchlGrdtEmplymntRateList[data.length-1]
		});
		//
		$scope.enroll.push({
			name: '普通高校升学率',
			data: commonCollegeEnrollRateList,
			comment: ''
		});
		$scope.enroll.push({
			name: '普通高校本科升学率',
			data: commonCollegeUgrEnrollRateList,
			comment: ''
		});
		$scope.enroll.push({
			name: '高等职业学校毕业生就业率',
			data: highSchlGrdtEmplymntRateList,
			comment: ''
		});
		
		$scope.eduEnrollKindSelected = $scope.enroll[0].name;
		$scope.eduEnrollByKindBarChart.series[0].name = $scope.enroll[0].name;
		$scope.eduEnrollByKindBarChart.series[0].data = $scope.enroll[0].data;
		$scope.eduEnrollByKindBarChart.options.yAxis.title.text = $scope.enroll[0].name+"(年)";
		$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "年";
		
		$scope.enrollLastYearList.push({
			name: '普通高校升学率',
			number: commonCollegeEnrollRateList[data.length-1]
		});
		$scope.enrollLastYearList.push({
			name: '普通高校本科升学率',
			number: commonCollegeUgrEnrollRateList[data.length-1]
		});
		$scope.enrollLastYearList.push({
			name: '高等职业学校毕业生就业率',
			number: highSchlGrdtEmplymntRateList[data.length-1]
		});
	};
	
	//highcharts
	$scope.studyQualityByKindColumnChart = {
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
	            text: '近五年小学学业合格率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.schoolQualityByKindColumnChart = {
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
	            text: '近五年省优质幼儿园的比例情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.eduEnrollByKindBarChart = {
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
	            text: '近五年省普通高校/高等职业学校教学成果'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.eduContribByKindBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: ' millions'                                       
			        },                                                                 
			        plotOptions: {                                                     
			            bar: {                                                         
			                dataLabels: {                                              
			                    enabled: true                                          
			                }                                                          
			            }                                                              
			        },                                                                 
			        legend: {                                                          
			            enabled: false                                                  
			        }
			},
	        title: {
	            text: '近五年新增劳动力人均受教育年限情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	//redio 点击事件
	$scope.studyQualityKindChange = function(studyQualityOne){
		$scope.studyQualityByKindColumnChart.title.text = "近五年"+studyQualityOne.name+"情况";
		$scope.studyQualityByKindColumnChart.series[0].data = studyQualityOne.data;
		$scope.studyQualityByKindColumnChart.series[0].name = studyQualityOne.name;
		$scope.studyQualityByKindColumnChart.options.yAxis.title.text = studyQualityOne.name+"(%)";
		$scope.studyQualityCommentSelected = studyQualityOne.comment;
	};
	$scope.schoolQualityKindChange = function(schoolQualityOne){
		$scope.schoolQualityByKindColumnChart.title.text = "近五年"+schoolQualityOne.name+"情况";
		$scope.schoolQualityByKindColumnChart.series[0].name = schoolQualityOne.name;
		$scope.schoolQualityByKindColumnChart.series[0].data = schoolQualityOne.data;
		$scope.schoolQualityByKindColumnChart.options.yAxis.title.text = schoolQualityOne.name+"(%)";
		$scope.schoolQualityCommentSelected = schoolQualityOne.comment;
	};
	$scope.contribKindChange = function(contribOne){
		$scope.eduContribByKindBarChart.title.text = "近五年"+contribOne.name+"情况";
		$scope.eduContribByKindBarChart.series[0].name = contribOne.name;
		$scope.eduContribByKindBarChart.series[0].data = contribOne.data;
		switch(contribOne.name.trim()){
		case '新增劳动力人均受教育年限':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(年)";
			break;
		case '主要劳动年龄人口平均受教育年限':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(年)";
			break;
		case '主要劳动年龄人口受过高等教育的比例':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(%)";
			break;
		case '中等职业学校毕业生就业率':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(%)";
			break;
		}
		$scope.contribCommentSelected = contribOne.comment;
	};
	$scope.enrollKindChange = function(enrollOne){
		$scope.eduEnrollByKindBarChart.title.text = "近五年"+enrollOne.name+"情况";
		$scope.eduEnrollByKindBarChart.series[0].name = enrollOne.name;
		$scope.eduEnrollByKindBarChart.series[0].data = enrollOne.data;
		switch(enrollOne.name.trim()){
		case '普通高校升学率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		case '普通高校本科升学率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		case '高等职业学校毕业生就业率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		}
		$scope.enrollCommentSelected = enrollOne.comment;
	};
});