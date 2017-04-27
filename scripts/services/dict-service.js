'use strict';
angular.module('app').service('dictService', function($localStorage, dictFactory) {

  this.zoneDict = function() {
    var zones = [{
      key: 'CXZ',
      value: '城厢镇'
    }, {
      key: 'SFZ',
      value: '双凤镇'
    }, {
      key: 'SXZ',
      value: '沙溪镇'
    }, {
      key: 'LHZ',
      value: '浏河镇'
    }, {
      key: 'FQZ',
      value: '浮桥镇'
    }, {
      key: 'HJZ',
      value: '璜泾镇'
    }, {
      key: 'XQ',
      value: '新区'
    }, {
      key: 'GQ',
      value: '港区'
    }, {
      key: 'KJXCQ',
      value: '科教新城区'
    }, {
      key: 'QS',
      value: '全市'
    }];
    return zones;
  };

  this.getType = function(typeId, successProcess) {
    dictFactory.getType({
      'x-auth-token': $localStorage.token
    }).get({
        id: typeId
      },
      function success(data) {
        successProcess(JSOG.parse(JSOG.stringify(data)));
      },
      function error(data) {
        // alert('error');
      });
  };


  this.getDictListByType = function(typeId, successProcess) {
    dictFactory.getDictListByType({
      'x-auth-token': $localStorage.token
    }).get({
        id: typeId
      },
      function success(data) {
        successProcess(JSOG.parse(JSOG.stringify(data)));
      },
      function error(data) {
        // alert('error');
      });
  };


});