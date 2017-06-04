'use strict';

angular.module('app').controller('AirEnvironmentCtrl', function($scope, kpiDetailService, dateService) {
	/**
	 * 变量区
	 *
	 **/
	//基本变量

	var dateTime = new Date();
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	$scope.currentDateTime = {
		year: year,
		month: month
	};

	//变色范围 
	var airQualityAQIScan = {
        scan: [100,300],
        type: 'asc'
    };
    var airQualitySo2Scan = {
        scan: [150,500],
        type: 'asc'
    };
    var airQualityNo2Scan = {
        scan:[200,200],
        type: 'asc'
    };
    var airQualityCoScan = {
        scan:[10,10],
        type: 'asc'
    };
    var airQualityO3Scan = {
        scan:[160,200],
        type: 'asc'
    };
    var airQualityPM10Scan = {
        scan:[150,250],
        type: 'asc'
    };
    var airQualityPM25Scan = {
        scan:[75,115],
        type: 'asc'
    };
    var airPollutionDischargeScan = {
    	scan:[0.2,0.4],
        type: 'asc'
    };
    var airPollutionSmokeScan = {
    	scan:[30,80],
    	type: 'asc'
    };
    var airPollutionSo2Scan = {
    	scan:[200,200],
    	type:'asc'
    };
    var airPollutionNoScan = {
    	scan:[100,400],
    	type:'asc'
    };
    var airConditionScan = {
    	temperature: [37,-5],
    	wind: 7,
    	humidity: [100,10]
    };



	var mapObj, marker;
	var airQualityMarkerArr;
	var airQualityCurrentArr;
	var airQualityCurrentTimeList;
	/*var airConditionMarkerArr;
	var airConditionCurrentArr;
	var airConditionCurrentTimeList*/
	var wasteAirMarkerArr;
	var wasteAirCurrentArr;
	var wasteAirCurrentTimeList;



	//空气质量 highcharts options
    $scope.airQualityOptions = {
    	aqiOption:{
    		options : {
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},
				title: {
					text: 'AQI'
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
					max: 400,

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
						to: airQualityAQIScan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityAQIScan.scan[0],
						to: airQualityAQIScan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityAQIScan.scan[1],
						to: 400,
						color: '#DF5353' // red
					}]
				},
				credits: {
					enabled: false
				}
			},
			series: [{
				name: 'AQI',
				data: [0],
				tooltip: {
					valueSuffix: ''
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	pm25Option:{
    		options:{
   				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: 'PM2.5'
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
					max: 250,

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
						to: airQualityPM25Scan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityPM25Scan.scan[0],
						to: airQualityPM25Scan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityPM25Scan.scan[1],
						to: 250,
						color: '#DF5353' // red
					}]
				},
				credits: {
					enabled: false
				}
			},
			series: [{
				name: 'PM2.5',
				data: [0],
				tooltip: {
					valueSuffix: 'μg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	pm10Option:{
    		options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: 'PM10'
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
					max: 400,

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
						to: airQualityPM10Scan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityPM10Scan.scan[0],
						to: airQualityPM10Scan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityPM10Scan.scan[1],
						to: 400,
						color: '#DF5353' // red
					}]
				},

				credits: {
					enabled: false
				}
			},
			series: [{
				name: 'PM10',
				data: [0],
				tooltip: {
					valueSuffix: 'μg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	so2Option:{
    		options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: '二氧化硫'
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
					max: 700,

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
						to: airQualitySo2Scan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualitySo2Scan.scan[0],
						to: airQualitySo2Scan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualitySo2Scan.scan[1],
						to: 700,
						color: '#DF5353' // red
					}]
				},

				credits: {
					enabled: false
				}
			},
			series: [{
				name: '二氧化硫',
				data: [0],
				tooltip: {
					valueSuffix: 'μg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	no2Option:{
    		options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: '二氧化氮'
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
					max: 400,

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
						to: airQualityNo2Scan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityNo2Scan.scan[0],
						to: airQualityNo2Scan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityNo2Scan.scan[1],
						to: 400,
						color: '#DF5353' // red
					}]
				},

				credits: {
					enabled: false
				}
			},
			series: [{
				name: '二氧化碳',
				data: [0],
				tooltip: {
					valueSuffix: 'μg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	coOption:{
    		options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: '一氧化碳'
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
					max: 20,

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
						to: airQualityCoScan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityCoScan.scan[0],
						to: airQualityCoScan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityCoScan.scan[1],
						to: 20,
						color: '#DF5353' // red
					}]
				},

				credits: {
					enabled: false
				}
			},
			series: [{
				name: '一氧化碳',
				data: [0],
				tooltip: {
					valueSuffix: 'mg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	o3Option:{
    		options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: '臭氧'
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
					max: 300,

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
						to: airQualityO3Scan.scan[0],
						color: '#55BF3B' // green
					}, {
						from: airQualityO3Scan.scan[0],
						to: airQualityO3Scan.scan[1],
						color: '#DDDF0D' // yellow
					}, {
						from: airQualityO3Scan.scan[1],
						to: 300,
						color: '#DF5353' // red
					}]
				},

				credits: {
					enabled: false
				}
			},
			series: [{
				name: '臭氧',
				data: [0],
				tooltip: {
					valueSuffix: 'μg/m³'
				}
			}],
			size:{
                width: 200,
                height: 250
            }
    	},
    	currentAqiLineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min:0,
                    max:310,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityAQIScan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityAQIScan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.aqiOption.series[0].data = [event.point.y];
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
                name: 'AQI',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentPm25LineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'μg/m³'
                    },
                    min:0,
                    max:250,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityPM25Scan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityPM25Scan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'μg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.pm25Option.series[0].data = [event.point.y];
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
                name: 'PM2.5',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentPm10LineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'μg/m³'
                    },
                    min:0,
                    max:400,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityPM10Scan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityPM10Scan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'μg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.pm10Option.series[0].data = [event.point.y];
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
                name: 'PM10',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentSo2LineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'μg/m³'
                    },
                    min:0,
                    max:700,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualitySo2Scan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualitySo2Scan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'μg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.so2Option.series[0].data = [event.point.y];
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
                name: '二氧化硫',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentNo2LineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'μg/m³'
                    },
                    min:0,
                    max:400,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityNo2Scan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityNo2Scan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'μg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.no2Option.series[0].data = [event.point.y];
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
                name: '二氧化氮',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentCoLineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'mg/m³'
                    },
                    min:0,
                    max:20,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityCoScan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityCoScan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'mg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.coOption.series[0].data = [event.point.y];
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
                name: '一氧化碳',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        },
        currentO3LineOption:{
            options:{
                title: {
                    text: null,
                },
                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: {
                        text: 'μg/m³'
                    },
                    min:0,
                    max:300,
                    plotLines : [{
						color: '#DDDF0D',
		                width: 2,
		                value: airQualityO3Scan.scan[0],
                    	dashStyle: 'Dot'
					},{
						color: '#DF5353',
		                width: 2,
		                value: airQualityO3Scan.scan[1],
                    	dashStyle: 'Dot'
					}]
                },
                tooltip: {
                    valueSuffix: 'μg/m³'
                },
                legend: {
                    enabled: false
                },
                plotOptions:{
                	series: {
		                cursor: 'pointer',
		                events: {
		                    click: function (event) {
		                    	$scope.$apply(function(){
		                    		$scope.airQualityOptions.o3Option.series[0].data = [event.point.y];
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
                name: '臭氧',
                data: []
            }],
            size:{
                width: 500,
                height: 250
            }
        }
    };


	//气象 highcharts options
	/*$scope.airConditionOptions = {
		airConditionCurrentOption: {
			options: {
				colors: ['#7CADDF', '#7CADDF', '#195489', '#1FC22B', '#FB9705', '#F26200'],
				chart: {
					type: 'line',
				},
				tooltip: {},
				xAxis: {
					categories: [],
					tickmarkPlacement: 'on'
				},
				plotOptions: {
					column: {
						dataLabels: {
							enabled: true,
						},
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				credits: {
					enabled: false
				}
			},
			title: {
				text: ''
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				}
			},
			series: [{
				name: '',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}]
		}
	};*/

	//废气排放 highcharts options
	$scope.wasteAirOptions = {
		wasteAirCurrentOption: {
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
		airQuality: true,
		airCondition: false,
		wasteAir: false
	};

	/**
	 * 函数区
	 *
	 **/

	//空气质量 http请求后处理过程（即http.success(function(data))中的function)
	var airQualityCurrentSuccess = function(data) {

		//地图初始化，无法在函数外初始化（暂时没搞懂,可能是tab影响）

		if (data.data.length == 0) return null;
		airQualityCurrentArr = [];
		airQualityMarkerArr = [];
		var hourOne = data.data[0].hour;
		airQualityCurrentTimeList = [];
		airQualityCurrentTimeList.push('05-31');
		var prefix = '06-0'

		for (var i = 1; i <= 6; i++) {
			// if (hourOne == 24) {
			// 	airQualityCurrentTimeList.push('0时');
			// 	hourOne = 1;
			// } else {
			// 	airQualityCurrentTimeList.push(parseInt(hourOne) + '时');
			// 	hourOne = parseInt(hourOne) + 1;
			// }
			airQualityCurrentTimeList.push(prefix+i);

		}
		for (var i = 0; i < data.data.length / 12; i++) {
			var index_aqiList = [];
			var index_pm25List = [];
			var index_pm10List = [];
			var index_so2List = [];
			var index_no2List = [];
			var index_coList = [];
			var index_o3List = [];
			var index_levelList = [];
			var index_firstElementList = [];
			for (var j = 0; j < 12; j++) {
				index_aqiList.push(parseFloat(data.data[i * 12 + j].aqi));
				index_pm25List.push(parseFloat(data.data[i * 12 + j].pm25));
				index_pm10List.push(parseFloat(data.data[i * 12 + j].pm10));
				index_so2List.push(parseFloat(data.data[i * 12 + j].so2));
				index_no2List.push(parseFloat(data.data[i * 12 + j].no2));
				index_coList.push(parseFloat(data.data[i * 12 + j].co));
				index_o3List.push(parseFloat(data.data[i * 12 + j].o3));
				index_levelList.push(data.data[i * 12 + j].airQualityLevel);
				index_firstElementList.push(data.data[i * 12 + j].firstElement);
			}
			airQualityCurrentArr.push({
				monitor: data.data[i * 12].airMonitor.name,
				point: data.data[i * 12].airMonitor.description,
				abbr: data.data[i * 12].airMonitor.abbr,
				index_aqiList: index_aqiList,
				index_pm25List: index_pm25List,
				index_pm10List: index_pm10List,
				index_so2List: index_so2List,
				index_no2List: index_no2List,
				index_coList: index_coList,
				index_o3List: index_o3List,
				index_levelList: index_levelList,
				index_firstElementList: index_firstElementList
			})
		}

		for (var i = 0; i < airQualityCurrentArr.length; i++) {
			var airQualityTempOne = {
				aqi: airQualityCurrentArr[i].index_aqiList[11],
				pm25: airQualityCurrentArr[i].index_pm25List[11],
				pm10: airQualityCurrentArr[i].index_pm10List[11],
				so2: airQualityCurrentArr[i].index_so2List[11],
				no2: airQualityCurrentArr[i].index_no2List[11],
				co: airQualityCurrentArr[i].index_coList[11],
				o3: airQualityCurrentArr[i].index_o3List[11],
				level: airQualityCurrentArr[i].index_levelList[11],
				firstElement: airQualityCurrentArr[i].index_firstElementList[11]
			};
			airQualityMarkerArr.push({
				monitor: airQualityCurrentArr[i].monitor,
				point: airQualityCurrentArr[i].point,
				abbr: airQualityCurrentArr[i].abbr,
				color: getStatusColor(getAirQualityMonitorStatus(airQualityTempOne)),
				index_aqi: airQualityTempOne.aqi,
				index_pm25: airQualityTempOne.pm25,
				index_pm10: airQualityTempOne.pm10,
				index_so2: airQualityTempOne.so2,
				index_co: airQualityTempOne.co,
				index_o3: airQualityTempOne.o3,
				index_level: airQualityTempOne.level,
				index_firstElement: airQualityTempOne.firstElement,
				monitor_status: getAirQualityMonitorStatus(airQualityTempOne)
			});
		}

		//空气质量表格列表数据
		$scope.airQualityMarkerList = airQualityMarkerArr;

		//空气质量模块整体状态初始化
		$scope.airQualityStatus = getAirQualityStatus(airQualityMarkerArr);

		//Radio列表选择状态
		$scope.airQualityCurrentList = airQualityCurrentArr;
		$scope.airQualityCurrentListSelected = airQualityCurrentArr[0].monitor;

		//一句话初始化
		$scope.airQualityOneSentence = {
			monitor: airQualityCurrentArr[0].monitor,
			aqiStatus: getStatusAsc(airQualityCurrentArr[0].index_aqiList[11], airQualityAQIScan.scan, 'AQI'),
			pm25Status: getStatusAsc(airQualityCurrentArr[0].index_pm25List[11], airQualityPM25Scan.scan, 'PM2.5'),
			pm10Status: getStatusAsc(airQualityCurrentArr[0].index_pm10List[11], airQualityPM10Scan.scan, 'PM10'),
			so2Status: getStatusAsc(airQualityCurrentArr[0].index_so2List[11], airQualitySo2Scan.scan, '二氧化硫'),
			no2Status: getStatusAsc(airQualityCurrentArr[0].index_no2List[11], airQualityNo2Scan.scan, '二氧化氮'),
			coStatus: getStatusAscIgnoreZero(airQualityCurrentArr[0].index_coList[11], airQualityCoScan.scan, '一氧化碳'),
			o3Status: getStatusAsc(airQualityCurrentArr[0].index_o3List[11], airQualityO3Scan.scan, '臭氧'),
			level: airQualityCurrentArr[0].index_levelList[11],
			firstElement: airQualityCurrentArr[0].index_firstElementList[11]
		};

		$scope.airQualityOptions.aqiOption.series[0].data = [parseFloat(airQualityCurrentArr[0].index_aqiList.slice(0)[11])];
		$scope.airQualityOptions.pm25Option.series[0].data = [parseFloat(airQualityCurrentArr[0].index_pm25List.slice(0)[11])];
		$scope.airQualityOptions.pm10Option.series[0].data = [parseFloat(airQualityCurrentArr[0].index_pm10List.slice(0)[11])];
		$scope.airQualityOptions.so2Option.series[0].data = [parseFloat(airQualityCurrentArr[0].index_so2List.slice(0)[11])];
		$scope.airQualityOptions.no2Option.series[0].data = [parseFloat(airQualityCurrentArr[0].index_no2List.slice(0)[11])];
		$scope.airQualityOptions.coOption.series[0].data = [parseFloat(airQualityCurrentArr[0].index_coList.slice(0)[11])];
		$scope.airQualityOptions.o3Option.series[0].data = [parseFloat(airQualityCurrentArr[0].index_o3List.slice(0)[11])];

		$scope.airQualityOptions.currentAqiLineOption.series[0].data = airQualityCurrentArr[0].index_aqiList.slice(0);
		$scope.airQualityOptions.currentPm25LineOption.series[0].data = airQualityCurrentArr[0].index_pm25List.slice(0);
		$scope.airQualityOptions.currentPm10LineOption.series[0].data = airQualityCurrentArr[0].index_pm10List.slice(0);
		$scope.airQualityOptions.currentSo2LineOption.series[0].data = airQualityCurrentArr[0].index_so2List.slice(0);
		$scope.airQualityOptions.currentNo2LineOption.series[0].data = airQualityCurrentArr[0].index_no2List.slice(0);
		$scope.airQualityOptions.currentCoLineOption.series[0].data = airQualityCurrentArr[0].index_coList.slice(0);
		$scope.airQualityOptions.currentO3LineOption.series[0].data = airQualityCurrentArr[0].index_o3List.slice(0);

		$scope.airQualityOptions.currentAqiLineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentPm25LineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentPm10LineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentSo2LineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentNo2LineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentCoLineOption.options.xAxis.categories = airQualityCurrentTimeList;
		$scope.airQualityOptions.currentO3LineOption.options.xAxis.categories = airQualityCurrentTimeList;

		console.log('timelist',airQualityCurrentTimeList);



	};

	//空气质量 Button点击事件
	$scope.airQualityBtn = function() {
		$scope.mapTableStatus = {
			airQuality: true,
			airCondition: false,
			wasteAir: false
		};
		removeMarker();
		addMarker(airQualityMarkerArr, 'airQuality');
		mapObj.setCenter(new AMap.LngLat(121.106661, 31.579533));
		mapObj.setZoom(11);
	};

	//空气质量 列表点击事件
	$scope.airQualityCurrentChange = function(airQualityOne) {

		$scope.airQualityOneSentence = {
			monitor: airQualityOne.monitor,
			aqiStatus: getStatusAsc(airQualityOne.index_aqiList[11], airQualityAQIScan.scan, 'AQI'),
			pm25Status: getStatusAsc(airQualityOne.index_pm25List[11], airQualityPM25Scan.scan, 'PM2.5'),
			pm10Status: getStatusAsc(airQualityOne.index_pm10List[11], airQualityPM10Scan.scan, 'PM10'),
			so2Status: getStatusAsc(airQualityOne.index_so2List[11], airQualitySo2Scan.scan, '二氧化硫'),
			no2Status: getStatusAsc(airQualityOne.index_no2List[11], airQualityNo2Scan.scan, '二氧化氮'),
			coStatus: getStatusAscIgnoreZero(airQualityOne.index_coList[11], airQualityCoScan.scan, '一氧化碳'),
			o3Status: getStatusAsc(airQualityOne.index_o3List[11], airQualityO3Scan.scan, '臭氧'),
			level: airQualityCurrentArr[0].index_levelList[11],
			firstElement: airQualityCurrentArr[0].index_firstElementList[11]
		};
		$scope.airQualityOptions.aqiOption.series[0].data = [parseFloat(airQualityOne.index_aqiList.slice(0)[11])];
		$scope.airQualityOptions.pm25Option.series[0].data = [parseFloat(airQualityOne.index_pm25List.slice(0)[11])];
		$scope.airQualityOptions.pm10Option.series[0].data = [parseFloat(airQualityOne.index_pm10List.slice(0)[11])];
		$scope.airQualityOptions.so2Option.series[0].data = [parseFloat(airQualityOne.index_so2List.slice(0)[11])];
		$scope.airQualityOptions.no2Option.series[0].data = [parseFloat(airQualityOne.index_no2List.slice(0)[11])];
		$scope.airQualityOptions.coOption.series[0].data = [parseFloat(airQualityOne.index_coList.slice(0)[11])];
		$scope.airQualityOptions.o3Option.series[0].data = [parseFloat(airQualityOne.index_o3List.slice(0)[11])];

		$scope.airQualityOptions.currentAqiLineOption.series[0].data = airQualityOne.index_aqiList.slice(0);
		$scope.airQualityOptions.currentPm25LineOption.series[0].data = airQualityOne.index_pm25List.slice(0);
		$scope.airQualityOptions.currentPm10LineOption.series[0].data = airQualityOne.index_pm10List.slice(0);
		$scope.airQualityOptions.currentSo2LineOption.series[0].data = airQualityOne.index_so2List.slice(0);
		$scope.airQualityOptions.currentNo2LineOption.series[0].data = airQualityOne.index_no2List.slice(0);
		$scope.airQualityOptions.currentCoLineOption.series[0].data = airQualityOne.index_coList.slice(0);
		$scope.airQualityOptions.currentO3LineOption.series[0].data = airQualityOne.index_o3List.slice(0);

	};

	//空气质量 模块整体状态获取
	function getAirQualityStatus(airQualityMarker) {
		var countResult = {
			accept: 0,
			caution: 0,
			take_action: 0,
			invalid: 0
		}
		for (var i = 0; i < airQualityMarker.length; i++) {
			if (airQualityMarker[i].monitor_status == 'caution') countResult.caution += 1;
			else if (airQualityMarker[i].monitor_status == 'take_action') countResult.take_action += 1;
			else if (airQualityMarker[i].monitor_status == 'accept') countResult.accept += 1;
			else countResult.invalid += 1;
		}

		//侧边栏，关键数初始化
		$scope.airQualityQualified = countResult.accept + '/' + airQualityMarker.length;


		if (countResult.take_action >= 1)
			return {
				status: 'take_action',
				sentence: '存在' + countResult.take_action + '个监测点空气质量有问题'
			};
		else if (countResult.caution >= 1)
			return {
				status: 'caution',
				sentence: '存在' + countResult.caution + '个监测点空气质量有轻微问题'
			};
		else if (countResult.accept == airQualityMarker.length)
			return {
				status: 'accept',
				sentence: '所有监测点空气质量均正常'
			};
		else
			return {
				status: 'invalid',
				sentence: '存在' + countResult.invalid + '个监测点数据未更新'
			};
	};

	//空气质量 监测站状态获取
	function getAirQualityMonitorStatus(airQualityMarkerOne) {
		var indexStatusList = {
			aqiStatus: getStatusAsc(airQualityMarkerOne.aqi, airQualityAQIScan.scan, 'AQI').status,
			pm25Status: getStatusAsc(airQualityMarkerOne.pm25, airQualityPM25Scan.scan, 'PM2.5').status,
			pm10Status: getStatusAsc(airQualityMarkerOne.pm10, airQualityPM10Scan.scan, 'PM10').status,
			so2Status: getStatusAsc(airQualityMarkerOne.so2, airQualitySo2Scan.scan, '二氧化硫').status,
			no2Status: getStatusAsc(airQualityMarkerOne.no2, airQualityNo2Scan.scan, '二氧化氮').status,
			coStatus: getStatusAscIgnoreZero(airQualityMarkerOne.co, airQualityCoScan.scan, '一氧化碳').status,
			o3Status: getStatusAsc(airQualityMarkerOne.o3, airQualityO3Scan.scan, '臭氧').status
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
	}


	// //气象 http请求后处理过程（即http.success(function(data))中的function)
	// var airConditionCurrentSuccess = function(data) {
	// 	var data = eval("(" + data.data + ')');
	// 	if (data.data.length == 0) return null;
	// 	airConditionCurrentArr = [];
	// 	airConditionMarkerArr = [];

	// 	var hourOne = data.data[0].hour
	// 	airConditionCurrentTimeList = [];
	// 	for (var i = 0; i < 12; i++) {
	// 		airConditionCurrentTimeList.push(hourOne + '时');
	// 		hourOne++
	// 		if (hourOne == 24) hourOne = 0;
	// 	}
	// 	for (var i = 0; i < data.data.length / 12; i++) {

	// 		var index_temperatureList = [];
	// 		var index_windLevelList = [];
	// 		var index_humidityList = [];
	// 		var index_windDireList = [];

	// 		for (var j = 0; j < 12; j++) {
	// 			index_temperatureList.push(parseInt(data.data[i * 12 + j].temperature));
	// 			index_windLevelList.push(parseInt(data.data[i * 12 + j].flowLevel));
	// 			index_humidityList.push(parseInt(data.data[i * 12 + j].humidity));
	// 			index_windDireList.push(data.data[i * 12 + j].flowDirection);
	// 		}

	// 		airConditionCurrentArr.push({
	// 			monitor: data.data[i * 12].airMonitorName,
	// 			index_temperatureList: index_temperatureList,
	// 			index_windLevelList: index_windLevelList,
	// 			index_humidityList: index_humidityList,
	// 			index_windDireList: index_windDireList
	// 		});
	// 		airConditionMarkerArr.push({
	// 			monitor: data.data[i * 12].airMonitorName,
	// 			point: data.data[i * 12].description,
	// 			abbr: data.data[i * 12].abbr,
	// 			color: getStatusColor(getAirConditionMonitorStatus(data.data[i * 12 + 11])),
	// 			monitor_status: getAirConditionMonitorStatus(data.data[i * 12 + 11]),
	// 			index_temperature: index_temperatureList[11],
	// 			index_windLevel: index_windLevelList[11],
	// 			index_humidity: index_humidityList[11],
	// 			index_windDire: index_windDireList[11]
	// 		});
	// 	}
	// 	//气象表格列表数据
	// 	$scope.airConditionMarkerList = airConditionMarkerArr;

	// 	//气象模块整体状态初始化
	// 	$scope.airConditionStatus = getAirConditionStatus(airConditionMarkerArr);

	// 	//Radio列表选择状态
	// 	$scope.airConditionCurrentList = ['气温', '风级', '相对湿度'];
	// 	$scope.airConditionCurrentListSelected = '气温';

	// 	//一句话初始化
	// 	$scope.airConditionOneSentence = {
	// 		monitor: airConditionCurrentArr[0].monitor,
	// 		index_temperature: AirConditionStatusTemperature(airConditionCurrentArr[0].index_temperatureList[5]),
	// 		index_windLevel: AirConditionStatusWindlevel(airConditionCurrentArr[0].index_windLevelList[5]),
	// 		index_humidity: AirConditionStatusHumidity(airConditionCurrentArr[0].index_humidityList[5]),
	// 	};

	// 	$scope.airConditionOptions.airConditionCurrentOption.options.xAxis.categories = airConditionCurrentTimeList;
	// 	$scope.airConditionOptions.airConditionCurrentOption.title.text = '气温';
	// 	$scope.airConditionOptions.airConditionCurrentOption.yAxis.title.text = ' ℃';
	// 	$scope.airConditionOptions.airConditionCurrentOption.options.tooltip = {
	// 		shared: true,
	// 		valueSuffix: ' ℃'
	// 	};
	// 	$scope.airConditionOptions.airConditionCurrentOption.series[0].name = '气温';
	// 	$scope.airConditionOptions.airConditionCurrentOption.series[0].data = airConditionCurrentArr[0].index_temperatureList;
	// };

	// //气象 Button点击事件
	// $scope.airConditionBtn = function() {
	// 	$scope.mapTableStatus = {
	// 		airQuality: false,
	// 		airCondition: true,
	// 		wasteAir: false
	// 	};
	// 	removeMarker();
	// 	addMarker(airConditionMarkerArr, 'airCondition');
	// 	mapObj.setCenter(new AMap.LngLat(121.106661, 31.579533));
	// 	mapObj.setZoom(11);
	// };

	// //气象 列表点击事件
	// $scope.airConditionCurrentChange = function(airConditionOne) {

	// 	if (airConditionOne == '气温') {
	// 		$scope.airConditionOptions.airConditionCurrentOption.title.text = '气温';
	// 		$scope.airConditionOptions.airConditionCurrentOption.yAxis.title.text = ' ℃';
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].name = '气温';
	// 		$scope.airConditionOptions.airConditionCurrentOption.options.tooltip = {
	// 			shared: true,
	// 			valueSuffix: ' ℃'
	// 		};
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].data = airConditionCurrentArr[0].index_temperatureList;
	// 	} else if (airConditionOne == '风级') {
	// 		$scope.airConditionOptions.airConditionCurrentOption.title.text = '风级';
	// 		$scope.airConditionOptions.airConditionCurrentOption.yAxis.title.text = ' 风级';
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].name = '风级';
	// 		$scope.airConditionOptions.airConditionCurrentOption.options.tooltip = {
	// 			shared: true,
	// 			valueSuffix: ' 级'
	// 		};
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].data = airConditionCurrentArr[0].index_windLevelList;
	// 	} else if (airConditionOne == '相对湿度') {
	// 		$scope.airConditionOptions.airConditionCurrentOption.title.text = '相对湿度';
	// 		$scope.airConditionOptions.airConditionCurrentOption.yAxis.title.text = ' %';
	// 		$scope.airConditionOptions.airConditionCurrentOption.options.tooltip = {
	// 			shared: true,
	// 			valueSuffix: '  %'
	// 		};
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].name = '相对湿度';
	// 		$scope.airConditionOptions.airConditionCurrentOption.series[0].data = airConditionCurrentArr[0].index_humidityList;
	// 	}
	// };

	// //气象 模块整体状态获取
	// function getAirConditionStatus(airConditionMarkerArr) {
	// 	var countResult = {
	// 		accept: 0,
	// 		caution: 0,
	// 		invalid: 0
	// 	}
	// 	for (var i = 0; i < airConditionMarkerArr.length; i++) {
	// 		if (airConditionMarkerArr[i].monitor_status == 'caution') countResult.caution += 1;
	// 		else if (airConditionMarkerArr[i].monitor_status == 'accept') countResult.accept += 1;
	// 		else countResult.invalid += 1;
	// 	}

	// 	$scope.airConditionQualified = countResult.accept + '/' + airConditionMarkerArr.length;

	// 	if (countResult.caution >= 1) return {
	// 		status: 'caution',
	// 		sentence: '存在' + countResult.caution + '个监测点气象情况有问题'
	// 	} else if (countResult.accept == airConditionMarkerArr.length) return {
	// 		status: 'accept',
	// 		sentence: '所有监测点气象情况均正常'
	// 	} else return {
	// 		status: 'invalid',
	// 		sentence: '存在' + countResult.invalid + '个监测点数据未更新'
	// 	}
	// };

	// //气象 监测站状态获取
	// function getAirConditionMonitorStatus(airConditionMarkerOne) {
	// 	var indexStatusList = {
	// 		index_temperature: AirConditionStatusTemperature(airConditionMarkerOne.temperature).status,
	// 		index_windLevel: AirConditionStatusWindlevel(airConditionMarkerOne.flowLevel).status,
	// 		index_humidity: AirConditionStatusHumidity(airConditionMarkerOne.humidity).status,
	// 	};
	// 	var statusList = [];
	// 	angular.forEach(indexStatusList, function(value, key) {
	// 		this.push(value);
	// 	}, statusList);
	// 	var countResult = {
	// 		accept: 0,
	// 		caution: 0,
	// 		invalid: 0
	// 	}
	// 	for (var i = 0; i < statusList.length; i++) {
	// 		if (statusList[i] == 'caution') countResult.caution += 1;
	// 		else if (statusList[i] == 'accept') countResult.accept += 1;
	// 		else countResult.invalid += 1;
	// 	}
	// 	if (countResult.caution >= 1) return 'caution';
	// 	else if (countResult.accept == statusList.length) return 'accept';
	// 	else return 'invalid';
	// }

	// //气象 指标状态获取
	// function AirConditionStatusTemperature(data) {
	// 	if (data <= airConditionScan.temperature[0] && data >= airConditionScan.temperature[1]) {
	// 		return {
	// 			status: "accept",
	// 			sentence: "气温，正常"
	// 		}
	// 	} else {
	// 		return {
	// 			status: "caution",
	// 			sentence: "气温，异常"
	// 		}
	// 	}
	// };

	// function AirConditionStatusWindlevel(data) {
	// 	if (data <= airConditionScan.wind) {
	// 		return {
	// 			status: "accept",
	// 			sentence: "风级，正常"
	// 		}
	// 	} else {
	// 		return {
	// 			status: "caution",
	// 			sentence: "风级，异常"
	// 		}
	// 	}
	// };

	// function AirConditionStatusHumidity(data) {
	// 	if (data <= airConditionScan.humidity[0] && data >= airConditionScan.humidity[1]) {
	// 		return {
	// 			status: "accept",
	// 			sentence: "湿度，正常"
	// 		}
	// 	} else {
	// 		return {
	// 			status: "caution",
	// 			sentence: "湿度，异常"
	// 		}
	// 	}
	// };

	//废气排放 http请求后处理过程（即http.success(function(data))中的function)
	var wasteAirCurrentSuccess = function(data) {
		if (data.data.length == 0) return null;
		wasteAirCurrentArr = wasteAirCurrentFilter(data);
		var wasteAirMarkerTemp = [];
		var lengthTemp = 0;
		if (wasteAirCurrentArr.length >= 6) {
			lengthTemp = wasteAirCurrentArr.length - 1;
		} else if (wasteAirCurrentArr.length < 6) {
			lengthTemp = wasteAirCurrentArr.length;
		}
		for (var i = 0; i < lengthTemp; i++) {
			wasteAirMarkerTemp.push({
				monitor: wasteAirCurrentArr[i].wasteSource,
				point: wasteAirCurrentArr[i].point,
				abbr: wasteAirCurrentArr[i].abbr,
				color: getStatusColor(getWasteAirMonitorStatus(wasteAirCurrentArr[i])),
				monitor_status: getWasteAirMonitorStatus(wasteAirCurrentArr[i]),
				index_discharge: wasteAirCurrentArr[i].index_discharge.slice(4),
				index_smoke: wasteAirCurrentArr[i].index_smoke[5],
				index_so2: wasteAirCurrentArr[i].index_so2[5],
				index_no: wasteAirCurrentArr[i].index_no[5]
			});
		}
		wasteAirMarkerArr = wasteAirMarkerTemp;

		//废气排放表格列表数据
		$scope.wasteAirMarkerList = wasteAirMarkerArr;

		//废气排放模块整体状态初始化
		$scope.wasteAirStatus = getWasteAirStatus(wasteAirMarkerArr);

		//Radio列表选择状态
		$scope.wasteAirCurrentList = ['废气排放量', '烟尘浓度', '二氧化硫浓度', '氮氧化物浓度'];
		$scope.wasteAirCurrentListSelected = '废气排放量';

		//一句话初始化
		$scope.wasteAirOneSentence = {
			index: '废气排放量',
			countResult: null
		};

		$scope.wasteAirOptions.wasteAirCurrentOption.options.chart.type = 'area';
		$scope.wasteAirOptions.wasteAirCurrentOption.options.title.text = '废气排放总量';
		$scope.wasteAirOptions.wasteAirCurrentOption.options.xAxis = {
			categories: wasteAirCurrentTimeList,
			tickmarkPlacement: 'on'
		};
		$scope.wasteAirOptions.wasteAirCurrentOption.options.yAxis = {
				title:{
					text:'标立方米'
				},
				plotLines : []
			};
		$scope.wasteAirOptions.wasteAirCurrentOption.options.tooltip = {
			shared: true,
			valueSuffix: ' 标立方米'
		};
		$scope.wasteAirOptions.wasteAirCurrentOption.options.plotOptions = {
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
		var wasteAirSeriesTemp = [];
		for (var i = 0; i < wasteAirCurrentArr.length; i++) {
			wasteAirSeriesTemp.push({
				name: wasteAirCurrentArr[i].wasteSource,
				data: wasteAirCurrentArr[i].index_discharge
			});
		}
		$scope.wasteAirOptions.wasteAirCurrentOption.series = wasteAirSeriesTemp;
	};

	//废气排放抽出前五的数据和其他数据平均值或总和
	function wasteAirCurrentFilter(data) {
		var wasteAirTemp = [];
		var wasteAirCurrentArrTemp = [];

		for (var i = 0; i < data.data.length / 6; i++) {
			var index_dischargeList = [];
			var index_smokeList = [];
			var index_so2List = [];
			var index_noList = [];
			for (var j = 0; j < 6; j++) {
				index_dischargeList.push(parseFloat(parseFloat(data.data[i * 6 + j].discharge).toFixed(2)));
				index_smokeList.push(parseFloat(data.data[i * 6 + j].smoke));
				index_so2List.push(parseFloat(data.data[i * 6 + j].so2));
				index_noList.push(parseFloat(data.data[i * 6 + j].no));
			}

			wasteAirTemp.push({
				wasteSource: data.data[i * 6].airPollutionSource.name,
				point: data.data[i * 6].airPollutionSource.description,
				abbr: data.data[i * 6].airPollutionSource.abbr,
				index_discharge: index_dischargeList,
				index_smoke: index_smokeList,
				index_so2: index_so2List,
				index_no: index_noList
			});
		}

		wasteAirCurrentTimeList = [];
		for (var k = 0; k < 6; k++) {
			wasteAirCurrentTimeList.push(data.data[k].month + '月' + data.data[k].day + '日');
		}

		function sortAirPollution(a, b) {
			return b.index_discharge[5] - a.index_discharge[5];
		}
		wasteAirTemp.sort(sortAirPollution);

		function averageCal(dischargeList, indexList) {
			var resultList = []
			for (var i = 0; i < dischargeList.length; i++) {
				var temp = indexList[i] / dischargeList[i];
				resultList[i] = parseFloat(temp.toFixed(2));
			}
			return resultList;
		}

		/*function numberListToFixed2(list){
			for(var i=0;i<list.length;i++){
				list[i] = parseFloat(list[i].toFixed(2));
			}
			return list;
		}*/
		if (wasteAirTemp.length <= 5) {
			/*for(var i=0;i<wasteAirTemp.length;i++){
        		wasteAirCurrentArrTemp.push({
        			wasteSource: wasteAirTemp[i].wasteSource,
                	point: wasteAirTemp[i].point,
                	index_discharge: wasteAirTemp[i].index_discharge,
                	index_smoke: numberListToFixed2(wasteAirTemp[i].index_smoke),
                	index_so2: numberListToFixed2(wasteAirTemp[i].index_so2),
                	index_no: numberListToFixed2(wasteAirTemp[i].index_no)
        		})
        	}*/
			wasteAirCurrentArrTemp = wasteAirTemp;
		} else {
			for (var i = 0; i < 5; i++) {
				wasteAirCurrentArrTemp.push(wasteAirTemp[i]);
			}
			var dischargeOtherSum = [0, 0, 0, 0, 0, 0];
			var smokeOtherSum = [0, 0, 0, 0, 0, 0];
			var so2OtherSum = [0, 0, 0, 0, 0, 0];
			var noOtherSum = [0, 0, 0, 0, 0, 0];

			for (var i = 0; i < 6; i++) {
				for (var j = 5; j < wasteAirTemp.length; j++) {
					dischargeOtherSum[i] += wasteAirTemp[j].index_discharge[i];
					smokeOtherSum[i] += (wasteAirTemp[j].index_smoke[i] * wasteAirTemp[j].index_discharge[i]);
					so2OtherSum[i] += (wasteAirTemp[j].index_so2[i] * wasteAirTemp[j].index_discharge[i]);
					noOtherSum[i] += (wasteAirTemp[j].index_no[i] * wasteAirTemp[j].index_discharge[i]);
				}
			}

			wasteAirCurrentArrTemp.push({
				wasteSource: '其他污染源',
				index_discharge: dischargeOtherSum,
				index_smoke: averageCal(dischargeOtherSum, smokeOtherSum),
				index_so2: averageCal(dischargeOtherSum, so2OtherSum),
				index_no: averageCal(dischargeOtherSum, noOtherSum)
			})
		}
		return wasteAirCurrentArrTemp;
	}

	//废气排放Button点击事件
	$scope.wasteAirBtn = function() {
		$scope.mapTableStatus = {
			airQuality: false,
			airCondition: false,
			wasteAir: true
		};
		removeMarker();
		addMarker(wasteAirMarkerArr, 'airPollution');
		mapObj.setFitView();
	};

	//废气排放 列表点击事件
	$scope.wasteAirDischargeOneSentenceStatus = true;
	$scope.wasteAirCurrentChange = function(wasteAirOne) {
		var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
		if (wasteAirOne == '废气排放量') {
			$scope.wasteAirOneSentence = {
				index: '废气排放量',
				countResult: null
			};
			$scope.wasteAirDischargeOneSentenceStatus = true;

			$scope.wasteAirOptions.wasteAirCurrentOption.options.chart.type = 'area';
			$scope.wasteAirOptions.wasteAirCurrentOption.options.title.text = '废气排放总量';
			$scope.wasteAirOptions.wasteAirCurrentOption.options.xAxis = {
				categories: wasteAirCurrentTimeList,
				tickmarkPlacement: 'on'
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.yAxis = {
				title:{
					text:'标立方米'
				},
				plotLines : []
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.tooltip = {
				shared: true,
				valueSuffix: ' 标立方米'
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.plotOptions = {
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
			var wasteAirSeriesTemp = [];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				wasteAirSeriesTemp.push({
					name: wasteAirCurrentArr[i].wasteSource,
					data: wasteAirCurrentArr[i].index_discharge
				});
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.series = wasteAirSeriesTemp;
		} else if (wasteAirOne == '烟尘浓度') {
			$scope.wasteAirOneSentence = {
				index: '烟尘浓度',
				countResult: wasteAirOneSentenceProcess('烟尘浓度', wasteAirMarkerArr)
			};
			$scope.wasteAirDischargeOneSentenceStatus = false;
			$scope.wasteAirOptions.wasteAirCurrentOption.options.chart.type = 'column';
			$scope.wasteAirOptions.wasteAirCurrentOption.options.title.text = '烟尘排放浓度';
			var factoryList = [];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				factoryList.push(wasteAirCurrentArr[i].wasteSource);
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.options.xAxis = {
				categories: factoryList,
				tickmarkPlacement: 'on',
				labels: {
					rotation: -30
				}
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.yAxis ={
				title:{
					text:'mg/m³'
				},
				max : 40,
				plotLines : [{
					color: '#DF5353',
	                width: 2,
	                value: airPollutionSmokeScan.scan[0],
                    dashStyle: 'Dot'
				}]
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.tooltip = {
				shared: true,
				valueSuffix: ' mg/m³'
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.plotOptions = {
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
			wasteAirSeriesTemp = [];
			var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				wasteAirSeriesTemp.push({
					y: parseFloat(wasteAirCurrentArr[i].index_smoke[wasteAirCurrentArr[i].index_smoke.length - 1].toFixed(2)),
					color: getTargetColor(wasteAirCurrentArr[i].index_smoke[wasteAirCurrentArr[i].index_smoke.length - 1], airPollutionSmokeScan.scan[0])
				});
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.series = [{
				name: '烟尘排放浓度',
				data: wasteAirSeriesTemp
			}];
		} else if (wasteAirOne == '二氧化硫浓度') {
			$scope.wasteAirOneSentence = {
				index: '二氧化硫浓度',
				countResult: wasteAirOneSentenceProcess('二氧化硫浓度', wasteAirMarkerArr)
			};
			$scope.wasteAirDischargeOneSentenceStatus = false;

			$scope.wasteAirOptions.wasteAirCurrentOption.options.chart.type = 'column';
			$scope.wasteAirOptions.wasteAirCurrentOption.options.title.text = '二氧化硫排放浓度';
			var factoryList = [];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				factoryList.push(wasteAirCurrentArr[i].wasteSource);
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.options.xAxis = {
				categories: factoryList,
				tickmarkPlacement: 'on',
				labels: {
					rotation: -30
				}
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.yAxis = {
				title :{
					text:'mg/m³'
				},
				max : 200,
				plotLines : [{
					color: '#DF5353',
	                width: 2,
	                value: airPollutionSo2Scan.scan[0],
                    dashStyle: 'Dot'
				}]
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.tooltip = {
				shared: true,
				valueSuffix: ' mg/m³'
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.plotOptions = {
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
			wasteAirSeriesTemp = [];
			var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				wasteAirSeriesTemp.push({
					y: parseFloat(wasteAirCurrentArr[i].index_so2[wasteAirCurrentArr[i].index_so2.length - 1].toFixed(2)),
					color: getTargetColor(wasteAirCurrentArr[i].index_so2[wasteAirCurrentArr[i].index_so2.length - 1], airPollutionSo2Scan.scan[0])
				});
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.series = [{
				name: '二氧化硫排放浓度',
				data: wasteAirSeriesTemp
			}];
		} else if (wasteAirOne == '氮氧化物浓度') {
			$scope.wasteAirOneSentence = {
				index: '氮氧化物浓度',
				countResult: wasteAirOneSentenceProcess('氮氧化物浓度', wasteAirMarkerArr)
			};
			$scope.wasteAirDischargeOneSentenceStatus = false;

			$scope.wasteAirOptions.wasteAirCurrentOption.options.chart.type = 'column';
			$scope.wasteAirOptions.wasteAirCurrentOption.options.title.text = '氮氧化物排放浓度';
			var factoryList = [];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				factoryList.push(wasteAirCurrentArr[i].wasteSource);
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.options.xAxis = {
				categories: factoryList,
				tickmarkPlacement: 'on',
				labels: {
					rotation: -30
				}
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.yAxis = {
				title :{
					text:'mg/m³'
				},
				max: 200,
				plotLines : [{
					color: '#DF5353',
	                width: 2,
	                value: airPollutionNoScan.scan[0],
                    dashStyle: 'Dot'
				}]
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.tooltip = {
				shared: true,
				valueSuffix: ' mg/m³'
			};
			$scope.wasteAirOptions.wasteAirCurrentOption.options.plotOptions = {
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
			wasteAirSeriesTemp = [];
			var colors = ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'];
			for (var i = 0; i < wasteAirCurrentArr.length; i++) {
				wasteAirSeriesTemp.push({
					y: parseFloat(wasteAirCurrentArr[i].index_no[wasteAirCurrentArr[i].index_no.length - 1].toFixed(2)),
					color: getTargetColor(wasteAirCurrentArr[i].index_no[wasteAirCurrentArr[i].index_no.length - 1], airPollutionNoScan.scan[0])
				});
			}
			$scope.wasteAirOptions.wasteAirCurrentOption.series = [{
				name: '氮氧化物排放浓度',
				data: wasteAirSeriesTemp
			}];
		}
	};

	//废气排放 模块整体状态获取
	function getWasteAirStatus(wasteAirMarkerArr) {
		var countResult = {
			accept: 0,
			caution: 0,
			take_action: 0,
			invalid: 0
		}

		for (var i = 0; i < wasteAirMarkerArr.length; i++) {
			if (wasteAirMarkerArr[i].monitor_status == 'caution') countResult.caution += 1;
			else if (wasteAirMarkerArr[i].monitor_status == 'take_action') countResult.take_action += 1;
			else if (wasteAirMarkerArr[i].monitor_status == 'accept') countResult.accept += 1;
			else countResult.invalid += 1;
		}

		//侧边栏，关键数初始化
		$scope.airPollutionQualified = countResult.accept + '/' + wasteAirMarkerArr.length;

		if (countResult.take_action >= 1) return {
			status: 'take_action',
			sentence: '存在' + countResult.take_action + '个监测点废气排放有问题'
		};
		else if (countResult.caution >= 1) return {
			status: 'caution',
			sentence: '存在' + countResult.caution + '个监测点废气排放有轻微问题'
		};
		else if (countResult.accept == wasteAirMarkerArr.length) return {
			status: 'accept',
			sentence: '监测点废气排放均正常'
		};
		else return {
			status: 'invalid',
			sentence: '存在' + countResult.invalid + '个监测点数据未更新'
		};
	};

	//废气排放 监测点状态获取
	function getWasteAirMonitorStatus(wasteAirMarkerArrOne) {
		var indexStatusList = {
			index_smoke: getStatusAsc(wasteAirMarkerArrOne.index_smoke[5], airPollutionSmokeScan.scan, '烟尘浓度').status,
			index_so2: getStatusAsc(wasteAirMarkerArrOne.index_so2[5], airPollutionSo2Scan.scan, '二氧化硫浓度').status,
			index_no: getStatusAsc(wasteAirMarkerArrOne.index_no[5], airPollutionNoScan.scan, '氮氧化物浓度').status,
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
	}


	//废气排放一句话处理
	function wasteAirOneSentenceProcess(indexOne, wasteAirMarkerArr) {
		var countResult = {
			accept: 0,
			caution: 0,
			take_action: 0,
			invalid: 0
		};
		if (indexOne == '废气排放量') {

		} else if (indexOne == '烟尘浓度') {
			var statusTemp = [];
			for (var i = 0; i < wasteAirMarkerArr.length; i++) {
				statusTemp.push(getStatusAsc(wasteAirMarkerArr[i].index_smoke, airPollutionSmokeScan.scan, '烟尘浓度'));
			}
			for (var i = 0; i < statusTemp.length; i++) {
				if (statusTemp[i].status == 'caution') countResult.caution += 1;
				else if (statusTemp[i].status == 'accept') countResult.accept += 1;
				else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
				else countResult.invalid += 1;
			}
		} else if (indexOne == '二氧化硫浓度') {
			var statusTemp = [];
			for (var i = 0; i < wasteAirMarkerArr.length; i++) {
				statusTemp.push(getStatusAsc(wasteAirMarkerArr[i].index_so2, airPollutionSo2Scan.scan, '二氧化硫浓度'));
			}
			for (var i = 0; i < statusTemp.length; i++) {
				if (statusTemp[i].status == 'caution') countResult.caution += 1;
				else if (statusTemp[i].status == 'accept') countResult.accept += 1;
				else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
				else countResult.invalid += 1;
			}
		} else if (indexOne == '氮氧化物浓度') {
			var statusTemp = [];
			for (var i = 0; i < wasteAirMarkerArr.length; i++) {
				statusTemp.push(getStatusAsc(wasteAirMarkerArr[i].index_no, airPollutionNoScan.scan, '氮氧化物浓度'));
			}
			for (var i = 0; i < statusTemp.length; i++) {
				if (statusTemp[i].status == 'caution') countResult.caution += 1;
				else if (statusTemp[i].status == 'accept') countResult.accept += 1;
				else if (statusTemp[i].status == 'take_action') countResult.take_action += 1;
				else countResult.invalid += 1;
			}
		}
		return countResult;
	}


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
				if (type == 'airQuality') {
					info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
					info.push("<tr><td>AQI</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + markerArr[i].index_aqi + "</span></td></tr>");
					info.push("<tr><td>空气质量等级</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + markerArr[i].index_level + "级</span></td></tr>");
					info.push("<tr><td>首要污染物</td><td>" + markerArr[i].index_firstElement + "</td></tr>");
					info.push("<tr><td>监测站状态</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + getChineseStatus(markerArr[i].monitor_status) + "</span></td></tr>");
					info.push("</table></div></div>");
				} else if (type == 'airCondition') {
					info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
					info.push("<tr><td>气温</td><td><span class=\"label " + getLabelCss(AirConditionStatusTemperature(markerArr[i].index_temperature).status) + "\">" + markerArr[i].index_temperature + "℃</span></td></tr>");
					info.push("<tr><td>湿度</td><td><span class=\"label " + getLabelCss(AirConditionStatusHumidity(markerArr[i].index_humidity).status) + "\">" + markerArr[i].index_humidity + "%</span></td></tr>");
					info.push("<tr><td>风级</td><td><span class=\"label " + getLabelCss(AirConditionStatusWindlevel(markerArr[i].index_windLevel).status) + "\">" + markerArr[i].index_windLevel + "级</span></td></tr>");
					info.push("<tr><td>风向</td><td>" + markerArr[i].index_windDire + "</td></tr>");
					info.push("<tr><td>监测站状态</td><td><span class=\"label " + getLabelCss(markerArr[i].monitor_status) + "\">" + getChineseStatus(markerArr[i].monitor_status) + "</span></td></tr>");
					info.push("</table></div></div>");
				} else if (type == 'airPollution') {
					info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
					info.push("<tr><td>排放量</td><td>" + (markerArr[i].index_discharge[1] / 100000000).toFixed(2) + "亿m³</td></tr>");
					info.push("<tr><td>烟尘浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_smoke, airPollutionSmokeScan.scan, '烟尘浓度').status) + "\">" + (markerArr[i].index_smoke).toFixed(2) + "mg/m³</span></td></tr>");
					info.push("<tr><td>二氧化硫浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_so2, airPollutionSo2Scan.scan, '二氧化硫浓度').status) + "\">" + (markerArr[i].index_so2).toFixed(2) + "mg/m³</span></td></tr>");
					info.push("<tr><td>氮氧化物</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerArr[i].index_no, airPollutionNoScan.scan, '氮氧化物浓度').status) + "\">" + (markerArr[i].index_no).toFixed(2) + "mg/m³</span></td></tr>");
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
	function getTargetColor(num, target) {
		if (num <= target)
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
		if (data <= scan[0] && data >= 0) {
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
				sentence: indexName + '>' + scan[1] + '问题'
			}
		}
	}

	function getStatusAscIgnoreZero(data1, scan, indexName) {
		var data = parseFloat(data1);
		if (data <= scan[0] && data >= 0) {
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
				sentence: indexName + '>' + scan[1] + '问题'
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
				sentence: indexName + '<' + scan[1] + '问题'
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

	var getMomentCurrentDateTime = function(year, month, day, hour) {
		return new Date(year, month - 1, day, hour, 0, 0).getTime();
		//return moment(dateService.set_system_time()).toDate().getTime();
	};



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

	// /**
	//  * 页面初始化区
	//  * 有些图表的数据是在网页刷新时就请求到的
	//  **/

	// //空气质量 当天数据模块 初始化

	kpiDetailService.getLastestObject('AirQuality', ['date'], function(data) {
        var date = data.data.date;
        var datebaseLastestDate = moment(date).subtract(1, 'hours');
        var startTime = getSubstractDate(getCurrentDate(datebaseLastestDate), 11);
        var endTime = getCurrentDate(datebaseLastestDate);
        kpiDetailService.advancedQuery('AirQuality', {
			date: {
				value1: startTime,
				value2: endTime,
				queryType: 'bt',
				valueType: 'datte'
			},
			sort1: {
				key: 'airMonitor.id',
				sortType: 'asc'
			},
			sort2: {
				key: 'date',
				sortType: 'asc'
			}
		}, function(data) {
			airQualityCurrentSuccess(data);
			mapInit();
			addMarker(airQualityMarkerArr, 'airQuality');
			mapObj.setCenter(new AMap.LngLat(121.106661, 31.579533));
			mapObj.setZoom(11);
		});
		var airQulaityLastDate = {
			year: dateService.formatDateTime(endTime).slice(0, 4),
			month: dateService.formatDateTime(endTime).slice(5, 7),
			day: dateService.formatDateTime(endTime).slice(8, 10),
			hour: dateService.formatDateTime(endTime).slice(11, 13)
		};
		$scope.airQualityCurrentDateTime = airQulaityLastDate;
    });

	//废气排放 当天数据模块 初始化
	kpiDetailService.getLastestObject('AirPollution', ['date'], function(data) {
        var date = data.data.date;
        var datebaseLastestDate = moment(date);
        var startTime = getSubstractDate(getCurrentDateForDayData(datebaseLastestDate), 24 * 5);
        var endTime = getCurrentDateForDayData(datebaseLastestDate);
        kpiDetailService.advancedQuery('AirPollution', {
			date: {
				value1: startTime,
				value2: endTime,
				queryType: 'bt',
				valueType: 'datte'
			},
			sort1: {
				key: 'airPollutionSource.id',
				sortType: 'asc'
			},
			sort2: {
				key: 'date',
				sortType: 'asc'
			}
		}, wasteAirCurrentSuccess);
		var wasteAirLastDate = {
			year: dateService.formatDateTime(endTime).slice(0, 4),
			month: dateService.formatDateTime(endTime).slice(5, 7),
			day: dateService.formatDateTime(endTime).slice(8, 10),
			hour: dateService.formatDateTime(endTime).slice(11, 13)
		};
		$scope.wasteAirCurrentDateTime = wasteAirLastDate;
    });
	
});