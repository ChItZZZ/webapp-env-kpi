'use strict';

angular.module('app').controller('fiscalInOutCtrl',
  function($scope, dateService, generalService, dataDetailFactory, qService) {
    var currDateMoment = moment(dateService.get_system_time());
    
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