'use strict';

angular.module('app').controller('hlthRscSvcCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var svcRecentTime;
	$http.post("/api/data/HealthServiceData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		svcRecentTime = lastObj.applyTime;
		
		$scope.displayYear = new Date(svcRecentTime).getFullYear();
	
		var svcStartDate = dateService.formatDate(moment(svcRecentTime).startOf('year')); // alert(startDate);
		var svcEndDate =  dateService.formatDate(moment(svcRecentTime).endOf('month'));  // alert(endDate);
		kpiDetailService.query('HealthServiceData',svcStartDate,svcEndDate,serviceProcessFunction);
	});
	
	var maRecentTime;
	$http.post("/api/data/MedicalAdminData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		maRecentTime = lastObj.applyTime;
		
		var maStartOprtr = new Date(maRecentTime);
		var maStartDate = dateService.formatDate(moment(maStartOprtr.setFullYear(maStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var maEndDate =  dateService.formatDate(moment(maRecentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('MedicalAdminData',maStartDate,maEndDate,medicalInstitutionFunction);
	});
	
	var hpRecentTime;
	$http.post("/api/data/HealthPersonnelData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		hpRecentTime = lastObj.applyTime;
		
		var hpStartOprtr = new Date(hpRecentTime);
		var hpStartDate = dateService.formatDate(moment(hpStartOprtr.setFullYear(hpStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var hpEndDate =  dateService.formatDate(moment(hpRecentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('HealthPersonnelData',hpStartDate,hpEndDate,medicalWorkerFunction);
	});
	
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15');
	
	//charts data
	var medicalInstitutionSumChartData = [];
	var sickBedsNumList = [];
	var medicalInstitutionsLastYearData=[];
	var medicalServiceColumnChartData=[];
	var medicalServiceColumnChartData1=[];
	var medicalServiceColumnChartData2=[];
	var medicalServiceKind=["门诊","急诊","住院","120急救"];
	var monthData=[];
	$scope.medicalServicePatientsByKindList=[];
	$scope.medicalInstitutionByKindSumList=[];
	var medicalWorkersPieChartData = [];
	var medicalWorkersYearData = [];
	$scope.medicalWorkersYearsList = [];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var serviceProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var outpatientNumList = [];
		var inpatientNumList = [];
		var emrgncyPatientNumList = [];
		var firstAid120List = [];
		
		var applyMonth;
		
		for(var i=0; i<data.length; i++){
			outpatientNumList.push(data[i].outpatientNum);
			inpatientNumList.push(data[i].inpatientNum);
			emrgncyPatientNumList.push(data[i].emrgncyPatientNum);
			firstAid120List.push(data[i].firstAid120);
			
			//alert(data[i].outpatientNum);
			applyMonth = new Date(data[i].applyTime);
			monthData.push(applyMonth.getMonth()+1);
		}
		$scope.medicalServicePatientsByKindList.push({
			name: medicalServiceKind[0],
			data: outpatientNumList
			});
		$scope.medicalServicePatientsByKindList.push({
			name: medicalServiceKind[1],
			data: emrgncyPatientNumList
			});
		$scope.medicalServicePatientsByKindList.push({
			name: medicalServiceKind[2],
			data: inpatientNumList
			});
		$scope.medicalServicePatientsByKindList.push({
			name: medicalServiceKind[3],
			data: firstAid120List
			});
		$scope.medicalServiceSelected = $scope.medicalServicePatientsByKindList[0].name;
		//alert(monthData[monthData.lenth-1]);
		$scope.medicalServiceColumnChart1.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市门诊及急诊情况";
		$scope.medicalServiceColumnChart2.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市住院及120急救情况";
		$scope.medicalServiceByKindLineChart.title.text = $scope.displayYear+'年全市门诊服务情况';
		$scope.displayMonth = monthData[data.length-1];
		medicalServiceColumnChartData.push(outpatientNumList[data.length-1]);
		medicalServiceColumnChartData.push(emrgncyPatientNumList[data.length-1]);
		medicalServiceColumnChartData.push(inpatientNumList[data.length-1]);
		medicalServiceColumnChartData.push(firstAid120List[data.length-1]);
		$scope.medicalServiceByKindLineChart.series[0].name = $scope.medicalServicePatientsByKindList[0].name;
	    $scope.medicalServiceByKindLineChart.series[0].data = $scope.medicalServicePatientsByKindList[0].data;
	    medicalServiceColumnChartData1.push(medicalServiceColumnChartData[0]);
	    medicalServiceColumnChartData1.push(medicalServiceColumnChartData[1]);
	    medicalServiceColumnChartData2.push(medicalServiceColumnChartData[2]);
	    medicalServiceColumnChartData2.push(medicalServiceColumnChartData[3]);
	};
	
	var medicalInstitutionFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var thrdLvlHsptlNumList = [];
		var scndLvlHsptlNumList = [];
		var prmryHsptlNumList = [];
		var prvtHsptlNumList = [];
		var applyYear ;
		for(var i=0; i<data.length; i++){
			var sum;
			if(data[i].thrdLvlHsptlNum==null&&data[i].scndLvlHsptlNum==null&&data[i].prmryHsptlNum==null&&data[i].prvtHsptlNum==null)
				sum=null;
			else
				sum = data[i].thrdLvlHsptlNum+data[i].scndLvlHsptlNum+data[i].prmryHsptlNum+data[i].prvtHsptlNum;
			medicalInstitutionSumChartData.push(sum);
			
			thrdLvlHsptlNumList.push(data[i].thrdLvlHsptlNum);
			scndLvlHsptlNumList.push(data[i].scndLvlHsptlNum);
			prmryHsptlNumList.push(data[i].prmryHsptlNum);
			prvtHsptlNumList.push(data[i].prvtHsptlNum);
			sickBedsNumList.push(data[i].sickBedsNum);
			
			applyYear = new Date(data[i].applyTime);
			medicalInstitutionsLastYearData.push(applyYear.getFullYear());
			
			if(i==data.length-1){
				var lastYearSum = data[i].thrdLvlHsptlNum+data[i].scndLvlHsptlNum+data[i].prmryHsptlNum+data[i].prvtHsptlNum;
				//table data
				$scope.medicalInstitutions = [
				                          	{ name : "三级医院" ,  number : data[i].thrdLvlHsptlNum },
				                          	{ name : "二级医院" ,  number : data[i].scndLvlHsptlNum },
				                          	{ name : "基层医院" ,  number : data[i].prmryHsptlNum },
				                          	{ name : "民营医院(门诊部)" ,  number : data[i].prvtHsptlNum },
				                          	{ name : "合计" ,  number : lastYearSum }
				                          ];
			}
		}
		$scope.medicalInstitutionsLastYear = medicalInstitutionsLastYearData[data.length-1];
		$scope.medicalInstitutionByKindSumList.push({
			name: "三级医院",
			data: thrdLvlHsptlNumList
			});
		$scope.medicalInstitutionByKindSumList.push({
			name: "二级医院",
			data: scndLvlHsptlNumList
			});
		$scope.medicalInstitutionByKindSumList.push({
			name: "基层医院",
			data: prmryHsptlNumList
			});
		$scope.medicalInstitutionByKindSumList.push({
			name: "民营医院(门诊部)",
			data: prvtHsptlNumList
			});
		
		$scope.medicalInstitutionSelected = $scope.medicalInstitutionByKindSumList[1].name;
		$scope.medicalInstitutionSumByKindChart.series[0].name = $scope.medicalInstitutionByKindSumList[1].name;
		$scope.medicalInstitutionSumByKindChart.series[0].data = $scope.medicalInstitutionByKindSumList[1].data;
		$scope.medicalInstitutionLastYear = medicalInstitutionsLastYearData[medicalInstitutionsLastYearData.length-1];
	};
	
	var medicalWorkerFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var doctorNumList = [];
		var nurseNumList = [];
		
		var mkApplyYear;
		for(var i=0; i<data.length; i++){
			doctorNumList.push(data[i].doctorNum);
			nurseNumList.push(data[i].nurseNum);
			
			mkApplyYear = new Date(data[i].applyTime);
			medicalWorkersYearData.push(mkApplyYear.getFullYear());
			if(i==data.length-1){
				medicalWorkersPieChartData.push({
					name: "医生",
		            y: data[i].doctorNum
				});
				medicalWorkersPieChartData.push({
					name: "护士",
		            y: data[i].nurseNum 
				});
			}
		}
		$scope.medicalWorkersPieChart.options.title.text = medicalWorkersYearData[data.length-1]+"年全市卫生技术人员情况";
		$scope.medicalWorkersYearsList.push({
			name: "医生",
			data: doctorNumList
			});
		$scope.medicalWorkersYearsList.push({
			name: "护士",
			data: nurseNumList
			});
		$scope.medicalWorkersByKindLineChart.series[0].data = $scope.medicalWorkersYearsList[0].data;
	};
	
	//highcharts configuration
	$scope.medicalInstitutionSumChart = {
		options:{
			title: {
	            text: '近五年全市医疗机构总数情况',
	            x: -20 //center
	        },
	        credits: {
				enabled: false
				},
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	        	min: 0 ,
	            title: {
	                text: '医疗机构总数 (家)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '家'
	        },
	        legend: {
	            enabled:false
	        }
		},
		series: [{
	            name: '机构数',
	            data: medicalInstitutionSumChartData
	    }]
	};

	$scope.medicalInstitutionSumByKindChart = {
		options:{
			chart: {                                                           
	            type: 'column'                                                   
	        },                                                                                                                                  
	        xAxis: {                                                           
	            categories: medicalInstitutionsLastYearData,
	            title: {                                                       
	                text: '年份'
	            }                                                              
	        },                                                                 
	        yAxis: {                                                           
	            min: 0,                                                        
	            title: {                                                       
	                text: '机构数（家）'                                            
	            },                                                             
	            labels: {
					formatter: function() {
						return this.value
					}
				},
	            minTickInterval: 1
	        },                                                                 
	        tooltip: {                                                         
	            valueSuffix: '家'                                       
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
	        },                                                                 
	        credits: {                                                         
	            enabled: false                                                 
	        }
		},
		title: {                                                           
	            text: '近五年二级医院情况'                    
	        }, 
		series: [{                                                         
	            name: '',                                             
	            data: [],
//	            dataLabels: {
//	                enabled: true,
//	                rotation: -90,
//	                color: '#000000',
//	                align: 'middle',
//	                x: 19,
//	                y: 3,
//	                style: {
//	                    fontSize: '13px',
//	                    fontFamily: 'Verdana, sans-serif',
//	                    textShadow: '0 0 3px black'
//	                }
//	            }
	    }] 
	};

	$scope.medicalWorkersPieChart = {
	    options:{
	        colors: pieColors,
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        credits: {                                                         
	            enabled: false                                                 
	        },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text: '点击饼图各部分查看近五年走势'
	        },
	        tooltip: {
	            enabled : false 
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    color: '#000000',
	                    connectorColor: '#000000',
	                    format: '<b>{point.name}</b>: {point.y:.0f}人'
	                },
	                events: {
	                    click: function(event){
	                        var name = event.point.name;
	                        $scope.medicalWorkersByKindLineChart.title.text = "近五年全市"+name+"情况";
	                        for(var i=0; i<$scope.medicalWorkersYearsList.length; i++)
	                        {
	                            if(name==$scope.medicalWorkersYearsList[i].name)
	                            {
	                                $scope.$apply(
	                                    function(){
	                                        $scope.medicalWorkersByKindLineChart.series[0].data = $scope.medicalWorkersYearsList[i].data;
	                                    }
	                                ); 
	                            }
	                        }
	                     }
	                }
	            }
	        }
	    },
	    series: [{
	            type: 'pie',
	            name: '人数',
	            data: medicalWorkersPieChartData
	        }]
	};

	$scope.medicalWorkersByKindLineChart = {
	    options:{
	        credits: {
	            enabled: false
	            },
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalWorkersYearData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	            title: {
	                text: '人数 (人)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '人'
	        },
	        legend: {
	            enabled:false
	        }
	    },
	    title: {
	            text: '近五年全市医生情况',
	            x: -20 //center
	        },
	    series: [{
	            name: '人数',
	            data: []
	    }]
	};

	$scope.medicalBedsColumnChart = {
	    options:{
	    	credits: {
	            enabled: false
	            },
	        chart: {
	            type: 'column'
	           // margin: [ 50, 50, 100, 80]
	        },
	        title: {
	            text: '近五年全市医疗机构病床情况'
	        },
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '病床数(张)'
	            }
	        },
	        legend: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: '病床数: <b>{point.y:.0f}张</b>',
	        }
	    },
	    series: [{
	            name: '病床数',
	            data: sickBedsNumList,
//	            dataLabels: {
//	                enabled: true,
//	                rotation: -90,
//	                color: '#FFFFFF',
//	                align: 'right',
//	                x: 4,
//	                y: 10,
//	                style: {
//	                    fontSize: '13px',
//	                    fontFamily: 'Verdana, sans-serif',
//	                    textShadow: '0 0 3px black'
//	                }
//	            }
	    }]
	};

	$scope.medicalServiceColumnChart1 = {
	    options:{
	    	credits: {
	            enabled: false
	            },
	        chart: {
	            type: 'column'
	           // margin: [ 50, 50, 100, 80]
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['门诊人次', '急诊人次']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '诊疗人数(人次)'
	            },
	            labels: {
					formatter: function() {
						return this.value
					}
				}
	        },
	        legend: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: '诊疗人次: <b>{point.y:.0f}人次</b>',
	        }
	    },
	    series: [{
	            name: '诊疗人次',
	            data: medicalServiceColumnChartData1,
//	            dataLabels: {
//	                enabled: true,
//	                rotation: -90,
//	                color: '#FFFFFF',
//	                align: 'right',
//	                x: 4,
//	                y: 10,
//	                style: {
//	                    fontSize: '13px',
//	                    fontFamily: 'Verdana, sans-serif',
//	                    textShadow: '0 0 3px black'
//	                }
//	            }
	    }]
	};

	$scope.medicalServiceColumnChart2 = {
		    options:{
		    	credits: {
		            enabled: false
		            },
		        chart: {
		            type: 'column'
		           // margin: [ 50, 50, 100, 80]
		        },
		        title: {
		            text: ''
		        },
		        xAxis: {
		            categories: ['住院人次', '120急救人次']
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '诊疗人数(人次)'
		            },
		            labels: {
						formatter: function() {
							return this.value
						}
					}
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: '诊疗人次: <b>{point.y:.0f}人次</b>',
		        }
		    },
		    series: [{
		            name: '诊疗人次',
		            data: medicalServiceColumnChartData2,
//		            dataLabels: {
//		                enabled: true,
//		                rotation: -90,
//		                color: '#FFFFFF',
//		                align: 'right',
//		                x: 4,
//		                y: 10,
//		                style: {
//		                    fontSize: '13px',
//		                    fontFamily: 'Verdana, sans-serif',
//		                    textShadow: '0 0 3px black'
//		                }
//		            }
		    }]
		};

	$scope.medicalServiceByKindLineChart = {
	    options:{
	        credits: {
	            enabled: false
	        },
	        chart: {
	            type: 'line'
	           // margin: [ 50, 50, 100, 80]
	        },   
	        xAxis: {
	            title: {
	                text: '月份'
	            },
	            categories: monthData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	            title: {
	                text: '诊疗人次 (人次)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }],
	            labels: {
					formatter: function() {
						return this.value
					}
				}
	        },
	        tooltip: {
	            valueSuffix: '人次'
	        },
	        legend: {
	            enabled:false
	        }
	    },
	    title: {
	            text: '',
	            x: -20//center
	    },
	    series: [{
	        name: "",//$scope.medicalServicePatientsByKindList[0].name,
	        data: []//$scope.medicalServicePatientsByKindList[0].data
	    }]
	};

	// radio点击事件
	$scope.medicalInstitutionKindChange = function(medicalInstitutionSumOne){
		$scope.medicalInstitutionSumByKindChart.title.text = "近五年"+medicalInstitutionSumOne.name+"情况";
		$scope.medicalInstitutionSumByKindChart.series[0].name = medicalInstitutionSumOne.name;
		$scope.medicalInstitutionSumByKindChart.series[0].data = medicalInstitutionSumOne.data;
	};

	$scope.medicalServiceKindChange = function(medicalServicePatientsOne){
	    $scope.medicalServiceByKindLineChart.title.text = $scope.displayYear+"年全市"+medicalServicePatientsOne.name+"服务情况";
	    $scope.medicalServiceByKindLineChart.series[0].name = medicalServicePatientsOne.name;
	    $scope.medicalServiceByKindLineChart.series[0].data = medicalServicePatientsOne.data;
	};
});