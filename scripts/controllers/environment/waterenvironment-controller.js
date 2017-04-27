'use strict';

angular.module('app').controller('WaterEnvironmentCtrl', function($scope, kpiDetailService, dateService) {

    /**
     * 变量区
     *
     */

    //基本变量
    var dateTime = new Date();

    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;

    $scope.currentDateTime = {
        year: year,
        month: month
    };

    //变色范围
    var waterQualityO2Scan = {
        scan: [3, 2],
        type: 'desc'
    };
    var waterQualityKmno4Scan = {
        scan: [10, 15],
        type: 'asc'
    };
    var waterQualityNh4nScan = {
        scan: [1.5, 2.0],
        type: 'asc'
    };
    var waterQualityPScan = {
        scan: [0.3, 0.4],
        type: 'asc'
    };
    var waterPollutionCodScan = {
        scan: [60, 60],
        type: 'asc'
    };
    var waterPollutionNh4nScan = {
        scan: [5, 8],
        type: 'asc'
    };
    var waterPollutionPScan = {
        scan: [0.5, 0.5],
        type: 'asc'
    };
    var waterConditionScan = {
        upLevel: 3.7,
        downLevel: 3.7
    };


    var mapObj, marker;
    var waterQualityMarkerArr;
    var waterQualityCurrentArr;
    var waterQualityCurrentTimeList;
    var waterConditionMarkerArr;
    var waterConditionCurrentArr;
    var waterConditionCurrentTimeList;
    var wasteWaterMarkerArr;
    var wasteWaterCurrentArr;
    var wasteWaterMarkerCurrentAllArr;
    var wasteWaterMarkerArrAll;
    var wasteWaterCurrentTimeList;


    //水质量 highcharts options
    $scope.waterQualityOptions = {
        o2Option: {
            options: {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },
                title: {
                    text: '溶解氧'
                },
                credits: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    min: 0,
                    max: 10,
                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: waterQualityO2Scan.scan[0],
                        to: 10,
                        color: '#55BF3B' // green
                    }, {
                        from: waterQualityO2Scan.scan[1],
                        to: waterQualityO2Scan.scan[0],
                        color: '#DDDF0D' // yellow
                    }, {
                        from: 0,
                        to: waterQualityO2Scan.scan[1],
                        color: '#DF5353' // red
                    }]
                },
            },
            series: [{
                name: '溶解氧',
                data: [0],
                tooltip: {
                    valueSuffix: ' '
                }
            }],
            size: {
                width: 200,
                height: 250
            }
        },
        kmno4Option: {
            options: {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: '高锰酸钾浓度'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 30,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: 0,
                        to: waterQualityKmno4Scan.scan[0],
                        color: '#55BF3B' // green
                    }, {
                        from: waterQualityKmno4Scan.scan[0],
                        to: waterQualityKmno4Scan.scan[1],
                        color: '#DDDF0D' // yellow
                    }, {
                        from: waterQualityKmno4Scan.scan[1],
                        to: 30,
                        color: '#DF5353' // red
                    }]
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '高锰酸钾指数',
                data: [0],
                tooltip: {
                    valueSuffix: 'mg/L'
                }
            }],
            size: {
                width: 200,
                height: 250
            }
        },
        nh4nOption: {
            options: {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: '氨氮'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 5,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: 0,
                        to: waterQualityNh4nScan.scan[0],
                        color: '#55BF3B' // green
                    }, {
                        from: waterQualityNh4nScan.scan[0],
                        to: waterQualityNh4nScan.scan[1],
                        color: '#DDDF0D' // yellow
                    }, {
                        from: waterQualityNh4nScan.scan[1],
                        to: 5.0,
                        color: '#DF5353' // red
                    }]
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '氨氮',
                data: [0],
                tooltip: {
                    valueSuffix: 'mg/L'
                }
            }],
            size: {
                width: 200,
                height: 250
            }
        },
        pOption: {
            options: {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: '总磷'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 0.6,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: 0,
                        to: waterQualityPScan.scan[0],
                        color: '#55BF3B' // green
                    }, {
                        from: waterQualityPScan.scan[0],
                        to: waterQualityPScan.scan[1],
                        color: '#DDDF0D' // yellow
                    }, {
                        from: waterQualityPScan.scan[1],
                        to: 0.6,
                        color: '#DF5353' // red
                    }]
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '总磷',
                data: [0],
                tooltip: {
                    valueSuffix: 'mg/L'
                }
            }],
            size: {
                width: 200,
                height: 250
            }
        },
        currentO2LineOption: {
            options: {
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],

                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/L'
                    },
                    max: 15,
                    min: 0,
                    plotLines: [{
                        color: '#DDDF0D',
                        width: 2,
                        value: waterQualityO2Scan.scan[0],
                        dashStyle: 'Dot'
                    }, {
                        color: '#DF5353',
                        width: 2,
                        value: waterQualityO2Scan.scan[1],
                        dashStyle: 'Dot'
                    }]
                },
                tooltip: {
                    valueSuffix: 'mg/L'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function(event) {
                                $scope.$apply(function() {
                                    $scope.waterQualityOptions.o2Option.series[0].data = [event.point.y];
                                });
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '溶解氧',
                data: []
            }],
            size: {
                width: 500,
                height: 250
            }
        },
        currentKmno4LineOption: {
            options: {
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],

                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/L'
                    },
                    max: 25,
                    plotLines: [{
                        color: '#DDDF0D',
                        width: 2,
                        value: waterQualityKmno4Scan.scan[0],
                        dashStyle: 'Dot'
                    }, {
                        color: '#DF5353',
                        width: 2,
                        value: waterQualityKmno4Scan.scan[1],
                        dashStyle: 'Dot'
                    }]
                },
                tooltip: {
                    valueSuffix: 'mg/L'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function(event) {
                                $scope.$apply(function() {
                                    $scope.waterQualityOptions.kmno4Option.series[0].data = [event.point.y];
                                });
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '高锰酸钾',
                data: []
            }],
            size: {
                width: 500,
                height: 250
            }
        },
        currentNh4nLineOption: {
            options: {
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],

                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/L'
                    },
                    max: 5,
                    plotLines: [{
                        color: '#DDDF0D',
                        width: 2,
                        value: waterQualityNh4nScan.scan[0],
                        dashStyle: 'Dot'
                    }, {
                        color: '#DF5353',
                        width: 2,
                        value: waterQualityNh4nScan.scan[1],
                        dashStyle: 'Dot'
                    }]
                },
                tooltip: {
                    valueSuffix: 'mg/L'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function(event) {
                                $scope.$apply(function() {
                                    $scope.waterQualityOptions.nh4nOption.series[0].data = [event.point.y];
                                });
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '氨氮',
                data: []
            }],
            size: {
                width: 500,
                height: 250
            }
        },
        currentPOption: {
            options: {
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],

                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/L'
                    },
                    max: 1,
                    plotLines: [{
                        color: '#DDDF0D',
                        width: 2,
                        value: waterQualityPScan.scan[0],
                        dashStyle: 'Dot'
                    }, {
                        color: '#DF5353',
                        width: 2,
                        value: waterQualityPScan.scan[1],
                        dashStyle: 'Dot'
                    }]
                },
                tooltip: {
                    valueSuffix: 'mg/L'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function(event) {
                                $scope.$apply(function() {
                                    $scope.waterQualityOptions.pOption.series[0].data = [event.point.y];
                                });
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '总磷',
                data: []
            }],
            size: {
                width: 500,
                height: 250
            }
        },
        currentTnLineOption: {
            options: {
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],

                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/L'
                    }
                },
                tooltip: {
                    valueSuffix: 'mg/L'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function(event) {
                                $scope.$apply(function() {
                                    $scope.waterQualityOptions.tnOption.series[0].data = [event.point.y];
                                });
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '总氮',
                data: []
            }],
            size: {
                width: 500,
                height: 250
            }
        }

    };

    //水情 highcharts options
    $scope.waterConditionOptions = {
        waterConditionCurrentOption: {
            options: {
                colors: ['#7CADDF', '#195489', '#1FC22B', '#FB9705', '#F26200'],
                chart: {
                    zoomType: 'xy',
                    margin: [50, 50, 100, 80]
                },
                title: {
                    text: '最近12小时水位',
                    x: -20 //center
                },
                yAxis: {
                    title: {
                        text: 'm'
                    },
                    plotLines: [{
                        value: waterConditionScan.upLevel,
                        width: 1,
                        color: '#DF5353',
                        dashStyle: 'Dot'
                    }]
                },
                tooltip: {
                    shared: true,
                    valueSuffix: 'm'
                },
                credits: {
                    enabled: false
                }
            },
            xAxis: {
                categories: [],
                tickmarkPlacement: 'on'

            },
            series: [{
                name: '闸上水位',
                data: []
            }, {
                name: '闸下水位',
                data: []
            }],
        }
    };

    //废水排放 highcharts options
    $scope.wasteWaterOptions = {
        wasteWaterCurrentOption: {
            options: {
                colors: ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'],
                chart: {
                    type: 'area',
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                tooltip: {

                },
                plotOptions: {

                },
                credits: {
                    enabled: false
                }
            },
            series: []
        }
    };


    //首页表格显示状态
    $scope.mapTableStatus = {
        waterQuality: true,
        waterCondition: false,
        wasteWater: false
    };


    /**
     * 函数区
     *
     */

    //水质量 http请求后处理过程（即http.success(function(data))中的function)
    var waterQualityCurrentSuccess = function(data) {

        if (data.data.length == 0) return null;

        waterQualityCurrentArr = [];
        waterQualityMarkerArr = [];

        var hourOne = data.data[0].hour;
        waterQualityCurrentTimeList = [];
        for (var i = 0; i < 6; i++) {
            if (hourOne >= 21) {
                waterQualityCurrentTimeList.push(parseInt(parseInt(hourOne) - 21) + '时');
                hourOne = parseInt(hourOne) - 20
            } else {
                waterQualityCurrentTimeList.push(parseInt(parseInt(hourOne) + 3) + '时');
                hourOne = parseInt(hourOne) + 4;
            }
        }
        //取每四小时的最大值
        for (var i = 0; i < data.data.length / 24; i++) {
            var index_o2List = [];
            var index_kmno4List = [];
            var index_nh4nList = [];
            var index_pList = [];
            for (var j = 0; j < 6; j++) {

                var index_o2Max4 = 0;
                var index_kmon4Max4 = 0;
                var index_nh4nMax4 = 0;
                var index_pMax4 = 0;
                for (var k = 0; k < 4; k++) {
                    if (parseFloat(data.data[i * 24 + j * 4 + k].o2) > index_o2Max4)
                        index_o2Max4 = parseFloat(data.data[i * 24 + j * 4 + k].o2);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].kmno4) > index_kmon4Max4)
                        index_kmon4Max4 = parseFloat(data.data[i * 24 + j * 4 + k].kmno4);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].nh4n) > index_nh4nMax4)
                        index_nh4nMax4 = parseFloat(data.data[i * 24 + j * 4 + k].nh4n);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].p) > index_pMax4)
                        index_pMax4 = parseFloat(data.data[i * 24 + j * 4 + k].p);
                }
                index_o2List.push(index_o2Max4);
                index_kmno4List.push(index_kmon4Max4);
                index_nh4nList.push(index_nh4nMax4);
                index_pList.push(index_pMax4);
            }
            waterQualityCurrentArr.push({
                monitor: data.data[i * 24].waterMonitor.name,
                point: data.data[i * 24].waterMonitor.description,
                abbr: data.data[i * 24].waterMonitor.abbr,
                index_o2List: index_o2List,
                index_kmno4List: index_kmno4List,
                index_nh4nList: index_nh4nList,
                index_pList: index_pList,
            });
        }
        for (var i = 0; i < waterQualityCurrentArr.length; i++) {
            var waterQualityTempOne = {
                o2: waterQualityCurrentArr[i].index_o2List[5],
                kmno4: waterQualityCurrentArr[i].index_kmno4List[5],
                nh4n: waterQualityCurrentArr[i].index_nh4nList[5],
                p: waterQualityCurrentArr[i].index_pList[5],
            };
            waterQualityMarkerArr.push({
                monitor: waterQualityCurrentArr[i].monitor,
                point: waterQualityCurrentArr[i].point,
                abbr: waterQualityCurrentArr[i].abbr,
                color: getStatusColor(getWaterQualityMonitorStatus(waterQualityTempOne)),
                index_o2: waterQualityTempOne.o2,
                index_kmno4: waterQualityTempOne.kmno4,
                index_nh4n: waterQualityTempOne.nh4n,
                index_p: waterQualityTempOne.p,
                monitor_status: getWaterQualityMonitorStatus(waterQualityTempOne)
            });
        }

        //水质量表格列表数据
        $scope.waterQualityMarkerList = waterQualityMarkerArr;

        //水质量模块整体状态初始化
        $scope.waterQualityStatus = getWaterQualityStatus(waterQualityMarkerArr);

        //Radio列表选择状态
        $scope.waterQualityCurrentList = waterQualityCurrentArr;
        $scope.waterQualityCurrentListSelected = waterQualityCurrentArr[0].monitor;

        //一句话初始化
        $scope.waterQualityOneSentence = {
            monitor: waterQualityCurrentArr[0].monitor,
            o2Status: getStatusDesc(waterQualityCurrentArr[0].index_o2List[5], waterQualityO2Scan.scan, '溶解氧'),
            kmno4Status: getStatusAsc(waterQualityCurrentArr[0].index_kmno4List[5], waterQualityKmno4Scan.scan, '高锰酸钾'),
            nh4nStatus: getStatusAsc(waterQualityCurrentArr[0].index_nh4nList[5], waterQualityNh4nScan.scan, '氨氮'),
            pStatus: getStatusAsc(waterQualityCurrentArr[0].index_pList[5], waterQualityPScan.scan, '总磷'),
        };

        $scope.waterQualityOptions.o2Option.series[0].data = [parseFloat(waterQualityCurrentArr[0].index_o2List.slice(0)[5])];
        $scope.waterQualityOptions.kmno4Option.series[0].data = [parseFloat(waterQualityCurrentArr[0].index_kmno4List.slice(0)[5])];
        $scope.waterQualityOptions.nh4nOption.series[0].data = [parseFloat(waterQualityCurrentArr[0].index_nh4nList.slice(0)[5])];
        $scope.waterQualityOptions.pOption.series[0].data = [parseFloat(waterQualityCurrentArr[0].index_pList.slice(0)[5])];


        $scope.waterQualityOptions.currentO2LineOption.options.xAxis.categories = waterQualityCurrentTimeList;
        $scope.waterQualityOptions.currentO2LineOption.series[0].data = formatDataArr(waterQualityCurrentArr[0].index_o2List.slice(0));
        $scope.waterQualityOptions.currentKmno4LineOption.options.xAxis.categories = waterQualityCurrentTimeList;
        $scope.waterQualityOptions.currentKmno4LineOption.series[0].data = formatDataArr(waterQualityCurrentArr[0].index_kmno4List.slice(0));
        $scope.waterQualityOptions.currentNh4nLineOption.options.xAxis.categories = waterQualityCurrentTimeList;
        $scope.waterQualityOptions.currentNh4nLineOption.series[0].data = formatDataArr(waterQualityCurrentArr[0].index_nh4nList.slice(0));
        $scope.waterQualityOptions.currentPOption.options.xAxis.categories = waterQualityCurrentTimeList;
        $scope.waterQualityOptions.currentPOption.series[0].data = formatDataArr(waterQualityCurrentArr[0].index_pList.slice(0));

    };

    //水质量 Button点击事件
    $scope.waterQualityBtn = function() {
        $scope.mapTableStatus = {
            waterQuality: true,
            waterCondition: false,
            wasteWater: false
        };
        removeMarker();
        addMarker(waterQualityMarkerArr, 'waterQuality');
        mapObj.setFitView();
    }

    //水质量 列表点击事件
    $scope.waterQualityCurrentChange = function(waterQualityOne) {
        $scope.waterQualityOneSentence = {
            monitor: waterQualityOne.monitor,
            o2Status: getStatusDesc(waterQualityOne.index_o2List[5], waterQualityO2Scan.scan, '溶解氧'),
            kmno4Status: getStatusAsc(waterQualityOne.index_kmno4List[5], waterQualityKmno4Scan.scan, '高锰酸钾'),
            nh4nStatus: getStatusAsc(waterQualityOne.index_nh4nList[5], waterQualityNh4nScan.scan, '氨氮'),
            pStatus: getStatusAsc(waterQualityOne.index_pList[5], waterQualityPScan.scan, '总磷'),
        };

        $scope.waterQualityOptions.o2Option.series[0].data = [parseFloat(waterQualityOne.index_o2List.slice(0)[5])];
        $scope.waterQualityOptions.kmno4Option.series[0].data = [parseFloat(waterQualityOne.index_kmno4List.slice(0)[5])];
        $scope.waterQualityOptions.nh4nOption.series[0].data = [parseFloat(waterQualityOne.index_nh4nList.slice(0)[5])];
        $scope.waterQualityOptions.pOption.series[0].data = [parseFloat(waterQualityOne.index_pList.slice(0)[5])];

        $scope.waterQualityOptions.currentO2LineOption.series[0].data = formatDataArr(waterQualityOne.index_o2List.slice(0));
        $scope.waterQualityOptions.currentKmno4LineOption.series[0].data = formatDataArr(waterQualityOne.index_kmno4List.slice(0));
        $scope.waterQualityOptions.currentNh4nLineOption.series[0].data = formatDataArr(waterQualityOne.index_nh4nList.slice(0));
        $scope.waterQualityOptions.currentPOption.series[0].data = formatDataArr(waterQualityOne.index_pList.slice(0));
    };

    //水质量 模块整体状态获取
    function getWaterQualityStatus(waterQualityMarker) {
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }

        for (var i = 0; i < waterQualityMarker.length; i++) {
            if (waterQualityMarker[i].monitor_status == 'caution') countResult.caution += 1;
            else if (waterQualityMarker[i].monitor_status == 'take_action') countResult.take_action += 1;
            else if (waterQualityMarker[i].monitor_status == 'accept') countResult.accept += 1;
            else countResult.invalid += 1;
        }

        //侧边栏，关键数初始化
        $scope.waterQualityQualified = countResult.accept + '/' + waterQualityMarker.length;

        if (countResult.take_action >= 1)
            return {
                status: 'take_action',
                sentence: '存在' + countResult.take_action + '个监测点水质有问题'
            };
        else if (countResult.caution >= 1) return {
            status: 'caution',
            sentence: '存在' + countResult.caution + '个监测点水质有轻微问题'
        };
        else if (countResult.accept == waterQualityMarker.length) return {
            status: 'accept',
            sentence: '所有监测点水质均正常'
        };
        else return {
            status: 'invalid',
            sentence: '存在' + countResult.invalid + '个监测点数据未更新'
        };
    };

    //水质量 监测站状态获取
    function getWaterQualityMonitorStatus(waterQualityMarkerOne) {
        var indexStatusList = {
            o2Status: getStatusDesc(waterQualityMarkerOne.o2, waterQualityO2Scan.scan, '溶解氧').status,
            kmno4Status: getStatusAsc(waterQualityMarkerOne.kmno4, waterQualityKmno4Scan.scan, '高锰酸钾').status,
            nh4nStatus: getStatusAsc(waterQualityMarkerOne.nh4n, waterQualityNh4nScan.scan, '氨氮').status,
            pStatus: getStatusAsc(waterQualityMarkerOne.p, waterQualityPScan.scan, '总磷').status,
        };

        var statusList = [];
        angular.forEach(indexStatusList, function(value, key) {
            this.push(value);
        }, statusList);
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }
        for (var i = 0; i < statusList.length; i++) {
            if (statusList[i] == 'accept') countResult.accept += 1;
            else if (statusList[i] == 'caution') countResult.caution += 1;
            else if (statusList[i] == 'take_action') countResult.take_action += 1;
            else if (statusList[i] == 'invalid') countResult.invalid += 1;
        }
        if (countResult.take_action >= 1) return 'take_action';
        else if (countResult.caution >= 1) return 'caution';
        else if (countResult.accept == statusList.length) return 'accept';
        else return 'invalid';
    };

    //水情 http请求后处理过程（即http.success(function(data))中的function)
    var waterConditionCurrentSuccess = function(data) {

        if (data.data.length == 0) return null;
        waterConditionCurrentArr = [];
        waterConditionMarkerArr = [];
        waterConditionCurrentTimeList = [];
        var hourOne = data.data[0].hour
        for (var i = 0; i < 12; i++) {
            waterConditionCurrentTimeList.push(hourOne + '时');
            hourOne++
            if (hourOne == 24) hourOne = 0;
        }
        for (var i = 0; i < data.data.length / 12; i++) {
            var index_levelUpList = [];
            var index_levelDownList = [];
            for (var j = 0; j < 12; j++) {
                index_levelUpList.push(parseFloat(data.data[i * 12 + j].waterLevelUp));
                index_levelDownList.push(parseFloat(data.data[i * 12 + j].waterLevelDown));
            }
            waterConditionCurrentArr.push({
                monitor: data.data[i * 12].waterMonitor.name,
                index_levelUp: index_levelUpList,
                index_levelDown: index_levelDownList
            });
            waterConditionMarkerArr.push({
                abbr: data.data[i * 12].waterMonitor.abbr,
                monitor: data.data[i * 12].waterMonitor.name,
                point: data.data[i * 12].waterMonitor.description,
                color: getStatusColor(getWaterConditionMonitorStatus(data.data[i * 12 + 11])),
                index_levelUp: index_levelUpList[11],
                index_levelDown: index_levelDownList[11],
                monitor_status: getWaterConditionMonitorStatus(data.data[i * 12 + 11])
            });
        }

        //水情表格列表数据
        $scope.waterConditionMarkerList = waterConditionMarkerArr;

        //水情模块整体状态初始化
        $scope.waterConditionStatus = getWaterConditionStatus(waterConditionMarkerArr);

        //Radio列表选择状态
        $scope.waterConditionCurrentList = waterConditionCurrentArr;
        $scope.waterConditionCurrentListSelected = waterConditionCurrentArr[0].monitor;

        //一句话初始化
        $scope.waterConditionOneSentence = {
            monitor: waterConditionCurrentArr[0].monitor,
            flowStatus: WaterConditionStatusUpLevel(waterConditionCurrentArr[0].index_levelUp[5]),
            levelStatus: WaterConditionStatusDownLevel(waterConditionCurrentArr[0].index_levelDown[5]),
        };

        $scope.waterConditionOptions.waterConditionCurrentOption.xAxis.categories = waterConditionCurrentTimeList;
        $scope.waterConditionOptions.waterConditionCurrentOption.series[0].data = waterConditionCurrentArr[0].index_levelUp;
        $scope.waterConditionOptions.waterConditionCurrentOption.series[1].data = waterConditionCurrentArr[0].index_levelDown;

    };

    //水情 Button点击事件
    $scope.waterConditionBtn = function() {
        $scope.mapTableStatus = {
            waterQuality: false,
            waterCondition: true,
            wasteWater: false
        };
        removeMarker();
        addMarker(waterConditionMarkerArr, 'waterCondition');
        mapObj.setFitView();
    };

    //水情 列表点击事件
    $scope.waterConditionCurrentChange = function(waterConditionOne) {

        $scope.waterConditionOneSentence = {
            monitor: waterConditionOne.monitor,
            flowStatus: WaterConditionStatusUpLevel(waterConditionOne.index_levelUp[5]),
            levelStatus: WaterConditionStatusDownLevel(waterConditionOne.index_levelDown[5]),
        };

        $scope.waterConditionOptions.waterConditionCurrentOption.series[0].data = waterConditionOne.index_levelUp;
        $scope.waterConditionOptions.waterConditionCurrentOption.series[1].data = waterConditionOne.index_levelDown;
    };

    //水情 模块整体状态获取
    function getWaterConditionStatus(waterConditionMarker) {
        var countResult = {
            accept: 0,
            caution: 0,
            invalid: 0
        }
        for (var i = 0; i < waterConditionMarker.length; i++) {
            if (waterConditionMarker[i].monitor_status == 'caution') countResult.caution += 1;
            else if (waterConditionMarker[i].monitor_status == 'accept') countResult.accept += 1;
            else countResult.invalid += 1;
        }

        $scope.waterConditionQualified = countResult.accept + '/' + waterConditionMarker.length;

        if (countResult.caution >= 1)
            return {
                status: 'caution',
                sentence: '存在' + countResult.caution + '个监测点水情有轻微问题'
            };
        else if (countResult.accept == waterConditionMarker.length) return {
            status: 'accept',
            sentence: '所有监测点水情均正常'
        };
        else return {
            status: 'invalid',
            sentence: '存在' + countResult.invalid + '监测点数据未更新'
        };
    };

    //水情 监测站状态获取
    function getWaterConditionMonitorStatus(waterConditionMarkerOne) {
        var indexStatusList = {
            index_levelUp: WaterConditionStatusUpLevel(waterConditionMarkerOne.waterLevelUp).status,
            index_levelDown: WaterConditionStatusDownLevel(waterConditionMarkerOne.waterLevelDown).status,
        };
        var statusList = [];
        angular.forEach(indexStatusList, function(value, key) {
            this.push(value);
        }, statusList);
        var countResult = {
            accept: 0,
            caution: 0,
            invalid: 0
        }
        for (var i = 0; i < statusList.length; i++) {
            if (statusList[i] == 'caution') countResult.caution += 1;
            else if (statusList[i] == 'accept') countResult.accept += 1;
            else countResult.invalid += 1;
        }
        if (countResult.caution >= 1) return 'caution';
        else if (countResult.accept == statusList.length) return 'accept';
        else return 'invalid';
    }

    //水情 指标状态获取
    function WaterConditionStatusUpLevel(data) {
        if (data <= waterConditionScan.upLevel) {
            return {
                status: "accept",
                sentence: "闸上水位小于警戒值，正常"
            }
        } else {
            return {
                status: "caution",
                sentence: "闸上水位大于警戒值，异常"
            }
        }
    };

    function WaterConditionStatusDownLevel(data) {
        if (data <= waterConditionScan.downLevel) {
            return {
                status: "accept",
                sentence: "闸下水位小于警戒水位，正常"
            }
        } else {
            return {
                status: "caution",
                sentence: "闸下水位大于警戒水位，异常"
            }
        }
    };

    //废水排放 http请求后处理过程（即http.success(function(data))中的function)
    var wasteWaterCurrentSuccess = function(data) {
        if (data.data.length == 0) return null;
        wasteWaterCurrentArr = wasteWaterCurrentFilter(data);
        var wasteWaterMarkerTemp = [];
        var lengthTemp = 0;
        if (wasteWaterCurrentArr.length >= 6) {
            lengthTemp = wasteWaterCurrentArr.length - 1;
        } else if (wasteWaterCurrentArr.length < 6) {
            lengthTemp = wasteWaterCurrentArr.length;
        }
        for (var i = 0; i < lengthTemp; i++) {
            wasteWaterMarkerTemp.push({
                monitor: wasteWaterCurrentArr[i].wasteSource,
                point: wasteWaterCurrentArr[i].point,
                color: getStatusColor(getWasteWaterMonitorStatus(wasteWaterCurrentArr[i])),
                monitor_status: getWasteWaterMonitorStatus(wasteWaterCurrentArr[i]),
                index_discharge: wasteWaterCurrentArr[i].index_discharge.slice(4),
                index_cod: wasteWaterCurrentArr[i].index_cod[5],
                index_nh4n: wasteWaterCurrentArr[i].index_nh4n[5],
                index_p: wasteWaterCurrentArr[i].index_p[5]
            });
        }
        wasteWaterMarkerArr = wasteWaterMarkerTemp;

        var wasteWaterMarkerAllTemp = [];
        wasteWaterMarkerCurrentAllArr = wasteWaterCurrentAllGet(data);
        for (var i = 0; i < wasteWaterMarkerCurrentAllArr.length; i++) {
            wasteWaterMarkerAllTemp.push({
                monitor: wasteWaterMarkerCurrentAllArr[i].wasteSource,
                point: wasteWaterMarkerCurrentAllArr[i].point,
                abbr: wasteWaterMarkerCurrentAllArr[i].abbr,
                color: getStatusColor(getWasteWaterMonitorStatus(wasteWaterMarkerCurrentAllArr[i])),
                monitor_status: getWasteWaterMonitorStatus(wasteWaterMarkerCurrentAllArr[i]),
                index_discharge: wasteWaterMarkerCurrentAllArr[i].index_discharge.slice(4),
                index_cod: wasteWaterMarkerCurrentAllArr[i].index_cod[5],
                index_nh4n: wasteWaterMarkerCurrentAllArr[i].index_nh4n[5],
                index_p: wasteWaterMarkerCurrentAllArr[i].index_p[5]
            });
        }

        wasteWaterMarkerArrAll = wasteWaterMarkerAllTemp;

        //废水排放表格列表数据
        $scope.wasteWaterMarkerList = wasteWaterMarkerArrAll;

        //废水排放模块整体状态初始化
        $scope.wasteWaterStatus = getWasteWaterStatus(wasteWaterMarkerArrAll);

        //Radio列表选择状态
        $scope.wasteWaterCurrentList = ['废水排放量', 'COD浓度', '氨氮浓度', '总磷浓度'];
        $scope.wasteWaterCurrentListSelected = '废水排放量';

        //一句话初始化
        $scope.wasteWaterOneSentence = {
            index: '废水排放量',
            countResult: null
        };



        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.chart.type = 'area';
        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.title.text = '废水排放总量';
        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.xAxis = {
            categories: wasteWaterCurrentTimeList,
            tickmarkPlacement: 'on'
        };
        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.yAxis = {
            title: {
                text: '吨'
            },
            plotLines: []
        };
        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.tooltip = {
            shared: true,
            valueSuffix: ' 吨'
        };
        $scope.wasteWaterOptions.wasteWaterCurrentOption.options.plotOptions = {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666',
                    symbol: "circle"
                }
            }
        };
        var wasteWaterSeriesTemp = [];

        for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
            wasteWaterSeriesTemp.push({
                name: wasteWaterCurrentArr[i].wasteSource,
                data: wasteWaterCurrentArr[i].index_discharge
            });
        }
        $scope.wasteWaterOptions.wasteWaterCurrentOption.series = wasteWaterSeriesTemp;
    };

    //废水排放抽出所有污染源最近一天的数据
    function wasteWaterCurrentAllGet(data) {
        var wasteWaterTemp = [];
        for (var i = 0; i < data.data.length / 6; i++) {
            var index_dischargeList = [];
            var index_codList = [];
            var index_nh4nList = [];
            var index_pList = [];
            for (var j = 0; j < 6; j++) {
                index_dischargeList.push(parseFloat(data.data[i * 6 + j].discharge));
                index_codList.push(parseFloat(data.data[i * 6 + j].cod));
                index_nh4nList.push(parseFloat(data.data[i * 6 + j].nh4n));
                index_pList.push(parseFloat(data.data[i * 6 + j].p));
            }

            wasteWaterTemp.push({
                wasteSource: data.data[i * 6].waterPollutionSource.name,
                point: data.data[i * 6].waterPollutionSource.description,
                abbr: data.data[i * 6].waterPollutionSource.abbr,
                index_discharge: index_dischargeList,
                index_cod: index_codList,
                index_nh4n: index_nh4nList,
                index_p: index_pList
            });
        }

        function sortWaterPollution(a, b) {
            return b.index_discharge[5] - a.index_discharge[5];
        }
        wasteWaterTemp.sort(sortWaterPollution);
        return wasteWaterTemp;
    }

    //废水排放抽出前五的数据和其他数据平均值或总和
    function wasteWaterCurrentFilter(data) {
        var wasteWaterTemp = [];
        var wasteWaterCurrentArrTemp = [];
        for (var i = 0; i < data.data.length / 6; i++) {
            var index_dischargeList = [];
            var index_codList = [];
            var index_nh4nList = [];
            var index_pList = [];
            for (var j = 0; j < 6; j++) {
                index_dischargeList.push(parseFloat(parseFloat(data.data[i * 6 + j].discharge).toFixed(2)));
                index_codList.push(parseFloat(data.data[i * 6 + j].cod));
                index_nh4nList.push(parseFloat(data.data[i * 6 + j].nh4n));
                index_pList.push(parseFloat(data.data[i * 6 + j].p));
            }

            wasteWaterTemp.push({
                wasteSource: data.data[i * 6].waterPollutionSource.name,
                point: data.data[i * 6].waterPollutionSource.description,
                abbr: data.data[i * 6].waterPollutionSource.abbr,
                index_discharge: index_dischargeList,
                index_cod: index_codList,
                index_nh4n: index_nh4nList,
                index_p: index_pList
            });
        }

        wasteWaterCurrentTimeList = [];
        for (var k = 0; k < 6; k++) {
            wasteWaterCurrentTimeList.push(data.data[k].month + '月' + data.data[k].day + '日');
        }

        function sortWaterPollution(a, b) {
            return b.index_discharge[5] - a.index_discharge[5];
        }
        wasteWaterTemp.sort(sortWaterPollution);

        function averageCal(dischargeList, indexList) {
            var resultList = []
            for (var i = 0; i < dischargeList.length; i++) {
                var temp = indexList[i] / dischargeList[i];
                resultList[i] = parseFloat(temp.toFixed(2));
            }
            return resultList;
        }

        if (wasteWaterTemp.length <= 5) {
            wasteWaterCurrentArrTemp = wasteWaterTemp;
        } else {
            for (var i = 0; i < 5; i++) {
                wasteWaterCurrentArrTemp.push(wasteWaterTemp[i]);
            }
            var dischargeOtherSum = [0, 0, 0, 0, 0, 0];
            var codOtherSum = [0, 0, 0, 0, 0, 0];
            var nh4nOtherSum = [0, 0, 0, 0, 0, 0];
            var pOtherSum = [0, 0, 0, 0, 0, 0];

            for (var i = 0; i < 6; i++) {
                for (var j = 5; j < wasteWaterTemp.length; j++) {
                    dischargeOtherSum[i] += parseFloat(wasteWaterTemp[j].index_discharge[i].toFixed(2));
                    codOtherSum[i] += (wasteWaterTemp[j].index_cod[i] * wasteWaterTemp[j].index_discharge[i]);
                    nh4nOtherSum[i] += (wasteWaterTemp[j].index_nh4n[i] * wasteWaterTemp[j].index_discharge[i]);
                    pOtherSum[i] += (wasteWaterTemp[j].index_p[i] * wasteWaterTemp[j].index_discharge[i]);
                }
                dischargeOtherSum[i] = parseFloat(dischargeOtherSum[i].toFixed(2));
                codOtherSum[i] = parseFloat(codOtherSum[i].toFixed(2));
                nh4nOtherSum[i] = parseFloat(nh4nOtherSum[i].toFixed(2));
                pOtherSum[i] = parseFloat(pOtherSum[i].toFixed(2));
            }

            wasteWaterCurrentArrTemp.push({
                wasteSource: '其他污染源',
                index_discharge: dischargeOtherSum,
                index_cod: averageCal(dischargeOtherSum, codOtherSum),
                index_nh4n: averageCal(dischargeOtherSum, nh4nOtherSum),
                index_p: averageCal(dischargeOtherSum, pOtherSum)
            })
        }
        return wasteWaterCurrentArrTemp;
    }

    //废水排放 Button点击事件
    $scope.wasteWaterBtn = function() {
        $scope.mapTableStatus = {
            waterQuality: false,
            waterCondition: false,
            wasteWater: true
        };
        removeMarker();
        addMarker(wasteWaterMarkerArrAll, 'waterPollution');
        mapObj.setFitView();
    };

    //废水排放 列表点击事件
    $scope.wasteWaterDischargeOneSentenceStatus = true;
    $scope.wasteWaterCurrentChange = function(wasteWaterOne) {
        var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
        if (wasteWaterOne == '废水排放量') {
            $scope.wasteWaterOneSentence = {
                index: '废水排放量',
                countResult: null
            };
            $scope.wasteWaterDischargeOneSentenceStatus = true;
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.chart.type = 'area';
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.title.text = '废水排放总量';
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.xAxis = {
                categories: wasteWaterCurrentTimeList,
                tickmarkPlacement: 'on'
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.yAxis = {
                title: {
                    text: '吨'
                },
                plotLines: []
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.tooltip = {
                shared: true,
                valueSuffix: ' 吨'
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.plotOptions = {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666',
                        symbol: "circle"
                    }
                }
            };
            var wasteWaterSeriesTemp = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                wasteWaterSeriesTemp.push({
                    name: wasteWaterCurrentArr[i].wasteSource,
                    data: wasteWaterCurrentArr[i].index_discharge
                });
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.series = wasteWaterSeriesTemp;
        } else if (wasteWaterOne == 'COD浓度') {
            $scope.wasteWaterOneSentence = {
                index: 'COD浓度',
                countResult: wasteWaterOneSentenceProcess('COD浓度', wasteWaterMarkerArr)
            };
            $scope.wasteWaterDischargeOneSentenceStatus = false;

            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.chart.type = 'column';
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.title.text = 'COD排放浓度';
            var factoryList = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                factoryList.push(wasteWaterCurrentArr[i].wasteSource);
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.xAxis = {
                categories: factoryList,
                tickmarkPlacement: 'on',
                labels: {
                    rotation: -30
                }
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.yAxis = {
                title: {
                    text: 'mg/L'
                },
                plotLines: [{
                    color: '#DF5353',
                    width: 2,
                    value: waterPollutionCodScan.scan[0],
                    dashStyle: 'Dot'
                }]
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.tooltip = {
                shared: true,
                valueSuffix: ' mg/L'
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.plotOptions = {
                column: {
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                        enabled: true
                    },
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            };
            var wasteWaterSeriesTemp = [];
            var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                wasteWaterSeriesTemp.push({
                    y: parseFloat(wasteWaterCurrentArr[i].index_cod[wasteWaterCurrentArr[i].index_cod.length - 1].toFixed(2)),
                    color: getTargetColor(wasteWaterCurrentArr[i].index_cod[wasteWaterCurrentArr[i].index_cod.length - 1], waterPollutionCodScan.scan)
                });
            }

            $scope.wasteWaterOptions.wasteWaterCurrentOption.series = [{
                name: 'cod排放浓度',
                data: wasteWaterSeriesTemp
            }];
        } else if (wasteWaterOne == '氨氮浓度') {
            $scope.wasteWaterOneSentence = {
                index: '氨氮浓度',
                countResult: wasteWaterOneSentenceProcess('氨氮浓度', wasteWaterMarkerArr)
            };
            $scope.wasteWaterDischargeOneSentenceStatus = false;

            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.chart.type = 'column';
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.title.text = '氨氮排放浓度';
            var factoryList = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                factoryList.push(wasteWaterCurrentArr[i].wasteSource);
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.xAxis = {
                categories: factoryList,
                tickmarkPlacement: 'on',
                labels: {
                    rotation: -30
                }
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.yAxis = {
                title: {
                    text: 'mg/L'
                },
                plotLines: [{
                    color: '#DF5353',
                    width: 2,
                    value: waterPollutionNh4nScan.scan[0],
                    dashStyle: 'Dot'
                }]
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.tooltip = {
                shared: true,
                valueSuffix: ' mg/L'
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.plotOptions = {
                column: {
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                        enabled: true
                    },
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            };
            var wasteWaterSeriesTemp = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                wasteWaterSeriesTemp.push({
                    y: parseFloat(wasteWaterCurrentArr[i].index_nh4n[wasteWaterCurrentArr[i].index_nh4n.length - 1].toFixed(2)),
                    color: getTargetColor(wasteWaterCurrentArr[i].index_nh4n[wasteWaterCurrentArr[i].index_nh4n.length - 1], waterPollutionNh4nScan.scan)
                });
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.series = [{
                name: '氨氮排放浓度',
                data: wasteWaterSeriesTemp
            }];
        } else if (wasteWaterOne == '总磷浓度') {
            $scope.wasteWaterOneSentence = {
                index: '总磷浓度',
                countResult: wasteWaterOneSentenceProcess('总磷浓度', wasteWaterMarkerArr)
            };
            $scope.wasteWaterDischargeOneSentenceStatus = false;

            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.chart.type = 'column';
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.title.text = '磷排放浓度';
            var factoryList = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                factoryList.push(wasteWaterCurrentArr[i].wasteSource);
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.xAxis = {
                categories: factoryList,
                tickmarkPlacement: 'on',
                labels: {
                    rotation: -30
                }
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.yAxis = {
                title: {
                    text: 'mg/L'
                },
                plotLines: [{
                    color: '#DF5353',
                    width: 2,
                    value: waterPollutionPScan.scan[0],
                    dashStyle: 'Dot'
                }]
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.tooltip = {
                shared: true,
                valueSuffix: ' mg/L'
            };
            $scope.wasteWaterOptions.wasteWaterCurrentOption.options.plotOptions = {
                column: {
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                        enabled: true
                    },
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            };
            var wasteWaterSeriesTemp = [];
            for (var i = 0; i < wasteWaterCurrentArr.length; i++) {
                wasteWaterSeriesTemp.push({
                    y: parseFloat(wasteWaterCurrentArr[i].index_p[wasteWaterCurrentArr[i].index_p.length - 1].toFixed(2)),
                    color: getTargetColor(wasteWaterCurrentArr[i].index_p[wasteWaterCurrentArr[i].index_p.length - 1], waterPollutionPScan.scan)
                });
            }
            $scope.wasteWaterOptions.wasteWaterCurrentOption.series = [{
                name: '磷排放浓度',
                data: wasteWaterSeriesTemp
            }];
        }
    };

    //废水排放 模块整体状态获取
    function getWasteWaterStatus(wasteWaterMarkerArr) {
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }

        for (var i = 0; i < wasteWaterMarkerArr.length; i++) {
            if (wasteWaterMarkerArr[i].monitor_status == 'caution') countResult.caution += 1;
            else if (wasteWaterMarkerArr[i].monitor_status == 'take_action') countResult.take_action += 1;
            else if (wasteWaterMarkerArr[i].monitor_status == 'accept') countResult.accept += 1;
            else countResult.invalid += 1;
        }

        //侧边栏，关键数初始化
        $scope.waterPollutionQualified = countResult.accept + '/' + wasteWaterMarkerArr.length;

        if (countResult.take_action >= 1) return {
            status: 'take_action',
            sentence: '存在' + countResult.take_action + '个监测点废水排放有问题'
        };
        else if (countResult.caution >= 1) return {
            status: 'caution',
            sentence: '存在' + countResult.caution + '个监测点废水排放有轻微问题'
        };
        else if (countResult.accept == wasteWaterMarkerArr.length) return {
            status: 'accept',
            sentence: '所有监测点废水排放均正常'
        };
        else return {
            status: 'invalid',
            sentence: '存在' + countResult.invalid + '个监测点数据未更新'
        };
    };

    //废水排放 监测点状态获取
    function getWasteWaterMonitorStatus(wasteWaterMarkerArrOne) {
        var indexStatusList = {
            index_cod: getStatusAsc(wasteWaterMarkerArrOne.index_cod[5], waterPollutionCodScan.scan, 'COD浓度').status,
            index_nh4n: getStatusAsc(wasteWaterMarkerArrOne.index_nh4n[5], waterPollutionNh4nScan.scan, '氨氮浓度').status,
            index_p: getStatusAsc(wasteWaterMarkerArrOne.index_p[5], waterPollutionPScan.scan, '总磷浓度').status,
        };
        var statusList = [];
        angular.forEach(indexStatusList, function(value, key) {
            this.push(value);
        }, statusList);
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }
        for (var i = 0; i < statusList.length; i++) {
            if (statusList[i] == 'accept') countResult.accept += 1;
            else if (statusList[i] == 'caution') countResult.caution += 1;
            else if (statusList[i] == 'take_action') countResult.take_action += 1;
            else if (statusList[i] == 'invalid') countResult.invalid += 1;
        }
        if (countResult.take_action >= 1) return 'take_action';
        else if (countResult.caution >= 1) return 'caution';
        else if (countResult.accept == statusList.length) return 'accept';
        else return 'invalid';
    };

    //废水排放一句话处理
    function wasteWaterOneSentenceProcess(indexOne, wasteWaterMarkerArr) {
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        };
        if (indexOne == '废水排放量') {

        } else if (indexOne == 'COD浓度') {
            var statusTemp = [];
            for (var i = 0; i < wasteWaterMarkerArr.length; i++) {
                statusTemp.push(getStatusAsc(wasteWaterMarkerArr[i].index_cod, waterPollutionCodScan.scan, 'COD浓度'));
            }
            for (var i = 0; i < statusTemp.length; i++) {
                if (statusTemp[i].status == 'caution') countResult.caution += 1;
                else if (statusTemp[i].status == 'accept') countResult.accept += 1;
                else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
                else countResult.invalid += 1;
            }
        } else if (indexOne == '氨氮浓度') {
            var statusTemp = [];
            for (var i = 0; i < wasteWaterMarkerArr.length; i++) {
                statusTemp.push(getStatusAsc(wasteWaterMarkerArr[i].index_nh4n, waterPollutionNh4nScan.scan, '氨氮浓度'));
            }
            for (var i = 0; i < statusTemp.length; i++) {
                if (statusTemp[i].status == 'caution') countResult.caution += 1;
                else if (statusTemp[i].status == 'accept') countResult.accept += 1;
                else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
                else countResult.invalid += 1;
            }
        } else if (indexOne == '总磷浓度') {
            var statusTemp = [];
            for (var i = 0; i < wasteWaterMarkerArr.length; i++) {
                statusTemp.push(getStatusAsc(wasteWaterMarkerArr[i].index_p, waterPollutionPScan.scan, '总磷浓度'));
            }
            for (var i = 0; i < statusTemp.length; i++) {
                if (statusTemp[i].status == 'caution') countResult.caution += 1;
                else if (statusTemp[i].status == 'accept') countResult.accept += 1;
                else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
                else countResult.invalid += 1;
            }
        }
        return countResult;
    };

    //button状态改变标签
    $scope.getButtonStatus = function(status) {
        if (status == 'accept')
            return "btn-success";
        else if (status == 'caution')
            return "btn-warning";
        else if (status == 'take_action')
            return "btn-danger"
        else if (status == 'invalid')
            return "";
    };

    //一句话状态改变标签
    $scope.getOneSentenceStatus = function(status) {
        if (status == 'accept')
            return "glyphicon-ok-sign";
        else if (status == 'caution')
            return "glyphicon-exclamation-sign";
        else if (status == 'take_action')
            return "glyphicon-remove-sign";
        else if (status == 'invalid')
            return "glyphicon-info-sign";
    };

    //获取颜色
    function getStatusColor(status) {
        if (status == 'accept') return '#66CC66';
        else if (status == 'caution') return '#FFCC00';
        else if (status == 'take_action') return '#CC0033';
        else return '#AAAAAA';
    };

    //高德地图初始化
    function mapInit() {
        mapObj = new AMap.Map("map_canvas", { //二维地图显示视口
            view: new AMap.View2D({
                center: new AMap.LngLat(121.106661, 31.579533), //地图中心点
                zoom: 11 //地图显示的缩放级别
            })
        });
    };

    //高德地图加点
    function addMarker(markerArr, type) {
        for (var i = 0; i < markerArr.length; i++) {
            var p0 = markerArr[i].point.split("|")[0];
            var p1 = markerArr[i].point.split("|")[1];
            //自定义点标记内容
            var markerContent = document.createElement("div");
            markerContent.className = "markerContentStyle";
            markerContent.style.color = markerArr[i].color;

            //点标记中的图标
            var markerImg = document.createElement("img");
            markerImg.src = "http://webapi.amap.com/images/marker_sprite.png";
            markerContent.appendChild(markerImg);

            //点标记中的文本
            var markerSpan = document.createElement("span");
            markerSpan.innerHTML = markerArr[i].abbr;
            markerSpan.style.borderRadius = "7px";
            markerSpan.style.borderWidth = 1;
            markerSpan.style.padding = "4px";
            markerContent.appendChild(markerSpan);
            marker = new AMap.Marker({
                content: markerContent,
                topWhenClick: true,
                topWhenMouseOver: true,
                position: new AMap.LngLat(p0, p1)
            });

            (function(markerTemp) {
                //构建信息窗体中显示的内容
                var info = [];
                info.push("<div><b>" + markerArr[i].monitor + "</b>");
                if (type == 'waterQuality') {
                    info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                    info.push("<tr><td>溶解氧</td><td><span class=\"label " + getLabelCss(getStatusDesc(markerArr[i].index_o2, waterQualityO2Scan.scan, '溶解氧').status) + "\">" + markerArr[i].index_o2 + "mg/L</span></td></tr>");
                    info.push("<tr><td>高锰酸钾浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_kmno4, waterQualityKmno4Scan.scan, '高锰酸钾').status) + "\">" + markerArr[i].index_kmno4 + "mg/L</span></td></tr>");
                    info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_nh4n, waterQualityNh4nScan.scan, '氨氮').status) + "\">" + markerArr[i].index_nh4n + "mg/L</span></td></tr>");
                    info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_p, waterQualityPScan.scan, '总磷').status) + "\">" + markerArr[i].index_p + "mg/L</span></td></tr>");
                    info.push("<tr><td>监测站状态</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + getChineseStatus(markerArr[i].monitor_status) + "</span></td></tr>");
                    info.push("</table></div></div>");

                } else if (type == 'waterCondition') {
                    info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                    info.push("<tr><td>闸上水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusUpLevel(markerArr[i].index_levelUp).status) + "\">" + markerArr[i].index_levelUp + "m</span></td></tr>");
                    info.push("<tr><td>闸下水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusDownLevel(markerArr[i].index_levelDown).status) + "\">" + markerArr[i].index_levelDown + "m</span></td></tr>");
                    info.push("<tr><td>监测站状态</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + getChineseStatus(markerArr[i].monitor_status) + "</span></td></tr>");
                    info.push("</table></div></div>");

                } else if (type == 'waterPollution') {
                    info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                    info.push("<tr><td>排放量</td><td>" + (markerArr[i].index_discharge[1]).toFixed(2) + "吨</td></tr>");
                    info.push("<tr><td>COD浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_cod, waterPollutionCodScan.scan, 'COD浓度').status) + "\">" + (markerArr[i].index_cod).toFixed(2) + "mg/L</span></td></tr>");
                    info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_nh4n, waterPollutionNh4nScan.scan, '氨氮浓度').status) + "\">" + (markerArr[i].index_nh4n).toFixed(2) + "mg/L</span></td></tr>");
                    info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_p, waterPollutionPScan.scan, '总磷浓度').status) + "\">" + (markerArr[i].index_p).toFixed(2) + "mg/L</span></td></tr>");
                    info.push("<tr><td>监测站状态</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + getChineseStatus(markerArr[i].monitor_status) + "</span></td></tr>");
                    info.push("</table></div></div>");
                }

                var infoWindow = new AMap.InfoWindow({
                    content: info.join(""), //使用默认信息窗体框样式，显示信息内容
                    offset: new AMap.Pixel(16, -45)
                });
                AMap.event.addListener(markerTemp, 'click', function() { //鼠标点击marker弹出自定义的信息窗体
                    infoWindow.open(mapObj, markerTemp.getPosition());
                });
            })(marker);
            marker.setMap(mapObj); //在地图上添加点
        }
    };

    //高德地图去点
    function removeMarker() {
        mapObj.clearMap();
    };

    //根据是否达到目标值获取颜色
    function getTargetColor(num, scan) {
        if (num <= scan[1])
            return '#0787C8'
        else
            return '#CC0000'
    }

    //获取标签颜色
    function getLabelCss(status) {
        if (status == 'accept') {
            return 'label-success';
        } else if (status == 'caution') {
            return 'label-warning';
        } else if (status == 'take_action') {
            return 'label-danger';
        } else {
            return 'label-default';
        }

    }

    //数据为0的转化为null
    function formatDataArr(data) {
        var result = data;
        for (var i = 0; i < result.length; i++) {
            if (result[i] == 0)
                result[i] = null;
        }
        return result;
    }


    //数值越大，越严重
    function getStatusAsc(data1, scan, indexName) {
            var data = parseFloat(data1);
            if (data <= scan[0] && data > 0) {
                return {
                    status: 'accept',
                    sentence: indexName + '≤' + scan[0] + ',正常'
                }
            } else if (data > scan[0] && data <= scan[1]) {
                return {
                    status: 'caution',
                    sentence: scan[0] + '≤' + indexName + '≤' + scan[1] + ',轻微问题'
                }
            } else if (data > scan[1]) {
                return {
                    status: 'take_action',
                    sentence: indexName + '>' + scan[1] + ',问题'
                }
            } else if (data == 0) {
                return {
                    status: 'invalid',
                    sentence: indexName + ': 无数据'
                }
            }
        }
        //数值越小，越严重
    function getStatusDesc(data1, scan, indexName) {
        var data = parseFloat(data1);
        if (data >= scan[0]) {
            return {
                status: 'accept',
                sentence: indexName + '≥' + scan[0] + ',正常'
            }
        } else if (data < scan[0] && data >= scan[1]) {
            return {
                status: 'caution',
                sentence: scan[1] + '≤' + indexName + '≤' + scan[0] + ',轻微问题'
            }
        } else if (data < scan[1] && data > 0) {
            return {
                status: 'take_action',
                sentence: indexName + '<' + scan[1] + ',问题'
            }
        } else if (data == 0) {
            return {
                status: 'invalid',
                sentence: indexName + ': 无数据'
            }
        }
    }

    //得到中文状态名称
    function getChineseStatus(status) {
        if (status == 'accept') {
            return '正常';
        } else if (status == 'caution') {
            return '轻微问题';
        } else if (status == 'take_action') {
            return '问题';
        } else {
            return '无数据';
        }
    }


    var getCurrentDate = function(databaseDate) {
        var year = moment(dateService.get_system_time()).get('year');
        var month = moment(dateService.get_system_time()).get('month') + 1;
        var day = moment(dateService.get_system_time()).get('date');
        var hour = moment(dateService.get_system_time()).get('hour');
        var systemDate = moment(year + '-' + month + '-' + day + ' ' + hour + ':00:00');
        if (moment(databaseDate).toDate() < moment(systemDate).toDate())
            return moment(databaseDate).toDate().getTime();
        else
            return moment(systemDate).toDate().getTime();

    };

    var getCurrentDateForDayData = function(databaseDate) {
        var year = moment(dateService.get_system_time()).get('year');
        var month = moment(dateService.get_system_time()).get('month') + 1;
        var day = moment(dateService.get_system_time()).subtract(1,'days').get('date');
        var systemDate = moment(year + '-' + month + '-' + day + ' ' + '00:00:00');
        if (moment(databaseDate).toDate() < moment(systemDate).toDate())
            return moment(databaseDate).toDate().getTime();
        else
            return moment(systemDate).toDate().getTime();

    };

    var getSubstractDate = function(date, hours) {
        return moment(date).subtract(hours, 'hours').toDate().getTime();
    };

    //alert(moment(getCurrentDate()).toDate().getTime());

    /*
    /**
    * 页面初始化区
    * 有些图表的数据是在网页刷新时就请求到的
    */

    //水质量 当天数据模块 初始化
    kpiDetailService.getLastestObject('WaterQuality', ['date'], function(data) {
        var date = data.data.date;
        var datebaseLastestDate = moment(date).subtract(1, 'hours');
        var startTime = getSubstractDate(getCurrentDate(datebaseLastestDate), 23);
        var endTime = getCurrentDate(datebaseLastestDate);
        kpiDetailService.advancedQuery('WaterQuality', {
            date: {
                value1: startTime,
                value2: endTime,
                queryType: 'bt',
                valueType: 'datte'
            },
            sort1: {
                key: 'waterMonitor.id',
                sortType: 'asc'
            },
            sort2: {
                key: 'date',
                sortType: 'asc'
            }
        }, function(data) {
            waterQualityCurrentSuccess(data);
            mapInit();
            addMarker(waterQualityMarkerArr, 'waterQuality');
            mapObj.setFitView();
        });
        var waterQualityLastDate = {
            year: dateService.formatDateTime(endTime).slice(0, 4),
            month: dateService.formatDateTime(endTime).slice(5, 7),
            day: dateService.formatDateTime(endTime).slice(8, 10),
            hour: dateService.formatDateTime(endTime).slice(11, 13)
        };
        $scope.waterQualityCurrentDateTime = waterQualityLastDate;
    });

    //水情 当天数据模块 初始化
    kpiDetailService.getLastestObject('WaterCondition', ['date'], function(data) {
        var date = data.data.date;
        var datebaseLastestDate = moment(date).subtract(1, 'hours');
        var startTime = getSubstractDate(getCurrentDate(datebaseLastestDate), 11);
        var endTime = getCurrentDate(datebaseLastestDate);
        kpiDetailService.advancedQuery('WaterCondition', {
            date: {
                value1: startTime,
                value2: endTime,
                queryType: 'bt',
                valueType: 'datte'
            },
            sort1: {
                key: 'waterMonitor.id',
                sortType: 'asc'
            },
            sort2: {
                key: 'date',
                sortType: 'asc'
            }
        }, waterConditionCurrentSuccess);
        var waterConditionLastDate = {
            year: dateService.formatDateTime(endTime).slice(0, 4),
            month: dateService.formatDateTime(endTime).slice(5, 7),
            day: dateService.formatDateTime(endTime).slice(8, 10),
            hour: dateService.formatDateTime(endTime).slice(11, 13)
        };
        $scope.waterConditionCurrentDateTime = waterConditionLastDate;
    });



    //废水排放 当天数据模块 初始化
    kpiDetailService.getLastestObject('WaterPollution', ['date'], function(data) {
        var date = data.data.date;
        var datebaseLastestDate = moment(date);
        var startTime = getSubstractDate(getCurrentDateForDayData(datebaseLastestDate), 24 * 5);
        var endTime = getCurrentDateForDayData(datebaseLastestDate);
        kpiDetailService.advancedQuery('WaterPollution', {
            date: {
                value1: startTime,
                value2: endTime,
                queryType: 'bt',
                valueType: 'datte'
            },
            sort1: {
                key: 'waterPollutionSource.id',
                sortType: 'asc'
            },
            sort2: {
                key: 'date',
                sortType: 'asc'
            }
        }, wasteWaterCurrentSuccess);
        var wasteWaterLastDate = {
            year: dateService.formatDateTime(endTime).slice(0, 4),
            month: dateService.formatDateTime(endTime).slice(5, 7),
            day: dateService.formatDateTime(endTime).slice(8, 10),
            hour: dateService.formatDateTime(endTime).slice(11, 13)
        };
        $scope.wasteWaterCurrentDateTime = wasteWaterLastDate;
    });

});