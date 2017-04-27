'use strict';

angular.module('app').controller('hlthPblcHlthCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var idRecentTime;
	$http.post("/api/data/InfctsDiseaseData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		idRecentTime = lastObj.applyTime;
		
		$scope.displayYear = new Date(idRecentTime).getFullYear();
		
		var idTableName ='InfctsDiseaseData';
		var idStartDate = dateService.formatDate(moment(idRecentTime).startOf('year')); // alert(startDate);
		var idEndDate =  dateService.formatDate(moment(idRecentTime).endOf('month'));  // alert(endDate);
		kpiDetailService.query(idTableName,idStartDate,idEndDate,idProcessFunction);
	});
	
	var efRecentTime;
	$http.post("/api/data/ExpectedLifeData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		efRecentTime = lastObj.applyTime;
		
		var efStartOprtr = new Date(efRecentTime);
		var efStartDate = dateService.formatDate(moment(efStartOprtr.setFullYear(efStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var efEndDate =  dateService.formatDate(moment(efRecentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('ExpectedLifeData',efStartDate,efEndDate,efProcessFunction);
	});
	
	var wcRecentTime;
	$http.post("/api/data/WomanCareData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		wcRecentTime = lastObj.applyTime;
		
		var wcStartOprtr = new Date(wcRecentTime);
		var wcStartDate = dateService.formatDate(moment(wcStartOprtr.setFullYear(wcStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var wcEndDate =  dateService.formatDate(moment(wcRecentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('WomanCareData',wcStartDate,wcEndDate,wcProcessFunction);
	});
	
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');

	//charts data
	var infectiousDiseasesPieChartData = [];
	$scope.infectiousDiseasesByKindList = [];
	var infectiousDiseasesByKindLineChartCategories = [];
	var expectedLifeYearData = [];
	$scope.averageExpectedLifeByKindList = [];
	$scope.womenAndChildrenDeathRateByKindList = [];
	var babyDeathRateList = [];
	var prgntLyinginWmnDeathRateYearData = [];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var idProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var enteric=[];   //肠道传染病
		var breath=[];    //呼吸道传染病
		var bloodSex=[];  //血源及性传播传染病
		var nature=[];	  //自然疫源及虫媒传染病
		
		var applyMonth;
		
		for(var i=0; i<data.length; i++){
			switch(data[i].diseaseType.id){
			case 6040://肠道传染病
				enteric.push(data[i].patientNum);
				break;
			case 6041://呼吸道传染病
				breath.push(data[i].patientNum);
				break;
			case 6042://血源及性传播传染病
				bloodSex.push(data[i].patientNum);
				break;
			case 6043://自然疫源及虫媒传染病
				nature.push(data[i].patientNum);
				break;
			}
			
		}
		infectiousDiseasesPieChartData.push({
			name: "肠道传染病(甲乙类)",
            y:  enteric[data.length/4-1]
		});
		infectiousDiseasesPieChartData.push({
			name: "呼吸道传染病(甲乙类)",
            y: breath[data.length/4-1]
		});
		infectiousDiseasesPieChartData.push({
			name: "血源及性传播传染病(甲乙类)",
            y: bloodSex[data.length/4-1]
		});
		infectiousDiseasesPieChartData.push({
			name: "自然疫源及虫媒传染病(甲乙类)",
            y: nature[data.length/4-1]
		});
		$scope.infectiousDiseases = [
		                     		{ name : "肠道传染病(甲乙类)" ,  number : enteric[data.length/4-1] },
		                     		{ name : "呼吸道传染病(甲乙类)" ,  number : breath[data.length/4-1] },
		                     		{ name : "血源及性传播传染病(甲乙类)" ,  number : bloodSex[data.length/4-1] },
		                     		{ name : "自然疫源及虫媒传染病(甲乙类)" ,  number : nature[data.length/4-1] },
		                     		{ name : "合计" ,  number : enteric[enteric.length-1]+breath[data.length/4-1]+bloodSex[data.length/4-1]+nature[data.length/4-1] }
		                     	];
		
		for(var i=0; i<data.length/4; i++){
			
			applyMonth = new Date(data[i*4].applyTime);
			infectiousDiseasesByKindLineChartCategories.push(applyMonth.getMonth()+1);
		}
		$scope.infectiousDiseasesByKindList.push({
			name: "肠道传染病(甲乙类)",
            data: enteric
		});
		$scope.infectiousDiseasesByKindList.push({
			name: "呼吸道传染病(甲乙类)",
            data: breath
		});
		$scope.infectiousDiseasesByKindList.push({
			name: "血源及性传播传染病(甲乙类)",
            data: bloodSex
		});
		$scope.infectiousDiseasesByKindList.push({
			name: "自然疫源及虫媒传染病(甲乙类)",
            data: nature
		});
		$scope.infectiousDiseasesKindSelected = $scope.infectiousDiseasesByKindList[0].name;
		$scope.infectiousDiseasesByKindLineChart.series[0].name = $scope.infectiousDiseasesByKindList[0].name;
		$scope.infectiousDiseasesByKindLineChart.series[0].data = $scope.infectiousDiseasesByKindList[0].data;
		$scope.infectiousDiseasesPieChart.options.title.text = $scope.displayYear+'年'+infectiousDiseasesByKindLineChartCategories[data.length/4-1]+"月全市主要传染病分布情况";
		$scope.infectiousDiseasesLastMonth = infectiousDiseasesByKindLineChartCategories[data.length/4-1];
		$scope.infectiousDiseasesByKindLineChart.title.text = $scope.displayYear+'年各月份肠道传染病(甲乙类)情况';
		
	};
	
	var efProcessFunction = function(raw){
		
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var mlExpectedLifeList = [];
		var fmlExpectedLifeList = [];
		var avrgExpectedLifeList = [];
		var applyYear;
		for(var i=0; i<data.length; i++){
			
			applyYear = new Date(data[i].applyTime);
			expectedLifeYearData.push(applyYear.getFullYear());
			
			mlExpectedLifeList.push(data[i].mlExpectedLife);
			fmlExpectedLifeList.push(data[i].fmlExpectedLife);
			avrgExpectedLifeList.push(data[i].avrgExpectedLife);
			babyDeathRateList.push(data[i].babyDeathRate);
		}
		$scope.averageExpectedLifeByKindList.push({
			name: "男性平均期望寿命",
			data: mlExpectedLifeList
			});
		$scope.averageExpectedLifeByKindList.push({
			name: "女性平均期望寿命",
			data: fmlExpectedLifeList
			});
		$scope.averageExpectedLifeByKindList.push({
			name: "平均期望寿命(合计)",
			data: avrgExpectedLifeList
			});
		$scope.averageExpectedLifeKindSelected = $scope.averageExpectedLifeByKindList[0].name;
		$scope.averageExpectedLifeLineChart.series[0].name = $scope.averageExpectedLifeByKindList[0].name;
		$scope.averageExpectedLifeLineChart.series[0].data = $scope.averageExpectedLifeByKindList[0].data;  
	}
	
	var wcProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var prgntLyinginWmnDeathRateList = [];
		var wcApplyYear;
		for(var i=0; i<data.length; i++){
			
			wcApplyYear = new Date(data[i].applyTime);
			prgntLyinginWmnDeathRateYearData.push(wcApplyYear.getFullYear());
			
			prgntLyinginWmnDeathRateList.push(data[i].prgntLyinginWmnDeathRate);
		}
		//alert(prgntLyinginWmnDeathRateList);
		$scope.womenAndChildrenDeathRateByKindList.push({
			name: '婴儿死亡率',
			data: babyDeathRateList,
			comment: ''
		});
		$scope.womenAndChildrenDeathRateByKindList.push({
			name: '孕产妇死亡率',
			data: prgntLyinginWmnDeathRateList,
			comment: ''
		});
		$scope.womenAndChildrenDeathRateKindSelected = $scope.womenAndChildrenDeathRateByKindList[0].name;
		$scope.womenAndChildrenDeathRateColumnChart.series[0].data = $scope.womenAndChildrenDeathRateByKindList[0].data;
	}
	
	//highcharts
	$scope.infectiousDiseasesPieChart = {
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
	            data: infectiousDiseasesPieChartData
	        }]
		};
	$scope.infectiousDiseasesByKindLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
				xAxis: {
					title: {
		                text: '月份'
		            },
		            categories: infectiousDiseasesByKindLineChartCategories,
		            tickmarkPlacement: 'on'
		        },
		        yAxis: {
		        	min: 0,
		            title: {
		                text: '患者数 (人次)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }],
		            minTickInterval: 1
		        },
		        tooltip: {
		            valueSuffix: '人次'
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '',
	            x: -20 //center
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	
	$scope.averageExpectedLifeLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
				xAxis: {
					title: {
		                text: '年份'
		            },
		            categories: expectedLifeYearData,
		            tickmarkPlacement: 'on'
		        },
		        yAxis: {
		            title: {
		                text: '期望寿命 (岁)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '岁',
		            //pointFormat: '病床数: <b>{point.y:.2f}岁</b>',
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年男性平均期望情况',
	            x: -20 //center
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	
	$scope.averageExpectedLifeComparedColumnChart = {
			options:{
				colors: columnColors,
				credits: {
		            enabled: false
		        },
				chart: {
		            type: 'column'
		           // margin: [ 50, 50, 100, 80]
		        },
		        title: {
		            text: '近五年平均期望寿命对比情况'
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: expectedLifeYearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '平均期望寿命 (岁)'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f} 岁</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        }
			},
			series: $scope.averageExpectedLifeByKindList
	};
	
	$scope.womenAndChildrenDeathRateColumnChart = {
			options:{
				credits: {
		            enabled: false
		        },
				chart: {
		            type: 'column',
		            margin: [ 50, 50, 100, 80]
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: expectedLifeYearData,
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
		        tooltip: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年婴儿死亡率情况'
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '死亡率 (‰)'
	            }
	        },
			series: [{
	            name: '死亡率',
	            data: [],
	            dataLabels: {
	                enabled: true,
	                rotation: -90,
	                color: '#FFFFFF',
	                align: 'right',
	                x: 4,
	                y: 10,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif',
	                    textShadow: '0 0 3px black'
	                }
	            }
	        }]
	};
	
	// radio点击事件
	$scope.infectiousDiseasesKindChange = function(infectiousDiseasesOne){
		$scope.infectiousDiseasesByKindLineChart.title.text = $scope.displayYear+"年各月份"+infectiousDiseasesOne.name+"情况";
		$scope.infectiousDiseasesByKindLineChart.series[0].name = infectiousDiseasesOne.name;
		$scope.infectiousDiseasesByKindLineChart.series[0].data = infectiousDiseasesOne.data;
	};
	$scope.averageExpectedLifeKindChange = function(averageExpectedLifeOne){
		$scope.averageExpectedLifeLineChart.title.text = "近五年"+averageExpectedLifeOne.name+"情况";
		$scope.averageExpectedLifeLineChart.series[0].name = averageExpectedLifeOne.name;
		$scope.averageExpectedLifeLineChart.series[0].data = averageExpectedLifeOne.data;
		switch(averageExpectedLifeOne.name.trim()){
		case '男性平均期望寿命':
			$scope.averageExpectedLifeLineChart.series[0].name = '男性平均期望寿命';
			$scope.averageExpectedLifeLineChart.series[0].data = $scope.averageExpectedLifeByKindList[0].data;
			break;
		case '女性平均期望寿命':
			$scope.averageExpectedLifeLineChart.series[0].name = '女性平均期望寿命';
			$scope.averageExpectedLifeLineChart.series[0].data =  $scope.averageExpectedLifeByKindList[1].data;
			break;
		case '平均期望寿命(合计)':
			$scope.averageExpectedLifeLineChart.series[0].name = '平均期望寿命(合计)';
			$scope.averageExpectedLifeLineChart.series[0].data =  $scope.averageExpectedLifeByKindList[2].data;
			break;
		}
	};
	$scope.womenAndChildrenDeathRateKindChange = function(womenAndChildrenDeathRateOne){
		$scope.womenAndChildrenDeathRateColumnChart.title.text = "近五年"+womenAndChildrenDeathRateOne.name+"情况";
		$scope.womenAndChildrenDeathRateColumnChart.series[0].data = womenAndChildrenDeathRateOne.data;
		$scope.womenAndChildrenDeathRateComment = womenAndChildrenDeathRateOne.comment;
		if(womenAndChildrenDeathRateOne.name.trim()=="婴儿死亡率".trim()){
			$scope.womenAndChildrenDeathRateColumnChart.yAxis.title.text = "死亡率 (‰)";
			$scope.womenAndChildrenDeathRateColumnChart.options.xAxis.categories = expectedLifeYearData;
		}
		else {
			$scope.womenAndChildrenDeathRateColumnChart.yAxis.title.text = "死亡率 (十万分比)";
			$scope.womenAndChildrenDeathRateColumnChart.options.xAxis.categories = prgntLyinginWmnDeathRateYearData;
		}
	};

});