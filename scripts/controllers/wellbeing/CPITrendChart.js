'use strict'

angular.module('app').controller('CPIDataController', function($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) {
/*******************************************************************************
                              VARIABLE AREA
*******************************************************************************/
  var CURRENT_YEAR
  var LAST_YEAR
  var yearMonthList = new Array()
  var monthList = new Array(12)
  var dayList = new Array()

  $scope.currentCategory = "食品类"
  $scope.tabMapData = [{
    id: "tab_CPI",
    label: "居民消费价格指数",
    name: "cpi",
    active: false
  }, {
    id: "tab_DailyPrice",
    label: "农副产品市场价格",
    name: "dailyPrice",
    active: false
  }]

  $scope.tabChangeFunction = function(tab_name) {
    switch (tab_name) {
      case $scope.tabMapData[0].name:
        initCpiTrendHighChart()
        $("#cpi_container").show()
        $("#daily_price_container").hide()
        $scope.current_tab_label = $scope.tabMapData[0].label
        $scope.tabMapData[0].active = true
        break
      case $scope.tabMapData[1].name:
        $scope.initFoodPriceHighChart()
        $("#cpi_container").hide()
        $("#daily_price_container").show()
        $scope.current_tab_label = $scope.tabMapData[1].label
        $scope.tabMapData[1].active = true
        break
    }
  }

/*******************************************************************************
                HIGHCHART CONFIGURATION AREA
*******************************************************************************/
function splineHighChart(height, categories, callFunc) {
  this.options = {
    colors: generalService.lineColors(),
    credits: {
      enabled: false
    },
    chart: {
      type: 'spline',
    },
    title: {
      text: ""
    },
    // subtitle: {
    //   text: "————红线代表目标值"
    // },
    xAxis: {
      categories: categories,
      labels: {
        rotation: -45,
        align: 'right',
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      },
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: '价格指数'
      },
      labels: {
        formatter: function() {
          return this.value
        }
      },
      plotLines: [{
        color: 'red', // 线的颜色，定义为红色
        dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
        value: 100, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
        width: 2, // 标示线的宽度，2px
        label: {
                text: '参考值',
                verticalAlign: 'bottom',
                textAlign: 'right',
                y: -10,
                x: 40
            }
      }]
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
    },
    plotOptions: {
      spline: {
        cursor: 'pointer',
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        },
        events: {
          click: function(event) {
            var clickYear = new Number(event.point.category.slice(0, 4))
            var clickMonth = new Number(event.point.category.slice(5, 7))
            $scope.$apply(callFunc(clickYear.valueOf(), clickMonth.valueOf()))
          }
        },
      },
    }
  },
  this.series = [],
  this.size = {
    // width: 200,
    height: height
  }
}

function columnHighChart(height, categories, callFunc) {
  this.options = {
    colors: generalService.columnColors().slice(0,2),
    chart: {
      type: 'column',
    },
    title: {
      text: ""
    },
    subtitle: {
      text: "——红线代表参考值"
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        formatter: function() {
          return this.value + ''
        }
      },
      plotLines: [{
        color: 'red', // 线的颜色，定义为红色
        dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
        value: 100.00, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
        width: 2, // 标示线的宽度，2px
      }],
      min: 90

    },
    legend: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        cursor: 'pointer',
        point: {
          events: {
            click: function(event) {
              var category = this.category
              if (category.substr(-1) != '类') {

              } else {
                if ($scope.currentCategory != category) {
                  $scope.currentCategory = category
                  $scope.$apply(callFunc(category, $scope.thisMonth))
                }
              }
            }
          }
        }
      },
      series: {
        dataLabels: {
          enabled: false,
          rotation: 270,
          format: '{y:.2f}%',
          color: '#000000',
          align: 'right',
          x: 4,
          y: -18,
          style: {
            fontSize: '14px',
            fontFamily: 'Verdana, sans-serif',
            fontWeight: 'bold'
          }
        },
      }
    },
  }
  this.series = []
  this.size = {
    // width: 200,
    height: height
  }
}

