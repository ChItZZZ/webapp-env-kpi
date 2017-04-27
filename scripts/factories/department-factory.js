'use strict';

angular.module('app').factory('departmentFactory', function($resource) {
	this.departmentAll = function(headers) {
		return $resource('/api/department/list/all', null, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.departmentAdd = function(headers) {
		return $resource('/api/department', null, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.departmentURD = function(headers) {
		return $resource('/api/department/:id', {id: '@departmentid'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			},
			'put': {
				method: 'PUT',
				headers: headers
			},
			'delete': {
				method: 'DELETE',
				headers: headers
			}
		});
	};
	return this;
});