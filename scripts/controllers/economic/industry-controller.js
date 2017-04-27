'use strict';

angular.module('app').controller('industryCtrl',
  function($scope, dateService, generalService, dataDetailFactory, qService,
    dictService) {
    var year = 2014;
    /*************************
     * 图表定义
     */
    //工业总产值
    $scope.IndustryValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '工业总产值',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '规模以上工业总产值',
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
        text: '工业总产值(累计值)'
      },
      loading: false
    };
    //新兴产业工业的总产值
    $scope.NewIndustryValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: '规模以上新兴工业总产值',
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
        text: '规模以上新兴产业工业的总产值(累计值)'
      },
      loading: false
    }
    //工业主营业务收入
    $scope.industryIncomeValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 70]
        }
      },
      series: [{
        name: '工业主营业务收入',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业主营业务收入',
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
        text: '工业主营业务收入(累计值)'
      },
      loading: false
    }
    //工业利润和利税
    $scope.industryProfitValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 70]
        }
      },
      series: [{
        name: '工业利润',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业利润',
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
        text: '工业利润(累计值)'
      },
      loading: false
    }
    //工业利税
    $scope.industryTaxValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 80]
        }
      },
      series: [{
        name: '工业利税',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业利税',
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
        text: '工业利税(累计值)'
      },
      loading: false
    }
    /*** 结束图表定义***/

    var currDateMoment = moment(dateService.get_system_time());
    $scope.zones = dictService.zoneDict();
    $scope.dataMap = {
      'Ivalue': {
        value: '工业总产值(累计值)',
        tableName: 'IndustryValueData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.IndustryValueChart,
          columns: ['accmAmount', 'uaccmAmount']
        }]
      },
      'NIvalue': {
        value: '工业总产值(累计值)',
        tableName: 'NewIndustryData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.NewIndustryValueChart,
          columns: ['accmAmount']
        }]
      },
      'NSvalue': {
        value: '工业主营业务收入(累计值)',
        tableName: 'IndustrySellData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryIncomeValueChart,
          columns: ['accmAmount','uaccmAmount']
        }]
      },
      'NPvalue': {
        value: '工业利润(累计值)',
        tableName: 'IndustryProfitData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryProfitValueChart,
          columns: ['accmAmount','uaccmAmount']
        }]
      },
      'NProfitvalue': {
        value: '工业利税(累计值)',
        tableName: 'IndustryTaxData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryTaxValueChart,
          columns: ['accmAmount','uaccmAmount']
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

  });