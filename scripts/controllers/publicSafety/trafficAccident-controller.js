'use strict';

angular.module('app').controller('TrafficAccidentCtrl', function($scope,kpiDetailService,inform,dateService) {
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var eachMonthData = [

		{
			month:'1',
			data:[0,0,0,0]      //0 是总数 , 1是受伤人数 , 2 死亡人数 ,3是直接财产损失
		},
		{
			month:'2',
			data:[0,0,0,0]
		},
		{
			month:'3',
			data:[0,0,0,0]
		},
		{
			month:'4',
			data:[0,0,0,0]
		},
		{
			month:'5',
			data:[0,0,0,0]
		},
		{
			month:'6',
			data:[0,0,0,0]
		},
		{
			month:'7',
			data:[0,0,0,0]
		},
		{
			month:'8',
			data:[0,0,0,0]
		},
		{
			month:'9',
			data:[0,0,0,0]
		},
		{
			month:'10',
			data:[0,0,0,0]
		},
		{
			month:'11',
			data:[0,0,0,0]
		}, 
		{
			month:'12',
			data:[0,0,0,0]
		}
	];

	var stationInfo = [
		{
			id:'3101',
			name:'南郊交警中队',
			value:0,
			desc:''
		},
		{
			id:'3102',
			name:'港区交警中队',
			value:0,
			desc:''
		},
		{
			id:'3103',
			name:'沙溪交警中队',
			value:0,
			desc:''
		},
		{
			id:'3104',
			name:'浏河交警中队',
			value:0,
			desc:''
		},
		{
			id:'3105',
			name:'城厢交警中队',
			value:0,
			desc:''
		},
		{
			id:'3106',
			name:'璜泾交警中队',
			value:0,
			desc:''
		},
		{
			id:'3107',
			name:'经济开发区交警中队',
			value:0,
			desc:''
		}

	];

	//查看月份的每个接警单位接警数
	var eachStationData = {
			categories:[
				{
					cateData:[]
				},
				{
					cateData:[]
				},
				{
					cateData:[]
				},
				{
					cateData:[]
				}
			],
			values:[
				{
					elseAccident:[],
					vehicle:[],
					nonVehicle:[]
				},
				{
					elseAccident:[],
					vehicle:[],
					nonVehicle:[]
				},
				{
					elseAccident:[],
					vehicle:[],
					nonVehicle:[]
				},
				{
					elseAccident:[],
					vehicle:[],
					nonVehicle:[]
				}
			]
	};
		
	$scope.amountData = {
		amount:0,
		elseIndicator:0
	}

	$scope.sumData={
			sumAccident:0
	}
	
	$scope.pieTypeData1 = {
		data:[
				['机动车事故',0],
		        ['非机动车事故',0],
		        ['其它交通事故',0]
	          ],
	    unit:''
	};

	$scope.barCountStationData1 = {
		categories:[],
		data:[],
		title:'受伤人数(人)',
		unit:'人',
		type:0
	}	

	var pieTypeData = [
		
		['机动车事故',0],
		['非机动车事故',0],
		['其它交通事故',0]
	];

	var barCountStationData = {
		categories:[],
		data:[]
	}

	$scope.thisMonthTotalData = {
    	amount:0,
    	majorAccident:0,
    	largeAccident:0,
    	type:0
    };

    $scope.lineChartData = {
    	categories:[],
    	data:[],
    	name:'',
    	title:'事故发生数(起)',
		unit:'起',
    	type:0
    }

	
//---------------------------********系统时间获取*********------------------------------------------
	var  dateTime = new Date(dateService.get_system_time());
    console.log(dateTime);
	//var dateTime = new Date("2014-12-12T14:57:55.091Z");
	 $scope.getDate = {
	    year:dateTime.getFullYear(),
	    month:dateTime.getMonth()+1
	  }
    console.log($scope.getDate.year + "," +$scope.getDate.month);


//---------------------------*****************------------------------------------------
    var processFunction1 = function(data){
    	console.log(data.data);
    	var obj = data.data;
    	if(obj != null){
    		var year_ = obj.year;
    		var month_ = obj.month;
    		console.log(month_);
    		if($scope.getDate.year > year_){
    			$scope.getDate.year =year_ ;//
    			$scope.getDate.month =month_ ;
    		}else if($scope.getDate.year == year_){
    			$scope.getDate.month =month_;  //month_
    		}

    	}

   //---------------------------********api调用参数*********------------------------------------------

	var tableName='TrafficAccidentData';

	var advancedQueryConfig = {
		"year":{
	    "value1":$scope.getDate.year,
	    "queryType":"eq",
	    "valueType":"innt"
		}
	}
//-----------------------------------处理函数返回data的函数，-------------------------------
	
	var processFunction = function(data){
		console.log(data);
		//组装每月数据

		wireEachMonthData(data.data);
		//初始化图表数据
		initChartData(data.data);


		function initChartData(data){
		if(data.length == 0){
			alert('无数据 ！');
			return;
		}else if(eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0){
			alert('本月数据未录入 ！');
			return;
		}

		createLineChartData();

		createBarCountStationDataAndPieTypeData();

		};

	function wireEachMonthData(data){
		for(var i = 0 ; i < data.length ; i ++){
			var month  =  data[i].month;
			var type = data[i].type.abbr;
			eachMonthData[month - 1].data[type] = eachMonthData[month - 1].data[type] + data[i].elseAccident + data[i].vehicle +data[i].nonVehicle;
			
			if(month == $scope.getDate.month){
				eachStationData.categories[type].cateData.push(data[i].trafficStation.name);
				eachStationData.values[type].elseAccident.push(data[i].elseAccident); 
				eachStationData.values[type].vehicle.push(data[i].vehicle);
				eachStationData.values[type].nonVehicle.push(data[i].nonVehicle);
			}
		}
	};


	function createPieChartData(data){
		var pieChartData = [
			['治安类', parseInt(data.police)],
			['刑事类', data.criminal],
			['交通事故类', data.trafficAccident],
			['火灾类', data.fire],
			['其它', data.elseCase]
		];
		return pieChartData;
	};

	function createLineChartData(){
		var nameArray = ['交通事故数(起)','死亡人数(人)','死亡人数(人)','直接财产损失(元)'];
		var s=0;
		for(var i = 0 ; i < $scope.getDate.month; i ++){
			$scope.lineChartData.categories.push((i + 1) + '月');
			$scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
			var temp=eachMonthData[i].data[$scope.lineChartData.type];
			s=s+temp;
			$scope.lineChartData.name = nameArray[$scope.lineChartData.type];	
		}
		$scope.sumData.sumAccident=s;
	};


	function getStationName(id){
		for(var i = 0 ;  i < stationInfo.length ; i ++){
			if(stationInfo[i].id == id)
				return stationInfo[i].name;
		}
		return '未知';
	};

	function createBarCountStationDataAndPieTypeData(){	
		var elseAccident = 0,
			vehicle = 0,
			nonVehicle = 0,
			elseAccident1 = 0,
			vehicle1 = 0,
			nonVehicle1 = 0;	
		for(var i = 0 ; i < eachStationData.categories[0].cateData.length ; i ++){
			barCountStationData.categories = eachStationData.categories[0].cateData;
			$scope.barCountStationData1.categories = eachStationData.categories[1].cateData;
			barCountStationData.data.push(eachStationData.values[0].elseAccident[i] + eachStationData.values[0].vehicle[i] + eachStationData.values[0].nonVehicle[i]);
			$scope.barCountStationData1.data.push(eachStationData.values[1].elseAccident[i] + eachStationData.values[1].vehicle[i] + eachStationData.values[1].nonVehicle[i]);
			elseAccident = elseAccident + eachStationData.values[0].elseAccident[i];
			vehicle = vehicle + eachStationData.values[0].vehicle[i];
			nonVehicle = nonVehicle + eachStationData.values[0].nonVehicle[i];
			elseAccident1 = elseAccident1 + eachStationData.values[1].elseAccident[i];
			vehicle1 = vehicle1 + eachStationData.values[1].vehicle[i];
			nonVehicle1 = nonVehicle1 + eachStationData.values[1].nonVehicle[i];
		}
		
		pieTypeData[0][1] = vehicle;
		pieTypeData[1][1] = nonVehicle;	
		pieTypeData[2][1] = elseAccident;
		console.log(pieTypeData);
		$scope.amountData.amount = elseAccident + vehicle + nonVehicle;
		
		$scope.pieTypeData1.data[0][1] = vehicle1;
		$scope.pieTypeData1.data[1][1] = nonVehicle1;
		$scope.pieTypeData1.data[2][1] = elseAccident1;
		$scope.amountData.elseIndicator = elseAccident1 + vehicle1 + nonVehicle1;	
		$scope.pieTypeData1.unit = '人';	 
	}

	$scope.typeChange1 = function(type){
		var elseAccident = 0,
			vehicle = 0,
			nonVehicle = 0;
		var titles = ['','受伤人数(人)','死亡人数(人)','直接财产损失(元)']
		var units = ['','人','人','元']
		$scope.barCountStationData1.categories = eachStationData.categories[type].cateData;
		$scope.barCountStationData1.data = [];
		for(var i = 0 ; i < eachStationData.categories[0].cateData.length ; i ++){		
			$scope.barCountStationData1.data.push(eachStationData.values[type].elseAccident[i] + eachStationData.values[type].vehicle[i] + eachStationData.values[type].nonVehicle[i]);
			elseAccident = elseAccident + eachStationData.values[type].elseAccident[i];
			vehicle = vehicle + eachStationData.values[type].vehicle[i];
			nonVehicle = nonVehicle + eachStationData.values[type].nonVehicle[i];
		}
		$scope.amountData.elseIndicator = elseAccident + vehicle + nonVehicle;
		$scope.barCountStationData1.unit = units[type];
		$scope.barCountStationData1.title = titles[type];
		
		$scope.pieTypeData1.data[0][1] = vehicle;
		$scope.pieTypeData1.data[1][1] = nonVehicle;
		$scope.pieTypeData1.data[2][1] = elseAccident;
		$scope.pieTypeData1.unit = units[type];

		$scope.pieType1 = {  //第二个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类交通事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit +')</b>'
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
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '交通事故数',
			                    data: $scope.pieTypeData1.data
			                }]                        
			};

$scope.barCountStation1 = {  //第二个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: $scope.barCountStationData1.categories ,
            title: {                                                       
                text: '交警支队',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: $scope.barCountStationData1.title                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '人'                                       
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
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各交警中队受理交通事故详情'                    
        }, 
    series: [{                                                         
            name:$scope.barCountStationData1.title,                                             
            data: $scope.barCountStationData1.data                                 
    }] 
};



	}

	$scope.pieType1 = {//第二个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类交通事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit +')</b>'
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
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '交通事故数',
			                    data: $scope.pieTypeData1.data
			                }]                        
			};

