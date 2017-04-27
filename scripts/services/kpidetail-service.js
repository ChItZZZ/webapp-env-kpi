'use strict';

angular.module('app').service('kpiDetailService',
	function categoryService($localStorage, dataDetailFactory,inform) {
		var error_conf = {
			ttl: 4000
		};
		this.query = function(tableName, fromDate, endDate, successProcess) {
			dataDetailFactory.query({
				'x-auth-token': $localStorage.token
			}).get({
					tableName: tableName,
					start: fromDate,
					end: endDate
				},
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		};

		this.advancedQuery = function(tableName, advancedQueryConfig, successProcess) {
			dataDetailFactory.advancedQuery({
				'x-auth-token': $localStorage.token
			}).post({
					tableName: tableName,
				},
				advancedQueryConfig,
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		};
		this.getLastestObject = function(tableName, sortArr, successProcess) {
			dataDetailFactory.lastestObject({
				'x-auth-token': $localStorage.token
			}).post({
					tableName: tableName,
				},
				sortArr,
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		};

	}
);