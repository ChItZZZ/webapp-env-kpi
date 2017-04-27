'use strict';

/**
 * @ngdoc service
 * @name app.generalService
 * @description
 * # generalService
 * Service in the app.
 */
angular.module('app')
  .service('generalService', function () {
  this.columnColors = function(){
    return ['#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200'];
  };

  this.pieColors = function(){
    return ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200'];
  };

  this.lineColors = function(){
    return ['#7CADDF', '#7CADDF', '#195489', '#1FC22B', '#FB9705', '#F26200'];
  };

  this.compareColors = function(){
    return ['#3795BC', '#FB9705', '#195489', '#F26200'];
  };
  
  this.advanceQueryObj = function(queryType, valueType, values){
    var map = {
      queryType: queryType,
      valueType: valueType
    };
    for (var i = 0; i < values.length; i++) {
      var key = 'value'+ (i+1);
      map[key] = values[i];
    };
    return map;
  };
});
