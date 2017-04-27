'use strict';

angular.module('app').factory('dictFactory', function($resource) {
	this.getType = function(headers) {
		return $resource('/api/dict/:id', {id: '@id'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	this.getDictListByType = function(headers) {
		return $resource('/api/dict/:id/list', {id: '@id'
		}, {
			'get': {
				method: 'GET',
				headers: headers
			}
		});
	};
	return this;
});