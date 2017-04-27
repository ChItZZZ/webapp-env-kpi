'use strict';

angular.module('app').service('sessionService',
	function categoryService($localStorage, $location, $rootScope, tokenFactory, qService) {
		var error_conf = {
			ttl: 4000
		};
		this.saveToken = function(user, token) {
			$localStorage.currentUser = user;
			$localStorage.token = token;
			$rootScope.currentUser = user;
			$rootScope.token = token;
			if ($localStorage.currentUser.role == 'OPERATOR') {
				$location.path('/data');
				return false;
			}
			$location.path('/main');
		};
		this.delToken = function() {
			delete $localStorage.currentUser;
			delete $localStorage.token;
			delete $localStorage.blueMap;
			delete $rootScope.currentUser;
			delete $rootScope.token;
			delete $rootScope.blueMap;
			$location.path('/login');
		};
		this.checkToken = function() {
			//这边比较token用$localstorage,因为$rootScope一刷新页面就清空了
			if ($localStorage.token == null) {
				$location.path('/login');
				return false;
			} else {
				$rootScope.token = $localStorage.token;
			}
			if ($localStorage.currentUser.role == 'OPERATOR') {
				$location.path('/data');
				return false;
			}
			qService.tokenHttpGet(tokenFactory.isLogin, null);
		}
	}
);