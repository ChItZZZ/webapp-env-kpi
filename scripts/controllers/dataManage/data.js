'use strict';
/**
 * @ngdoc function
 * @name dataManagerApp.controller:DataCtrl
 * @description # DataCtrl Controller of the dataManagerApp
 */
angular.module('app').controller('DataCtrl', function($upload, $localStorage, $scope, qService, $state,tableFactory, inform, dataDetailFactory) {
    /*
     *相关变量
     */
    /*inform提示框时间设置*/
    var error_conf = {
        ttl: 4000
    };
    //分页数据对象
    $scope.pageInfo = {
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0
    };
    //通过路径获得需要显示的数据库表的具体信息
    $scope.currTableName = $state.params.table;
    /*
     *相关函数方法
     */
    /*刷新页面*/
    $scope.reloadData = function() {
        $state.go($state.current, {
            table: $scope.currTableName
        }, {
            reload: true
        });
    };
    $scope.pageChange = function() {
        if (loadFlag == 0) {
            $scope.loadData($scope.currTable.dateType);
        } else if (loadFlag == 1) {
            $scope.loadDataAdvanced($scope.currTable.dateType, $scope.queryArr);
        }
    };
    var loadFlag = 0;
    /*获取对应表信息*/
    $scope.loadData = function(dateType) {
        if($scope.currTableName == 'TrnspPrjctPrgrsData'){
          $scope.loadTrnspPrjctData();
        }
        loadFlag = 0;
        var promiseLoadData = qService.tokenHttpPost(dataDetailFactory.pageAdvancedQuery, {
            tableName: $scope.currTableName,
            pageSize: $scope.pageInfo.pageSize,
            pageNumber: $scope.pageInfo.pageNumber
        }, getDateSortObject(dateType));
        promiseLoadData.then(function(data) {
            $scope.dataList = data.data;
            $scope.pageInfo.totalItems = data.totalItemNum;
        });
    };
    /*高级查询*/
    $scope.loadDataAdvanced = function(dateType, queryArr) {
        loadFlag = 1;
        var promiseLoadDataAdvanced = qService.tokenHttpPost(dataDetailFactory.pageAdvancedQuery, {
            tableName: $scope.currTableName,
            pageSize: $scope.pageInfo.pageSize,
            pageNumber: $scope.pageInfo.pageNumber
        }, getAdvancedConfig(getDateSortObject(dateType), queryArr));
        promiseLoadDataAdvanced.then(function(data) {
            $scope.dataList = data.data;
            $scope.pageInfo.totalItems = data.totalItemNum;
        });
    };
    var getAdvancedConfig = function(dateSortObject, queryArr) {
        var result = dateSortObject;
        for (var i = 0; i < queryArr.length; i++) {
            var columnObject = getColumnObjectFromName(queryArr[i].index.name, $scope.allColumns);
            if (columnObject.valueType == 'dict' && queryArr[i].queryType == 'eq') {
                var dictDatas = columnObject.columnInfo.dictType.dictDatas;
               // alert(dictDatas);
                for (var j = 0; j < dictDatas.length; j++) {
                    if (queryArr[i].value1.id == dictDatas[j].id) result[queryArr[i].index.name] = {
                        value1: dictDatas[j].id,
                        queryType: queryArr[i].queryType,
                        valueType: getBasicTypeString('dict')
                    }
                   // alert(dictDatas[j].id);
                }
            
            } else {
                result[queryArr[i].index.name] = {
                    value1: queryArr[i].value1,
                    value2: queryArr[i].value2,
                    queryType: queryArr[i].queryType,
                    valueType: getBasicTypeString(columnObject.valueType)
                }
            }
        }
        return result;
    };
    var getColumnObjectFromName = function(name, allColumns) {
        for (var i = 0; i < allColumns.length; i++) {
            if (name == allColumns[i].name) {
                return allColumns[i];
            }
        }
        return null;
    };
    var getBasicTypeString = function(s) {
        switch (s) {
            case 'ddouble':
                return 'doubble';
                break;
            case 'iint':
                return 'innt';
                break;
            case 'sstring':
                return 'str';
                break;
            case 'ddate':
                return 'datte';
                break;
            case 'llong':
                return 'lonng';
                break;
            case 'enum':
                return 'enum';
                break;
            case 'dict':
                return 'dict';
                break;
            default:
                return 'dft';
                break;
        }
    };
    /*页面初始化*/
    var pageInit = function() {
        if ($scope.currTableName) {
            if (!$scope.$parent.tableList) {
                var promiseLoadTableData1 = qService.tokenHttpGet(tableFactory.allTable, null);
                promiseLoadTableData1.then(function(data) {
                    $scope.tableList = data.data;
                    console.log(data.data);
                    angular.forEach($scope.tableList, function(tableItem) {
                        if (tableItem.table.name === $scope.currTableName) {
                            $scope.currTable = tableItem.table;
                            $scope.currTableEditStatus = tableItem.authority;
                            $scope.currTable.columns = columnSortProcess($scope.currTable.columns);
                            $scope.currDateTypeArr = getDateTypeColumnArr($scope.currTable.dateType);
                            $scope.allColumns = getAllColumns($scope.currDateTypeArr, $scope.currTable.columns);
                            $scope.loadData($scope.currTable.dateType);
                        }
                    });
                });
            } else {
                $scope.tableList = $scope.$parent.tableList;
                angular.forEach($scope.tableList, function(tableItem) {
                    if (tableItem.table.name === $scope.currTableName) {
                        $scope.currTable = tableItem.table;
                        $scope.currTableEditStatus = tableItem.authority;
                        $scope.currTable.columns = columnSortProcess($scope.currTable.columns);
                        $scope.currDateTypeArr = getDateTypeColumnArr($scope.currTable.dateType);
                        $scope.allColumns = getAllColumns($scope.currDateTypeArr, $scope.currTable.columns);
                        $scope.loadData($scope.currTable.dateType);
                    }
                });
            }
        }
    };
    /*column排序*/
    var columnSortProcess = function(columns) {
        columns.sort(columnSort);
        return columns;
    };
    var columnSort = function(a, b) {
        return a.sortOrder - b.sortOrder;
    };
    /*获取日期加其他属性完整column*/
    var getAllColumns = function(dateTypeArr, columns) {
        var result = [];
        for (var i = 0; i < dateTypeArr.length; i++) {
            result.push({
                name: dateTypeArr[i],
                description: $scope.getChineseDateString(dateTypeArr[i]),
                valueType: 'iint',
                columnInfo: {}
            })
        }
        for (var j = 0; j < columns.length; j++) {
            result.push({
                name: columns[j].name,
                description: columns[j].description,
                valueType: columns[j].type,
                columnInfo: columns[j]
            })
        }
        return result;
    };
    /*各种日期处理*/
    $scope.getChineseDateString = function(dateString) {
        switch (dateString) {
            case 'year':
                return '年';
                break;
            case 'month':
                return '月';
                break;
            case 'day':
                return '日';
                break;
            case 'hour':
                return '时';
                break;
        }
    };
    var getDateTypeColumnArr = function(dateType) {
        switch (dateType) {
            case 'year':
                return ['year'];
                break;
            case 'month':
                return ['year', 'month'];
                break;
            case 'day':
                return ['year', 'month', 'day'];
                break;
            case 'hour':
                return ['year', 'month', 'day', 'hour'];
                break;
        }
    };




    /*
    添加数据时，会有时间选择的插件
    函数的作用就是判断当前表里的数据时年数据、月数据，还是天数据或者小时数据
    然后根据不同的数据类型，加载不一样的时间插件
    */
    var getDateObjectArr = function(date, dateType) {
        switch (dateType) {
            case 'year':
                return [{
                    index: 'year',
                    value: date.getFullYear()
                }, {
                    index: 'applyTime',
                    value: moment(date.getFullYear() + '-'+'01'+ '-01').toDate().getTime()
                }];
                break;
            case 'month':
                return [{
                    index: 'year',
                    value: date.getFullYear()
                }, {
                    index: 'month',
                    value: date.getMonth() + 1
                }, {
                    index: 'applyTime',
                    value: moment(date.getFullYear() + '-' + (date.getMonth() + 1) + '-01').toDate().getTime()
                }];
                break;
            case 'day':
                return [{
                    index: 'year',
                    value: date.getFullYear()
                }, {
                    index: 'month',
                    value: date.getMonth() + 1
                }, {
                    index: 'day',
                    value: date.getDate()
                }, {
                    index: 'date', //date属性是因为环保模块的历史原因，功能同applyTime
                    value: moment(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toDate().getTime()
                }, {
                    index: 'applyTime',
                    value: moment(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toDate().getTime()
                }];
                break;
            case 'hour':
                return [{
                    index: 'year',
                    value: date.getFullYear()
                }, {
                    index: 'month',
                    value: date.getMonth() + 1
                }, {
                    index: 'day',
                    value: date.getDate()
                }, {
                    index: 'hour',
                    value: date.getHours()
                }, {
                    index: 'date',
                    value: moment(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours()).toDate().getTime()
                }, {
                    index: 'applyTime',
                    value: moment(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours()).toDate().getTime()
                }];
                break;
        }
    };
    $scope.getDateString = function(date, type) {
        switch (type) {
            case 'year':
                $scope.dateMinMode = 'year';
                $scope.dateMaxMode = 'year';
                return date.getFullYear();
                break;
            case 'month':
                $scope.dateMinMode = 'month';
                $scope.dateMaxMode = 'year';
                return date.getFullYear() + '-' + (date.getMonth() + 1);
                break;
            case 'day':
                $scope.dateMinMode = 'day';
                $scope.dateMaxMode = 'year';
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                break;
            case 'hour':
                $scope.dateMinMode = 'day';
                $scope.dateMaxMode = 'year';
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                break;
        }
    };
    $scope.getDateFormat = function(currTable, dataItem) {
        switch (currTable.dateType) {
            case 'year':
                return dataItem.year;
                break;
            case 'month':
                return dataItem.year + '-' + dataItem.month;
                break;
            case 'day':
                return dataItem.year + '-' + dataItem.month + '-' + dataItem.day;
                break;
            case 'hour':
                return dataItem.year + '-' + dataItem.month + '-' + dataItem.day + ' ' + dataItem.hour + ':00:00';
                break;
        }
    };
    var getDateSortObject = function(dateType) {
        switch (dateType) {
            case 'year':
                return {
                    sort1: {
                        key: "year",
                        sortType: "desc"
                    }
                };
                break;
            case 'month':
                return {
                    sort1: {
                        key: "year",
                        sortType: "desc"
                    },
                    sort2: {
                        key: "month",
                        sortType: "desc"
                    }
                };
                break;
            case 'day':
                return {
                    sort1: {
                        key: "year",
                        sortType: "desc"
                    },
                    sort2: {
                        key: "month",
                        sortType: "desc"
                    },
                    sort3: {
                        key: "day",
                        sortType: "desc"
                    }
                };
                break;
            case 'hour':
                return {
                    sort1: {
                        key: "year",
                        sortType: "desc"
                    },
                    sort2: {
                        key: "month",
                        sortType: "desc"
                    },
                    sort3: {
                        key: "day",
                        sortType: "desc"
                    },
                    sort4: {
                        key: "hour",
                        sortType: "desc"
                    }
                };
                break;
        }
    };
    /*获取最小宽度*/
    $scope.getMinWidth = function(width) {
        var widthpx = width + 'px';
        return {
            'min-width': widthpx
        };
    };
    /*获取字段加单位*/
    $scope.getColumnNameUnit = function(column) {
            if (column.unit) {
                return column.abbr + '(' + column.unit + ')';
            } else {
                return column.abbr;
            }
        }
        /*判断是否为字典*/
    $scope.getDictNameOrData = function(dataItem, column) {
        if (column.type == 'dict') {
            return dataItem[column.name].name;
        } else if (column.type == 'TrnspPrjctPrgrsData') {
            return dataItem[column.name].prjctName;
        } else if (column.type == 'bboolean') {
            return getBooleanChinese(dataItem[column.name]);
        } else {
            return dataItem[column.name];
        }
    };
    /*boolean类型属性特殊处理*/
    var getBooleanChinese = function(status) {
        if (true == status) return '是';
        else if (false == status) return '否';
        else return null;
    };
    $scope.getBooleanChinese = getBooleanChinese;
    $scope.booelanArr = [true, false];
    /*获取对应表信息*/
    $scope.loadTrnspPrjctData = function() {
        loadFlag = 0;
        var promiseLoadData = qService.tokenHttpPost(dataDetailFactory.pageAdvancedQuery, {
            tableName: 'TrnspInfstPrjctData',
            pageSize: 200,
            pageNumber: 1
        }, {
            // "completed": {
            //     "value1": false,
            //     "queryType": "eq",
            //     "valueType": "boolean"
            // }
        });
        promiseLoadData.then(function(data) {
            $scope.trnspPrjctDataList = data.data;
        });
    };
    /*获取字典列表*/
    $scope.addDataTempDate = {
        date: new Date()
    };
    $scope.addDataTemp = {};
    /*添加数据*/
    $scope.addData = function() {
        $scope.addDataTempDate = {
            date: new Date()
        };
        $scope.addDataTemp = {};
        var columns = $scope.currTable.columns;
        for (var i = 0; i < columns.length; i++) {
            $scope.addDataTemp[columns[i].name] = null;
        }
        $('#addDataModal').modal('show');
    };
    /*点击添加数据时会弹出对话框，对话框最下面有两个按钮，点击添加时，对话框会关闭，然后弹出确认添加数据的对话框*/
    $scope.addDataPre = function() {
        $('#addDataModal').modal('hide');
        $('#addDataConfirm').modal('show');
    };
    $scope.addDataCancel = function() {
        $('#addDataConfirm').modal('hide');
        $('#addDataModal').modal('show');
    };

    /* 真正处理数据添加的函数*/
    $scope.addDataProcess = function() {
        var dateArr = getDateObjectArr($scope.addDataTempDate.date, $scope.currTable.dateType);
        for (var i = 0; i < dateArr.length; i++) {
            $scope.addDataTemp[dateArr[i].index] = dateArr[i].value;
        }


        var promiseAddData = qService.tokenHttpPost(dataDetailFactory.addData, {tableName: $scope.currTableName,}, $scope.addDataTemp);


        promiseAddData.then(function(data) {
            inform.add('添加数据成功', error_conf);
            pageInit();
        });
    };



    /*更新数据*/
    $scope.updateDataTemp = {};
    $scope.updateData = function(dataItem) {
        $scope.updateDataTemp = {};
        var columns = $scope.currTable.columns;
        $scope.updateDataTemp = angular.copy(dataItem);
        $('#updateDataModal').modal('show');
    };
    $scope.updateDataPre = function() {
        $('#updateDataModal').modal('hide');
        $('#updateDataConfirm').modal('show');
    };
    $scope.updateDataCancel = function() {
        $('#updateDataConfirm').modal('hide');
        $('#updateDataModal').modal('show');
    };
    $scope.updateDataProcess = function() {
        var promiseUpdateData = qService.tokenHttpPut(dataDetailFactory.dataURD, {
            tableName: $scope.currTableName,
            id: $scope.updateDataTemp.id
        }, $scope.updateDataTemp);
        promiseUpdateData.then(function(data) {
            inform.add('更新数据成功', error_conf);
            pageInit();
        });
    };
    /*删除数据*/
    $scope.deleteDataTemp = null;
    $scope.deleteData = function(dataItem) {
        $scope.deleteDataTemp = dataItem;
        $('#deleteDataConfirm').modal('show');
    };
    $scope.deleteDataProcess = function() {
        var promiseDelData = qService.tokenHttpDelete(dataDetailFactory.dataURD, {
            tableName: $scope.currTableName,
            id: $scope.deleteDataTemp.id
        }, null);
        promiseDelData.then(function(data) {
            inform.add('删除数据成功', error_conf);
            pageInit();
        });
    };
    /*高级查询*/
    $scope.queryData = function() {
        $('#queryDataModal').modal('show');
    };
    $scope.getQueryTypeChineseName = function(queryType) {
        switch (queryType) {
            case 'gt':
                return '大于';
                break;
            case 'gte':
                return '大于等于';
                break;
            case 'eq':
                return '等于';
                break;
            case 'lt':
                return '小于';
                break;
            case 'lte':
                return '小于等于';
                break;
            case 'bt':
                return '介于';
                break;
        }
    };
    $scope.queryTypeArr = ['gt', 'gte', 'eq', 'lt', 'lte', 'bt'];
    $scope.queryArr = [{
        index: '',
        queryType: '',
        value1: null,
        value2: null
    }];
    $scope.queryArrDelete = function(queryOne) {
        var index = null;
        for (var i = 0; i < $scope.queryArr.length; i++) {
            if ($scope.queryArr[i] == queryOne) index = i;
        }
        $scope.queryArr.splice(index, 1);
    };
    $scope.queryArrAdd = function() {
        $scope.queryArr.push({
            index: {
                name: '',
                description: ''
            },
            queryType: '',
            value1: null,
            value2: null
        });
    };
    $scope.queryDataProcess = function() {
        $('#queryDataModal').modal('hide');
        $scope.pageInfo.pageNumber = 1;
        $scope.loadDataAdvanced($scope.currTable.dateType, $scope.queryArr);
    };
    $scope.queryOneReset = function(queryOne) {
        queryOne.queryType = '';
        queryOne.value1 = null;
        queryOne.value2 = null;
    };
    /*批量导入数据*/
    $scope.addBatchDataTemp = [{
        name: '点击上传'
    }];
    $scope.addBatchData = function() {
        $scope.addBatchDataTemp = [{
            name: '点击上传'
        }];
        $('#addBatchDataModal').modal('show');
    };
    $scope.addBatchDataPre = function() {
        $('#addBatchDataModal').modal('hide');
        $('#addBatchDataConfirm').modal('show');
    };
    $scope.addBatchDataCancel = function() {
        $('#addBatchDataConfirm').modal('hide');
        $('#addBatchDataModal').modal('show');
    };
    $scope.addBatchDataProcess = function() {
        $('#addBatchDataConfirm').modal('hide');
        $scope.upload($scope.addBatchDataTemp);
    };
    // $scope.$watch('files', function() {
    //   $scope.upload($scope.files);
    // });
    $scope.getLoadFile = function(files) {
        $scope.addBatchDataTemp = files;
    };
    $scope.upload = function(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'api/data/' + $scope.currTableName + '/batch',
                    headers: {
                        'x-auth-token': $localStorage.token
                    },
                    file: file,
                    fileFormDataName: 'data'
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    ////console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    inform.add('上传成功', error_conf);
                }).error(function() {
                    inform.add('上传失败', error_conf);
                });
            }
        }
    };
    /*
     *页面初始化
     *
     */
    pageInit();
});
