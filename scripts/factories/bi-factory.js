'use strict';

angular.module('app').factory('biFactory', function($resource) {
  this.waterBiPredict = function(headers) {
    return $resource('/api/waterEnvironmentAnalysis/predict', null, {
      'post': {
        method: 'POST',
        headers: headers
      }
    });
  };
  return this;
});