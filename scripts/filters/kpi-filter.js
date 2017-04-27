'use strict';

/**
 * @ngdoc filter
 * @name app.filter:kpiFilter
 * @function
 * @description
 * # kpiFilter
 * Filter in the app.
 */
angular.module('app')
  .filter('applyDateFilter', function() {
    function get_date(timestamp,type){
      var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
      var d = new Date(timestamp);
      var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
      if(type=='YEARLY'){
        return curr_year + "年";
      }else if(type=='MONTHLY'){
        return curr_year + "年" + m_names[curr_month] + "月份";
      }else if (type=='DAYLY'){
        return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日" ;
      }else{
        return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日";
      }
    }
    return function(kpi) {
      var type = kpi.type;
      var applyDate = kpi.data.applyDate;
      if(applyDate!=undefined){
        return get_date(applyDate, type);
      }else{
        return '无数据';
      }
    };
  })
  .filter('kpiTypeFilter', function() {
    return function(kpi) {
      if (kpi.type == 'MONTHLY') {
    	  if(kpi.name.indexOf('GDP')>0){return  '每季度';}
      else
        return '每月';
      } else if (kpi.type == 'YEARLY') {
        return '每年';
      } else if (kpi.type == 'DAILY') {
        return '每天';
      } else {
        return '未设置';
      }
    };
  }).filter('kpiStatusText', function() {
    return function(input) {
      switch (input) {
        case 'GREEN':
          return '可接受';
          break;
        case 'YELLOW':
          return '轻微问题';
          break;
        case 'RED':
          return '问题';
          break;
        case 'GRAY':
          return '数据未上报';
          break;
        default:
          return '数据未上报';
      };
    };
  }).filter('navCssStatus', function() {
    return function(input) {
      switch (input) {
        case 'GREEN':
          return 'accepted';
          break;
        case 'YELLOW':
          return 'warn';
          break;
        case 'RED':
          return 'take_action';
          break;
        case 'GRAY':
          return 'nodata';
          break;
        default:
          return 'nodata';
      };
    };
  })
  .filter('kpiStatusClass', function() {
    return function(input) {
      switch (input) {
        case 'GREEN':
          return 'label-success';
          break;
        case 'YELLOW':
          return 'label-warning';
          break;
        case 'RED':
          return 'label-danger';
          break;
        case 'GRAY':
          return 'label-default';
          break;
        default:
          return 'label-default';
      };
    };
  }).filter("categoryStatus", function() {
    var filter_status = function(status) {
      var btn_class = "";
      switch (status) {
        case 'GREEN':
          btn_class = 'btn-green';
          break;
        case 'YELLOW':
          btn_class = 'btn-orange';
          break;
        case 'RED':
          btn_class = 'btn-red';
          break;
        case 'GRAY':
          btn_class = 'btn-gray';
          break;
        default:
          btn_class = 'btn-gray';
          break;
      }
      return btn_class;
    }
    return filter_status;

  }).filter("targetType", function() {
    var type_value = function(data) {
      var value = "";
      switch (data) {
        case 'warn':
          value = '警戒值';
          break;
        case 'target':
          value = '目标值';
          break;
        case 'reference':
          value = '参考值';
          break;
        default:
          value = '目标值';
          break;
      }
      return value;
    };
    return type_value;
  }).filter("domainStatusHTML", function() {
    var filter_status = function(status) {
      var labelClass = "";
      var labelText = "数据未上报";
      if (status != undefined) {
        switch (status) {
          case 'GREEN':
            labelClass = 'label-success';
            labelText = "可接受";
            break;
          case 'YELLOW':
            labelText = "轻微问题";
            labelClass = 'label-warning';
            break;
          case 'RED':
            labelText = "问题";
            labelClass = 'label-danger';
            break;
          case 'GRAY':
            labelClass = 'label-default';
            break;
          default:
            labelClass = 'label-default';
            break;
        }
      } else {
        labelClass = 'label-default';
      }
      var rc = '<label class="label ' + labelClass + ' status">' + labelText + '</label>';
      return rc;
    };
    return filter_status;
  });