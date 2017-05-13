'use strict';

angular.module('app')
  .factory('kpiFactory', function ($resource, $rootScope) {
    // Public API here
    var baseUrl = '/api/kpi';
    var headers = {'x-auth-token': $rootScope.token};
    
    console.log($rootScope.token);

    return {
      blueMap: function(){
        return $resource(baseUrl + '/blueMap', null, {
          'get': {
            method : 'GET',
            headers : headers
          }
        });
      },
      allKpiResults: function (currentDate) {
        return $resource(baseUrl + '/result/all', null,{
          'get': {
            method : 'GET',
            headers : headers,
            params : {'currentDate': currentDate}
          }
        });
      },
      kpiCategoryResults : function(categoryId, currentDate){
        return $resource(baseUrl + '/result/category/' + categoryId , {'currentDate':currentDate},{
          'get': {
            method: 'GET',
            headers: headers
          }
        });
      },
      kpiResult:function (kpiId, currentDate){
        return $resource(baseUrl + '/result/kpi/' + kpiId , {'currentDate':currentDate},{
          'get': {
            method: 'GET',
            headers: headers
          }
        });
      },
      kpiCategoryNews: function(categoryId){
        return $resource(baseUrl + '/category/' + categoryId + '/news', null,{
          'get': {
            method: 'GET',
            headers: headers
          }
        });
      },
      updateHeaders: function() {
        headers['x-auth-token'] = $rootScope.token;
      }
    };
  });
