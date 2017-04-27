'use strict';

angular.module('app').controller('IllegalConstructionCtrl', function($scope,kpiDetailService,inform,dateService) {
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');

	var amountLineChartData = {
		categories:[],
		data:[]
	};

	var squareLineChartData = {
		categories:[],
		data:[]
	};

	 $scope.amountData = {
		thisMonthAmount:0,
		thisMonthSquare:0,
		allYearAmount:0,
		allYearSquare:0
	};

	var pieChartData = [
		['居民区拆除数',0],
		['道路两侧拆除数',0],
		['单位两侧拆除数',0],
		['河道两侧拆除数',0],
		['其他地域拆除数',0]
	];

	var columnChartData = [0,0];
	var eachMonthData = [
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		},
		{
			categories:'',
			amountValue:0,
			squareValue:0
		}
	];



//---------------------------********系统时间获取*********------------------------------------------
    var  dateTime = new Date(dateService.get_system_time());console.log();
	//var dateTime = new Date("2014-10-12T14:57:55.091Z");
	 $scope.getDate = {
	    year:dateTime.getFullYear(),
	    month:dateTime.getMonth() + 1
	  }
    console.log($scope.getDate.year + "," +$scope.getDate.month);




//---------------------------*****************------------------------------------------
    var processFunction1 = function(data){
        console.log(data.data);
        var obj = data.data;
        if(obj != null){
            var year_ = obj.year;
            var month_ = obj.month;
            if($scope.getDate.year > year_){
                $scope.getDate.year = year_;
                $scope.getDate.month = month_;
            }else if($scope.getDate.year == year_  && $scope.getDate.month > month_){
                $scope.getDate.month = month_;
            }

        }

        //---------------------------********api调用参数*********------------------------------------------

	var tableName='IllegalConstructionData';

	var advancedQueryConfig = {
		"year":{
	    "value1":$scope.getDate.year,
	    "queryType":"eq",
	    "valueType":"innt"
		}
	}
//---------------------------********处理函数返回data的函数*********----------------------------------
	
	var processFunction = function(data){
		console.log(JSON.stringify(data));
		//初始化图表数据

		wireChartData(data.data);

		initChartData(data.data);

//---------------------------********初始化图表数据********------------------------------------------
		function initChartData(data){
			if(data == null){
				alert('无数据 ！');
				return;
			}else if(columnChartData[0] == 0){
				alert('本月数据未录入 ！');
				return;
			}
			wireLineChartData();

		};


//---------------------------********函数定义*********------------------------------------------
	function wireChartData(data){
		for(var i = 0 ; i < data.length ; i ++){
			var month  =  data[i].month;
			eachMonthData[month - 1].categories = month + '月';
			eachMonthData[month - 1].amountValue = data[i].jmqccs + data[i].dllcccs + data[i].dwlcccs + data[i].hdlcccs + data[i].qtdycss;
     		eachMonthData[month - 1].squareValue = data[i].ccmj;
			if(month == $scope.getDate.month){
				$scope.amountData.thisMonthAmount = data[i].jmqccs + data[i].dllcccs + data[i].dwlcccs + data[i].hdlcccs + data[i].qtdycss;
				$scope.amountData.thisMonthSquare = data[i].ccmj;
				columnChartData[0] = data[i].qcs;
				columnChartData[1] = data[i].zccs;
				pieChartData[0][1] = data[i].jmqccs;
				pieChartData[1][1] = data[i].dllcccs;
				pieChartData[2][1] = data[i].dwlcccs;
				pieChartData[3][1] = data[i].hdlcccs;
				pieChartData[4][1] = data[i].qtdycss;
			}
		}
	};


	function wireLineChartData(){
		for(var i = 0 ; i < $scope.getDate.month ; i ++){
			var ccmj = $scope.amountData.allYearSquare + eachMonthData[i].squareValue;
			$scope.amountData.allYearSquare = Math.round(ccmj*100)/100;
			$scope.amountData.allYearAmount = $scope.amountData.allYearAmount + eachMonthData[i].amountValue
			if(eachMonthData[i].categories != ''){
				squareLineChartData.categories.push(eachMonthData[i].categories);
				squareLineChartData.data.push(eachMonthData[i].squareValue);
				amountLineChartData.categories.push(eachMonthData[i].categories);
				amountLineChartData.data.push(eachMonthData[i].amountValue);
			}
		}
	}


            $scope.lineChart1  ={
	                              options:{
                                    title: {
                                    text: $scope.getDate.year+'年各月份违法建设拆除面积',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: squareLineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: '拆除面积(平方米)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '(平方米)'
                                },
                                  credits:{
                                    enabled:false
                                },
                                legend: {
                                    enabled:false
                                }
                              },
                            
                                series: [{
                                    name: '拆除面积',
                                    data: squareLineChartData.data
                                }]
  
              };
                 $scope.lineChart2  ={
                              options:{
                                    title: {
                                    text: $scope.getDate.year + '年各月份违法建设拆除次数',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: amountLineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: '拆除次数（起）'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '(起)'
                                },
                                  credits:{
                                    enabled:false
                                },
                                legend: {
                                      enabled:false
                                }
                              },
                            
                                series: [{
                                    name: '拆除次数',
                                    data: amountLineChartData.data
                                }]
  
              };

		    $scope.columnChart = {
			               options: {
			         chart: {
			            type: 'column'
			        },
			            credits:{
			               enabled:false
			                },
			        title: {
			            text: $scope.getDate.month + "月份各类拆除方式详情"
			        },
			        subtitle: {
			            text: ''
			        },
			        xAxis: {
			            categories: [
			                '强拆数',
			                '自拆除数'
			       
			            ]
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '拆除数 (起)'
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
			                '<td style="padding:0"><b>{point.y:.1f} (起)</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0,
			                       dataLabels: {                                              
			                             enabled: true                                          
			                             } 
			                                
			            },
			             showInLegend: false
			        }
			                        },
			    series: [{
			            name: '拆除数',
			            data: columnChartData

			        }]		                                            
			};

        $scope.pieChart = {
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
                                    text: $scope.getDate.month+"月份太仓市分区域拆除详情"
                                },
                                tooltip: {
                                    pointFormat: '<b>拆除数</b>:{point.y:.1f}(起)</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            format: '<b>{point.percentage:.1f} %'
                                        },
                                        showInLegend: true
                                    }
                                
                            }
                        },
                            series: [{
                                type: 'pie',
                                name: '违法建设拆除',
                                data: pieChartData
                            }]                                           
        };
		
	};//end of processFunction

kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);

    }
//---------------------------********api调用参数*********------------------------------------------
kpiDetailService.getLastestObject('IllegalConstructionData',["year",'month'],processFunction1);

});