$scope.barCountStation1 = {//第二个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: $scope.barCountStationData1.categories ,
            title: {                                                       
                text: '交警支队',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '受伤人数(人)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '人'                                       
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
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各交警中队受理交通事故详情'                    
        }, 
    series: [{                                                         
            name:'受伤人数',                                             
            data: $scope.barCountStationData1.data                                 
    }] 
};

				 $scope.pieType = { //第一个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类交通事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(起)</b>'
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
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '交通事故数',
			                    data: pieTypeData
			                }]                        
			};

$scope.barCountStation = {//第一个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: barCountStationData.categories ,
            title: {                                                       
                text: '交警支队',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '受理交通事故数(起)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '起'                                       
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
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各交警中队受理交通事故数'                    
        }, 
    series: [{                                                         
            name:'受理事故数',                                             
            data:barCountStationData.data                                 
    }] 
};
		$scope.typeChange = function(type){//折线
				$scope.lineChartData.categories = [];
				$scope.lineChartData.data = [];
				var titles = ['事故发生数(起)','受伤人数(人)','死亡人数(人)','直接财产损失(万元)']
				var units = ['起','人','人','万元']
                var s=0;
				var nameArray = ['交通事故数(起)','受伤数(人)','死亡人数(人)','直接财产损失(万元)'];
				for(var i = 0 ; i < $scope.getDate.month; i ++){
					$scope.lineChartData.categories.push((i + 1) + '月');
					if(type == 3){
						var temp = eachMonthData[i].data[$scope.lineChartData.type];
						temp = temp/10000;
						$scope.lineChartData.data.push(temp);
						s=s+temp;
					}
					else		
						{$scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
					    var tem=eachMonthData[i].data[$scope.lineChartData.type];
				        s=s+tem;}
					$scope.lineChartData.name = nameArray[$scope.lineChartData.type];
					$scope.lineChartData.unit = units[type];
					$scope.lineChartData.title = titles[type];
						
				}
				if(type==3)
					s=s.toFixed(4);
				$scope.sumData.sumAccident=s;
				
		   $scope.lineChart = {
               options: {
                           
                            title: {
                                text: $scope.getDate.year+"年太仓市交通事故趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: $scope.lineChartData.name
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }],
                                min:0
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                             credits: {                                                         
                        enabled: false                                                 
                    },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            }
                        },
        			 series:[
        			 	{                                                         
						            name: $scope.lineChartData.name,                                             
						            data: $scope.lineChartData.data                                   
						}
        			 ] 
                                            
    };

		};





//
    $scope.lineChart = {
               options: {
                           
                            title: {
                                text: $scope.getDate.year+"年太仓市交通事故趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: $scope.lineChartData.name
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }],
                                min:0
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                             credits: {                                                         
                        enabled: false                                                 
                    },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            }
                        },
        			 series:[
        			 	{                                                         
						            name: $scope.lineChartData.name,                                             
						            data: $scope.lineChartData.data                                   
						}
        			 ] 
                                            
    };

		
	};

kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);
    }
//---------------------------********api调用参数*********------------------------------------------
kpiDetailService.getLastestObject('TrafficAccidentData',["year",'month'],processFunction1);

});