function lineHighChart(title, xAxis, step, height) {
  this.options = {
    colors: new Array('#3333CC', '#336633', '#336666', '#336699', '#3366CC', '#339933', '#339966', '#339999', '#3399CC', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#663333', '#663366', '#663399', '#6633CC', '#666633', '#666666', '#666699', '#6666CC', '#669933', '#669966', '#669999', '#6699CC', '#66CC33', '#66CC66', '#66CC99', '#66CCCC', '#993333', '#993366', '#993399', '#9933CC', '#996633', '#996666', '#996699', '#9966CC', '#999933', '#999966', '#999999', '#9999CC', '#99CC33', '#99CC66', '#99CC99', '#99CCCC', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC6633', '#CC6666', '#CC6699', '#CC66CC', '#CC9933', '#CC9966', '#CC9999', '#CC99CC', '#CCCC33', '#CCCC66', '#CCCC99', '#CCCCCC'),
    credits: {
      enabled: false
    },
    title: {
      text: title,
      x: -20 //center
    },
    subtitle: {
      text: "",
      x: -20
    },
    xAxis: {
      categories: xAxis,
      labels: {
        step: step
      },
      tickmarkPlacement: 'on',
      title: {
        text: '天'
      },
    },
    yAxis: {
      title: {
        text: '价格（元/500克）'
      },
    },
    tooltip: {
      valueSuffix: ' 元/500克'
    },
    legend: {
      enabled: true
    },
    noData: {
      position: {
        "x": 0,
        "y": 0,
        "align": "center",
        "verticalAlign": "middle"
      },
      style: {
        "fontSize": "18px",
        "fontWeight": "bold",
        "color": "#60606a",
        "text-indent": "1em"
      }
    }
  }
  this.series = []
  this.size = {
    // width: 200,
    height: height
  }
}

/*******************************************************************************
                      HIGHCHART FUNCTION AREA
*******************************************************************************/
  function callFunctionInCpiTrend(year, month) {
    initCpiTrendDetailHighChart(month)
    initCpiCategoryHighChart(year, month)
    callFunctionInCpiCategory("食品类", month)
  }

  function callFunctionInCpiCategory(name, month) {
    var PIArray, detailArray
    switch(name) {
      case "食品类":
        PIArray = $scope.CPIDATA.FPIList
        detailArray = $scope.CPIDATA.FPIDetailList
        break
      case "烟酒及用品类":
        PIArray = $scope.CPIDATA.TLPIList
        detailArray = $scope.CPIDATA.TLPIDetailList
        break
      case "衣着类":
        PIArray = $scope.CPIDATA.UPIList
        detailArray = $scope.CPIDATA.UPIDetailList
        break
      case "家庭设备用品及维修服务类":
        PIArray = $scope.CPIDATA.HAPIList
        detailArray = $scope.CPIDATA.HAPIDetailList
        break
      case "医疗保健和个人用品类":
        PIArray = $scope.CPIDATA.MPIList
        detailArray = $scope.CPIDATA.MPIDetailList
        break
      case "交通和通讯类":
        PIArray = $scope.CPIDATA.TPIList
        detailArray = $scope.CPIDATA.TPIDetailList
        break
      case "娱乐教育文化用品及服务类":
        PIArray = $scope.CPIDATA.EPIList
        detailArray = $scope.CPIDATA.EPIDetailList
        break
      case "居住类":
        PIArray = $scope.CPIDATA.RPIList
        detailArray = $scope.CPIDATA.RPIDetailList
        break
    }
    initCpiCategoryTrendHighChart(PIArray)
    initCpiCategoryTrendDetailHighChart(month, detailArray)
  }

  function callFunctionInCategoryTrend(year, month) {
    initCpiCategoryTrendDetailHighChart(month, $scope.CPIDATA.FPIDetailList)
  }

/*******************************************************************************
                          FUNCTION AREA
*******************************************************************************/
  function getCPIDataAll() {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [LAST_YEAR, CURRENT_YEAR]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'month',
        sortType: 'asc'
      },
      sort3: {
        key: 'cpiType',
        sortType: 'asc'
      }
    }

    var CPIDATAPOST = qService.tokenHttpPost(dataDetailFactory.advancedQuery, {
      tableName: 'CPIData'
    }, queryMap)

    CPIDATAPOST.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data
      var PIArray, detailArray,currentObj, detailIndex, currentCpi, accumulatedCpi, monthIndex
      for (var i=0; i < dataList.length; i++) {
        currentObj = dataList[i]
        monthIndex = currentObj.month - 1
        detailIndex = (currentObj.year - LAST_YEAR)*12 + monthIndex
        currentCpi = currentObj.currentCpi
        accumulatedCpi = currentObj.accumulatedCpi
        if (currentObj.cpiType.name != "居民消费价格指数") {
          if (detailIndex == 0) { // 8 表示八大类消费价格指数
            $scope.CPIDATA.columnXAxis.push(currentObj.cpiName)
          }
          $scope.CPIDATA.DetailList.data[detailIndex].data[0].data.push(currentCpi)
          $scope.CPIDATA.DetailList.data[detailIndex].data[1].data.push(accumulatedCpi)
        }
        switch(currentObj.cpiType.name) {
          case "居民消费价格指数":
            PIArray = $scope.CPIDATA.CPIList
            detailArray = $scope.CPIDATA.CPIDetailList
            break
          case "食品类":
            PIArray = $scope.CPIDATA.FPIList
            detailArray = $scope.CPIDATA.FPIDetailList
            break
          case "烟酒及用品类":
            PIArray = $scope.CPIDATA.TLPIList
            detailArray = $scope.CPIDATA.TLPIDetailList
            break
          case "衣着类":
            PIArray = $scope.CPIDATA.UPIList
            detailArray = $scope.CPIDATA.UPIDetailList
            break
          case "家庭设备用品及维修服务类":
            PIArray = $scope.CPIDATA.HAPIList
            detailArray = $scope.CPIDATA.HAPIDetailList
            break
          case "医疗保健和个人用品类":
            PIArray = $scope.CPIDATA.MPIList
            detailArray = $scope.CPIDATA.MPIDetailList
            break
          case "交通和通讯类":
            PIArray = $scope.CPIDATA.TPIList
            detailArray = $scope.CPIDATA.TPIDetailList
            break
          case "娱乐教育文化用品及服务类":
            PIArray = $scope.CPIDATA.EPIList
            detailArray = $scope.CPIDATA.EPIDetailList
            break
          case "居住类":
            PIArray = $scope.CPIDATA.RPIList
            detailArray = $scope.CPIDATA.RPIDetailList
            break
        }
        PIArray.data[0].data.push(currentCpi)
        PIArray.data[1].data.push(accumulatedCpi)
        detailArray.data[monthIndex].data[0].data.push(currentCpi)
        detailArray.data[monthIndex].data[1].data.push(accumulatedCpi)
      }

      $scope.tabChangeFunction($scope.tabMapData[0].name)
    })
  }

  function initCpiTrendHighChart() {
    $scope.cpiHighChartOptions.cpiTrendOption.options.title.text = "太仓市" + LAST_YEAR + "~" + CURRENT_YEAR + "年度" + $scope.CPIDATA.CPIList.name + "趋势"
    $scope.cpiHighChartOptions.cpiTrendOption.series = $scope.CPIDATA.CPIList.data

    callFunctionInCpiTrend($scope.thisYear, $scope.thisMonth)
  }

  function initCpiCategoryHighChart(year, month) {
    $scope.cpiDataList = $scope.CPIDATA.DetailList.data[(year - LAST_YEAR)*12 + (month - 1)].data
    $scope.cpiHighChartOptions.categoryDetailOption.options.title.text = year + "年" + month + "月" + "太仓市各类别居民消费价格指数同比累计比"
    $scope.cpiHighChartOptions.categoryDetailOption.series = $scope.cpiDataList
  }

  function initCpiCategoryTrendHighChart(dataList) {
    $scope.cpiHighChartOptions.detailTrendOption.options.title.text = "太仓市" + LAST_YEAR + "~" + CURRENT_YEAR + "年度" + dataList.name + "居民消费价格指数趋势"
    $scope.cpiHighChartOptions.detailTrendOption.series = dataList.data
  }

  function initCpiTrendDetailHighChart(month) {
    $scope.cpiDetailDataList = $scope.CPIDATA.CPIDetailList.data[month - 1].data
    $scope.cpiDetailHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1]
    $scope.cpiDetailIndexList = $scope.cpiDetailHeaderList.length === 1 ? [0] : [0,1]
    $scope.cpiHighChartOptions.cpiTrendDetailOption.options.title.text = "数据对比"
    $scope.cpiHighChartOptions.cpiTrendDetailOption.series = $scope.cpiDetailDataList
    $scope.cpiHighChartOptions.cpiTrendDetailOption.options.xAxis.categories = $scope.cpiDetailHeaderList
  }

  function initCpiCategoryTrendDetailHighChart(month, dataList) {
    $scope.detailTrendDataList = dataList.data[month - 1].data
    $scope.detailTrendHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1]
    $scope.detailTrendIndexList = $scope.detailTrendHeaderList.length === 1 ? [0] : [0,1]
    $scope.cpiHighChartOptions.detailTrendDetailOption.options.title.text = "数据对比"
    $scope.cpiHighChartOptions.detailTrendDetailOption.series = $scope.detailTrendDataList
    $scope.cpiHighChartOptions.detailTrendDetailOption.options.xAxis.categories = $scope.detailTrendHeaderList
}

  function getFoodPriceDataAll(year, month, day, dayList) {
    var queryMap = {
      year: generalService.advanceQueryObj('eq', 'innt', [year]),
      month: generalService.advanceQueryObj('eq', 'innt', [month]),
      sort1: {
        key: 'subsidiaryFoodName',
        sortType: 'asc'
      },
      sort2: {
        key: 'day',
        sortType: 'asc'
      }
    }

    var SUBSIDIARYFOODPRICEDATA = qService.tokenHttpPost(dataDetailFactory.advancedQuery, {
      tableName: 'SubsidiaryFoodPriceData'
    }, queryMap)

    SUBSIDIARYFOODPRICEDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data
      var dataObject, SFArray, objectIndex, itemName, dataItem
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i]
        switch(dataObject.subsidiaryFoodTypeName) {
          case "粮食":
            SFArray = $scope.PRICEDATA.a_riceDataList
            break
          case "油脂":
            SFArray = $scope.PRICEDATA.b_oilDataList
            break
          case "肉禽及制品":
            SFArray = $scope.PRICEDATA.c_meatDataList
            break
          case "蛋":
            SFArray = $scope.PRICEDATA.d_eggDataList
            break
          case "水产品":
            SFArray = $scope.PRICEDATA.e_aquaticProductDataList
            break
          case "蔬菜":
            SFArray = $scope.PRICEDATA.f_vegetableDataList
            break
          case "干鲜瓜果":
            SFArray = $scope.PRICEDATA.g_fruitDataList
            break
          case "其他":
            SFArray = $scope.PRICEDATA.h_othersDataList
            break
        }
        itemName = dataObject.subsidiaryFoodName
        objectIndex = SFArray.nameList.indexOf(itemName)
        if (objectIndex === -1) {
          dataItem = new subsidiaryFoodDataObject(itemName, day)
          SFArray.nameList.push(itemName)
          SFArray.data.push(dataItem)
        } else {
          dataItem = SFArray.data[objectIndex]
        }
        dataItem.data[dayList.indexOf(pad(dataObject.day, 2))] = dataObject.price
      }
    })
  }

  $scope.initFoodPriceHighChart = function() {
    resetPRICEDATA()

    $scope.PRICEDATA.a_riceDataList.isCollapsed = true
    $scope.PRICEDATA.a_riceDataList.data[0].model = true
    $scope.foodPriceHighChartOption.series=[]
    $scope.foodPriceHighChartOption.series.push($scope.PRICEDATA.a_riceDataList.data[0])
  }

  $scope.checkBoxChange = function(item) {
    if (item.model) { // 选中的情况
      $scope.foodPriceHighChartOption.series.push(item)
    } else { // 取消选中的情况
      var index = $scope.foodPriceHighChartOption.series.indexOf(item)
      if (index > -1) {
        $scope.foodPriceHighChartOption.series.splice(index, 1)
      }
      var chart=$("#foodPriceHighChart").highcharts()
      if (chart.hasData()) {
        chart.hideNoData();
        chart.showNoData("未选中任何农副食品种类<br/>请在右侧选择您想查看的农副食品种类");
      }
    }
  }

  function resetPRICEDATA() {
    var tempFoodType
    for (tempFoodType in $scope.PRICEDATA) {
      $scope.PRICEDATA[tempFoodType].isCollapsed = false
      for (var i=0; i < $scope.PRICEDATA[tempFoodType].data.length; i++) {
        $scope.PRICEDATA[tempFoodType].data[i].model = false
      }
    }
  }
