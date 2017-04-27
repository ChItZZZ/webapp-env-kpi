'use strict';

angular.module('app').controller('AdministrativePenaltyCtrl', function($scope,kpiDetailService,inform,dateService) {
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');

$scope.barData = {
    selected:0,
    jyData:[],
    ybData:[],
    cate:[],
    title:'',
    yText:'处理案件数（起）',
    valueSuffix:'（起）'
  };
	 $scope.amountData = {
		thisMonthAmount:0,
		thisMonthMoney:0,
		allYearAmount:0,
		allYearMoney:0
	};


	var columnChartData = [
		[0,0],
		[0,0]
	];

	var eachMonthData = [
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			},
			{
				jy_BYAFS:0,
				yb_BYAFS:0,
				jy_BYJE:0,
				yb_BYJE:0
			}

		];

	
var eachStationData  = {
	categories:[],
	jy_BYAFS:[],
	yb_BYAFS:[],
	jy_BYJE:[],
	yb_BYJE:[]
}

var lineChartData = {
    categories:[],
    jy_BYAFS:[],
    yb_BYAFS:[],
    jy_BYJE:[],
    yb_BYJE:[]
}


//---------------------------********系统时间获取*********------------------------------------------
    var  dateTime = new Date(dateService.get_system_time());console.log(dateTime);
	//var dateTime = new Date("2014-12-12T14:57:55.091Z");
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

    var tableName='AdministrativePenaltyData';

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

         wireBarChartData();

//---------------------------********初始化图表数据********------------------------------------------
        function initChartData(data){
            if(data == null){
                alert('无数据 ！');
                return;
            }
            // else if(columnChartData[0] == 0){
            //  alert('本月数据未录入 ！');
            //  return;
            // }
            wireLineChartData();

        };


//---------------------------********函数定义*********------------------------------------------
    function wireChartData(data){
        for(var i = 0 ; i < data.length ; i ++){
            var month  =  data[i].month;
            eachMonthData[month - 1].jy_BYAFS = eachMonthData[month - 1].jy_BYAFS + data[i].jy_BYAFS;
            eachMonthData[month - 1].yb_BYAFS = eachMonthData[month - 1].yb_BYAFS + data[i].yb_BYAFS;
            eachMonthData[month - 1].jy_BYJE = eachMonthData[month - 1].jy_BYJE + data[i].jy_BYJE;
            eachMonthData[month - 1].yb_BYJE = eachMonthData[month - 1].yb_BYJE + data[i].yb_BYJE;
            if(month == $scope.getDate.month){
                columnChartData[0][0] = columnChartData[0][0] + data[i].jy_BYAFS;
                columnChartData[0][1] = columnChartData[0][1] + data[i].yb_BYAFS;
                columnChartData[1][0] = columnChartData[1][0] + data[i].jy_BYJE;
                columnChartData[1][1] = columnChartData[1][1] + data[i].yb_BYJE;
                $scope.amountData.thisMonthAmount = $scope.amountData.thisMonthAmount + data[i].jy_BYAFS + data[i].yb_BYAFS;
                $scope.amountData.thisMonthMoney = $scope.amountData.thisMonthMoney + data[i].jy_BYJE + data[i].yb_BYJE;
                eachStationData.categories.push(data[i].zdname);
                eachStationData.jy_BYAFS.push(data[i].jy_BYAFS);
                eachStationData.yb_BYAFS.push(data[i].yb_BYAFS);
                eachStationData.jy_BYJE.push(data[i].jy_BYJE);
                eachStationData.yb_BYJE.push(data[i].yb_BYJE);
            }
        }
    };

    function wireBarChartData(){
        $scope.barData.cate  = eachStationData.categories;
        $scope.barData.jyData = eachStationData.jy_BYAFS;
        $scope.barData.ybData = eachStationData.yb_BYAFS;
        $scope.barData.title = $scope.getDate.year+"年"+$scope.getDate.month+'月份各中队处理行政处罚案件数';
    }

    function wireLineChartData(){
        for(var i = 0 ; i < $scope.getDate.month ; i ++){
            $scope.amountData.allYearMoney = $scope.amountData.allYearMoney + eachMonthData[i].jy_BYJE + eachMonthData[i].yb_BYJE;
            $scope.amountData.allYearAmount = $scope.amountData.allYearAmount + eachMonthData[i].jy_BYAFS + eachMonthData[i].yb_BYAFS
            if(eachMonthData[i].jy_BYAFS != 0 || eachMonthData[i].yb_BYAFS != 0){
                lineChartData.categories.push((i+1) + '月');
                lineChartData.jy_BYAFS.push(eachMonthData[i].jy_BYAFS);
                lineChartData.yb_BYAFS.push(eachMonthData[i].yb_BYAFS);
                lineChartData.jy_BYJE.push(eachMonthData[i].jy_BYJE);
                lineChartData.yb_BYJE.push(eachMonthData[i].yb_BYJE);
            }
        }
    }




$scope.barChart  ={
                              options:{
                                colors:newColors,
                                chart: {                                                           
                                        type: 'bar'                                                    
                                    },                                                                 
                                    title: {                                                           
                                        text: $scope.barData.title                    
                                    },                                                                 
                                                                                            
                                    xAxis: {                                                           
                                        categories: $scope.barData.cate,
                                        title: {                                                       
                                            text: ''                                                 
                                        }                                                              
                                    },                                                                 
                                    yAxis: {                                                           
                                        min: 0,                                                        
                                        title: {                                                       
                                            text:  $scope.barData.yText                                                                       
                                        },                                                             
                                        labels: {                                                      
                                            overflow: 'justify'                                        
                                        }                                                              
                                    },                                                                 
                                    tooltip: {                                                         
                                        valueSuffix: $scope.barData.valueSuffix                                       
                                    },                                                                 
                                    plotOptions: {                                                     
                                        bar: {                                                         
                                            dataLabels: {                                              
                                                enabled: true                                          
                                            }                                                          
                                        }                                                              
                                    },                                                                 
                                    legend: {                                                          
                                        layout: 'vertical',                                            
                                        align: 'right',                                                
                                        verticalAlign: 'top',                                          
                                        x: -40,                                                        
                                        y: 100,                                                        
                                        floating: true,                                                
                                        borderWidth: 1,                                                
                                        backgroundColor: '#FFFFFF',                                    
                                        shadow: true                                                   
                                    },                                                                 
                                    credits: {                                                         
                                        enabled: false                                                 
                                    }
                              },
                            
                                series: [  
                                           {                                                         
                                                name: '简易程序',                                             
                                                data: $scope.barData.jyData                                   
                                            }, 
                                            {                                                               
                                                name: '一般程序',                                             
                                                data: $scope.barData.ybData                                   
                                            }
                                        ] 
  
                      };


    $scope.columnChart1 = {
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month + "月份城管执法行政处罚案件数"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '简易程序',
                '一般程序'
       
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '案件数 (起)'
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
         legend: {
                        enabled:false
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
            name: '处罚金额',
            data: columnChartData[0]

        }]
                                            
};
    $scope.columnChart2 = {
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month + "月份城管执法行政处罚金额"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '简易程序',
                '一般程序'
       
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '处罚金额 (元)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
                '<td style="padding:0"><b>{point.y:.1f} (元)</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
         legend: {
                        enabled:false
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
            name: '处罚金额',
            data: columnChartData[1]

        }]
                                            
};
    

      
    $scope.lineChart1  ={
                              options:{
                                 colors:newColors,
                                    title: {
                                    text: $scope.getDate.year+'年各月份城管执法行政处罚案件数',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: '处罚案件数(起)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }],
                                    min:0
                                },
                                tooltip: {
                                    valueSuffix: '(起)'
                                },
                                  credits:{
                                    enabled:false
                                },
                                legend: {
                                    enabled:true
                                }
                              },
                            
                                series: [{
                                    name: '简易程序',
                                    data: lineChartData.jy_BYAFS
                                },
                                {
                                    name:'一般程序',
                                    data:lineChartData.yb_BYAFS
                            }]
  
              };
                 $scope.lineChart2  ={
                              options:{
                                colors:newColors,
                                    title: {
                                    text: $scope.getDate.year + '年各月份城管执法行政处罚金额',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: '处罚金额（元）' 
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }],
                                    min:0
                                },
                                tooltip: {
                                    valueSuffix: '(元)'
                                },
                                  credits:{
                                    enabled:false
                                },
                                legend: {
                                      enabled:true
                                }
                              },
                            
                                series: [{
                                    name: '简易程序',
                                    data: lineChartData.jy_BYJE
                                },
                                {
                                    name: '一般程序',
                                    data: lineChartData.yb_BYJE
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

    };//end of processFunction
$scope.typeChange = function(){
    var data = $scope.data;
    if($scope.barData.selected == 0){
         $scope.barData.jyData = eachStationData.jy_BYAFS;
        $scope.barData.ybData = eachStationData.yb_BYAFS;
        $scope.barData.title = $scope.getDate.year+"年"+$scope.getDate.month + '月份各中队行政处罚案件数';
        $scope.barData.yText = '处罚案件数（起）';
        $scope.barData.valueSuffix = '（起）';
    }else if($scope.barData.selected == 1){
        $scope.barData.jyData = eachStationData.jy_BYJE;
        $scope.barData.ybData = eachStationData.yb_BYJE;
         $scope.barData.title = $scope.getDate.year+"年"+$scope.getDate.month + '月份各中队行政处罚金额';
        $scope.barData.yText = '处罚金额（元）';
        $scope.barData.valueSuffix = '（元）';

    }
         $scope.barChart  ={
                              options:{
                                colors:newColors,
                                chart: {                                                           
                                        type: 'bar'                                                    
                                    },                                                                 
                                    title: {                                                           
                                        text: $scope.barData.title                    
                                    },                                                                 
                                                                                            
                                    xAxis: {                                                           
                                        categories: $scope.barData.cate,
                                        title: {                                                       
                                            text: ''                                                 
                                        }                                                              
                                    },                                                                 
                                    yAxis: {                                                           
                                        min: 0,                                                        
                                        title: {                                                       
                                            text:  $scope.barData.yText                                                                    
                                        },                                                             
                                        labels: {                                                      
                                            overflow: 'justify'                                        
                                        }                                                              
                                    },                                                                 
                                    tooltip: {                                                         
                                        valueSuffix: $scope.barData.valueSuffix                                       
                                    },                                                                 
                                    plotOptions: {                                                     
                                        bar: {                                                         
                                            dataLabels: {                                              
                                                enabled: true                                          
                                            }                                                          
                                        }                                                              
                                    },                                                                 
                                    legend: {                                                          
                                        layout: 'vertical',                                            
                                        align: 'right',                                                
                                        verticalAlign: 'top',                                          
                                        x: -40,                                                        
                                        y: 100,                                                        
                                        floating: true,                                                
                                        borderWidth: 1,                                                
                                        backgroundColor: '#FFFFFF',                                    
                                        shadow: true                                                   
                                    },                                                                 
                                    credits: {                                                         
                                        enabled: false                                                 
                                    }
                              },
                            
                                series: [{                                                         
                                                name: '简易程序',                                             
                                                data: $scope.barData.jyData                                   
                                            }, {                                                               
                                                name: '一般程序',                                             
                                                data: $scope.barData.ybData                                   
                                            }
                                            ] 
  
              };
   };
kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);

