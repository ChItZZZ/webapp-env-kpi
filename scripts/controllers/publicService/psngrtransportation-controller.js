'use strict';

angular.module('app').controller('psngrTransportationCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var pcRecentTime;
	$http.post("/api/data/PsngrCapacityData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		pcRecentTime = lastObj.applyTime;
		
		$scope.displayYear = new Date(pcRecentTime).getFullYear();
	
		var pcStartDate = dateService.formatDate(moment(pcRecentTime).startOf('year')); // alert(startDate);
		var pcEndDate =  dateService.formatDate(moment(pcRecentTime).endOf('month'));  // alert(endDate);
		kpiDetailService.query('PsngrCapacityData',pcStartDate,pcEndDate,psngrCapacityProcessFunction);
	});
	
	var pvRecentTime;
	$http.post("/api/data/PsngrVehicleData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		pvRecentTime = lastObj.applyTime;
		
		var pvStartOprtr = new Date(pvRecentTime);
		var pvStartDate = dateService.formatDate(moment(pvStartOprtr.setFullYear(pvStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var pvEndDate =  dateService.formatDate(moment(pvRecentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('PsngrVehicleData',pvStartDate,pvEndDate,PsngrVehicleProcessFunction);
	});
	
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');
	
	//chartData
	var passengerCapacityMonthData = [];
	var passengerCapacitySumChartData = [];
	$scope.passengerCapacityByKindList = [];
	var festivalPassengerCapacityBusList = [];
	var festivalPassengerCapacityLongDistanceBusList = [];
	var festivalData = [];
	var festivalPassengerCapacityBusList2 = [];
	var festivalPassengerCapacityLongDistanceBusList2 = [];
	var vehicleByKindYearList = [];
	$scope.vehicleByKindSumList = [];
	$scope.vehicleLastYearList = [];

	highchartsConfiguration();
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var psngrCapacityProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var busVolumeList = [];
		var taxiVolumeList = [];
		var longDistanceBusVolumeList = [];
		var applyMonth;
		for(var i=0; i<data.length; i++){
			var sum;
			if(data[i].busVolume==null&&data[i].taxiVolume==null&&data[i].longDistanceBusVolume==null)
				sum=null;
			else
				sum = data[i].busVolume+data[i].taxiVolume+data[i].longDistanceBusVolume;
			passengerCapacitySumChartData.push(sum);
			applyMonth = new Date(data[i].applyTime);
			passengerCapacityMonthData.push(applyMonth.getMonth()+1);
			
			busVolumeList.push(data[i].busVolume);
			taxiVolumeList.push(data[i].taxiVolume);
			longDistanceBusVolumeList.push(data[i].longDistanceBusVolume);
			
			if(i==data.length-1){
				var lastMonthSum = data[i].busVolume+data[i].taxiVolume+data[i].longDistanceBusVolume;
				//table data
				$scope.passengerCapacity = [
				                          	{ name : "公交车" ,  number : data[i].busVolume },
				                          	{ name : "出租车" ,  number : data[i].taxiVolume},
				                          	{ name : "长途班车" ,  number : data[i].longDistanceBusVolume },
				                          	{ name : "合计" ,  number : lastMonthSum }
				                          ];
			}
		}
		$scope.passengerCapacityLastMonth = passengerCapacityMonthData[data.length-1];
		$scope.passengerCapacityByKindList.push({
			name: "公交车",
			data: busVolumeList
			});
		$scope.passengerCapacityByKindList.push({
			name: "出租车",
			data: taxiVolumeList
			});
		$scope.passengerCapacityByKindList.push({
			name: "长途班车",
			data: longDistanceBusVolumeList
			});
		
		$scope.passengerCapacitySumChart.title.text = $scope.displayYear+'年各月客运总量情况';
		$scope.passengerCapacityByKindChart.title.text = $scope.displayYear+'年各月公交车客运量情况';
		$scope.passengerCapacitySelected = $scope.passengerCapacityByKindList[0].name;
		$scope.passengerCapacityByKindChart.series[0].name = $scope.passengerCapacityByKindList[0].name;
		$scope.passengerCapacityByKindChart.series[0].data = $scope.passengerCapacityByKindList[0].data;
	};
	
	var thisYearFstvlPsngrCapacityProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		for(var i=0; i<data.length; i++){
			festivalPassengerCapacityBusList.push(data[i].busVolume);
			festivalPassengerCapacityLongDistanceBusList.push(data[i].longDistanceBusVolume);
		}
	}
	var fpcRecentTime = dateService.get_system_time();
	var fpcStartOprtrThisYear = new Date(fpcRecentTime);
	var fpcStartDateThisYear = dateService.formatDate(moment(fpcStartOprtrThisYear).startOf('year')); //alert(fpcStartDateThisYear);
	var fpcEndDateThisYear =  dateService.formatDate(moment(fpcStartOprtrThisYear).endOf('year'));  //alert(fpcEndDateThisYear);
	kpiDetailService.query('FstvlPsngrCapacityData',fpcStartDateThisYear,fpcEndDateThisYear,thisYearFstvlPsngrCapacityProcessFunction);
	
	var lastYearFstvlPsngrCapacityProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		for(var i=0; i<data.length; i++){
			festivalPassengerCapacityBusList2.push(data[i].busVolume);
			festivalPassengerCapacityLongDistanceBusList2.push(data[i].longDistanceBusVolume);
			
			festivalData.push(data[i].festival.name);
		}
	}
	var fpcTimeOprtr = new Date(fpcRecentTime);
	var fpcLastYear = fpcTimeOprtr.setFullYear(fpcTimeOprtr.getFullYear()-1);
	var fpcStartDateLastYear = dateService.formatDate(moment(fpcLastYear).startOf('year'));  //alert(fpcStartDateLastYear);
	var fpcEndDateLastYear =  dateService.formatDate(moment(fpcLastYear).endOf('year'));   //alert(fpcEndDateLastYear);
	kpiDetailService.query('FstvlPsngrCapacityData',fpcStartDateLastYear,fpcEndDateLastYear,lastYearFstvlPsngrCapacityProcessFunction);
	
	var PsngrVehicleProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var busList = [];
		var taxiList = [];
		var longDistanceBusList = [];
		
		var newBusList = [];
		var newTaxiList = [];
		var newLongDistanceBusList = [];
		
		var notNewBusList = [];
		var notNewTaxiList = [];
		var notNewLongDistanceBusList = [];
		
		for(var i=0; i<data.length; i++){
			switch(data[i].vehicleType.id){
			case 6044://公交车
				{
				busList.push(data[i].vehicleSum);
				newBusList.push(data[i].newEnergyResourcesVehicleSum);
				notNewBusList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
				}
				
				break;
			case 6045://出租车
				{
				taxiList.push(data[i].vehicleSum);
				newTaxiList.push(data[i].newEnergyResourcesVehicleSum);
				notNewTaxiList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
				}
				
				break;
			case 6046://长途班车
				{
				longDistanceBusList.push(data[i].vehicleSum);
				newLongDistanceBusList.push(data[i].newEnergyResourcesVehicleSum);
				notNewLongDistanceBusList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
				}
				
				break;
			}
		}
		$scope.vehicleByKindSumList.push({
			name: "公交车",
			sum: busList,
			newVehicle: newBusList,
			notNewVehicle: notNewBusList
		});
		$scope.vehicleByKindSumList.push({
			name: "出租车",
			sum: taxiList,
			newVehicle: newTaxiList,
			notNewVehicle: notNewTaxiList
		});
		$scope.vehicleByKindSumList.push({
			name: "长途班车",
			sum: longDistanceBusList,
			newVehicle: newLongDistanceBusList,
			notNewVehicle: notNewLongDistanceBusList
		});
		$scope.vehicleKindSelected = $scope.vehicleByKindSumList[0].name;
		$scope.newVehicleByKindAreaChart.series[0].data = $scope.vehicleByKindSumList[0].notNewVehicle;
		$scope.newVehicleByKindAreaChart.series[1].data = $scope.vehicleByKindSumList[0].newVehicle;
		var applyYear;
		for(var i=0; i<data.length/3; i++){
			applyYear = new Date(data[i*3].applyTime);
			vehicleByKindYearList.push(applyYear.getFullYear());
		}
		$scope.vehicleByKindColumnChart.series[0].name = $scope.vehicleByKindSumList[0].name;
		$scope.vehicleByKindColumnChart.series[0].data = $scope.vehicleByKindSumList[0].sum;
		$scope.vehicleByKindColumnChart.series[1].name = $scope.vehicleByKindSumList[1].name;
		$scope.vehicleByKindColumnChart.series[1].data = $scope.vehicleByKindSumList[1].sum;
		$scope.vehicleByKindColumnChart.series[2].name = $scope.vehicleByKindSumList[2].name;
		$scope.vehicleByKindColumnChart.series[2].data = $scope.vehicleByKindSumList[2].sum;
		
		$scope.vehicleLastYearList.push({
			name: '公交车',
			sum: busList[busList.length-1],
			newEnerge: newBusList[newBusList.length-1]
		});
		$scope.vehicleLastYearList.push({
			name: '出租车',
			sum: taxiList[taxiList.length-1],
			newEnerge: newTaxiList[newTaxiList.length-1]
		});
		$scope.vehicleLastYearList.push({
			name: '长途班车',
			sum: longDistanceBusList[longDistanceBusList.length-1],
			newEnerge: newLongDistanceBusList[newLongDistanceBusList.length-1]
		});
		$scope.vehicleYear = vehicleByKindYearList[vehicleByKindYearList.length-1];
	}
	
	//highcharts configuration
	function highchartsConfiguration(){
		$scope.passengerCapacitySumChart = {
				options:{
			        credits: {
						enabled: false
						},
			        xAxis: {
			            title: {
			                text: '月份'
			            },
			            categories: passengerCapacityMonthData,
			            tickmarkPlacement: 'on'
			        },
			        yAxis: {
			            title: {
			                text: '客运量 (人次)'
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
		            x: -20 //center
		        },
				series: [{
			            name: '客运量',
			            data: passengerCapacitySumChartData
			    }]
			};

		$scope.passengerCapacityByKindChart = {
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
			            categories: passengerCapacityMonthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量(人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f} 人次</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        legend: {                                                          
				            enabled: false                                                  
				        }, 
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
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
		$scope.festivalPassengerBusCapacityChart = {
				options:{
					credits: {
						enabled: false
						},
					colors: columnColors,
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '节假日公交车客运量情况'
			        },
			        lang:{
			        	noData:"数据未上报"
			        },
			        xAxis: {
			            categories: festivalData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量 (人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f}人次</b></td></tr>',
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
				series: [{
		            name: '去年',
		            data: festivalPassengerCapacityBusList2

		        },{
		            name: '今年',
		            data: festivalPassengerCapacityBusList

		        }]
		};

		$scope.festivalPassengerLongDistanceBusCapacityChart = {
				options:{
					credits: {
						enabled: false
						},
					colors: columnColors,
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '节假日长途班车客运量情况'
			        },
			        xAxis: {
			            categories: festivalData
			        },
			        lang:{
			        	noData:"数据未上报"
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量 (人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f}人次</b></td></tr>',
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
				series: [{
		            name: '去年',
		            data: festivalPassengerCapacityLongDistanceBusList2

		        },{
		            name: '今年',
		            data: festivalPassengerCapacityLongDistanceBusList

		        }]
		};

		$scope.vehicleByKindColumnChart = {
				options:{
					colors: columnColors,
					credits: {
						enabled: false
						},
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '近五年客运车辆情况'
			        },
			        xAxis: {
			        	title: {
			                text: '年份'
			            },
			            categories: vehicleByKindYearList
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '车辆数（辆）'
			            },
			            stackLabels: {
			                enabled: true,
			                style: {
			                    fontWeight: 'bold',
			                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			                }
			            }
			        },
			        tooltip: {
			            formatter: function() {
			                return '<b>'+ this.x +'</b><br/>'+
			                    this.series.name +': '+ this.y +'辆<br/>'+
			                    '合计: '+ this.point.stackTotal+'辆';
			            }
			        },
			        plotOptions: {
			            column: {
			                stacking: 'normal',
			                dataLabels: {
			                    enabled: false,
			                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
			                }
			            }
			        }
				},
				series:[{
					name: '',
					data: []
				},{
					name: '',
					data: []
				},{
					name: '',
					data: []
				}] 
		};

		$scope.newVehicleByKindAreaChart = {
				options:{
					colors:columnColors,
					credits: {
						enabled: false
						},
					chart: {
			            type: 'area'
			        },
			        xAxis: {
			            categories: vehicleByKindYearList
		,
			            tickmarkPlacement: 'on',
			            title: {
				                text: '年份'
				            }
			        },
			        yAxis: {
			            title: {
			                text: '新(清洁)能源车占比(%)'
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.2f}%</b> ({point.y:,.0f}辆)<br/>',
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
			        }
				},
		        title: {
		            text: '近五年公交车中新(清洁)能源车占比情况'
		        },
		        series: [{
		            name: '非新(清洁)能源车',
		            data: []
		        },{
		            name: '新(清洁)能源车',
		            data: []
		        }]
		};
	}

	//radio点击事件
	$scope.passengerCapacityKindChange = function(passengerCapacityOne){
			
		$scope.passengerCapacityByKindChart.title.text = $scope.displayYear+'年各月'+passengerCapacityOne.name+'客运量情况';
		$scope.passengerCapacityByKindChart.series[0].name = passengerCapacityOne.name;
		$scope.passengerCapacityByKindChart.series[0].data = passengerCapacityOne.data;
	};

	$scope.vehicleKindChange = function(vehicleOne){
		$scope.newVehicleByKindAreaChart.title.text = "近五年"+vehicleOne.name+"中新(清洁)能源车占比情况";
		$scope.newVehicleByKindAreaChart.series[0].data = vehicleOne.notNewVehicle;
		$scope.newVehicleByKindAreaChart.series[1].data = vehicleOne.newVehicle;
	};
});