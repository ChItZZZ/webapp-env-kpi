'use strict';

angular.module('app').controller('telecomInfrCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/TlcmInfrData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var startOprtr = new Date(recentTime);
		var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('year')); // alert(endDate);
		
		kpiDetailService.query('TlcmInfrData',startDate,endDate,processFunction);
	});
	
	//变量区
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');
	var time = new Date();
	var thisYear = time.getUTCFullYear();
	
	var telUserLastYearList = [];
	var mblUserLastYearList = [];
	var netUserLastYearList = [];
	var bsns3gUserLastYearList = [];
	
	$scope.userLastYearListSelected = [];
	
	var teleBaseStationNumList = [];
	var teleOptclFiberLengthList = [];
	var teleSwitcherGateNumList = [];
	var teleNetBandWidthList = [];
	
	var mblBaseStationNumList = [];
	var mblOptclFiberLengthList = [];
	var mblSwitcherGateNumList = [];
	var mblNetBandWidthList = [];
	
	var unicomBaseStationNumList = [];
	var unicomOptclFiberLengthList = [];
	var unicomSwitcherGateNumList = [];
	var unicomNetBandWidthList = [];
	
	var baseStationLastYearList = [];
	var optclFiberLastYearList = [];
	var switcherGateLastYearList = [];
	var netBandWidthLastYearList = [];
	
	var telUserList = [];
	var mblUserList = [];
	var netUserList = [];
	var bsns3gUserList = [];
	$scope.usrPrcntgKindList = [];
	
	//charts data
	var yearData = [];
	var telUserTotalList = [];  //固话总数
	var mblUserTotalList = [];  //移动总数
	var netUserTotalList = [];  //宽带用户总数
	var bsns3gUserTotalList = []; //3G用户总数
	$scope.userList = [];
	
	var baseStationTotalList = [];
	var optclFiberLengthTotalList = [];
	var switcherGateTotalList = [];
	var netBandWidthTotalList = [];
	$scope.infrstrctTotalList = [];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var processFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		console.log(data);
		var teleTelUserList = [];
		var mblTelUserList = [];
		var unicomTelUserList = [];
		
		var teleMblUserList = [];
		var mblMblUserList = [];
		var unicomMblUserList = [];
		
		var teleNetUserList = [];
		var mblNetUserList = [];
		var unicomNetUserList = [];
		
		var tele3gUserList = [];
		var mbl3gUserList = [];
		var unicom3gUserList = [];
		
		for(var i=0; i<data.length; i++){
			
			switch(data[i].oprtrType.id){
			
			case 6071://电信
				teleTelUserList.push(data[i].telUserNum);
				teleMblUserList.push(data[i].mblUserNum);
				teleNetUserList.push(data[i].netUserNum);
				tele3gUserList.push(data[i].bsns3gUserNum);
				
				teleBaseStationNumList.push(data[i].baseStationNum);
				teleOptclFiberLengthList.push(data[i].optclFiberLength);
				teleSwitcherGateNumList.push(data[i].switcherGateNum);
				teleNetBandWidthList.push(data[i].netBandWidth);
				break;
			case 6072://移动
				mblTelUserList.push(data[i].telUserNum);
				mblMblUserList.push(data[i].mblUserNum);
				mblNetUserList.push(data[i].netUserNum);
				mbl3gUserList.push(data[i].bsns3gUserNum);
				
				mblBaseStationNumList.push(data[i].baseStationNum);
				mblOptclFiberLengthList.push(data[i].optclFiberLength);
				mblSwitcherGateNumList.push(data[i].switcherGateNum);
				mblNetBandWidthList.push(data[i].netBandWidth);
				break;
			case 6073://联通
				unicomTelUserList.push(data[i].telUserNum);
				unicomMblUserList.push(data[i].mblUserNum);
				unicomNetUserList.push(data[i].netUserNum);
				unicom3gUserList.push(data[i].bsns3gUserNum);
				
				unicomBaseStationNumList.push(data[i].baseStationNum);
				unicomOptclFiberLengthList.push(data[i].optclFiberLength);
				unicomSwitcherGateNumList.push(data[i].switcherGateNum);
				unicomNetBandWidthList.push(data[i].netBandWidth);
				break;
			}
			
		}
		var applyYear;
		for(var j=0; j<data.length/3; j++){
			applyYear = new Date(data[j*3].applyTime);
			yearData.push(applyYear.getFullYear());
			
			if(teleTelUserList[j]==null&&mblTelUserList[j]==null&&unicomTelUserList[j]==null){
				telUserTotalList.push(null);
			}else{
				telUserTotalList.push(teleTelUserList[j]+mblTelUserList[j]+unicomTelUserList[j]);
			}
			if(teleMblUserList[j]==null&&mblMblUserList[j]==null&&unicomMblUserList[j]==null){
				mblUserTotalList.push(null);
			}else{
				mblUserTotalList.push(teleMblUserList[j]+mblMblUserList[j]+unicomMblUserList[j]);
			}
			if(teleNetUserList[j]==null&&mblNetUserList[j]==null&&unicomNetUserList[j]==null){
				netUserTotalList.push(null);
			}else{
				netUserTotalList.push(teleNetUserList[j]+mblNetUserList[j]+unicomNetUserList[j]);
			}
			if(tele3gUserList[j]==null&&mbl3gUserList[j]==null&&unicom3gUserList[j]==null){
				bsns3gUserTotalList.push(null);
			}else{
				bsns3gUserTotalList.push(tele3gUserList[j]+mbl3gUserList[j]+unicom3gUserList[j]);
			}
			
			if(teleBaseStationNumList[j]==null&&mblBaseStationNumList[j]==null&&unicomBaseStationNumList[j]==null){
				baseStationTotalList.push(null);
			}else{
				baseStationTotalList.push(teleBaseStationNumList[j]+mblBaseStationNumList[j]+unicomBaseStationNumList[j]);
			}
			if(teleOptclFiberLengthList[j]==null&&mblOptclFiberLengthList[j]==null&&unicomOptclFiberLengthList[j]==null){
				optclFiberLengthTotalList.push(null);
			}else{
				optclFiberLengthTotalList.push(teleOptclFiberLengthList[j]+mblOptclFiberLengthList[j]+unicomOptclFiberLengthList[j]);
			}
			if(teleSwitcherGateNumList[j]==null&&mblSwitcherGateNumList[j]==null&&unicomSwitcherGateNumList[j]==null){
				switcherGateTotalList.push(null);
			}else{
				switcherGateTotalList.push(teleSwitcherGateNumList[j]+mblSwitcherGateNumList[j]+unicomSwitcherGateNumList[j]);
			}
			if(teleNetBandWidthList[j]==null&&mblNetBandWidthList[j]==null&&unicomNetBandWidthList[j]==null){
				netBandWidthTotalList.push(null);
			}else{
				netBandWidthTotalList.push(teleNetBandWidthList[j]+mblNetBandWidthList[j]+unicomNetBandWidthList[j]);
			}
		}
		
		$scope.displayYear = yearData[data.length/3-1];
		console.log($scope.displayYear);
		$scope.lastYear = yearData[data.length/3-2];
		console.log($scope.lastYear);
		telUserLastYearList = returnLastYearTableData(teleTelUserList, '电信', mblTelUserList, '移动', unicomTelUserList, '联通', (data.length/3-1));
		mblUserLastYearList = returnLastYearTableData(teleMblUserList, '电信', mblMblUserList, '移动', unicomMblUserList, '联通', (data.length/3-1));
		netUserLastYearList = returnLastYearTableData(teleNetUserList, '电信', mblNetUserList, '移动', unicomNetUserList, '联通', (data.length/3-1));
		bsns3gUserLastYearList = returnLastYearTableData(tele3gUserList, '电信', mbl3gUserList, '移动', unicom3gUserList, '联通', (data.length/3-1));
		$scope.userListLastYearSelected = telUserLastYearList;
		$scope.userListLastYearTitle = '固话用户情况';
		
		baseStationLastYearList = returnLastYearTableData(teleBaseStationNumList, '电信', mblBaseStationNumList, '移动', unicomBaseStationNumList, '联通', (data.length/3-1));
		optclFiberLastYearList = returnLastYearTableData(teleOptclFiberLengthList, '电信', mblOptclFiberLengthList, '移动', unicomOptclFiberLengthList, '联通', (data.length/3-1));
		console.log(optclFiberLastYearList);
		switcherGateLastYearList = returnLastYearTableData(teleSwitcherGateNumList, '电信', mblSwitcherGateNumList, '移动', unicomSwitcherGateNumList, '联通', (data.length/3-1));
		netBandWidthLastYearList = returnLastYearTableData(teleNetBandWidthList, '电信', mblNetBandWidthList, '移动', unicomNetBandWidthList, '联通', (data.length/3-1));
		$scope.infrstrctTotalLastYearTitle = '基站情况';
		$scope.infrstrctTotalLastYearUnion = '个';
		$scope.infrstrctListLastYearSelected = baseStationLastYearList;
		
		$scope.userList.push({
			name: '固话用户',
			data: telUserTotalList
		});
		$scope.userList.push({
			name: '移动电话用户',
			data: mblUserTotalList
		});
		$scope.userList.push({
			name: '宽带用户',
			data: netUserTotalList
		});
		$scope.userList.push({
			name: '3G和4G业务用户',
			data: bsns3gUserTotalList
		});
		$scope.userKindSelected = $scope.userList[0].name;
		$scope.inforUserTotalLineChart.series[0].name = $scope.userList[0].name;
		$scope.inforUserTotalLineChart.series[0].data = $scope.userList[0].data;
		
		$scope.infrstrctTotalList.push({
			name: '基站',
			data: baseStationTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '光纤总长',
			data: optclFiberLengthTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '交换机',
			data: switcherGateTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '互联网带宽',
			data: netBandWidthTotalList
		});
		$scope.infrstrctKindSelected = $scope.infrstrctTotalList[0].name;
		$scope.infrstrctTotalLineChart.series[0].name = $scope.infrstrctTotalList[0].name;
		$scope.infrstrctTotalLineChart.series[0].data = $scope.infrstrctTotalList[0].data;
		$scope.infrstrctTotalLineChart.options.yAxis.title.text = "基站数 (个)";
		$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '个';
		
		telUserList = returnUserByKindTableData(teleTelUserList, '电信', mblTelUserList, '移动', unicomTelUserList, '联通');
		mblUserList = returnUserByKindTableData(teleMblUserList, '电信', mblMblUserList, '移动', unicomMblUserList, '联通');
		netUserList = returnUserByKindTableData(teleNetUserList, '电信', mblNetUserList, '移动', unicomNetUserList, '联通');
		bsns3gUserList = returnUserByKindTableData(tele3gUserList, '电信', mbl3gUserList, '移动', unicom3gUserList, '联通');
		
		$scope.usrPrcntgKindList.push({
			name: '固话用户',
			data: telUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '移动电话用户',
			data: mblUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '宽带用户',
			data: netUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '3G和4G业务用户',
			data: bsns3gUserList
		});
		$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[0].data[0].data;
		$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[0].data[1].data;
		$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[0].data[2].data;
		$scope.userPercentageKindSelected = $scope.usrPrcntgKindList[0].name;
		
		$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleBaseStationNumList;
		$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblBaseStationNumList;
		$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomBaseStationNumList;
	};
	
	//highcharts
	$scope.inforUserTotalLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: yearData,
		            tickmarkPlacement: 'on'
		        },
		        yAxis: {
		        	min: 0,
		            title: {
		                text: '用户数(人)'
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
		            valueSuffix: '人'
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年固话用户情况',
	            x: -20 //center
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	$scope.userPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        xAxis: {
		            categories: yearData,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
		        },
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} 人)<br/>',
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
	            text: '近五年固话用户分布情况'
	        },
	        series: [{
	        	name: '电信',
	        	data: []
	        },{
	        	name: '移动',
	        	data: []
	        },{
	        	name: '联通',
	        	data: []
	        }]
	};
	$scope.infrstrctTotalLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: yearData,
		            tickmarkPlacement: 'on'
		        },
		        yAxis: {
		        	min: 0,
		            title: {
		                text: '基站数(个)'
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
		            valueSuffix: '个'
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年基站情况',
	            x: -20 //center
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	
	$scope.infrstrctPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        xAxis: {
		            categories: yearData,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
		        },
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}个)<br/>',
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
	            text: '近五年基站分布情况'
	        },
	        series: [{
	        	name: '电信',
	        	data: []
	        },{
	        	name: '移动',
	        	data: []
	        },{
	        	name: '联通',
	        	data: []
	        }]
	};
	
	//function 
	function returnLastYearTableData(list1, name1, list2, name2, list3, name3, index){
		
		var reList = [];
		reList.push({
			name: name1,
			number: list1[index]
		});
		reList.push({
			name: name2,
			number: list2[index]
		});
		reList.push({
			name: name3,
			number: list3[index]
		});
		reList.push({
			name: '合计',
			number: list1[index]+list2[index]+list3[index]
		});
		return reList;
	}
	function returnUserByKindTableData(list1, name1, list2, name2, list3, name3){
		
		var reList = [];
		reList.push({
			name: name1,
			data: list1
		});
		reList.push({
			name: name2,
			data: list2
		});
		reList.push({
			name: name3,
			data: list3
		});
		return reList;
	}
	$scope.userKindChange = function(user){
		$scope.inforUserTotalLineChart.title.text = "近五年"+user.name+"情况";
		$scope.inforUserTotalLineChart.series[0].name = user.name;
		$scope.inforUserTotalLineChart.series[0].data = user.data;
		switch(user.name.trim()){
		
		case '固话用户':  
			$scope.userListLastYearSelected = telUserLastYearList;
			$scope.userListLastYearTitle = '固话用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[0].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[0].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[0].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年固话用户分布情况';
			break;
		case '移动电话用户':  
			$scope.userListLastYearSelected = mblUserLastYearList;
			$scope.userListLastYearTitle = '移动电话用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[1].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[1].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[1].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年移动电话用户分布情况';
			break;
		case '宽带用户':  
			$scope.userListLastYearSelected = netUserLastYearList;
			$scope.userListLastYearTitle = '宽带用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[2].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[2].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[2].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年宽带用户分布情况';
			break;
		case '3G和4G业务用户':  
			$scope.userListLastYearSelected = bsns3gUserLastYearList;
			$scope.userListLastYearTitle = '3G和4G业务用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[3].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[3].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[3].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年3G和4G业务用户分布情况';
			break;
		
		}
	};
	$scope.infrstrctKindChange = function(infrstrct){
		$scope.infrstrctTotalLineChart.title.text = "近五年"+infrstrct.name+"情况";
		$scope.infrstrctTotalLineChart.series[0].name = infrstrct.name;
		$scope.infrstrctTotalLineChart.series[0].data = infrstrct.data;
		$scope.infrstrctPercentageByKindAreaChart.title.text = "近五年"+infrstrct.name+"分布情况";//"近五年"+infrstrct.name+"分布情况";
		switch(infrstrct.name.trim()){
		case '基站':
			$scope.infrstrctTotalLastYearTitle = '基站情况';
			$scope.infrstrctTotalLastYearUnion = '个';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "基站数 (个)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '个';
			
			$scope.infrstrctListLastYearSelected = baseStationLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}个)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomBaseStationNumList;
			break;
		case '光纤总长':
			$scope.infrstrctTotalLastYearTitle = '光纤总长情况';
			$scope.infrstrctTotalLastYearUnion = 'km';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "光纤总长 (km)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = 'km';
			
			$scope.infrstrctListLastYearSelected = optclFiberLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}km)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomOptclFiberLengthList;
			break;
		case '交换机':
			$scope.infrstrctTotalLastYearTitle = '交换机情况';
			$scope.infrstrctTotalLastYearUnion = '门';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "交换机门数 (门)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '门';
			
			$scope.infrstrctListLastYearSelected = switcherGateLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}门)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomSwitcherGateNumList;
			break;
		case '互联网带宽':
			$scope.infrstrctTotalLastYearTitle = '互联网带宽情况';
			$scope.infrstrctTotalLastYearUnion = 'G';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "互联网带宽 (G)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = 'G';
			
			$scope.infrstrctListLastYearSelected = netBandWidthLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}G)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomNetBandWidthList;
			break;
		}
	}

});