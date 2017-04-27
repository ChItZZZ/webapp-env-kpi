'use strict';

angular.module('app').service('kpiService', 
  function($localStorage, $rootScope, kpiFactory) {
  //获取并持久化blueMap
  this.persistentBlueMap = function(){
    kpiFactory.blueMap().get(null,
      function success(blueMap){
        var blueMap = JSOG.parse(JSOG.stringify(blueMap.data));
        $localStorage.blueMap = blueMap;
        $rootScope.blueMap = blueMap;
      });
  };

  this.getBlueMap = function(){
    if($localStorage.blueMap == undefined){
      return false;
    }else{
      $rootScope.blueMap = $localStorage.blueMap;
      return $rootScope.blueMap;
    }
  };


});