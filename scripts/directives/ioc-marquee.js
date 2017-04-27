'use strict';

/**
 * @ngdoc directive
 * @name app.directive:iocMarquee
 * @description
 * # iocMarquee
 */
angular.module('app')
  .directive('iocMarquee', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.marquee();
      }
    };
  });
