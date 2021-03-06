'use strict';

/**
 * @ngdoc directive
 * @name iocUiApp.directive:iocFullpage
 * @description
 * # iocFullpage
 */
angular.module('app')
    .directive('iocFullpage', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.fullpage({});
            }
        };
    });