/*******************************************************************************
                              OBJECT AREA
*******************************************************************************/
  function columnDataObject(name) {
    this.data = new Array()
    this.name = name
  }

  function splineDataObject(name, symbol) {
    this.data = new Array()
    this.name = name
    this.marker ={symbol: symbol}
  }

  function splineListObject(name) {
    this.name = name
    this.data = [new splineDataObject("同比", "square"), new splineDataObject("累计比", "diamond")]
  }

  function columnListObject() {
    this.data = [new columnDataObject("同比"), new columnDataObject("累计比")]
  }

  function detailListObject(num) {
    var temp = new Array()
    for (var i=0; i < 12 + num; i++) {
      temp.push(new columnListObject())
    }
    this.data = temp
  }

  function subsidiaryFoodGroupObject(name) {
    this.name = name
    this.nameList = new Array()
    this.data = new Array()
    this.isCollapsed = false
  }

  function subsidiaryFoodDataObject(name, len) {
    this.name = name
    this.model = false
    var arr = new Array(len)
    for (var i=0; i<len; i++) {
      arr[i] = null
    }
    this.data = arr
  }

/*******************************************************************************
                          UTIL FUNCTION AREA
*******************************************************************************/
  function pad(num, size) {
      var s = num+""
      while (s.length < size) s = "0" + s
      return s
  }

