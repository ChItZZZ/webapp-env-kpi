'use strict';

angular.module('app').controller('fiscalCtrl',
  function($scope, dateService, dictService,
    generalService, dataDetailFactory, qService) {

    $scope.fiscalInChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '累计财政收入总额',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '累计财政收入同比增长率',
        type: 'line',
        yAxis: 1,
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} %</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right'
        },
        title: {
          text: '月份'
        }
      },
      yAxis: [{
        title: {
          text: '值(万元)'
        },
        min: 0,
        plotLines: [{
          value: 0,
          color: '#808080'
        }]
      }, {
        title: {
          text: '百分比(%)'
        },
        plotLines: [{
          value: 0,
          color: '#808080'
        }],
        opposite: true
      }],
      title: {
        text: '财政收入额(当年累计)'
      },
      loading: false
    };
    $scope.fiscalOutChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '累计财政支出总额',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '累计财政支出同比增长率',
        type: 'line',
        yAxis: 1,
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} %</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right'
        },
        title: {
          text: '月份'
        }
      },
      yAxis: [{
        title: {
          text: '值(万元)'
        },
        min: 0,
        plotLines: [{
          value: 0,
          color: '#808080'
        }]
      }, {
        title: {
          text: '百分比(%)'
        },
        plotLines: [{
          value: 0,
          color: '#808080'
        }],
        opposite: true
      }],
      title: {
        text: '财政支出额(当年累计)'
      },
      loading: false
    };
    $scope.taxChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '累计税收总额',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '累计税收额同比增长率',
        type: 'line',
        yAxis: 1,
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} %</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right'
        },
        title: {
          text: '月份'
        }
      },
      yAxis: [{
        title: {
          text: '值(万元)'
        },
        min: 0,
        plotLines: [{
          value: 0,
          color: '#808080'
        }]
      }, {
        title: {
          text: '百分比(%)'
        },
        plotLines: [{
          value: 0,
          color: '#808080'
        }],
        opposite: true
      }],
      title: {
        text: '税收额(当年累计)'
      },
      loading: false
    };
    var currDateMoment = moment(dateService.get_system_time());
    $scope.zones = dictService.zoneDict();
    var year = 2014;

    $scope.dataMap = {
      'FiscalData': {
        tableName: 'FiscalData',
        datas: [],
        categories: [],
        lastestObject: null,
        charts: [{
          chart: $scope.fiscalInChart,
          columns: ['iaccmAmount', 'iaccmRate'],
          currentZone: 'QS'
        }, {
          chart: $scope.fiscalOutChart,
          columns: ['oaccmAmount', 'oaccmRate'],
          currentZone: 'QS'
        }, {
          chart: $scope.taxChart,
          columns: ['taxAccmAmount', 'taxAccmRate'],
          currentZone: 'QS'
        }],
        tables: [{

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
        console.log(result.data);
        $scope.dataMap[mapKey].lastestObject = {
          'year': result.data.year,
          'month': result.data.month
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
            if (obj.year == result.data.year &&
              obj.month == result.data.month &&
              obj.zone == '全市') {
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

    function renderTable(mapKey, offset) {

    };

  });