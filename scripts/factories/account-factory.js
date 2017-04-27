'use strict';

angular.module('app').factory('accountFactory', function($resource) {
	this.accountAll = function(headers) {
		return $resource('/api/account/all', null, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.accountAdd = function(headers) {
		return $resource('/api/account', null, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.accountIsExist = function(headers) {
		return $resource('/api/account/isExist', null, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.accountURD = function(headers) {
		return $resource('/api/account/:id', {id: '@userid'
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
	this.accountIdResetPwd = function(headers) {
		return $resource('/api/account/:id/resetPassword', {id: '@userid'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.accountResetPassword = function(headers) {
		return $resource('/api/account/resetPassword', null, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	this.getDeparments = function(headers) {
		return $resource('/api/account/:id/department', {id: '@userid'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.setDeparments = function(headers) {
		return $resource('/api/account/:id/department', {id: '@userid'
		}, {
			'post': {
				method: 'POST',
				headers: headers
			}
		});
	};
	return this;
});