/*******************************************************************************
                            INIT PART
*******************************************************************************/
  $http.post("/api/data/CPIData/lastestObject", ["year","month"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data))
    CURRENT_YEAR = latestObj.year
    LAST_YEAR = CURRENT_YEAR - 1

    $scope.thisYear = CURRENT_YEAR
    $scope.thisMonth = latestObj.month

    for (var i = 1; i <= 12; i++) {
      var item = LAST_YEAR + "年" + pad(i, 2) + "月"
      yearMonthList.push(item)
      monthList[i-1] = new Array()
      monthList[i-1].push(item)
    }
    for (var i = 1; i <= $scope.thisMonth; i++) {
      var item = CURRENT_YEAR + "年" + pad(i, 2) + "月"
      yearMonthList.push(item)
      monthList[i-1].push(item)
    }

    $scope.CPIDATA = {
      splineXAxis: yearMonthList,
      columnXAxis: new Array(),
      detailColumnXAxisList: monthList,
      CPIList: new splineListObject("居民消费价格指数"),
      FPIList: new splineListObject("食品类"),
      TLPIList: new splineListObject("烟酒及用品类"),
      UPIList: new splineListObject("衣着类"),
      HAPIList: new splineListObject("家庭设备用品及维修服务类"),
      MPIList: new splineListObject("医疗保健和个人用品类"),
      TPIList: new splineListObject("交通和通讯类"),
      EPIList: new splineListObject("娱乐教育文化用品及服务类"),
      RPIList: new splineListObject("居住类"),
      CPIDetailList: new detailListObject(0),
      FPIDetailList: new detailListObject(0),
      TLPIDetailList: new detailListObject(0),
      UPIDetailList: new detailListObject(0),
      HAPIDetailList: new detailListObject(0),
      MPIDetailList: new detailListObject(0),
      TPIDetailList: new detailListObject(0),
      EPIDetailList: new detailListObject(0),
      RPIDetailList: new detailListObject(0),
      DetailList: new detailListObject($scope.thisMonth)
    }

    $scope.cpiHighChartOptions = {
      cpiTrendOption: new splineHighChart(480, $scope.CPIDATA.splineXAxis, callFunctionInCpiTrend),
      cpiTrendDetailOption: new columnHighChart(250),
      categoryDetailOption: new columnHighChart(500, $scope.CPIDATA.columnXAxis, callFunctionInCpiCategory),
      detailTrendOption: new splineHighChart(480, $scope.CPIDATA.splineXAxis, callFunctionInCategoryTrend),
      detailTrendDetailOption: new columnHighChart(250)
    }

    getCPIDataAll()
  })

  $http.post("/api/data/SubsidiaryFoodPriceData/lastestObject", ["year","month","day"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data))
    var year = latestObj.year
    var month = latestObj.month
    var day = latestObj.day

    for (var i=1, monthDate = new Date(year, month-1, 1); i<= day; i++, monthDate.setDate(monthDate.getDate() + 1)) {
      if (monthDate.getDay()%6!=0) {
        dayList.push(pad(i, 2))
      }
    }
    var step = Math.floor(day / 7)
    if (step % 2 == 0) {
      step += 1
    }
    var chartTile = year + "年" + month + "月太仓市中心农贸市场农副产品市场价格走势详情"
    $scope.foodPriceHighChartOption = new lineHighChart(chartTile, dayList, step, 450)
    $scope.PRICEDATA = {
      a_riceDataList: new subsidiaryFoodGroupObject("粮食类"),              // 粮食       2650
      b_oilDataList: new subsidiaryFoodGroupObject("油脂类"),              // 油脂       2651
      c_meatDataList: new subsidiaryFoodGroupObject("肉禽及制品类"),        // 肉禽及制品  2652
      d_eggDataList: new subsidiaryFoodGroupObject("蛋类"),                // 蛋        2653
      e_aquaticProductDataList: new subsidiaryFoodGroupObject("水产品类"), // 水产品     2654
      f_vegetableDataList: new subsidiaryFoodGroupObject("蔬菜类"),        // 蔬菜       2655
      g_fruitDataList: new subsidiaryFoodGroupObject("干鲜瓜果类"),         // 干鲜瓜果    2656
      h_othersDataList: new subsidiaryFoodGroupObject("其他"),             // 其他       2657
    }

    getFoodPriceDataAll(year, month, day, dayList)
  })
})
