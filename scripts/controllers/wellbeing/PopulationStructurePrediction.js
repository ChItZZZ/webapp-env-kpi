'use strict';

angular.module('app').controller('PopulationStructurePredictionController', function($scope, $http, $routeParams, dateService, $anchorScroll, $location, generalService, inform, $rootScope, qService, dataDetailFactory, $resource) {
  var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200')
  var pieColors = new Array('#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200')
  var lineColors = columnColors
  var compareColors = new Array('#3795BC', '#FB9705', '#195489', '#F26200')

  var population_prediction_year
  var current_age_distribution
  var prediction_age_distribution
  var age_ration;

  var GETPREDICTIONDATA = function(headers) {
    return $resource('/api/populationStructureController', null, {
    'get': {
      method: 'GET',
      headers: headers//url中相对核心的部分
    }
  });}

  var divisor = 10000;

  // set current Date; use fake date.
  // var time = new Date();
  // var year = time.getUTCFullYear();
  //  to-do : year should be set

  $scope.tabMap = [{
    id: "tab_populationStructurePrediction",
    label: "常住人口人口结构预测",
    name: "populationStructurePrediction",
    active: false
  }, {
    id: "tab_totalPopulationPrediction",
    label: "常住人口人口总量预测",
    name: "totalPopulationPrediction",
    active: false
  }];

  $scope.kpi_id = 2231;

  $scope.btn_click = function(btn_click) {
    $scope.predictionModal = btn_click.radio;
    init_population_structure_page(btn_click.name);
  }

  function init_population_structure_page(predictionYear) {
    $scope.predictionStartYear = $scope.year;
    $scope.predictionEndYear = predictionYear;
    call_set_population_age_ration($scope.year, predictionYear, 'age_ration')
    call_set_current_population_distribution($scope.year, $scope.year, 'current_age_distribution');
    call_set_current_population_distribution($scope.year, predictionYear, 'prediction_age_distribution');
  }

  function init_total_population_page(predictionYear) {
    call_set_prediction_year($scope.year, $scope.year, $scope.buttonMap[2].name, 'population_prediction_year');
  }

  $scope.tab_change = function(tab_name) {
      switch (tab_name) {
        case $scope.tabMap[0].name:
          $("#populationStructurePrediction").removeClass("hide");
          $("#populationTotalPrediction").addClass("hide");
          init_population_structure_page($scope.buttonMap[0].name);
          break;
        case $scope.tabMap[1].name:
          $("#populationTotalPrediction").removeClass("hide");
          $("#populationStructurePrediction").addClass("hide");
          init_total_population_page($scope.buttonMap[0].name);
          break;
        default:
          $("#plan-born-detail-panel").addClass("hide");
          init_population_structure_page($scope.buttonMap[0].name);
      }
      // init tab
    }
    // var id = "population_chart_0";
  qService.tokenHttpPost(dataDetailFactory.lastestObject, {tableName: 'DetailPopulationByAge'
}, ['year']).then(function(lastObjRaw) {
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data))

      $scope.year = latestObj.year;
      $scope.buttonMap = [{
        name: ($scope.year + 10),
        label: ($scope.year + 10) + "年人口结构预测",
        radio: "Left"
      }, {
        name: ($scope.year + 20),
        label: ($scope.year + 20) + "年人口结构预测",
        radio: "Middle"
      }, {
        name: ($scope.year + 30),
        label: ($scope.year + 30) + "年人口结构预测",
        radio: "Right"
      }];
      //$scope.tab_change("populationStructure");
      $scope.predictionModal = $scope.buttonMap[0].radio;
      $scope.tab_change($scope.tabMap[0].name);
    });

  function call_set_prediction_year(baseYear, startYear, endYear, id) {
    var requestSetPredictionYear = qService.tokenHttpGet(GETPREDICTIONDATA, {
      town: '全市',
      tableName: 'prediction',
      dataType: 'total',
      year: baseYear,
      startYear: startYear,
      endYear: endYear
    });

    requestSetPredictionYear.then(function(data) {
      if (data.errorCode != "NO_ERROR") {//有错误，返回主页
        $location.path("/main");//在url中添加main，即/#/main
      }

      var data = data.data;
      $scope.predictionStartYear = data.xAxis.categories[0];
      $scope.predictionEndYear = data.xAxis.categories[data.xAxis.categories.length -1];
      init_line_chart(data, id);
      $(population_prediction_interpretation).html(data.interpretation);
    });
  }

  function call_set_current_population_distribution(baseYear, predictionYear, id) {
    var requestSetCurrentPS = qService.tokenHttpGet(GETPREDICTIONDATA, {
      town: '全市',
      tableName: 'prediction',
      dataType: 'detail',
      year: baseYear,
      predictionYear: predictionYear,
    });
    requestSetCurrentPS.then(
      function(data) {
        if (data.errorCode != "NO_ERROR") {
          $location.path("/main");
        }
        var data = data.data;
        init_bar_chart(data.categories,
          data.series, data.title, id);
      });
  }

  function call_set_population_age_ration(baseYear, predictionYear, id) {
    var requestSetPAR = qService.tokenHttpGet(GETPREDICTIONDATA, {
      town: '全市',
      tableName: 'prediction',
      dataType: 'agegroup',
      year: baseYear,
      predictionYear: predictionYear,
    });

    requestSetPAR.then(
      function(data) {
        if (data.errorCode != "NO_ERROR") {
          $location.path("/main");
        }
       console.log(data.data);
        var data = data.data;
        age_ration = init_column_chart(data.xAxis,
          data.series, data.title, id);
        $(age_range_prediction_interpretation).html(data.interpretation);
      });
  }

  // the detail column
  function init_line_chart(data, id) {
    return new Highcharts.Chart({
      colors: lineColors,
      chart: {
        zoomType: 'xy',
        renderTo: id
      },
      credits: {
        enabled: false
      },
      title: {
        text: data.title
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: data.xAxis.categories,
        labels: {
          rotation: -45,
          align: 'right',
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: [{ // Primary yAxis
        title: {
          text: data.yAxisPopulaiton.title,
          style: {
            color: data.yAxisPopulaiton.color
          }
        },
        labels: {
          style: {
            color: data.yAxisPopulaiton.color
          },
          formatter: function() {
            return (Math.abs(this.value) / divisor) + '万人';
          }
        },
        min: data.yAxisPopulaiton.min
      }, {
        title: {
          text: data.yAxisRation.title,
          style: {
            color: data.yAxisRation.color
          }
        },
        labels: {
          style: {
            color: data.yAxisRation.color
          },
          formatter: function() {
            return to_2decimal(this.value) + ' %';
          }
        },
        max: data.yAxisRation.max,
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        enabled: true
      },
      plotOptions: {

      },
      series: [{
        name: data.populationSeries.name,
        color: data.populationSeries.color,
        type: data.populationSeries.type,
        data: data.populationSeries.data,
        tooltip: {
          pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.0f}人</b><br/>'
        }
      }, {
        name: data.rationSeries.name,
        color: data.rationSeries.color,
        type: data.rationSeries.type,
        yAxis: 1,
        data: data.rationSeries.data,
        tooltip: {
          pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}%</b><br/>'
        }
      }]
    });
  }

  // the population structure chart
  function init_bar_chart(categories, series, title, id) {
    return new Highcharts.Chart({
      colors: compareColors,
      chart: {
        type: 'bar',
        renderTo: id
      },
      credits: {
        enabled: false
      },
      title: {
        text: title
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
            step: 5
        }
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 5
        }
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function() {
            return Math.abs(this.value);
          }
        },
        // min: -6000,
        // max: 6000
      },
      plotOptions: {
        bar: {},
        series: {
          stacking: 'normal'
        }
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '<br/> 年龄段: ' + this.point.category + '</b><br/>' + '人口数量: ' + Highcharts.numberFormat(Math
            .abs(this.point.y), 0);
        }
      },
      series: series
    });
  }

  // the age ration chart
  function init_column_chart(xAxis, series, title, id) {
    return new Highcharts.Chart({
      colors: ['#7CADDF', '#327EBD', '#0099CC', '#3399CC', '#FB9705', '#F26200'],
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        renderTo: id
      },
      title: {
        text: title
      },
      xAxis:
    	  xAxis,
//    	  labels:{
//    		  rotation:-45,
//    		  align:'right'
//    	  }
//    	  },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        labels: {
          formatter: function() {
            return to_2decimal(this.value) + '%'
          }
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          },
          format: '{total:.2f}%'
        }
      },
      legend: {
        align: 'right',
        x: -70,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + to_2decimal(this.y) + '% <br/>' + '统共: ' + to_2decimal(this.point.stackTotal) + '%';
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        }
      },
      series: series
    });
  }

  function to_0decimal(value) {
    return Number(value / divisor).toFixed(0);
  }

  function to_2decimal(value) {
    return Number(value).toFixed(2);
  }

});
