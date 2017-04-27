'use strict';

angular.module('app').controller('gdpCtrl',
  function($scope, dateService, generalService, dataDetailFactory, qService) {
    var currDateMoment = moment(dateService.get_system_time());
    var year = 2014;

    function getConfig(key, value) {
      return {
        "value": value,
        "key": key,
        "lastestObject": null,
        "chartData": [],
        "categories": [],
        "tableData": {}
      }
    };
    $scope.lastestYM = null;
    $scope.dataMap = {
      'ONE_GDP': getConfig('ONE_GDP', '第一产业GDP'),
      'TWO_GDP': getConfig('TWO_GDP', '第二产业GDP'),
      'THREE_GDP': getConfig('THREE_GDP', '第三产业GDP'),
      'INDUSTRY_GDP': getConfig('INDUSTRY_GDP', '工业GDP'),
      'ACCM_GDP': getConfig('ACCM_GDP', '总GDP')
    };
    var keys = Object.keys($scope.dataMap);
    

    qService.tokenHttpPost(dataDetailFactory.lastestObject, {
      tableName: 'GdpData'
    }, ['year', 'month']).then(function(r) {
      $scope.lastestYM = {
        'year':r.data.year,
        'month':r.data.month
      };
      loadData();
    });

    function loadData() {

      var queryMap = {
      year: generalService.advanceQueryObj('eq', 'innt', [$scope.lastestYM.year]),
      sort: {
        key: 'month',
        sortType: 'asc'
        }
      };
      var promise = qService.tokenHttpPost(dataDetailFactory.advancedQuery, {
        tableName: 'GdpData'
      }, queryMap);
      promise.then(function(rc) {
        var datas = rc.data;
        //根据年数据绘制表格数据
        if (datas.length == 0) {
          console.log('no data');
        } else {
          console.log($scope.lastestYM);
          for (var i = 0; i < datas.length; i++) {
            var d = datas[i];
            var key = datas[i].type.uniqueKey;

            //***************uniqueKey未定义
            //***************

            if (keys.indexOf(key) >= 0) {
              if(d.year == $scope.lastestYM.year && d.month == $scope.lastestYM.month){
                $scope.dataMap[key].lastestObject = d;
              }
              $scope.dataMap[key].chartData.push(datas[i]);
              $scope.dataMap[key].categories.push(datas[i].year + '-' + datas[i].month);
            }
          };
        }
        renderCharts();
      });
    }

    function renderCharts() {
      //累计GDP图表
      var accms = [];
      var mamounts = [];
      var categories = [];
      for (var i = 0; i < $scope.dataMap['ACCM_GDP'].chartData.length; i++) {
        var d = $scope.dataMap['ACCM_GDP'].chartData[i];
        accms.push(d.accmAmount);
        mamounts.push(d.amount);
        categories.push(d.month/3 + '季度');
      };
      $scope.GdpKeepingChart.series[0].data = accms;
      $scope.GdpKeepingChart.series[1].data = mamounts;
      $scope.GdpKeepingChart.xAxis.categories = categories;

      //三产业GDP图表 
      var keys = ['ONE_GDP', 'TWO_GDP', 'THREE_GDP'];
      var n_categories = [];
      for (var i = 0; i < keys.length; i++) {
        var list = [];
        var key = keys[i];
        for (var j = 0; j < $scope.dataMap[key].chartData.length; j++) {
          if(i==0){
            n_categories.push($scope.dataMap[key].chartData[j].month / 3  + '季度');
          }
          list.push($scope.dataMap[key].chartData[j].accmAmount);
        };
        $scope.GdpLoanChart.series[i].data = list;
      };
      $scope.GdpLoanChart.xAxis.categories = n_categories;
    };

    function renderTables() {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var td = $scope.dataMap[key].tableData;
        var obj = generateFinanceObject($scope.dataMap[key].value, td.remain, td.rateWithOpen);
        if (key.indexOf('R_') >= 0) {
          $scope.tables.rTable.push(obj);
        } else if (key.indexOf('F_') >= 0) {
          $scope.tables.fTable.push(obj);
        }
      };
      console.log($scope.tables);
    };


    function generateFinanceObject(key, value, rateWithOpen) {
      return {
        key: key + '',
        remain: value,
        rateWithOpen: rateWithOpen
      };
    };

    /******
     * 图表
     */
    //金融机构存款余额
    $scope.GdpKeepingChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '国内生产总值(累计值)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }

      }, {
        name: '国内生产总值(各季度)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        title: {
          text: '季度',
          align: 'high'
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）'
        }
      },
      title: {
        text: '国内生产总值(总计)'
      },
      loading: false
    };

    //金融机构贷款余额
    $scope.GdpLoanChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '国内生产总值(第一产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '国内生产总值(第二产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '国内生产总值(第三产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        title: {
          text: '季度',
          align: 'high'
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）'
        }
      },
      title: {
        text: '国内生产总值(分类)'
      },
      loading: false
    };
  });
