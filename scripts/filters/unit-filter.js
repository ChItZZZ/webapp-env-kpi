'use strict';

var UNIT_MAP = {
  'percentage': '%',
  'count': '个',
  'rmb': '元',
  'tt_rmb': '万元',
  'ttt_rmb': '千万元',
  'm_rmb': '百万元',
  'b_rmb': '亿元',
  'square_klo': '平方公里',
  'people': '人',
  'tt_people': '万人',
  'strip': '条',
  'nil': '',
  'paper': '张',
  'place': '处',
  'appear': '起',
  'ton_coal': '吨标准煤',
  'tom_coal_per_tt': '吨标准煤每万元',
  'kwh': '千瓦时',
  'rmb_per_5hg': '元/500g',
  'wkwh': '万千瓦时',
  'wton_coal': '万吨标准煤',
  'che': '车',
  'sui': '岁',
  'liang': '辆',
  'ton': '吨',
  'year': '年',
  'kilometer': '公里',
  'men': '门',
  'haktare': '公顷',
  'mu': '亩',
  'gb': 'G',
  'square_meter': '平方米',
  'dollor': '美元',
  'tt_dollor': '万美元',
  'm_dollor': '百万美元',
  'ttt_dollor': '千万美元',
  'b_dollor': '亿美元',
  'people_time': '人次',
  'car_time': '车次',
  'thoudsand_percentage': '‰',
  'hthoudsand_percetage': ' (十万分比)'
};
angular.module('app').filter("unit_trans", function() {
  function handlePercentageUnit(value, unit) {
    return (value * 100).toFixed(1) + ' ' + UNIT_MAP[unit];
  }
  function handleNormalUnit(value, unit) {
    return value + ' ' + UNIT_MAP[unit];
  }
  function handleTTTUnit(value, unit) {
    return (value / 10000000).toFixed(1) + ' ' + UNIT_MAP[unit];
  }
  function handleMUnit(value, unit) {
    return (value / 1000000).toFixed(1) + ' ' + UNIT_MAP[unit];
  }
  function handleBUnit(value, unit) {
    return (value / 100000000).toFixed(1) + ' ' + UNIT_MAP[unit];
  }
  function handleTTUnit(value, unit) {
    return (value / 10000).toFixed(1) + ' ' + UNIT_MAP[unit];
  }
  function handleThousandPercetage(value, unit) {
    return (value * 1000).toFixed(2) + ' ' + UNIT_MAP[unit];
  }

  var unitFilterFunc = function(entity) {
    var value;
    var unit;
    var result = '无数据';
    
    if (entity.data.value != undefined) {
      value = parseFloat(entity.data.value);
      unit = entity.data.unit;
      switch (unit) {
        case 'count':
        case 'rmb':
        case 'dollor':
        case 'square_klo':
        case 'strip':
        case 'rmb_per_5hg':
        case 'paper':
        case 'appear':
        case 'place':
        case 'people':
        case 'ton_coal':
        case 'tom_coal_per_tt':
        case 'kwh':
        case 'sui':
        case 'wkwh':
        case 'wton_coal':
        case 'che':
        case 'square_meter':
        case 'liang':
        case 'ton':
        case 'year':
        case 'kilometer':
        case 'men':
        case 'haktare':
        case 'mu':
        case 'gb':
        case 'people_time':
        case 'car_time':
        case 'hthoudsand_percetage':
        case 'nil':
          result = handleNormalUnit(value, unit);
          break;
        case 'thoudsand_percentage':
          result = handleThousandPercetage(value, unit);
          break;
        case 'percentage':
          result = handlePercentageUnit(value, unit);
          break;
        case 'tt_rmb':
          result = handleTTUnit(value, unit);
          break;
        case 'tt_dollor':
          result = handleTTUnit(value, unit);
          break;
        case 'tt_people':
          result = handleTTUnit(value, unit);
          break;
        case 'm_rmb':
          result = handleMUnit(value, unit);
          break;
        case 'ttt_rmb':
          result = handleTTTUnit(value, unit);
          break;
        case 'b_rmb':
          result = handleBUnit(value, unit);
          break;
        case 'm_dollor':
          result = handleMUnit(value, unit);
          break;
        case 'ttt_dollor':
          result = handleTTTUnit(value, unit);
          break;
        case 'b_dollor':
          result = handleBUnit(value, unit);
          break;
        default:
          result = '无数据';
      }
      return result;
    } else {
      return '无数据';
    }
  };
  return unitFilterFunc;
}).filter("unit_val", function() {
  var get_zn_value = function(key) {
    var val = UNIT_MAP[key];
    if (val != null || val != undefined) {
      return val;
    } else {
      return '';
    }
  }
  return get_zn_value;
}).filter("unsign_value", function() {
  var get_unsign_value = function(value) {
    if (value > 0) {
      return '+' + value;
    }
  }
  return get_unsign_value;
});