'use strict';

angular.module('app').controller('KPICategoryCtrl',
	function($scope, $http, $location, inform, $routeParams, dateService, kpiService, 
		kpiFactory, $timeout, $rootScope, $stateParams, unitService) {
		var colors = new Array('#7CADDF', '#000000');
		$scope.categoryId = $stateParams.categoryId;
		var dateStr = dateService.formatDate(dateService.get_system_time());
		$scope.categoryBackground = 'images/common/blank.png';

		$scope.loadCategory = function(categoryId) {

			kpiFactory.kpiCategoryResults(categoryId, dateStr).
			get(null, function success(kcr) {
				var kcr = JSOG.parse(JSOG.stringify(kcr.data));
				console.log(kcr);

				$scope.domainName = kcr.domain.name;
				$scope.categoryName = kcr.name;
				$scope.categoryBackground = kcr.background;

				//通过blueMap获得当前category所属domain下的categories，显示在导航窗口
				$scope.blueMap = kpiService.getBlueMap();
				for (var i = 0; i < $scope.blueMap.length; i++) {
					if ($scope.blueMap[i].name == $scope.domainName) {
						$scope.categories = $scope.blueMap[i].categories;
						break;
					}
				}

				//获取当前category下的kpi列表
				$scope.kpiList = kcr.data;

				var tagMap = {};
				//kpi 查看趋势按钮text，将kpi分到相应的tag中
				for (var j = 0; j < $scope.kpiList.length; j++) {
					var kpi = $scope.kpiList[j];
					switch (kpi.type) {
						case "YEARLY":
							kpi.shortBtnText = "三年走势";
							kpi.longBtnText = "五年走势";
							break;
						case "MONTHLY":
							kpi.shortBtnText = "三个月走势";
							kpi.longBtnText = "当年走势";
							break;
						case "DAILY":
							kpi.shortBtnText = "七天走势";
							kpi.longBtnText = "当月走势";
							break;
					}
					if (tagMap[kpi.tag] != undefined) {
						tagMap[kpi.tag].push(kpi);
					} else {
						tagMap[kpi.tag] = [kpi];
					}
				}

				//Convert to json Map
				var list = [];
				var id = 1;
				for (var key in tagMap) {
					var map = {};
					map.id = id;
					map.name = key;
					map.data = tagMap[key];
					if (map.data.length > 0) {
						map.curKpi = map.data[0];
						map.curShortBtnText = map.data[0].shortBtnText;
						map.curLongBtnText = map.data[0].longBtnText;
						map.chart = {};
						map.kpiDetailUrl = 'app.' + tagMap[key][0].uniqueKey;
						$scope.loadChart(map, map.data[0], "short");
					} else {
						map.curKpi = null;
					}
					list.push(map);
					id++;
				}
				$scope.kpiClasses = list;
			});
	
			//获取新闻
			var newsUrl = "/api/kpi/category/" + $scope.categoryId + "/news";
			$http.get(newsUrl, {
				headers: {
					'x-auth-token': $rootScope.token
				}
			}).success(function(rawData) {
				$scope.newsList = JSOG.parse(JSOG.stringify(rawData.data));
			});
		}

		$scope.loadCategory($scope.categoryId);

		$scope.load = function() {
			$.isLoading();
			$timeout(function() {
				$.isLoading('hide');
			}, 500);
		};

		//kpi切换时，重载图表以及按钮text
		$scope.changeKPI = function(cls, kpi) {
			cls.curKpi = kpi;
			cls.curShortBtnText = kpi.shortBtnText;
			cls.curLongBtnText = kpi.longBtnText;
			$scope.loadChart(cls, kpi, "short");
		}

		$scope.loadChart = function(cls, kpi, span) {
			//获取当前有数据的KPI时间往前推的数据
			console.log(kpi);

			var sysTime = new Date(kpi.data.applyDate); //系统时间
			var end = new Date(kpi.data.applyDate); //周期结束时间
			var startShort = new Date(kpi.data.applyDate);
			var startLong = new Date(kpi.data.applyDate);
			var startShortStr, startLongStr, endStr, endLongStr;

			cls.curExplain = {};

			//求出请求时间span
			switch (kpi.type) {
				case "YEARLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'years').startOf('year'));
					startLongStr = dateService.formatDate(moment(startLong).subtract(4, 'years').startOf('year'));
					endLongStr = endStr = dateService.formatDate(moment(end).endOf('year'));
					cls.chart.xName = '年';
					cls.curExplain.date = (moment(sysTime).get('year')) + '年';
					break;
				case "MONTHLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'month').startOf('month'));
					startLongStr = dateService.formatDate(moment(startLong).startOf('year'));
					endStr = dateService.formatDate(moment(end).endOf('month'));
					cls.chart.xName = '月';
					cls.curExplain.date = moment(sysTime).get('year') + '年' + (moment(sysTime).get('month') + 1) + '月';//(moment(sysTime).get('month') + 1) 
					break;
				case "DAILY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(6, 'days').startOf('day'));
					startLongStr = dateService.formatDate(moment(startLong).startOf('month'));
					endLongStr =  endStr = dateService.formatDate(moment(end).endOf('day'));
					cls.chart.xName = '日';
					cls.curExplain.date = moment(sysTime).get('year') + '年' + (moment(sysTime).get('month') + 1) + '月' + (moment(sysTime).get('date')) + '日';
					break;
			}

			//请求趋势图表数据，画出图表
			var url;
			if (span == "short")
				url = "/api/kpi/result/span/" + kpi.id + "?start=" + startShortStr + "&end=" + endStr;
			else if (span == "long")
				url = "/api/kpi/result/span/" + kpi.id + "?start=" + startLongStr + "&end=" + endStr;

			//获取数据
			$http.get(url, {
				headers: {
					'x-auth-token': $rootScope.token
				}
			}).success(function(spanData) {
				var spanData = JSOG.parse(JSOG.stringify(spanData.data));

				//highchart 趋势图表数据
				cls.chart.title = kpi.name;
				cls.chart.xData = getXdata(kpi.type, span, new Date(kpi.data.applyDate));
				$scope['chartXData_' + cls.id] = cls.chart.xData;
				cls.chart.yName = kpi.name;
				//cls.curKpiTargetType = spanData.targetType;
				cls.chart.yData = getYdata(kpi.type, span, spanData.data, spanData.targetType, cls.chart.xData, kpi.unit);
				if(cls.chart.yData[0].data.length >= 15){ 
					//超过15条表格数据后跳 x 轴显示
					$scope['interval_' + cls.id] = 2;	
				}else{
					$scope['interval_' + cls.id] = 1;	
				}
				$scope['chartYData_' + cls.id] = cls.chart.yData;
			});
		}

		function getXdata(type, span, kpiDate) {
			var curSelectedTime = kpiDate;//dateService.get_system_time();
			var xdata = [];
			switch (type) {
				case 'YEARLY':
					if (span == 'short') {
						for (var i = 2; i >= 0; i--) {
							var yearShort = moment(curSelectedTime).subtract(i, 'years').get('year');
							xdata.push(yearShort.toString());
						}
					} else if (span == 'long') {
						for (var j = 4; j >= 0; j--) {
							var yearLong = moment(curSelectedTime).subtract(j, 'years').get('year');
							xdata.push(yearLong.toString());
						}
					}
					break;
				case 'MONTHLY':
					if (span == 'short') {
						for (var i = 2; i >= 0; i--) {
							var short = moment(curSelectedTime).subtract(i, 'month');
							var monthStr = moment(short).get('year') + '-' + (moment(short).get('month') + 1);
							xdata.push(monthStr);
						}
					} else if (span == 'long') {
						var startMonth = moment(curSelectedTime).startOf('year').get('month');
						var curMonth = moment(curSelectedTime).get('month');
						while (startMonth <= curMonth) {
							xdata.push((startMonth + 1).toString());
							startMonth++;
						}
					}
					break;
				case 'DAILY':
					if (span == 'short') {
						for (var i = 6; i >= 0; i--) {
							var short = moment(curSelectedTime).subtract(i, 'days');
							var DateStr = (moment(short).get('month') + 1) + '-' + moment(short).get('date');
							xdata.push(DateStr);
						}
					} else if (span == 'long') {
						var startDate = moment(curSelectedTime).startOf('month').get('date');
						var curDate = moment(curSelectedTime).get('date');
						while (startDate <= curDate) {
							xdata.push(startDate.toString());
							startDate++;
						}
					}
					break;
			}
			return xdata;
		}

		function getYdata(type, span, data, targetType, xdata, unit) {
			var map = {};
			for (var i = 0; i < xdata.length; i++) {
				map[xdata[i]] = {
					value: null,
					target: null
				};
			};
			for (var j = 0; j < data.applyDate.length; j++) {
				var appStr;
				switch (type) {
					case 'YEARLY':
						appStr = moment(data.applyDate[j]).get('year');
						break;
					case 'MONTHLY':
						if (span == 'short') {
							appStr = moment(data.applyDate[j]).get('year') + '-' + (moment(data.applyDate[j]).get('month') + 1);
						} else if (span == 'long') {
							appStr = moment(data.applyDate[j]).get('month') + 1;
						}
						break;
					case 'DAILY':
						if (span == 'short') {
							appStr = (moment(data.applyDate[j]).get('month') + 1) + '-' + moment(data.applyDate[j]).get('date');
						} else if (span == 'long') {
							appStr = moment(data.applyDate[j]).get('date');
						}
						break;
				}
				map[appStr].value = data.value[j];
				map[appStr].target = data.target[j];
			}
			var valueList = [];
			var targetList = [];
			for (var k = 0; k < xdata.length; k++) {
				valueList.push(map[xdata[k]].value);
				targetList.push(map[xdata[k]].target);
			}

			var targetTypeName;
			var targetColor = '#41817F';
			switch (targetType) {
				case 'warn':
					targetTypeName = '警戒值';
					targetColor = '#AA3939';
					break;
				case 'target':
					targetTypeName = '目标值';
					break;
				case 'reference':
					targetTypeName = '参考值';
					break;
				case 'landWarn':
					targetTypeName = '土地红线';
					targetColor = '#AA3939';
					break;
				default:
					targetTypeName = '目标值';
					break;
			}

			var ydata = [];
			var valueMap = {
				color: '#2F4172',
				name: 'KPI 值',
				data: valueList
			};

			var targetMap = {
				color: targetColor,
				name: targetTypeName,
				data: targetList
			};
			ydata.push(valueMap);
			ydata.push(targetMap);
			ydata = unitService.categoryYxisFilter(ydata, unit);
			return ydata;
		}


	});