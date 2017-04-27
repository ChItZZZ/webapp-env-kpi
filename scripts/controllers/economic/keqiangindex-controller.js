'use strict';

/**
 * @ngdoc function
 * @name iocUiApp.controller:KPICategoryCtrl
 * @description
 * # KPICategoryCtrl
 * Controller of the iocUiApp
 */
angular.module('app')
	.controller('KeQiangIndexCtrl',
		function($scope, $http, $location, generalService,  $timeout) {
			$scope.preOffset = true;
			$scope.preReset = false;

			$scope.year = 2014;
			$scope.month = 10;
			$scope.selectedRange = 0;

			$scope.lambda1 = 0.5;
			$scope.lambda2 = 0.35;
			$scope.lambda3 = 1 - $scope.lambda2 - $scope.lambda1;

			$scope.range = function() {
				return $scope.selectedRange;
			}

			function changeChartData(newValue, oldValue, scope) {
				//克强指数计算规则
				$scope.selectedRange2 = (newValue * $scope.lambda2 / $scope.lambda1).toFixed(2); 
				$scope.selectedRange3 = (newValue * $scope.lambda3 / $scope.lambda1).toFixed(2);

				var gdpPara = newValue*0.5 + $scope.selectedRange2*0.3 + $scope.selectedRange3*0.2;

				var n_arr = $scope.loadData.predict.slice(0);
				var rc = getResult(n_arr, $scope.month, newValue);
				$scope.loanChart.series[1].data = rc;

				var n_arr = $scope.electricData.predict.slice(0);
				var rc = getResult(n_arr, $scope.month, $scope.selectedRange2);
				$scope.elecChart.series[1].data = rc;

				var n_arr = $scope.transData.predict.slice(0);
				var rc = getResult(n_arr, $scope.month, $scope.selectedRange3);
				$scope.transChart.series[1].data = rc;
				
				var gdp_origin = $scope.gdpData.predict.slice(0);
				var rc = getCoefficient(gdp_origin, $scope.month, gdpPara, [0.01,0.25,0.11]);
				$scope.predictChart.series[2].data = rc;

				$scope.gdpData.sumPredict = sum(rc);
				$scope.taxData.sumPredict = parseFloat(($scope.gdpData.sumPredict * $scope.lambda3 * 0.55).toFixed(1));


			}

			function getCoefficient(list, month, para, eList){
				var n_list = list;
				for(var i=month; i<list.length;i++){
					if(para != 0){
						n_list[i] = parseFloat((n_list[i] *((100 + parseInt(para)*(eList[i-month]))/100)).toFixed(2));
					}
				}
				return n_list;
			}



			function getResult(list,month,newValue){
				var n_list = list;
				for(var i=month; i<list.length; i++){
					n_list[i] = n_list[i] * (100 + parseInt(newValue))/100;
				}
				return n_list;
			}

			$scope.$watch($scope.range, changeChartData);

			/*
				Data prepare
			*/
			$scope.keqiangData = {
				real: [10, 15, 12, 8, 7, 9, 10, 12, 10, 9],
				predict: [null, null, null, null, null, null, null, null, null, null, null, null],
				title: ""
			};

			$scope.keqiangDataBase = $scope.keqiangData;

			$scope.gdpData = {
				last: [79.2, 79.4, 81.2, 80.5, 80.2, 84.3, 80.0, 86.5, 85.5, 85, 86, 88],
				real: [88.6, 87.9, 90.6, 90, 89.4, 92.8, 90.8, 95.5, 94.2, 95],
				predict: [],
				pre_back: [],
				index:[],
				sum: 0,
				sumPredict:0,
				title: ""
			};
			$scope.taxData = {
				last: [79.2, 79.4, 81.2, 80.5, 80.2, 84.3, 80.0, 86.5, 85.5, 72, 86, 82],
				real: [88.6, 87.9, 90.6, 90, 89.4, 92.8, 90.8, 95.5, 94.2, 82],
				predict: [],
				pre_back: [],
				index:[],
				sum: 0,
				sumPredict:0,
				title: ""
			};

			$scope.keqiangIndex = [];
			$scope.loadData = {
				last: [38.5, 41.3, 40.2, 46.2, 37, 34, 40.1, 38.2, 40, 37.0, 38, 40],
				real: [42.1, 45.2, 43.1, 48.5, 39.1, 38.5, 44.5, 42.1, 44.2, 41.2],
				predict: [],
				pre_back: [],
				title: ""
			};
			$scope.electricData = {
				last: [4, 5.4, 6.1, 5.98, 6.1, 5.9, 6.78, 6.4, 5.9, 6.2, 6.1, 6.2],
				real: [4.4, 5.94, 6.61, 6.68, 6.67, 6.44, 7.17, 6.75, 6.31, 6.66],
				predict: [],
				pre_back: [],
				title: ""
			};
			$scope.transData = {
				last: [1100, 1080, 1090, 999, 1100.3, 1180.4, 998, 900, 888, 987, 1000, 1100],
				real: [1181.1, 1160.9, 1207.7, 1088.9, 1190.2, 1304.5, 1080.1, 1007.7, 1181.5, 1082.2],
				predict: [],
				pre_back: [],
				title: ""
			};

			$scope.predict = function(){
				$scope.transData.pre_back = $scope.transData.predict = makePredition($scope.transData.real, $scope.transData.last);
				$scope.electricData.pre_back = $scope.electricData.predict = makePredition($scope.electricData.real, $scope.electricData.last);
				$scope.loadData.pre_back = $scope.loadData.predict = makePredition($scope.loadData.real, $scope.loadData.last);
				$scope.gdpData.pre_back = $scope.gdpData.predict = makePredition($scope.gdpData.real, $scope.gdpData.last);
				$scope.gdpData.sumPredict = sum($scope.gdpData.predict);
				$scope.taxData.sumPredict = $scope.gdpData.sumPredict * $scope.lambda3 * 0.55 ;
			}

			function makePredition(realList, lastList){
				var preList = [];
				var percent = 0;
				for(var i=0; i<realList.length; i++){
					percent = percent + ((realList[i] - lastList[i]) / lastList[i])/realList.length;
				}
				for(var i = 0; i < lastList.length; i++){
					var preValue = lastList[i] * (1 + percent);
					preList.push(parseFloat(preValue.toFixed(2)));
				}
				return preList;
			}

			$scope.calculateKeqiangIndex = function() {
				var indexList = [];
				var gdpIndex = [];
				for (var i = 0; i < $scope.month; i++) {
					var index = $scope.lambda1 * (($scope.loadData.real[i] - $scope.loadData.last[i]) / $scope.loadData.last[i]) +
						$scope.lambda2 * (($scope.electricData.real[i] - $scope.electricData.last[i]) / $scope.electricData.last[i]) +
						$scope.lambda3 * (($scope.transData.real[i] - $scope.transData.last[i]) / $scope.transData.last[i]);
					indexList.push(parseFloat((index*1000).toFixed(2)));
					var gdpRate = ($scope.gdpData.real[i] - $scope.gdpData.last[i]) / $scope.gdpData.last[i];
					gdpIndex.push(parseFloat((gdpRate*1000).toFixed(2)));
				}	
				$scope.keqiangIndex = indexList;
				$scope.gdpData.index = gdpIndex;
			};

			function sum(l){
				var sum = 0;
				for(var i=0; i<l.length; i++){
					sum = sum + l[i];
				}
				sum = parseFloat(sum.toFixed(1));
				return sum;
			}


			$scope.indexOffset = function(num){
				$.isLoading();
				$timeout(function() {
        			var list = [null];
					var n_list = list.concat($scope.keqiangIndex);
					$scope.predictChart.series[0].data = n_list;
					$scope.preOffset = false;
					$scope.preReset = true;
					$.isLoading('hide');
        		}, 300);
			};

			$scope.offsetReset = function(){
				$.isLoading();
				$timeout(function() {
        			$scope.predictChart.series[0].data = $scope.keqiangIndex;
					$scope.preOffset = true;
					$scope.preReset = false;
					$.isLoading('hide');
        		}, 300);
				
			};

			/*
				Initial script
			*/
			$scope.predict();
			$scope.calculateKeqiangIndex();

			$scope.mainChart = {
				options: {
					chart: {
						type: 'spline'
					}
				},
				series: [{
					name: '克强指数',
					data: $scope.keqiangIndex
				}],
				title: {
					text: '太仓市克强指数以及 GDP 走势'
				},
				xAxis: {
					categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
					title:{
						text:"月"
					},
					tickmarkPlacement: 'on'
				},
				yAxis: {
					min: 0,
					title: {
						text: '值(亿元)'
					}
				},
				loading: false,
				size: {
					width: 630,
					height: 360
				}
			};

			$scope.predictChart = {
				options: {
					chart: {
						type: 'spline'
					}
					
				},
				series: [{
					name: '克强指数',
					data: $scope.keqiangIndex
				}, {
					name: 'GDP 数据同比增长率',
					data: $scope.gdpData.index
				},{
					name: 'GDP 预测',
					type: 'spline',
					data: $scope.gdpData.predict
				}],
				title: {
					text: '太仓市克强指数以及 GDP 走势'
				},
				xAxis: {
					categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					tickmarkPlacement: 'on',
					title:{
						text:"月"
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: '值(亿元)'
					}
				},
				loading: false,
				size: {
					width: 630,
					height: 360
				}
			};

			$scope.loanChart = {
				options: {
					chart: {
						type: 'column'
					}
				},
				series: [{
					name: '银行中长期贷款',
					data: $scope.loadData.real
				},{
					name: '预测',
					type:'line',
					data: $scope.loadData.predict
				}],
				title: {
					text: '银行中长期贷款'
				},
				xAxis: {
					categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					title:{
						text:"月"
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: '亿元'
					}
				},
				loading: false,

			};

			$scope.transChart = {
				options: {
					chart: {
						type: 'column'
					}
				},
				series: [{
					name: '货运量',
					data: $scope.transData.real
				},{
					name: '预测',
					type:'line',
					data: $scope.transData.predict
				}],
				title: {
					text: '货运量'
				},
				xAxis: {
					categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					title:{
						text:"月"
					}
				},
				loading: false,
				yAxis: {
					title: {
						text: '万吨'
					}
				}
			};

			$scope.elecChart = {
				options: {
					chart: {
						type: 'column'
					}
				},
				series: [{
					name: '工业用电量',
					data: $scope.electricData.real
				},{
					name: '预测',
					type:'line',
					data: $scope.electricData.predict
				}],
				xAxis: {
					categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					title:{
						text:"月"
					}
				},
				title: {
					text: '工业用电量'
				},
				loading: false,
				yAxis: {
					title: {
						text: '亿千瓦时'
					}
				}

			};



		});