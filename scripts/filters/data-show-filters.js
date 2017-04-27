'use strict';

/**
 * @ngdoc filter
 * @name app.filter:dataShowFilters
 * @function
 * @description
 * # dataShowFilters
 * Filter in the app.
 */
angular.module('app')
  .filter('signFilter', function () {
    return function (input) {
      if(input >= 0){
        return '+';
      }else{
        return '';
      }
    };
  });
