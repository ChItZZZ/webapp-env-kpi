'use strict';

angular.module('app').controller('KpiConfigCtrl', function($localStorage, $scope, kpiConfigFactory, departmentFactory, qService, dateService, $filter, inform) {


	/*inform提示框时间设置*/
	var error_conf = {
		ttl: 4000
	};

	/*日期处理*/
	$scope.formatDateTime = dateService.formatDateTime;

	/*初始化所有部门*/
	var sortDepartment = function(a, b) {
		return a.description < b.description ? -1 : 1;
	};
	$scope.departmentFactAll = [];
	$scope.departmentArr = [];
	var pageDepartmentInit = function() {
		var promiseDepartment = qService.tokenHttpGet(departmentFactory.departmentAll, null);
		promiseDepartment.then(function(data) {
			$scope.departmentArr = data.data.filter(function (v, i) {
				return v.name == "环保局"||"国土局"||"水利局"
            });
			$scope.departmentArr.sort(sortDepartment);
			$scope.departmentFactAll = angular.copy($scope.departmentArr);
			$scope.departmentArr.unshift({
				description: '全部',
				name: '全部'
			});
			$scope.departmentSelected = $scope.departmentArr[0];
		});
	};
	pageDepartmentInit();

	/*下拉列表过滤*/
	$scope.departmentSelected = {
		description: '全部',
		name: 'all'
	};
	$scope.departmentFilter = function(kpi) {
		if ($scope.departmentSelected.name == '全部') return true;
		else if (kpi.department.id == $scope.departmentSelected.id) return true;
		else return false;
	};

	/*初始化所有KPI*/
	$scope.kpiArr = [];
	var pageKpiInit = function() {
		var promise = qService.tokenHttpGet(kpiConfigFactory.kpiAll, null);
		promise.then(function(data) {
			$scope.kpiArr = data.data.filter(function (v, i) {
				return v.department.name == '环保局'||
						v.department.name == '国土局' ||
						v.department.name == '水利局';
            });
		});
	};
	pageKpiInit();

	/*查看KPI*/
	$scope.kpiQueryTemp = null;
	$scope.kpiQuery = function(kpi) {
		var promisekpiQuery = qService.tokenHttpGet(kpiConfigFactory.kpiURD, {
			kpiid: kpi.id
		});
		promisekpiQuery.then(function(data) {
			//alert(JSON.stringify(data));
			$scope.kpiQueryTemp = data.data;
			pageKpiInit();
			$('#kpiQueryModal').modal('show');
		});
	};
	$scope.getChineseKpiType = function(status) {
		switch (status) {
			case 'YEARLY':
				return '年';
			case 'MONTHLY':
				return '月';
			case 'DAILY':
				return '日';
		}
	};
	var getDataKpiType = function(status) {
		switch (status) {
			case '年':
				return 'YEARLY';
			case '月':
				return 'MONTHLY';
			case '日':
				return 'DAILY';
		}
	};

	/*更新KPI*/
	$scope.kpiModifyTemp = null;
	$scope.kpiModifyTemp2 = null;
	$scope.kpiModify = function(kpi) {
		$scope.kpiModifyTemp = angular.copy(kpi);
		$scope.kpiModifyTemp.type = $scope.getChineseKpiType(kpi.type);
		$('#kpiModifyModal').modal('show');
	};
	$scope.kpiModifyConfirmPre = function() {
		$('#kpiModifyModal').modal('hide');
		$('#kpiModifyConfirm').modal('show');
	};
	$scope.kpiModifyProcess = function() {
		$('#kpiModifyConfirm').modal('hide');
		$scope.kpiModifyTemp2 = {
			unit: $scope.kpiModifyTemp.unit,
			name: $scope.kpiModifyTemp.name,
			type: getDataKpiType($scope.kpiModifyTemp.type),
			uniqueKey: $scope.kpiModifyTemp.uniqueKey,
			sortOrder: $scope.kpiModifyTemp.sortOrder,
			description: $scope.kpiModifyTemp.description,
			department: {
				id: $scope.kpiModifyTemp.department.id
			}
		};
		var promiseKpiModify = qService.tokenHttpPut(kpiConfigFactory.kpiURD, {
			kpiid: $scope.kpiModifyTemp.id
		}, $scope.kpiModifyTemp2);
		promiseKpiModify.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('更新成功', error_conf);
			pageKpiInit();
		});
	};
	$scope.kpiModifyCancel = function() {
		$('#kpiModifyConfirm').modal('hide');
		$('#kpiModifyModal').modal('show');
	};


	/*删除KPI*/
	$scope.kpiDelTempId = null;
	$scope.kpiDelConfirmPre = function(kpi) {
		$scope.kpiDelTempId = kpi.id;
		$('#kpiDelConfirm').modal('show');
	};
	$scope.kpiDelProcess = function() {
		var promiseDel = qService.tokenHttpDelete(kpiConfigFactory.kpiURD, {
			kpiid: $scope.kpiDelTempId
		}, null);
		promiseDel.then(function(data) {
			inform.add('删除成功', error_conf);
			pageKpiInit();
		});
	};


	/*KPI scope处理*/
	$scope.kpiScopeTemp = null;
	$scope.kpiScope = function(kpi) {
		$scope.kpiScopeTemp = {
			kpi: kpi,
			kpiScopeArr: []
		};
		var promiseKpiScopeQuery = qService.tokenHttpGet(kpiConfigFactory.kpiScope, {
			kpiid: $scope.kpiScopeTemp.kpi.id
		});
		promiseKpiScopeQuery.then(function(data) {
			$scope.kpiScopeTemp.kpiScopeArr = transferData(data.data);
			$('#kpiScopeModal').modal('show');
		});
	};
	$scope.kpiScopeConfirmPre = function() {
		if (testScopeValid(angular.copy($scope.kpiScopeTemp.kpiScopeArr))) {
			$('#kpiScopeModal').modal('hide');
			$('#kpiScopeConfirm').modal('show');
		} else {
			return;
		}

	};
	$scope.kpiScopeProcess = function() {
		var scopeArr = getScopeArr($scope.kpiScopeTemp.kpiScopeArr);
		var promisekpiScopeUpdate = qService.tokenHttpPost(kpiConfigFactory.kpiScope, {
			kpiid: $scope.kpiScopeTemp.kpi.id
		}, scopeArr);
		promisekpiScopeUpdate.then(function(data) {
			inform.add('更新成功', error_conf);
		});
	};
	$scope.kpiScopeCancel = function() {
		$('#kpiScopeConfirm').modal('hide');
		$('#kpiScopeModal').modal('show');
	};

	var transferData = function(data) {
		var result = [];
		for (var i = 0; i < data.length; i++) {
			result.push({
				kpiStatus: data[i].kpiStatus,
				operator1: getOperator(data[i].scope.charAt(0)),
				data1: data[i].scope.split(',')[0].slice(1),
				data2: data[i].scope.split(',')[1].slice(0, data[i].scope.split(',')[1].length - 1),
				operator2: getOperator(data[i].scope.charAt(data[i].scope.length - 1))
			});
		}
		return result;
	};
	var getScopeArr = function(data) {
		var result = [];
		for (var i = 0; i < data.length; i++) {
			result.push({
				scope: transferScope(data[i]),
				kpiStatus: data[i].kpiStatus
			});
		}
		return result;
	};
	var getOperator = function(char) {
		if (char == '(' || char == ')') return '<';
		else if (char == '[' || char == ']') return '≤';
		else return null;
	};
	var getReveseOperator1 = function(char) {
		if (char == '<') return '(';
		else if (char == '≤') return '[';
		else return null;
	};
	var transferScope = function(data) {
		return getReveseOperator1(data.operator1) + data.data1 + ',' + data.data2 + getReveseOperator2(data.operator2)
	};
	$scope.transferScope = transferScope;
	var getReveseOperator2 = function(char) {
		if (char == '<') return ')';
		else if (char == '≤') return ']';
		else return null;
	};
	$scope.getChineseStatus = function(status) {
		switch (status) {
			case 'GREEN':
				return '正常';
				break;
			case 'YELLOW':
				return '轻微问题';
				break;
			case 'RED':
				return '问题';
				break;
		}
	};
	$scope.getLabelClass = function(status) {
		switch (status) {
			case 'GREEN':
				return 'label-success';
				break;
			case 'YELLOW':
				return 'label-warning';
				break;
			case 'RED':
				return 'label-danger';
				break;
		}
	};
	$scope.deleteScope = function(kpiScope) {
		var index = null;
		for (var i = 0; i < $scope.kpiScopeTemp.kpiScopeArr.length; i++) {
			if ($scope.kpiScopeTemp.kpiScopeArr[i].scope == kpiScope.scope)
				index = i;
		}
		$scope.kpiScopeTemp.kpiScopeArr.splice(index, 1);
	};
	$scope.addScope = function(type) {
		$scope.kpiScopeTemp.kpiScopeArr.push({
			kpiStatus: type,
			operator1: '<',
			data1: null,
			data2: null,
			operator2: '≤'
		});
	};
	var testScopeValid = function(data) {
		data.sort(scopeSort);
		var operation2Temp = ')';
		var data2Temp = '-';
		for (var i = 0; i < data.length; i++) {
			if (data[i].operator1 != operation2Temp && data[i].data1 == data2Temp) {
				operation2Temp = data[i].operator2;
				data2Temp = data[i].data2;
				continue;
			} else {
				inform.add('区间格式不合格，可能以下几种原因：\n 1.区间存在交集 \n 2.区间存在空缺 \n 3.区间不是以无穷小开始"(-" \n 4.区间不是以无穷大结尾")"', error_conf);
				return false;
			}
		}
		if (data[data.length - 1].data2 != '+') {
			inform.add('区间不是以无穷大结尾")"', error_conf);
			return false;
		}
		return true;
	};
	var scopeSort = function(a, b) {
		if (a.data1 == '-') return -1;
		else if (b.data1 == '-') return 1;
		else return (a.data1 - b.data1);
	};


	/*KPI target处理*/
	$scope.kpiTargetTemp = null;
	$scope.kpiTargetYearSelected = new Date().getFullYear() - 1;
	var getYearArr = function() {
		var result = [];
		for (var i = 2004; i <= new Date().getFullYear(); i++) {
			result.push(i);
		}
		return result;
	};
	$scope.kpiTargetYearArr = getYearArr();

	$scope.kpiTargetYearSelect = function(kpi) {
		$scope.kpiTargetTemp = {
			kpi: kpi,
			kpiTargetArr: []
		};
		$('#kpiTargetYearSelectModal').modal('show');
	};
	$scope.kpiTarget = function() {
		var promiseKpiTargetQuery = qService.tokenHttpGet(kpiConfigFactory.kpiTarget, {
			kpiid: $scope.kpiTargetTemp.kpi.id,
			currentDate: $scope.kpiTargetYearSelected + '-1-1'
		});
		promiseKpiTargetQuery.then(function(data) {
			$scope.kpiTargetTemp.kpiTargetArr = transferTargetData(data.data);
			$('#kpiTargetYearSelectModal').modal('hide');
			$('#kpiTargetModal').modal('show');
		});
	};
	var transferTargetData = function(data) {
		var result = [];
		if (data.length != 0) {
			for (var j = 0; j < data.length; j++) {
				data[j].value = parseFloat(unitFilterFunc(data[j], $scope.kpiTargetTemp.kpi.unit, 1));
			}
			result = data;
		} else {
			if ($scope.kpiTargetTemp.kpi.type == 'YEARLY') {
				result.push({
					applyDate: new Date($scope.kpiTargetYearSelected, 0, 1).getTime(),
					value: 0,
					description: '',
					startTime: new Date($scope.kpiTargetYearSelected, 0, 1).getTime(),
					endTime: new Date($scope.kpiTargetYearSelected, 0, 1).getTime()
				});
			} else if ($scope.kpiTargetTemp.kpi.type == 'MONTHLY' || $scope.kpiTargetTemp.kpi.type == 'DAILY') {
				for (var i = 0; i < 12; i++) {
					result.push({
						applyDate: new Date($scope.kpiTargetYearSelected, i, 1).getTime(),
						value: 0,
						description: '',
						startTime: new Date($scope.kpiTargetYearSelected, i, 1).getTime(),
						endTime: new Date($scope.kpiTargetYearSelected, i, 1).getTime()
					});
				}
			} else {
				inform.add('KPI类型读取错误', error_conf);
			}
		}
		return result;
	};
	var transferResponseTargetData = function(data) {
		for (var j = 0; j < data.length; j++) {
			data[j].value = parseFloat(unitFilterFunc(data[j], $scope.kpiTargetTemp.kpi.unit, 2));
		}
		return data;
	};



	$scope.kpiTargetCancel1 = function() {
		$('#kpiTargetModal').modal('hide');
		$('#kpiTargetYearSelectModal').modal('show');
	};
	$scope.kpiTargetConfirmPre = function() {
		$('#kpiTargetModal').modal('hide');
		$('#kpiTargetConfirm').modal('show');
	};
	$scope.kpiTargetProcess = function() {
		$scope.kpiTargetTemp.kpiTargetArr = transferResponseTargetData($scope.kpiTargetTemp.kpiTargetArr);
		var promiseKpiTargetProcess = qService.tokenHttpPost(kpiConfigFactory.kpiTarget, {
			kpiid: $scope.kpiTargetTemp.kpi.id,
			currentDate: $scope.kpiTargetYearSelected + '-1-1'
		}, $scope.kpiTargetTemp.kpiTargetArr);
		promiseKpiTargetProcess.then(function(data) {
			inform.add('更新成功', error_conf);
		});
	};
	$scope.kpiTargetCancel2 = function() {
		$('#kpiTargetConfirm').modal('hide');
		$('#kpiTargetModal').modal('show');
	};


	/*KPI的用户组配置*/

	$scope.kpiDepartmentConfigkpi = null;
	$scope.kpiDepartmentTemp = null;
	$scope.kpiDepartmentConfig = function(kpi) {

		$scope.kpiDepartmentConfigkpi = null;
		$scope.kpiDepartmentConfigkpi = kpi;
		var promiseKpiDepartmentGet = qService.tokenHttpGet(kpiConfigFactory.getDeparments, {
			kpiId: $scope.kpiDepartmentConfigkpi.id
		});
		promiseKpiDepartmentGet.then(function(data) {
			$scope.kpiDepartmentTemp = getDepartmentById(data.data.id, $scope.departmentFactAll);
			$('#kpiDepartmentModal').modal('show');
		});
	};

	var getDepartmentById = function(id, data) {
		for (var i = 0; i < data.length; i++) {
			if (id == data[i].id) return data[i];
		}
		return null;
	};

	$scope.kpiDepartmentConfigConfirmPre = function() {
		$('#kpiDepartmentModal').modal('hide');
		$('#kpiDepartmentConfirm').modal('show');
	};
	$scope.kpiDepartmentConfigCancel = function() {
		$('#kpiDepartmentConfirm').modal('hide');
		$('#kpiDepartmentModal').modal('show');
	};
	$scope.kpiDepartmentConfigProcess = function() {
		$('#kpiDepartmentConfirm').modal('hide');
		var promiseKpiDepartmentConfigModify = qService.tokenHttpPut(kpiConfigFactory.setDeparments, {
			kpiId: $scope.kpiDepartmentConfigkpi.id,
			departmentId: $scope.kpiDepartmentTemp.id
		}, null);
		promiseKpiDepartmentConfigModify.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('更新成功', error_conf);
			pageKpiInit();
		});
	};



	/*单位转换问题*/


	var UNIT_MAP = {
		'percentage': '%',
		'count': '个',
		'rmb': '元',
		'tt_rmb': '万元',
		'ttt_rmb': '千万元',
		'm_rmb': '百万元',
		'b_rmb': '亿元',
		'square_klo': '平方公里',
		'people': '人',
		'tt_people': '万人',
		'strip': '条',
		'nil': '',
		'paper': '张',
		'place': '处',
		'appear': '起',
		'ton_coal': '吨标准煤',
		'tom_coal_per_tt': '吨标准煤每万元',
		'kwh': '千瓦时',
		'rmb_per_5hg': '元/500g',
		'wkwh': '万千瓦时',
		'wton_coal': '万吨标准煤',
		'che': '车',
		'sui': '岁',
		'liang': '辆',
		'ton': '吨',
		'year': '年',
		'kilometer': '公里',
		'men': '门',
		'haktare': '公顷',
		'mu': '亩',
		'gb': 'G',
		'square_meter': '平方米',
		'dollor': '美元',
		'tt_dollor': '万美元',
		'm_dollor': '百万美元',
		'ttt_dollor': '千万美元',
		'b_dollor': '亿美元',
		'people_time': '人次',
		'car_time': '车次',
		'thoudsand_percentage': '‰',
		'hthoudsand_percetage': ' (十万分比)'
	};


	/*type=1,从数据库值向前端值转换
	  type=2,从前端值向数据值转换*/

	function handlePercentageUnit(value, type) {
		// for 0.1 -> 10%
		if (type == 1) return (value * 100).toFixed(1);
		else if (type == 2) return parseFloat((value / 100).toFixed(2));
	}

	function handleNormalUnit(value, type) {
		return value;
	}

	function handleTTTUnit(value, type) {
		if (type == 1) return (value / 10000000).toFixed(1);
		else if (typee == 2) return parseInt(value * 10000000);
	}

	function handleMUnit(value, type) {
		if (type == 1) return (value / 1000000).toFixed(1);
		else if (type == 2) return parseInt(value * 1000000);
	}

	function handleBUnit(value, type) {
		if (type == 1) return (value / 100000000).toFixed(1);
		else if (type == 2) return parseInt(value * 100000000);
	}

	function handleTTUnit(value, type) {
		if (type == 1) return (value / 10000).toFixed(1);
		else if (type == 2) return parseInt(value * 10000);
	}

	function handleThousandPercetage(value, type) {
		if (type == 1) return (value * 1000).toFixed(2);
		else if (type == 2) return parseFloat((value / 1000).toFixed(2));
	}

	var unitFilterFunc = function(entity, unit, type) {
		var value;
		var result = '无数据';
		if (unit) {
			value = parseFloat(entity.value);
			switch (unit) {
				case 'count':
				case 'rmb':
				case 'dollor':
				case 'square_klo':
				case 'strip':
				case 'rmb_per_5hg':
				case 'paper':
				case 'appear':
				case 'place':
				case 'people':
				case 'ton_coal':
				case 'tom_coal_per_tt':
				case 'kwh':
				case 'sui':
				case 'wkwh':
				case 'wton_coal':
				case 'che':
				case 'square_meter':
				case 'liang':
				case 'ton':
				case 'year':
				case 'kilometer':
				case 'men':
				case 'haktare':
				case 'mu':
				case 'gb':
				case 'people_time':
				case 'car_time':
				case 'hthoudsand_percetage':
				case 'nil':
					result = handleNormalUnit(value, type);
					break;
				case 'thoudsand_percentage':
					result = handleThousandPercetage(value, type);
					break;
				case 'percentage':
					result = handlePercentageUnit(value, type);
					break;
				case 'tt_rmb':
					result = handleTTUnit(value, type);
					break;
				case 'tt_dollor':
					result = handleTTUnit(value, type);
					break;
				case 'tt_people':
					result = handleTTUnit(value, type);
					break;
				case 'm_rmb':
					result = handleMUnit(value, type);
					break;
				case 'ttt_rmb':
					result = handleTTTUnit(value, type);
					break;
				case 'b_rmb':
					result = handleBUnit(value, type);
					break;
				case 'm_dollor':
					result = handleMUnit(value, type);
					break;
				case 'ttt_dollor':
					result = handleTTTUnit(value, type);
					break;
				case 'b_dollor':
					result = handleBUnit(value, type);
					break;
				default:
					result = '无数据';
			}
			return result;
		} else {
			return '无数据';
		}
	};

});