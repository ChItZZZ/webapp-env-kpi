'use strict';

/**
 * @ngdoc directive
 * @name iocUiApp.directive:iocScrollNav
 * @description
 * # iocScrollNav
 */
angular.module('app')
  .directive('iocScrollNav', function () {
    return {
      templateUrl: '/template/ioc-scroll-nav.html',
      restrict: 'EA',
      controller: function($scope, $rootScope){
        $scope.navIndex = 1;
        $scope.navList = [];

        $rootScope.$watch('domainMap', function(){
          if($rootScope.domainMap != undefined) {
            var nameMap = {
              '经济' : 'economic',
              '民生' : 'people',
              '公安' : 'police',
              '资源环境' : 'environment',
              '能源' : 'energy',
              '资源' : 'resource',
              '公共事业' : 'public',
              '城市管理' : 'city'
            };
            $scope.navList = [];
            for(var i = 0; i < $rootScope.domainMap.length; i++) {
              var navItem = {
                id: $rootScope.domainMap[i].id + "-section",
                order: $rootScope.domainMap[i].order,
                css: nameMap[$rootScope.domainMap[i].name],
                name: $rootScope.domainMap[i].name,
                status: $rootScope.domainMap[i].status
              };
              $scope.navList.push(navItem);
            }
            //根据order进行排序
            // var itemTemp;
            // var i, j;
            // for(i = 0; i < $scope.navList.length; i++) {
            //   for(j = i + 1; j < $scope.navList.length; j++) {
            //     if($scope.navList[i].order > $scope.navList[j].order) {
            //       itemTemp = $scope.navList[i];
            //       $scope.navList[i] = $scope.navList[j];
            //       $scope.navList[j] = itemTemp;
            //     }
            //   }
            // }
          }
        });
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
