'use strict';

angular.module('app').controller('UserConfigCtrl', function($localStorage, $scope, accountFactory, departmentFactory, qService, dateService, inform) {

	/*inform提示框时间设置*/
	var error_conf = {
		ttl: 4000
	};

	/*日期处理*/
	$scope.formatDateTime = dateService.formatDateTime;

	/*当前用户密码重置*/
	$scope.newInfo = {
		password: null
	};
	
	/*初始化所有用户*/
	$scope.userArr = [];
	var pageUserInit = function() {
		var promise = qService.tokenHttpGet(accountFactory.accountAll, null);
		promise.then(function(data) {
			$scope.userArr = data.data;
		});
	};
	pageUserInit();

	/*检查用户名是否已存在*/
	$scope.userIsExist = function(accountName, type) {
		$scope.userIsExistStatus = false;
		var promiseIsExist = qService.tokenHttpGet(accountFactory.accountIsExist, {
			account: accountName
		});
		var result = null;
		promiseIsExist.then(function(data) {
			if (data.data == true) {
				alert('用户名已存在');
				$scope.userAddTemp.account = null;
				$scope.userIsExistStatus = true;
			} else {
				$scope.userIsExistStatus = false;
			}
		}).then(function() {
			if (type == 'add') {
				if ($scope.userIsExistStatus) {} else {
					$('#userAddModal').modal('hide');
					$('#userAddConfirm').modal('show');
				}
			}
		});
	};
	var getChineseRole =function(role){
		if (role == "ADMINISTRATOR") {
				return "管理员";
		}
		else if (role == "MAYOR") {
			return "市长、市委书记";
		}
		else if (role == "DIRECTOR") {
			return "分管局长";
		}
		else if (role == "OPERATOR") {
			return "操作员";
		}
	};
	var getDataRole = function(role){
		if (role == "管理员") {
			return "ADMINISTRATOR";
		}
		else if (role == "市长、市委书记") {
			return "MAYOR";
		}
		else if (role == "分管局长") {
			return "DIRECTOR";
		}
		else if (role == "操作员") {
			return "OPERATOR";
		}
	};

	/*添加用户*/
	$scope.userAddTemp = null;
	$scope.userAddTemp2 = null;
	$scope.userAdd = function() {
		$scope.userAddTemp = null;
		$scope.userAddTemp = {
			account: null,
			name: null,
			title: null,
			systemName: null,
			mobilePhone: null,
			workPhone: null,
			role: null
		};
		$('#userAddModal').modal('show');
	};
	$scope.userAddConfirmPre = function() {
		$scope.userIsExist($scope.userAddTemp.account, 'add');
	};
	$scope.userAddProcess = function() {
		$('#userAddConfirm').modal('hide');
		$scope.userAddTemp2 = {
			account: $scope.userAddTemp.account,
			name: $scope.userAddTemp.name,
			title: $scope.userAddTemp.title,
			systemName: $scope.userAddTemp.systemName,
			mobilePhone: $scope.userAddTemp.mobilePhone,
			workPhone: $scope.userAddTemp.workPhone,
			role: null
		};
		$scope.userAddTemp2.role = getDataRole($scope.userAddTemp.role);
		var promiseUserAdd = qService.tokenHttpPost(accountFactory.accountAdd, null, $scope.userAddTemp2);
		promiseUserAdd.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('添加成功', error_conf);
			pageUserInit();
		});
	};
	$scope.userAddCancel = function() {
		$('#userAddConfirm').modal('hide');
		$('#userAddModal').modal('show');
	};

	/*查看用户*/
	$scope.userQueryTemp = null;
	$scope.userQuery = function(user) {
		$scope.userQueryTemp = null;
		var promiseUserQuery = qService.tokenHttpGet(accountFactory.accountURD, {
			id: user.id
		});
		promiseUserQuery.then(function(data) {
			//alert(JSON.stringify(data));

			$scope.userQueryTemp = data.data;
			$scope.userQueryTemp.role = getChineseRole(user.role);
			pageUserInit();
			$('#userQueryModal').modal('show');
		});
	};

	/*更新用户*/
	$scope.userModifyTemp = null;
	$scope.userModifyTemp2 = null;
	$scope.userModify = function(user) {
		$scope.userModifyTemp = null;
		$scope.userModifyTemp2 = null;
		$scope.userModifyTemp = angular.copy(user);
		$scope.userModifyTemp.role = getChineseRole(user.role);
		$('#userModifyModal').modal('show');
	};
	$scope.userModifyConfirmPre = function() {
		$('#userModifyModal').modal('hide');
		$('#userModifyConfirm').modal('show');
	};
	$scope.userModifyProcess = function() {
		$('#userModifyConfirm').modal('hide');
		$scope.userModifyTemp2 = {
			account: $scope.userModifyTemp.account,
			name: $scope.userModifyTemp.name,
			title: $scope.userModifyTemp.title,
			systemName: $scope.userModifyTemp.systemName,
			mobilePhone: $scope.userModifyTemp.mobilePhone,
			workPhone: $scope.userModifyTemp.workPhone
		};
		var promiseUserModify = qService.tokenHttpPut(accountFactory.accountURD, {
			id: $scope.userModifyTemp.id
		}, $scope.userModifyTemp2);
		promiseUserModify.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('更新成功', error_conf);
			pageUserInit();
		});
	};
	$scope.userModifyCancel = function() {
		$('#userModifyConfirm').modal('hide');
		$('#userModifyModal').modal('show');
	};

	/*删除用户*/
	$scope.userDelTempId = null;
	$scope.userDelConfirmPre = function(user) {
		$scope.userDelTempId = user.id;
		$('#userDelConfirm').modal('show');
	};
	$scope.userDelProcess = function() {
		var promiseDel = qService.tokenHttpDelete(accountFactory.accountURD, {
			id: $scope.userDelTempId
		}, null);
		promiseDel.then(function(data) {
			inform.add('删除成功', error_conf);
			pageUserInit();
		});
	};

	/*初始化所有用户组*/
	$scope.departmentArr = [];
	var pageDepartmentInit = function() {
		var promiseDepartment = qService.tokenHttpGet(departmentFactory.departmentAll, null);
		promiseDepartment.then(function(data) {
			$scope.departmentArr = data.data;
		});
	};
	pageDepartmentInit();

	/*添加用户组*/
	$scope.departmentAddTemp = null;
	$scope.departmentAdd = function() {
		$scope.departmentAddTemp = null;
		$scope.departmentAddTemp = {
			name: null,
			description: null
		};
		$('#departmentAddModal').modal('show');
	};
	$scope.departmentAddConfirmPre = function() {
		$('#departmentAddModal').modal('hide');
		$('#departmentAddConfirm').modal('show');
	};
	$scope.departmentAddProcess = function() {
		$('#departmentAddConfirm').modal('hide');
		var promiseDepartmentAdd = qService.tokenHttpPost(departmentFactory.departmentAdd, null, $scope.departmentAddTemp);
		promiseDepartmentAdd.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('添加成功', error_conf);
			pageDepartmentInit();
		});
	};
	$scope.departmentAddCancel = function() {
		$('#departmentAddConfirm').modal('hide');
		$('#departmentAddModal').modal('show');
	};

	/*查看用户组*/
	$scope.departmentQueryTemp = null;
	$scope.departmentQuery = function(department) {
		$scope.departmentQueryTemp = null;
		var promiseDepartmentQuery = qService.tokenHttpGet(departmentFactory.departmentURD, {
			id: department.id
		});
		promiseDepartmentQuery.then(function(data) {
			//alert(JSON.stringify(data));
			$scope.departmentQueryTemp = data.data;
			pageDepartmentInit();
			$('#departmentQueryModal').modal('show');
		});
	};

	/*更新用户组*/
	$scope.departmentModifyTemp = null;
	$scope.departmentModifyTemp2 = null;
	$scope.departmentModify = function(department) {
		$scope.departmentModifyTemp = null;
		$scope.departmentModifyTemp2 = null;
		$scope.departmentModifyTemp = angular.copy(department);
		$('#departmentModifyModal').modal('show');
	};
	$scope.departmentModifyConfirmPre = function() {
		$('#departmentModifyModal').modal('hide');
		$('#departmentModifyConfirm').modal('show');
	};
	$scope.departmentModifyProcess = function() {
		$('#departmentModifyConfirm').modal('hide');
		$scope.departmentModifyTemp2 = {
			name: $scope.departmentModifyTemp.name,
			description: $scope.departmentModifyTemp.description
		};
		var promiseDepartmentModify = qService.tokenHttpPut(departmentFactory.departmentURD, {
			id: $scope.departmentModifyTemp.id
		}, $scope.departmentModifyTemp2);
		promiseDepartmentModify.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('更新成功', error_conf);
			pageDepartmentInit();
		});
	};
	$scope.departmentModifyCancel = function() {
		$('#departmentModifyConfirm').modal('hide');
		$('#departmentModifyModal').modal('show');
	};

	/*删除用户组*/
	$scope.departmentDelTempId = null;
	$scope.departmentDelConfirmPre = function(department) {
		$scope.departmentDelTempId = department.id;
		$('#departmentDelConfirm').modal('show');
	};
	$scope.departmentDelProcess = function() {
		var promiseDel = qService.tokenHttpDelete(departmentFactory.departmentURD, {
			id: $scope.departmentDelTempId
		}, null);
		promiseDel.then(function(data) {
			inform.add('删除成功', error_conf);
			pageDepartmentInit();
		});
	};

	/*用户的用户组配置*/
	$scope.userDepartmentConfigUser = null;
	$scope.userDepartmentArr = [];
	$scope.userDepartmentConfig = function(user) {
		$scope.userDepartmentConfigUser = null;
		$scope.userDepartmentArr = [];
		$scope.userDepartmentConfigUser = user;
		var promiseUserDepartmentGet = qService.tokenHttpGet(accountFactory.getDeparments, {
			id: $scope.userDepartmentConfigUser.id
		});
		promiseUserDepartmentGet.then(function(data) {
			$scope.userDepartmentArr = getUserDepartmentArr($scope.departmentArr, data.data);
			$('#userDepartmentModal').modal('show');
		});
	};

	$scope.userDepartmentConfigConfirmPre = function() {
		$('#userDepartmentModal').modal('hide');
		$('#userDepartmentConfirm').modal('show');
	};
	$scope.userDepartmentConfigCancel = function() {
		$('#userDepartmentConfirm').modal('hide');
		$('#userDepartmentModal').modal('show');
	};
	$scope.userDepartmentConfigProcess = function() {
		$('#userDepartmentConfirm').modal('hide');
		var departmentRequestArr = getUserDepartmentRequestArr($scope.userDepartmentArr);
		var promiseUserDepartmentConfigModify = qService.tokenHttpPost(accountFactory.setDeparments, {
			id: $scope.userDepartmentConfigUser.id
		}, departmentRequestArr);
		promiseUserDepartmentConfigModify.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('更新成功', error_conf);
		});
	};

	var getUserDepartmentArr = function(allDepartment, userDepartment) {
		var result = [];
		for (var i = 0; i < allDepartment.length; i++) {
			result.push({
				id: allDepartment[i].id,
				name: allDepartment[i].name,
				isSelected: getUserDepartmentStatus(allDepartment[i], userDepartment)
			});
		}
		return result;
	};
	var getUserDepartmentStatus = function(department, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (department.id == arr[i].id) {
				return true;
			}
		}
		return false;
	};
	var getUserDepartmentRequestArr = function(arr) {
		var result = [];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].isSelected == true)
				result.push(arr[i].id);
		}
		return result;
	};


	/*指定用户密码重置*/

	$scope.newIdInfo = {
		user: null,
		password: null
	};
	$scope.userIdResetPassword = function(user) {
		$scope.newIdInfo = {
			user: null,
			password: null
		};
		$scope.newIdInfo.user = angular.copy(user);;
		$('#userResetIdPasswordModal').modal('show');
	};
	$scope.userIdResetPasswordPre = function() {
		$('#userResetIdPasswordConfirm').modal('show');
		$('#userResetIdPasswordModal').modal('hide');
	};
	$scope.userIdResetPasswordProcess = function() {
		$('#userIdResetIdPasswordModal').modal('hide');
		$scope.newIdInfo.user.password = $scope.newIdInfo.password;
		var promiseUserIdResetPassword = qService.tokenHttpPost(accountFactory.accountIdResetPwd, {
			id: $scope.newIdInfo.user.id
		}, $scope.newIdInfo.user);
		promiseUserIdResetPassword.then(function(data) {
			//alert(JSON.stringify(data));
			inform.add('密码修改成功', error_conf);
			pageUserInit();
		});
	};
});