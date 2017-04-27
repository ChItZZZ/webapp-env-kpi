'use strict';

angular.module('app').controller('financeCtrl',
  function($scope, dateService, generalService, dataDetailFactory, qService) {
    var currDateMoment = moment(dateService.get_system_time());
    //获取当前数据项的最新时间
    $scope.lastestObject;
    $scope.dataMap = {
      'R_SAVE': {
        value: '金融机构存款余额(人民币)',
        key: 'R_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'R_LOAN': {
        value: '金融机构贷款余额(人民币)',
        key: 'R_LOAN',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'F_SAVE': {
        value: '金融机构存款余额(本外币)',
        key: 'F_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'F_LOAN': {
        value: '金融机构贷款余额(本外币)',
        key: 'F_LOAN',
        chartData: [],
        tableData: {},
        categories:[]
      }
    };
    var keys = Object.keys($scope.dataMap);
    $scope.queryMap;
    
    function loadLastestYearMonth() {
      qService.tokenHttpPost(dataDetailFactory.lastestObject, {
        tableName: 'FinanceData'
      }, ['year', 'month']).then(function(rc) {
        $scope.lastestObject = rc.data;
        $scope.queryMap = {
          year: generalService.advanceQueryObj('eq', 'innt', [$scope.lastestObject.year])
        };
        loadData();
      });
    };

    loadLastestYearMonth();
    function loadData() {
      var promise = qService.tokenHttpPost(dataDetailFactory.advancedQuery, {
        tableName: 'FinanceData'
      }, $scope.queryMap);
      promise.then(function(rc) {
        var datas = rc.data;
        //根据年数据绘制表格数据
        if (datas.length == 0) {
          console.log('no data');
        } else {
          for (var i = 0; i < datas.length; i++) {
            var d = datas[i];
            var key = datas[i].type.uniqueKey;
            if (keys.indexOf(key) >= 0) {
              $scope.dataMap[key].chartData.push(datas[i].remain);
              $scope.dataMap[key].categories.push(datas[i].year + '-' + datas[i].month);
              if (datas[i].month == $scope.lastestObject.month) { 
                $scope.dataMap[key].tableData['remain'] = datas[i].remain;
                $scope.dataMap[key].tableData['rateWithOpen'] = datas[i].rateWithOpen;
              };
            }
          };
        }
        renderCharts();
        renderTables();
      });
    };


    function renderCharts() {
      $scope.FinanceKeepingChart.series[0].data = $scope.dataMap.R_SAVE.chartData;
      $scope.FinanceKeepingChart.series[1].data = $scope.dataMap.F_SAVE.chartData;
      $scope.FinanceKeepingChart.xAxis.categories = $scope.dataMap.R_LOAN.categories;

      $scope.FinanceLoanChart.series[0].data = $scope.dataMap.R_LOAN.chartData;
      $scope.FinanceLoanChart.series[1].data = $scope.dataMap.F_LOAN.chartData;
      $scope.FinanceLoanChart.xAxis.categories = $scope.dataMap.F_LOAN.categories;
    };

    function renderTables() {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var td = $scope.dataMap[key].tableData;
        var obj = generateFinanceObject($scope.dataMap[key].value, td.remain, td.rateWithOpen);
        if (key.indexOf('SAVE') >= 0) {
          $scope.tables.rTable.push(obj);
        } else if (key.indexOf('LOAN') >= 0) {
          $scope.tables.fTable.push(obj);
        }
      };
      //console.log($scope.tables);
    };
    /***
     * 表格
     */
    $scope.tables = {
      rTable: [],
      fTable: []
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
    $scope.FinanceKeepingChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '金融机构存款余额(人民币)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }

      }, {
        name: '金融机构存款余额(本外币)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right'
        },
        title: {
          text: '月份',
          align: 'high'
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）'
        }
      },
      title: {
        text: '金融机构存款余额'
      },
      loading: false
    };

    //金融机构贷款余额
    $scope.FinanceLoanChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '金融机构贷款余额(人民币)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '金融机构贷款余额(本外币)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right'
        },
        title: {
          text: '月份',
          align: 'high'
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）'
        }
      },
      title: {
        text: '金融机构贷款余额'
      },
      loading: false
    };
  });