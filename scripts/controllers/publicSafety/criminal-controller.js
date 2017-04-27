'use strict';

angular.module('app').controller('CriminalCtrl', function($scope,kpiDetailService,inform,dateService) {
     var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var eachMonthData = [

		{
			month:'1',
			value:0
		},
		{
			month:'2',
			value:0
		},
		{
			month:'3',
			value:0
		},
		{
			month:'4',
			value:0
		},
		{
			month:'5',
			value:0
		},
		{
			month:'6',
			value:0
		},
		{
			month:'7',
			value:0
		},
		{
			month:'8',
			value:0
		},
		{
			month:'9',
			value:0
		},
		{
			month:'10',
			value:0
		},
		{
			month:'11',
			value:0
		}, 
		{
			month:'12',
			value:0
		}
	];

	var stationInfo = [
		{
			id:'3001',
			name:'岳王派出所',
			value:0,
			desc:'121.14612|31.54969|无|53301130|陈楠'
		},
		{
			id:'3002',
			name:'陆渡派出所',
			value:0,
			desc:'121.18237|31.48157|无|53458110|沈卫斌'
		},
		{
			id:'3003',
			name:'经济开发区派出所',
			value:0,
			desc:'121.12173|31.4561|无|53561516|戴学忠'
		},
		{
			id:'3004',
			name:'璜泾派出所',
			value:0,
			desc:'121.09727|31.64911|无|53811054|徐达'
		},
		{
			id:'3005',
			name:'港区派出所',
			value:0,
			desc:'121.2059|31.60332|无|53701356|胡月林'
		},
		{
			id:'3006',
			name:'沙溪派出所',
			value:0,
			desc:'121.05642|31.57744|无|53212921|何惠忠'
		},
		{
			id:'3007',
			name:'城西派出所',
			value:0,
			desc:'121.09999|31.4416|无|53536690|何国清'
		},
		{
			id:'3008',
			name:'浏家港派出所',
			value:0,
			desc:'121.2504|31.56292|无|53645337|冯月清'
		},
		{
			id:'3009',
			name:'浏河派出所',
			value:0,
			desc:'121.27199|31.51266|无|53611136|王晖'
		},
		{
			id:'3010',
			name:'板桥派出所',
			value:0,
			desc:'121.13344|31.49177|无|53441632|吴强'
		},
		{
			id:'3011',
			name:'科教新城派出所',
			value:0,
			desc:'121.11456|31.42972|无|53405229|毛晓波'
		},
		{
			id:'3012',
			name:'城中派出所',
			value:0,
			desc:'121.10104|31.45055|无|53514708|孙靖'
		},
		{
			id:'3013',
			name:'双凤派出所',
			value:0,
			desc:'121.02222|31.51791|无|53439673|李建民'
		},
		{
			id:'3014',
			name:'金仓湖派出所',
			value:0,
			desc:'121.0849|31.50502|无|无|郁宏兵'
		},
		{
			id:'3015',
			name:'公交派出所',
			value:0,
			desc:'121.09379|31.47528|无|无|戴建国'
		},
		{
			id:'3016',
			name:'金浪派出所',
			value:0,
			desc:'121.15255|31.61736|无|53781138|陆建兵'
		},
		{
			id:'3017',
			name:'水上派出所',
			value:0,
			desc:'121.10141|31.43555|无|53781138|时剑清'
		},
		{
			id:'3501',
			name:'交巡警城厢中队',
			value:0,
			desc:''
		},
		{
			id:'3502',
			name:'交巡警事故处理中队',
			value:0,
			desc:''
		},
		{
			id:'3503',
			name:'交巡警南郊中队',
			value:0,
			desc:''
		},
		{
			id:'3504',
			name:'交巡警经济开发区中队',
			value:0,
			desc:''
		},
		{
			id:'3505',
			name:'交巡警沙溪中队',
			value:0,
			desc:''
		},
		{
			id:'3506',
			name:'交巡警港区中队',
			value:0,
			desc:''
		},
		{
			id:'3507',
			name:'交通巡逻警察大队',
			value:0,
			desc:''
		},
		{
			id:'3508',
			name:'交巡警璜泾中队',
			value:0,
			desc:''
		},
		{
			id:'3509',
			name:'交巡警浏河中队',
			value:0,
			desc:''
		}

	];

	//查看月份的每个接警单位接警数
	var eachStationData = {
			categories:[],
			values:[]		
	    };

	var lineChartData = {
		categories:[],
		series:[]
	};

	var eachMonthTypeData = [
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		},
		{
			defraud:0,
			hurt:0,
			rape:0,
			rob:0,
			steal:0
		}
	];
	
	var pieChartData = [];

	var eachTypeData = [
		{
			name:'故意杀人',
			value:0
		},
		{
			name:'故意伤害',
			value:0
		},
		{
			name:'抢劫',
			value:0
		},
		{
			name:'强奸',
			value:0
		},
		{
			name:'拐卖妇女儿童',
			value:0
		},
		{
			name:'盗窃',
			value:0
		},
		{
			name:'诈骗',
			value:0
		},
		{
			name:'走私',
			value:0
		},
		{
			name:'伪造、变造货币,出售、购买、运输、持有、使用假币刑事案件',
			value:0
		},
		{
			name:'其它',
			value:0
		}
	];

	var mainCaseColumnChartData = {
		categories:[],
		series:[
			{
				name:'诈骗',
				data:[]
			},
			{
				name:'故意伤害',
				data:[]
			},
			{
				name:'强奸',
				data:[]
			},
			{
				name:'抢劫',
				data:[]
			},
			{
				name:'盗窃',
				data:[]
			}
		]
	};

	var mapData = [];

	var thisMonthData = [];

	var barTypeChartData = {
		categories:['刑事类','刑事类','交通事故类','火灾类','其它'],
		data:[0,0,0,0,0]
	};

	$scope.totalData = {
    	month:0,
    	year:0
    };
	
//---------------------------********系统时间获取*********------------------------------------------
    var  dateTime = new Date(dateService.get_system_time());console.log();
	//var dateTime = new Date("2014-02-12T14:57:55.091Z");
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
    		}else if($scope.getDate.year == year_){
    			$scope.getDate.month = month_;
    		}

    	}
    //---------------------------********api调用参数*********------------------------------------------
	var tableName='CriminalData';

	var advancedQueryConfig = {
		"year":{
	    "value1":$scope.getDate.year,
	    "queryType":"eq",
	    "valueType":"innt"
		}
	}


	//---------------------------********处理api返回data的函数*********------------------------------------------
	
	var processFunction = function(data){
		console.log(JSON.stringify(data));
		//组装每月数据
		wireEachMonthData(data.data);

		//初始化图表数据
		initData(data.data);

		initMapData(mapData);



	//---------------------------********函数区*********------------------------------------------
	function initData(data){
		if(data.length == 0){
			alert('无数据 ！');
			return;
		}else if(eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0){
			alert('本月数据未录入 ！');
			return;
		}

		//createMapData();

		createLineChartData();

		createBarTypeChartData();

		createMainCaseColumnChartData();

		$scope.totalData.month = eachMonthData[$scope.getDate.month - 1].value;

		createPieChartData();
	};

	function wireEachMonthData(data){
		for(var i = 0 ; i < data.length ; i ++){
			var month  =  data[i].month;
			eachMonthData[month - 1].value = eachMonthData[month - 1].value + data[i].kill + data[i].hurt + data[i].rob + data[i].rape + data[i].abduct + data[i].steal + data[i].defraud + data[i].smuggle + data[i].fakeMoney + data[i].elseCase;
			eachMonthTypeData[month - 1].defraud = eachMonthTypeData[month - 1].defraud + data[i].defraud;
			eachMonthTypeData[month - 1].hurt = eachMonthTypeData[month - 1].hurt + data[i].hurt;
			eachMonthTypeData[month - 1].rape = eachMonthTypeData[month - 1].rape + data[i].rape;
			eachMonthTypeData[month - 1].rob = eachMonthTypeData[month - 1].rob + data[i].rob;
			eachMonthTypeData[month - 1].steal = eachMonthTypeData[month - 1].steal + data[i].steal;
			if(month == $scope.getDate.month){
				var obj = {
				content:0,
				description:'',
				icon:{
					h:21,
					l:0,
					lb:5,
					t:0,
					w:21,
					x:6
				},
				isOpen:0,
				stationID:'',
				title:''
				};	
				var amount = data[i].kill + data[i].hurt + data[i].rob + data[i].rape + data[i].abduct + data[i].steal + data[i].defraud + data[i].smuggle + data[i].fakeMoney + data[i].elseCase;		
				thisMonthData.push(data[i]);
				eachStationData.categories.push(data[i].policeStation.name);
				eachStationData.values.push(amount);
				obj.content = amount;
				obj.title = data[i].policeStation.name;
				obj.description = data[i].policeStation.description;
				obj.stationID = data[i].policeStation.id;
				mapData.push(obj);
			}
		}
	};

	function createMainCaseColumnChartData(){
		for(var i = 0 ; i < $scope.getDate.month; i ++){
			mainCaseColumnChartData.categories.push((i + 1) + '月');
			mainCaseColumnChartData.series[0].data.push(eachMonthTypeData[i].defraud);	
			mainCaseColumnChartData.series[1].data.push(eachMonthTypeData[i].hurt);
			mainCaseColumnChartData.series[2].data.push(eachMonthTypeData[i].rape);
			mainCaseColumnChartData.series[3].data.push(eachMonthTypeData[i].rob);
			mainCaseColumnChartData.series[4].data.push(eachMonthTypeData[i].steal);
		}
	}

	function createBarTypeChartData(){
		for(var i = 0 ; i < $scope.getDate.month; i ++){
			barTypeChartData.data[0] = barTypeChartData.data[0] + eachMonthData[i].police;
			barTypeChartData.data[1] = barTypeChartData.data[1] + eachMonthData[i].criminal;
			barTypeChartData.data[2] = barTypeChartData.data[2] + eachMonthData[i].poltrafficAccidentice;
			barTypeChartData.data[3] = barTypeChartData.data[3] + eachMonthData[i].fire;
			barTypeChartData.data[4] = barTypeChartData.data[4] + eachMonthData[i].elseCase;		
		}		
	}

	// function createMapData(){
	// 	for(var i = 0 ; i < eachStationData.categories.length ; i ++){
	// 		var obj = {
	// 			content:0,
	// 			description:'',
	// 			icon:{
	// 				h:21,
	// 				l:0,
	// 				lb:5,
	// 				t:0,
	// 				w:21,
	// 				x:6
	// 			},
	// 			isOpen:0,
	// 			stationID:'',
	// 			title:''
	// 		};

	// 		if(eachStationData.values[i] > 0){
	// 			obj.content = eachStationData.values[i];
	// 			obj.title = eachStationData.categories[i];
	// 			for(var j = 0 ; j < stationInfo.length ; j++){
	// 				if(stationInfo[j].name == obj.title){						
	// 					obj.description = stationInfo[j].desc;
	// 					obj.stationID = stationInfo[j].id;
	// 					break;
	// 				}
	// 			}
	// 		}

	// 		mapData.push(obj);
	// 	}
	// };

	function createPieChartData(){
		for(var i = 0 ; i < thisMonthData.length ; i ++){
			eachTypeData[0].value =  eachTypeData[0].value + thisMonthData[i].kill;
			eachTypeData[1].value =  eachTypeData[1].value + thisMonthData[i].hurt;
			eachTypeData[2].value =  eachTypeData[2].value + thisMonthData[i].rob;
			eachTypeData[3].value =  eachTypeData[3].value + thisMonthData[i].rape;
			eachTypeData[4].value =  eachTypeData[4].value + thisMonthData[i].abduct;
			eachTypeData[5].value =  eachTypeData[5].value + thisMonthData[i].steal;
			eachTypeData[6].value =  eachTypeData[6].value + thisMonthData[i].defraud;
			eachTypeData[7].value =  eachTypeData[7].value + thisMonthData[i].smuggle;
			eachTypeData[8].value =  eachTypeData[8].value + thisMonthData[i].fakeMoney;
			eachTypeData[9].value =  eachTypeData[9].value + thisMonthData[i].elseCase;
		}

		for(var i = 0 ; i < eachTypeData.length ; i ++){
			if(eachTypeData[i].value > 0){
				var temp = [];
				temp.push(eachTypeData[i].name);
				temp.push(eachTypeData[i].value);
				pieChartData.push(temp);
			}
		}
	};

	function createLineChartData(){
		for(var i = 0 ; i < $scope.getDate.month; i ++){
			lineChartData.categories.push((i + 1) + '月');
			lineChartData.series.push(eachMonthData[i].value);	
			$scope.totalData.year = $scope.totalData.year + eachMonthData[i].value;	
		}
	};


	function getStationName(id){
		for(var i = 0 ;  i < stationInfo.length ; i ++){
			if(stationInfo[i].id == id)
				return stationInfo[i].name;
		}
		return '未知';
	};


//地图代码
function initMapData(mapData){

             //初始化地图
              var map = new BMap.Map("criminalMap");
              var point = new BMap.Point(121.111008, 31.454799);
              map.centerAndZoom(point, 12);
              map.enableScrollWheelZoom();
              addMapControl();
              //
              for(var i  = 0 ; i < mapData.length ; i++){
                  mapData[i].isOpen = 0;
                  mapData[i].icon = {w:21,h:21,l:0,t:0,x:6,lb:5};
              }
            var bdary = new BMap.Boundary();
            bdary.get("太仓", function(rs){       //获取行政区域
             // map.clearOverlays();        //清除地图覆盖物       
              var count = rs.boundaries.length; //行政区域的点有多少个
              for(var i = 0; i < count; i++){
                var ply = new BMap.Polyline(rs.boundaries[i], {style:"solid",strokeWeight: 2, strokeColor: "#ff0000",opacity:0.6}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                map.setViewport(ply.getPath());    //调整视野         
              } 
               map.setZoom(12);   
            });   


               //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
  map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
  var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
  map.addControl(ctrl_sca);
    }
            function random(min,max){

               return Math.floor(min+Math.random()*(max-min));

           }

            var stationsPoints =[];
            function addStationsMarker(){

            
                   for(var i=0;i<mapData.length;i++){
                       var json = mapData[i];
                       var p0 = json.description.split("|")[0];
                       var p1 = json.description.split("|")[1];
                       var arr = {"lng":p0,"lat":p1,"count":json.content};
                       stationsPoints.push(arr);
                       var point = new BMap.Point(p0,p1);
                       var iconImg = createIcon(json.icon);
                       var marker = new BMap.Marker(point,{icon:iconImg});
                       //var iw = createInfoWindow(i);
                       var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
                        marker.setLabel(label);
                       map.addOverlay(marker);
                       label.setStyle({
                                   borderColor:"#808080",
                                   color:"#333",
                                   cursor:"pointer"
                       });
                       (function(){
                           var index = i;
                           var _iw = createInfoWindow(i);
                           var json = mapData[i];
                           var _marker = marker;
                           _marker.addEventListener("click",function(){
                               this.openInfoWindow(_iw);
                               getPiecharts(json.stationID,json.description);
                           });
                           _iw.addEventListener("open",function(){
                               _marker.getLabel().hide();
                           })
                           _iw.addEventListener("close",function(){
                               _marker.getLabel().show();
                           })
                           label.addEventListener("click",function(){
                               _marker.openInfoWindow(_iw);
                               getPiecharts(json.stationID,json.description);
                           })
                           if(!!json.isOpen){
                               label.hide();
                               _marker.openInfoWindow(_iw);
                           }
                       })()
                   
                   }
               }
           //创建InfoWindow
               function createInfoWindow(i){
                   var json = mapData[i];
                    var addr = json.description.split("|")[2];
                       var tel = json.description.split("|")[3];
                       var dean = json.description.split("|")[4];
                   var str = "<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>  <h5>本月发生刑事案件数:"+json.content+"起.其中:</h5> <div id='kpi' style='height: 250px; width: 400px;  margin: 0 auto'></div>"+"</div>";
                   var iw = new BMap.InfoWindow(str,{ enableMessage:false});
                   return iw;
               }
               //创建一个Icon
               function createIcon(json){
                   var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
                   return icon;
               }

               <!-- 派出所标注结束 -->

               <!-- 热点区域开始 -->
            
              
               if(!isSupportCanvas()){
                 alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
               }
               function setGradient(){
             
                 var gradient = {};
                 var colors = document.querySelectorAll("input[type='color']");
                 colors = [].slice.call(colors,0);
                 colors.forEach(function(ele){
                 gradient[ele.getAttribute("data-key")] = ele.value; 
                 });
                   heatmapOverlay.setOptions({"gradient":gradient});
               }
             //判断浏览区是否支持canvas
               function isSupportCanvas(){
                   var elem = document.createElement('canvas');
                   return !!(elem.getContext && elem.getContext('2d'));
               }

                   
           <!-- 热点区域结束 -->

              setTimeout(function(){
               addStationsMarker();
             }, 10);
    
               setTimeout(function(){
                console.log(stationsPoints);
                var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":70});
                 map.addOverlay(heatmapOverlay);
                 heatmapOverlay.setDataSet({data:stationsPoints,max:70});
                
                 //alert("1");
             }, 1000);
               


               function getPiecharts(stationID,description) {
               	var thisPieData = [];
               	for(var i = 0; i < thisMonthData.length; i++){
               		if(stationID == thisMonthData[i].policeStation.id){
               			eachTypeData[0].value =  thisMonthData[i].kill;
						eachTypeData[1].value =  thisMonthData[i].hurt;
						eachTypeData[2].value =  thisMonthData[i].rob;
						eachTypeData[3].value =  thisMonthData[i].rape;
						eachTypeData[4].value =  thisMonthData[i].abduct;
						eachTypeData[5].value =  thisMonthData[i].steal;
						eachTypeData[6].value =  thisMonthData[i].defraud;
						eachTypeData[7].value =  thisMonthData[i].smuggle;
						eachTypeData[8].value =  thisMonthData[i].fakeMoney;
						eachTypeData[9].value =  thisMonthData[i].elseCase;
						break;
               		}
               	};

               	for(var i = 0; i < eachTypeData.length; i++){              		
               		if(eachTypeData[i].value > 0){   
               		   var temp = [];            			
               			temp.push(eachTypeData[i].name);
						temp.push(eachTypeData[i].value);
						thisPieData.push(temp);
               		}              		
               	};

               	           $('#kpi').highcharts({
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
                                    text: ""
                                },
                                tooltip: {
                                    pointFormat: ' <b>{point.y:.1f}(起)</b>'
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
                                },
                                series: [{
                                    type: 'pie',
                                    name: '',
                                    data: thisPieData
                                }]
                            });
                                       
           }//end get piechart
    }//end of initMap()

    $scope.columnChart  ={
	      options:{
	            title: {
	            text: $scope.getDate.year + '年太仓市刑事案件发案趋势图',
	            x: -20 //center
	        },
	    
	        xAxis: {
	            categories: lineChartData.categories
	        },
	        yAxis: {
	            title: {
	                text: '发生数(起)'
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
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 1
	        }
	      },
	    
	        series: [{
	            name: '刑事案件数',
	            data: lineChartData.series
	        }]
  
    };

    $scope.mainCaseColumnChart  ={
               options: {
                           
                            title: {
                                text: $scope.getDate.year+"年主要刑事案件趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: mainCaseColumnChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: '案件发生数 (起)'
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
         series: mainCaseColumnChartData.series 
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
                                    text: $scope.getDate.year+"年"+$scope.getDate.month+"月份发生各类刑事案件详情"
                                },
                                tooltip: {
                                    pointFormat: '<b>处理数</b>:{point.y:1.f}(起)</b>'
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
                                data: pieChartData
                            }]
                                            
        };
            $scope.kpiBarChart = {
                options:{
                    colors:newColors,
                    chart: {                                                           
                        type: 'bar'                                                   
                    },                                                                                                                                  
                    xAxis: {                                                           
                        categories: eachStationData.categories,
                        title: {                                                       
                            text: '派出所',
                            align: 'high'
                        }                                                              
                    },                                                                 
                    yAxis: {                                                           
                        min: 0,                                                        
                        title: {                                                       
                            text: "刑事案件数(起)"                                          
                        },                                                             
                        labels: {                                                      
                            overflow: 'justify'                                        
                        }                                                              
                    },                                                                 
                    tooltip: {                                                         
                        valueSuffix: '(起)'                                       
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
                    },
                    title: {                                                           
                        text:$scope.getDate.year+"年"+$scope.getDate.month + "月份各派出所刑事案件数"                   
                    },
                },
                 
                series: [{                                                         
                        name:'刑事案件数',                                             
                        data: eachStationData.values                                 
                }] 
            };

};


kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);

}
//---------------------------********api调用参数*********------------------------------------------
kpiDetailService.getLastestObject('CriminalData',["year",'month'],processFunction1);

});