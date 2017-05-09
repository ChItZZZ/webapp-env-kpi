angular.module('AngularChart', []).directive('chart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        transclude: true,
        replace: true,
        scope: '=',
        link: function (scope, element, attrs) {
            var opt = {
                chart: {
                    renderTo: element[0],
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 50
                },
                title: {
                    text: attrs.title + '(' + attrs.unit + ')',
                    x: -20 //center
                },
                subtitle: {
                    text: attrs.subtitle,
                    x: -20
                },
                xAxis: {
                    tickInterval: 1,
                    title: {
                        text: attrs.xname
                    },
                    tickmarkPlacement: 'on',
                    labels: {
                        rotation: -45,
                        align: 'right'
                    }
                },
                yAxis: {
                    title: {
                        text: attrs.yname + '(' + attrs.unit + ')'
                    },
                    startOnTick: false,
                    max: attrs.ymax,
                    min: attrs.ymin
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: 100,
                    borderWidth: 0
                },

                series: [],
                credits: {
                    enabled: false
                }
            }
            scope.$watch(function (scope) {


                return JSON.stringify({
                    xAxis: {
                        labels: {
                            rotation: -45,
                            align: 'right'
                        },
                        categories: scope[attrs.xdata],
                        tickmarkPlacement: 'on',
                        tickInterval: scope[attrs.interval],
                        title: {
                            text: attrs.kpitype
                            //align: 'high'
                        }
                    },
                    series: scope[attrs.ydata],
                    title: {
                        text: attrs.title + '(' + attrs.unit + ')'
                    },
                    // tooltip: {
                    //     pointFormat: '<span style="font-weight: bold;">{series.name}</span>: <b>{point.y:.2f} '+ attrs.unit+'</b> '
                    // },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: '<small>{point.key}' + attrs.kpitype + '</small><table>',
                        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right"><b>{point.y} ' + attrs.unit + '</b></td></tr>',
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    yAxis: {
                        title: {
                            text: attrs.yname + '(' + attrs.unit + ')'
                        },
                        min: scope[attrs.ymin]
                    }
                });
            }, function (news) {
                news = JSON.parse(news)
                if (!news.series) return;
                angular.extend(opt, news)
                var chart = new Highcharts.Chart(opt);
            });
        }
    }

})