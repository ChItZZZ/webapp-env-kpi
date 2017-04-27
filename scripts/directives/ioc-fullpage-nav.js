'use strict';

/**
 * @ngdoc directive
 * @name iocUiApp.directive:iocFullpageNav
 * @description
 * # iocFullpageNav
 */
angular.module('app')
  .directive('iocFullpageNav', function () {
    return {
      templateUrl: 'template/ioc-fullpage-nav.html',
      restrict: 'E',
      scope: {},
      controller: function($scope){
      	$scope.navIndex = 1;
      	$scope.navList = [
      		{
      			name: 'economic'
      		},
      		{
      			name: 'people'
      		},
      		{
      			name: 'environment'
      		},
      		{
      			name: 'energy'
      		},
      		{
      			name: 'police'
      		},
      		{
      			name: 'resource'
      		},
          {
            name: 'city'
          }
      	];
      	$scope.navToSection = function(index) {
      		$.fn.fullpage.moveTo(index+1);
      		$scope.navIndex = index + 1;
      	};
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
