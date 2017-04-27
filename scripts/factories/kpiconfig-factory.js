'use strict';

angular.module('app').factory('kpiConfigFactory', function($resource) {
	this.kpiAll = function(headers) {
		return $resource('/api/kpi/all', null, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.kpiURD = function(headers) {
		return $resource('/api/kpi/:kpiid', {
			kpiid: '@kpiid'
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
	this.kpiScope = function(headers) {
		return $resource('/api/kpi/:kpiid/scope', {
			kpiid: '@kpiid'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			},
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.kpiTarget = function(headers) {
		return $resource('/api/kpi/:kpiid/targets', {
			kpiid: '@kpiid'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			},
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.getDeparments = function(headers) {
		return $resource('/api/kpi/:kpiId/department', {
			kpiId: '@kpiid'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.setDeparments = function(headers) {
		return $resource('/api/kpi/:kpiId/department/:departmentId', {
			kpiId: '@kpiid',
			departmentId: '@departmentId'
		}, {
			'put': {
				method: 'PUT',
				headers: headers
			}
		});
	};
	return this;
});