'use strict';

/**
 * @ngdoc directive
 * @name iocUiApp.directive:iocFooter
 * @description
 * # iocFooter
 */
angular.module('app')
  .directive('iocFooter', function () {
    return {
      templateUrl: '/template/ioc-footer.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
