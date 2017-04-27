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

	var amountData = {
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




//---------------------------********系统时间获取*********------------------------------------------
//var  dateTime = new Date(dateService.get_system_time());console.log();
	var dateTime = new Date("2014-03-12T14:57:55.091Z");
	 $scope.getDate = {
	    year:dateTime.getFullYear(),
	    month:dateTime.getMonth() + 1
	  }
    console.log($scope.getDate.year + "," +$scope.getDate.month);
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
		initChartData(data.data);

//---------------------------********初始化图表数据********------------------------------------------
		function initChartData(data){
		if(data == null){
			alert('无数据 ！');
			return;
		}else if(eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0){
			alert('本月数据未录入 ！');
			return;
		}

		wireChartData(data.data);

		};


//---------------------------********函数定义*********------------------------------------------
	function wireChartData(data){
		for(var i = 0 ; i < data.length ; i ++){
			var month  =  data[i].month;
			if(month == $scope.getDate.month){
				amountData.thisMonthAmount = data[i].jmqccs + data[i].dllcccs + data[i].dwlcccs + data[i].hdlcccs + data[i].qtdycss;
				amountData.thisMonthSquare = data[i].ccmj;
				columnChartData[0] = data[i].qcs;
				columnChartData[0] = data[i].zccs;
				pieChartData[0][1] = data[i].jmqccs;
				pieChartData[1][1] = data[i].dllcccs;
				pieChartData[2][1] = data[i].dwlcccs;
				pieChartData[3][1] = data[i].hdlcccs;
				pieChartData[4][1] = data[i].qtdycss;
			}
		}
	};

	


		
	};//end of processFunction

kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);

});