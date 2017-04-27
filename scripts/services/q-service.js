'use strict';

angular.module('app').service('qService',
	function categoryService($localStorage, $location, tokenFactory, inform, $q) {
		var error_conf = {
			ttl: 4000
		};
		this.tokenHttpGet = function(resourceObject, paramObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token//Send API requests and include the token in the X-Auth-Token header
			}).get(paramObject,
				function success(data) {
					if (data.errorCode == "NO_ERROR") {
						//deferred.resolve(data);
						deferred.resolve(JSOG.parse(JSOG.stringify(data)));
					} else if (data.code == 210) {
						inform.add(data.message, error_conf);
						$location.path('/login');//在url中添加login，使它返回到登陆界面
						$('.modal-backdrop').remove();
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				},
				function error(data) {
					if (data.data.errorCode == 'FORBIDDEN') {
						inform.add(data.data.data, error_conf);
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				})
			return deferred.promise;
		};

		this.tokenHttpPost = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).post(paramObject, reqBodyObject,
				function success(data) {
					if (data.errorCode == "NO_ERROR") {
						//deferred.resolve(data);
						deferred.resolve(JSOG.parse(JSOG.stringify(data)));
					} else if (data.code == 210) {
						inform.add(data.message, error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				},
				function error(data) {
					if (data.code == 500) {
						inform.add(data.message, error_conf);
					} else if (data.code == 507) {
						inform.add(data.message, error_conf);
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				})
			return deferred.promise;
		};

		this.tokenHttpPut = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).put(paramObject, reqBodyObject,
				function success(data) {
					if (data.errorCode == "NO_ERROR") {
						//deferred.resolve(data);
						deferred.resolve(JSOG.parse(JSOG.stringify(data)));
					} else if (data.code == 210) {
						inform.add(data.message, error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				},
				function error(data) {
					if (data.code == 404) {
						inform.add(data.message, error_conf);
					} else if (data.code == 500) {
						inform.add(data.message, error_conf);
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				})
			return deferred.promise;
		};

		this.tokenHttpDelete = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).delete(paramObject, reqBodyObject,
				function success(data) {
					if (data.errorCode == "NO_ERROR") {
						//deferred.resolve(data);
						deferred.resolve(JSOG.parse(JSOG.stringify(data)));
					} else if (data.code == 210) {
						inform.add(data.message, error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				},
				function error(data) {
					if (data.code == 404) {
						inform.add(data.message, error_conf);
					} else if (data.code == 500) {
						inform.add(data.message, error_conf);
					} else {
						inform.add('您的登录已经过期，请重新登录...', error_conf);
						$location.path('/login');
						$('.modal-backdrop').remove();
					}
				})
			return deferred.promise;
		};
	}
);