//---------------------------********api调用参数*********------------------------------------------

    var tableName1='AyhzData';

    var advancedQueryConfig1 = {
        "year":{
        "value1":$scope.getDate.year,
        "queryType":"eq",
        "valueType":"innt"
        },
        "month":{
        "value1":$scope.getDate.month,
        "queryType":"eq",
        "valueType":"innt"
        }
    }

    var cashPieChartData = [];
    var casePieChartData = [];
//---------------------------********处理函数返回data的函数*********----------------------------------
    
    var processFunction1 = function(data){
        console.log(JSON.stringify(data));
        //初始化图表数据
        for(var i = 0; i < data.data.length ; i ++){
            var cashPie = ['',0],
                casePie = ['',0];
            cashPie[0] = data.data[i].ay;
            cashPie[1] = data.data[i].cfje;
            casePie[0] = data.data[i].ay;
            casePie[1] = data.data[i].sl;
            var j = 0;
            for( ; j < cashPieChartData.length ;  j++){
                if(cashPieChartData[j][0] == cashPie[0]){
                    cashPieChartData[j][1] = cashPieChartData[j][1] + cashPie[1];
                    casePieChartData[j][1] = casePieChartData[j][1] + casePie[1];
                    break;
                }
            }

            if(j == cashPieChartData.length){
                cashPieChartData.push(cashPie);
                casePieChartData.push(casePie);
            }


        }

                $scope.cashPieChart = {
               options: {
                              
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                credits:{
                                    enabled:false
                                    },
                                title: {
                                    text: $scope.getDate.year+"年"+$scope.getDate.month+"月份行政处罚案由汇总(处罚金额)"
                                },
                                tooltip: {
                                    pointFormat: '<b>处罚金额</b>:{point.y:1.f}(元)</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            format: '<b>{point.name}</b>:{point.percentage:.1f} %'
                                        },
                                        showInLegend: true
                                    }
                                
                                
                            }
                        },
                            series: [{
                                type: 'pie',
                                name: '',
                                data: cashPieChartData
                            }]
                                            
};

        $scope.casePieChart = {
               options: {
                               
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                credits:{
                                    enabled:false
                                    },
                                title: {
                                    text: $scope.getDate.year+"年"+$scope.getDate.month+"月份行政处罚案由汇总(案件数量)"
                                },
                                tooltip: {
                                    pointFormat: '<b>案件数量</b>:{point.y:1.f}(起)</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            format: '<b>{point.name}</b>:{point.percentage:.1f} %'
                                        },
                                        showInLegend: true
                                    }
                                
                                
                            }
                        },
                            series: [{
                                type: 'pie',
                                name: '',
                                data: casePieChartData
                            }]
                                            
};
    };

kpiDetailService.advancedQuery(tableName1,advancedQueryConfig1,processFunction1);
        
    }

//---------------------------********api调用参数*********------------------------------------------
kpiDetailService.getLastestObject('AdministrativePenaltyData',["year",'month'],processFunction1);

});