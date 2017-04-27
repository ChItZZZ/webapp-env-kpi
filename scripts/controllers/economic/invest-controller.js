'use strict';

angular.module('app').controller('investCtrl',
  function($scope, dateService, generalService, dataDetailFactory, qService,
    dictService) {

    /*
      图标配置  
     */
    //固定资产投资
    $scope.InvestValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '全社会固定资产投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '去年同期值',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
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
          text: '值（万元）'
        }
      },
      title: {
        text: '全社会固定资产投资(累计值)'
      },
      loading: false
    };
    //分类资产投资
    $scope.ClassInvestValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '工业投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '服务业投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '房地产投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
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
          text: '值（万元）'
        }
      },
      title: {
        text: '主要分类固定资产投资(累计值)'
      },
      loading: false
    };
    //实际利用外资
    $scope.CapitalValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 80]
        }
      },
      series: [{
        name: '注册外资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万美元</b> '
        }

      }, {
        name: '实际利用外资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万美元</b> '
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
          text: '值（万美元）'
        }
      },
      title: {
        text: '引进外资(累计值)'
      },
      loading: false
    };
    //引进内资
    $scope.ImportCapitalValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 80]
        }
      },
      series: [{
        name: '新增注册资金',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '到账资金',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
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
          text: '值（万元）'
        }
      },
      title: {
        text: '引进内资(累计值)'
      },
      loading: false
    };
    /****结束图表配置****/

    var currDateMoment = moment(dateService.get_system_time());
    $scope.zones = dictService.zoneDict();
    var year = 2014;

    $scope.dataMap = {
      'InvestData': {
        tableName: 'InvestData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.InvestValueChart,
          columns: ['gaccmAmount', 'glastAccmAmount']
        }, {
          chart: $scope.ClassInvestValueChart,
          columns: ['giaccmAmount', 'gsaccmAmount', 'gfaccmAmount']
        }]
      },
      'ImportData': {
        value: '主要分类全社会固定资产投资',
        tableName: 'CapitalImportData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.CapitalValueChart,
          columns: ['rAccm', 'uAccm']
        }, {
          chart: $scope.ImportCapitalValueChart,
          columns: ['addFund', 'inFund']
        }]
      }
    };

    $scope.initData = function(mapKey) {

      //init map
      var map = {};
      for (var i = 0; i < $scope.zones.length; i++) {
        var key = $scope.zones[i].value;
        map[key] = {
          categories: [],
          datas: []
        };
      };
      qService.tokenHttpPost(dataDetailFactory.lastestObject, {
        tableName: $scope.dataMap[mapKey].tableName
      }, ['year', 'month']).then(function(result) {
        
        $scope.dataMap[mapKey].lastestObject = {
          'year':result.data.year,
          'month':result.data.month
        };
        var queryMap = {
          year: generalService.advanceQueryObj('eq', 'innt', [$scope.dataMap[mapKey].lastestObject.year]),
          sort: {
            key: 'month',
            sortType: 'asc'
          }
        };
        //获取后台数据，并显示在图表上
        var promise = qService.tokenHttpPost(dataDetailFactory.advancedQuery, {
          tableName: $scope.dataMap[mapKey].tableName
        }, queryMap);
        promise.then(function(rc) {
          var rc = rc.data;
          for (var i = 0; i < rc.length; i++) {
            var obj = rc[i];
            if(obj.year == result.data.year && obj.month == result.data.month
              && obj.zone === '全市'){

              $scope.dataMap[mapKey].lastestObject = obj;
            }
            map[obj.zone].datas.push(obj);
          };
          $scope.dataMap[mapKey].chartData = map;

          for (var i = 0; i < $scope.dataMap[mapKey].charts.length; i++) {
            setTargetChart('全市', mapKey, i);
          }
        });
      });
    };

    function setTargetChart(zone, mapKey, offset) {
      var subMap = $scope.dataMap[mapKey];
      var topList = {};
      var chartConfig = $scope.dataMap[mapKey].charts[offset];
      var categories = [];
      //构建 list
      for (var i = 0; i < chartConfig.columns.length; i++) {
        topList[chartConfig.columns[i]] = [];
      };
      //构建数据列
      
      for (var i = 0; i < subMap.chartData[zone].datas.length; i++) {
        var data = subMap.chartData[zone].datas[i];
        categories.push(data.year + '-' + data.month);
        for (var j = 0; j < chartConfig.columns.length; j++) {
          var column = chartConfig.columns[j];
          topList[column].push(data[column]);
        };
      };
      //填入表格
      for (var i = 0; i < chartConfig.columns.length; i++) {
        chartConfig.chart.series[i].data = topList[chartConfig.columns[i]];
        chartConfig.chart.xAxis.categories = categories;
      };
    };

    $scope.loadAllData = function() {
      var keys = Object.keys($scope.dataMap);
      for (var i = 0; i < keys.length; i++) {
        $scope.initData(keys[i]);
      };
    };
    $scope.loadAllData();



  });