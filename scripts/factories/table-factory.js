'use strict';

angular.module('app').factory('tableFactory', function ($resource, $rootScope) {
  // Public API here
  return {
    allTable: function(headers){
      return $resource('/api/table/all', null, {
        'get': {
          method: 'GET',
          headers: headers
        }
      });
    }
  };
});