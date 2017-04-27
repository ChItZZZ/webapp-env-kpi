'use strict';

angular.module('app').directive('iocHeader', function() {
	return {
		templateUrl: '/template/ioc-header.html',
		restrict: 'EA',
		controller: function($scope, $state, $element, $rootScope, $route, $window,
			$location, sessionService, $localStorage, dateService, kpiFactory, kpiService, qService, accountFactory) {

			/*系统管理显示导航*/
			$scope.systemManageNavStatus = false;
			if ($localStorage.currentUser.role == 'ADMINISTRATOR') {
				$scope.systemManageNavStatus = true;
			}

			$scope.curr_date = dateService.curr_date();
			$scope.min_date = new Date(2014, 1, 1);
			$scope.system_date = dateService.get_system_time();
			$scope.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};
			var get_system_date = function() {
				return $scope.system_date;
			};

			var bm = kpiService.getBlueMap();
			if (!bm) {
				kpiService.persistentBlueMap();
			}

			$scope.$watch(get_system_date, function(new_date, old_date) {
				//console.log(old_date);
				if (old_date != new_date) {
					//console.log(new_date);
					dateService.set_system_time(new_date);
					$scope.system_date = dateService.get_system_time();
					$state.reload();
				};
			});

			$scope.open = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened = true;
			};

			$scope.show_datapicker = function() {
				$("#date_picker").toggle();
			};
			$scope.logout = function() {
				sessionService.delToken();
			};

			var kpiContainer = $element.find('.kpi-container');
			var biContainer = $element.find('.bi-container');
			var peizhiContainer = $element.find('.peizhi-container');

			$scope.isNavPannelCollapsed = true;

			$scope.showNavPannel = function(navName) {
				if ($scope.isNavPannelCollapsed) {
					$scope.isNavPannelCollapsed = false;
					if (navName == 'kpi') {
						$scope.initItems();
						kpiContainer.animate({
							left: '0'
						});
					} else if (navName == 'bi') {
						biContainer.animate({
							left: '0'
						});
					} else if (navName == 'peizhi') {
						peizhiContainer.animate({
							left: '0'
						});
					} else {
						peizhiContainer.animate({
							left: '0'
						});
					}
				} else {
					if (navName == 'kpi') {
						kpiContainer.animate({
							left: '0'
						});
						biContainer.animate({
							left: '1024px'
						});
						peizhiContainer.animate({
							left: '1024px'
						});
					} else if (navName == 'bi') {
						biContainer.animate({
							left: '0'
						});
						kpiContainer.animate({
							left: '1024px'
						});
						peizhiContainer.animate({
							left: '1024px'
						});
					} else if (navName == 'peizhi') {
						peizhiContainer.animate({
							left: '0'
						});
						biContainer.animate({
							left: '1024px'
						});
						kpiContainer.animate({
							left: '1024px'
						});
					}
				}
			};
			/*
			  获取页面头部分类信息函数
			 */
			$scope.initItems = function() {}
			$scope.closeNavPannel = function() {
				$scope.isNavPannelCollapsed = true;
				kpiContainer.css('left', '1024px');
				biContainer.css('left', '1024px');
				peizhiContainer.css('left', '1024px');
			};
			/*手动隐藏下拉框*/
			$scope.closePullInfo = function() {
				$scope.opened = false;
			};

			/*密码重置*/
			$scope.userResetPassword = function() {
				$scope.newInfo = {
					password: null
				};
				$('#userResetPasswordModal').modal('show');
			};
			$scope.userResetPasswordPre = function() {
				$('#userResetPasswordModal').modal('hide');
				$('#userResetPasswordConfirm').modal('show');
			};
			$scope.userResetPasswordProcess = function() {
				$('#userResetPasswordModal').modal('hide');
				var promiseUserResetPassword = qService.tokenHttpPost(accountFactory.accountResetPassword, null, {
					password: $scope.newInfo.password
				});
				promiseUserResetPassword.then(function(data) {
					//alert(JSON.stringify(data));
					inform.add('密码修改成功', error_conf);
					pageUserInit();
				});
			};


		},
		link: function postLink(scope, element, attrs, controller) {
			element.mouseleave(function() {
				var kpiContainer = element.find('.kpi-container');
				var biContainer = element.find('.bi-container');
				var peizhiContainer = element.find('.peizhi-container');
				scope.isNavPannelCollapsed = true;
				scope.$apply();
				kpiContainer.css('left', '1024px');
				biContainer.css('left', '1024px');
				peizhiContainer.css('left', '1024px');
			});
		}
	};
});