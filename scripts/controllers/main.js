'use strict';

angular.module('app').controller('MainCtrl',
  function($scope, $rootScope, kpiFactory, dateService) {

  //console.log($rootScope.token);
  kpiFactory.updateHeaders();
  //获取所有的 KPI 层级图
  $scope.domainMap = {};
  $scope.loadAllKpi = function(){
    var dateStr = dateService.formatDate(dateService.get_system_time());
    kpiFactory.allKpiResults(dateStr).
      get(null,
        function success(kpis){
          var kpis = JSOG.parse(JSOG.stringify(kpis.data));
          for (var i = 0; i < kpis.length; i++) {
            var domain = kpis[i];
            var selectedOffset = 0;
            var minOrder = domain.data[selectedOffset].sortOrder;
            for (var h = 0; h < domain.data.length; h++) { //find min sortOrder
              if(domain.data[h].sortOrder < minOrder){
                selectedOffset = h;
                minOrder = domain.data[h].sortOrder;
              }
            };
            domain['selectedCategory'] = domain.data[selectedOffset];
            pageCategory(domain['selectedCategory']);
          };
          //去除电力资源
            var kpiEnv = kpis.filter(findEnvData);
            kpiEnv[0].data.forEach(function (v, i) {
                if(v.id == 5001){
                  kpiEnv[0].data.splice(i,1)
                }
            })
          $scope.domainMap = kpiEnv;
          console.log($scope.domainMap);
          $rootScope.domainMap = kpiEnv
        });
  };
  function findEnvData(obj) {
    return obj.id == 2;
  }

  function pageCategory(category){
    category['total'] = category.data.length;
    category['curr_page'] = 1;
    //console.log(category);
    $scope.pageChanged(category);
  }

  $scope.pageChanged = function(category){
    var pageSize = 10;
    var curr = category['curr_page'];
    category['page_data'] = category.data.slice((curr-1)*pageSize, curr*pageSize);
    return category;
  }


  $scope.loadAllKpi();

  $scope.selectCategory = function(domain, category){
    domain.selectedCategory = category;
    pageCategory(domain.selectedCategory);
  };
});
