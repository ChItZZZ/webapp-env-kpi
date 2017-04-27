'use strict';

/**
 * @
 * @
 * @
 */
angular.module('app').controller('PetitionLetterCtrl',function($scope,kpiDetailService,$http,$rootScope,dateService){

  var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var eachMonthData = [

	             		{
	             			month:'1',
	             			data:[]     
	             		},
	             		{
	             			month:'2',
	             			data:[]  
	             		},
	             		{
	             			month:'3',
	             			data:[]  
	             		},
	             		{
	             			month:'4',
	             			data:[]  
	             		},
	             		{
	             			month:'5',
	             			data:[]  
	             		},
	             		{
	             			month:'6',
	             			data:[]  
	             		},
	             		{
	             			month:'7',
	             			data:[]  
	             		},
	             		{
	             			month:'8',
	             			data:[]  
	             		},
	             		{
	             			month:'9',
	             			data:[]  
	             		},
	             		{
	             			month:'10',
	             			data:[]  
	             		},
	             		{
	             			month:'11',
	             			data:[]  
	             		}, 
	             		{
	             			month:'12',
	             			data:[]  
	             		}
	             	];
	var eachMonthData1 = [

		             		{
		             			month:'1',
		             			data:[]     
		             		},
		             		{
		             			month:'2',
		             			data:[]  
		             		},
		             		{
		             			month:'3',
		             			data:[]  
		             		},
		             		{
		             			month:'4',
		             			data:[]  
		             		},
		             		{
		             			month:'5',
		             			data:[]  
		             		},
		             		{
		             			month:'6',
		             			data:[]  
		             		},
		             		{
		             			month:'7',
		             			data:[]  
		             		},
		             		{
		             			month:'8',
		             			data:[]  
		             		},
		             		{
		             			month:'9',
		             			data:[]  
		             		},
		             		{
		             			month:'10',
		             			data:[]  
		             		},
		             		{
		             			month:'11',
		             			data:[]  
		             		}, 
		             		{
		             			month:'12',
		             			data:[]  
		             		}
		             	];
	var eachMonthData2 = [

		             		{
		             			month:'1',
		             			data:[]     
		             		},
		             		{
		             			month:'2',
		             			data:[]  
		             		},
		             		{
		             			month:'3',
		             			data:[]  
		             		},
		             		{
		             			month:'4',
		             			data:[]  
		             		},
		             		{
		             			month:'5',
		             			data:[]  
		             		},
		             		{
		             			month:'6',
		             			data:[]  
		             		},
		             		{
		             			month:'7',
		             			data:[]  
		             		},
		             		{
		             			month:'8',
		             			data:[]  
		             		},
		             		{
		             			month:'9',
		             			data:[]  
		             		},
		             		{
		             			month:'10',
		             			data:[]  
		             		},
		             		{
		             			month:'11',
		             			data:[]  
		             		}, 
		             		{
		             			month:'12',
		             			data:[]  
		             		}
		             	];
  $scope.getDate = {
    year:'',
    month:''
  }


  $scope.totalData = {
     bypassletter:'',
//    byje:'',
    qnafs:'',
//    qnje:''
//  
  }
 
  var pieTypeData=[
		  ['已处理信件',0],
		  ['未处理信件',0]
  ];
  
  var barTypeData=[
          ['群众来信上访信件',0],
          ['群众网上上访信件',0],
          ['群众到访上访信件',0],
          ['其他途径上访信件',0]
  ];
  
  var barTypeData1=[
          ['越级个人上访',0],
          ['越级集体上访',0]
  ];
  
  $scope.lineDataType={
		  category:[],
		  data:[]
  }
  $scope.lineDataType1={
		  category1:[],
		  data:[]
  }
  $scope.lineDataType2={
		  category2:[],
		  data:[]
  }
  $scope.data ={}

    //初始化页面数据
  
	
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
    	//console.log(data.data);
    	var obj = data.data;
    	if(obj != null){
    		var year_ = obj.year;
    		var month_ = obj.month;
    		console.log(month_);
    		if($scope.getDate.year > year_){
    			$scope.getDate.year = year_;
    			$scope.getDate.month = month_;
    		}else if($scope.getDate.year == year_){
    			$scope.getDate.month = month_;
    		}

    	}

   //---------------------------********api调用参数*********------------------------------------------

	var tableName='PetitionLetterData';

	var advancedQueryConfig = {
		"year":{
	    "value1":$scope.getDate.year,
	    "queryType":"eq",
	    "valueType":"innt"
		}
	}
//-----------------------------------处理函数返回data的函数，-------------------------------

                //获取数据库最新数据的日期
	var processFunction = function(data){
        console.log(data);
       // var data = data.data[0];
    
        console.log("year: "+$scope.getDate.year);
        console.log("month: "+$scope.getDate.month);

  
        //根据返回日期取最新的数据
        var doneLetterdata=0;
        var undoneLetterdata=0;
        var pieDataList=[];
           for(var i=0;i<data.data.length;i++){
        	   var month=data.data[i].month;
        	   if(month==$scope.getDate.month){
        		   doneLetterdata+=data.data[i].doneLetter;
            	   undoneLetterdata+=data.data[i].undoneLetter;
            	   pieTypeData[0][1]=doneLetterdata;
            	   pieTypeData[1][1]=undoneLetterdata;
            	   barTypeData[0][1]=data.data[i].publicLetter;
            	   barTypeData[1][1]=data.data[i].publicWebLetter;
            	   barTypeData[2][1]=data.data[i].publicBureauLetter;
            	   barTypeData[3][1]=data.data[i].otherLetter;
            	   barTypeData1[0][1]=data.data[i].bypassperLetter;
            	   barTypeData1[1][1]=data.data[i].bypasscollectiveLetter;
            	   $scope.totalData.bypassletter = data.data[i].bypassperLetter +data.data[i].bypasscollectiveLetter;
            	   $scope.totalData.qnafs =((doneLetterdata/(doneLetterdata+undoneLetterdata)).toFixed(4))*100+"%";
        	   }
        	   
        	   //console.log(eachMonthData[$scope.getDate.month].doneLetter);
        	   
           }
           for(var i=0;i<$scope.getDate.month;i++){
        	   $scope.lineDataType.category.push((i + 1) + '月');
        	   eachMonthData[i].data.push(data.data[i].publicLetter+data.data[i].publicWebLetter+data.data[i].publicBureauLetter+data.data[i].otherLetter);
        	   $scope.lineDataType.data.push(eachMonthData[i].data);
        	   eachMonthData1[i].data.push(data.data[i].bypassperLetter);
        	   $scope.lineDataType1.data.push(eachMonthData1[i].data);
        	   eachMonthData2[i].data.push(data.data[i].bypasscollectiveLetter);
        	   $scope.lineDataType2.data.push(eachMonthData2[i].data);
        	  
           }
          // console.log( $scope.lineDataType1.data);
          // console.log( $scope.lineDataType2.data);
          // console.log(pieDataList);
           //console.log(eachMonthData[1].data);
                   // $scope.totalData.bypassletter = data.bypass[0] + data.bypass[1];
 
                  //  $scope.totalData.qnafs =((data.pieData1.petitionletterPieData2[0]/(data.pieData1.petitionletterPieData2[0]+data.pieData1.petitionletterPieData2[1])).toFixed(3))*100+"%";


        $scope.PieChart = {  //第一个饼图
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
                                    text: $scope.getDate.year+"年"+$scope.getDate.month+"月份群众上访信件结案率"
                                },
                                tooltip: {
                                    pointFormat: '<b>上访信件</b>:{point.y:1.f}(起)</b>'
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
                                data:pieTypeData
                            }]
                                            
};


         $scope.lineChart  ={ //折线图
        		 options:{
                   colors:pieColors,
                      title: {
                      text: $scope.getDate.year+'年越级上访信件趋势',
                      x: -20 //center
                  },
              
                  xAxis: {
                      categories:$scope.lineDataType.category
                  },
                  yAxis: {
                      title: {
                          text: '上访信件数(起)'
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
                      name: '越级个人上访',
                      data: $scope.lineDataType1.data //[16,7,9,15,20,14,16,21,22,18,11,9]
                  },
                  {
                      name:'越级集体上访',
                  data:$scope.lineDataType2.data  //[10,11,5,23,14,26,17,10,15,10,9,16]
              }]

};

    $scope.lineChart1  ={  //群众上访折线图
                              options:{
                                 colors:pieColors,
                                    title: {
                                    text:$scope.getDate.year+'年群众上访信件趋势',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: $scope.lineDataType.category
                                },
                                yAxis: {
                                    title: {
                                        text: '上访信件数(起)'
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
                                    name: '上访信件',
                                    data: $scope.lineDataType.data
                                },
                               
                                ]
  
              };

    $scope.columnChart1 = { //第二个柱状图
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month+ "月份越级上访信件数"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '越级个人上访',
                '越级集体上访'
       
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '信件数 (起)'
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
            name: '上访信件数',
            data:  barTypeData1   //[14,36]

        }]
                                            
};
    $scope.columnChart2 = { //第一个柱状图
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month+ "月份上访信件详情"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '群众来信上访信件',
                '群众网上上访信件',
                '群众到访上访信件',
                '其他途径上访信件'
            ],
        labels: {
            rotation: -45,
            align: 'right',
            style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }

        },
        yAxis: {
            min: 0,
            title: {
                text: '上访信件数(起)'
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
            name: '上访信件数',
            data: barTypeData  //[10,20,30,40,50]

        }]
                                            
};
};
kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);
    }
  //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('PetitionLetterData',["year",'month'],processFunction1);
 });
   