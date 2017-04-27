'use strict';

angular.module('app').controller('LoginCtrl', function($scope, $rootScope, $sessionStorage,
	$location, $localStorage, $http, inform, tokenFactory,sessionService) {
	//alert("LoginCtrl test");
	var error_conf = {
		ttl: 4000
	};
	$scope.ioc_login = function() {
		$scope.login_status = '';
		var _n = $scope.login_name;
		var _p = $scope.login_password;
		if (_n == undefined || _n == "" || _p == undefined || _p == "") {
			$scope.login_status = '用户名/密码不能为空!';
		}
		tokenFactory.login({
			'X-Username': _n,
			'X-Password': encryptPassword(_p)
		}).post({},
			function success(data, headers) {
				sessionService.saveToken(data.data,headers()['x-auth-token']);
			},
			function error(data) {
				inform.add('账号或密码错误,请重新登录.', error_conf);
				//inform.add('网络错误,请稍后重新登录.', error_conf);
			});
	}
	function encryptPassword(password) {
		var psw_ran = password + 'py458as586_v2';
		return md5(psw_ran);
	}
});
