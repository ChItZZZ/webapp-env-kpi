'use strict';

angular.module('app').factory('dataDetailFactory', function($resource) {
	this.query = function(headers) {
		return $resource('/api/data/:tableName/query/spanData', {
			tableName: '@tableName'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.pageQuery = function(headers) {
		return $resource('/api/data/:tableName/list/:pageSize/:pageNumber', {
			tableName: '@tableName',
			pageSize: '@pageSize',
			pageNumber: '@pageNumber'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.advancedQuery = function(headers) {
		return $resource('/api/data/:tableName/query/advanceQuery', {
			tableName: '@tableName'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.lastestObject = function(headers) {
		return $resource('/api/data/:tableName/lastestObject', {
			tableName: '@tableName'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.addData = function(headers) {
		return $resource('/api/data/:tableName', {
			tableName: '@tableName'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.dataURD = function(headers) {
		return $resource('/api/data/:tableName/:id', {
			tableName: '@tableName',
			id: '@id'
		}, {
			'delete': {
				method: 'DELETE',
				headers: headers
			},
			'put': {
				method: 'PUT',
				headers: headers
			}
		});
	};
	this.pageAdvancedQuery = function(headers) {
		return $resource('/api/data/:tableName/query/advanceQuery/page/:pageSize/:pageNumber', {
			tableName: '@tableName',
			pageSize: '@pageSize',
			pageNumber: '@pageNumber'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	return this;
});