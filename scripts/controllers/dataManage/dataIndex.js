'use strict';

/**
 * @ngdoc function
 * @name dataManagerApp.controller:DataIndexCtrl
 * @description # DataIndexCtrl Controller of the dataManagerApp
 */
angular.module('app').controller('DataIndexCtrl', function($localStorage, sessionService, $scope, qService, tableFactory, $state) {
	//数据库表过滤对象
	$scope.tableFilter = {
		name: ''
	};
	//该页面用户相关
	$scope.currentUser = $localStorage.currentUser;
	$scope.logout = function() {
		sessionService.delToken();
	};
	//获取所有数据库表
	var promiseLoadTableData = qService.tokenHttpGet(tableFactory.allTable, null);
	promiseLoadTableData.then(function(data) {
		$scope.tableList = data.data;
	});

});