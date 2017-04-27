'use strict';

angular.module('app').service('dateService', function($localStorage) {
	var current_date = function() {
		return new Date();
	};
	var system_date = function() {
		var date = new Date();
		if ($localStorage.system_time != undefined) {
			date = new Date($localStorage.system_time);
		};
		return date;
	};

	this.curr_date = function() {
		return new Date();
	};

	this.get_system_time = function() {
		if ($localStorage.system_time == undefined) {
			$localStorage.system_time = current_date();
			return $localStorage.system_time;
		} else {
			return $localStorage.system_time;
		}
	};

	this.set_system_time = function(date) {
		$localStorage.system_time = date;
	};

	this.currentYearMonth = function() {
		var date = new Date();
		if ($localStorage.system_time != undefined) {
			date = new Date($localStorage.system_time);
		};
		var year = date.format('yyyy');
		var month = date.format('MM');
		var day = date.format('dd');
		//stub
		if (month == 2 && year >= 2015) {
			month = 1;
			day = 31;
		};
		return [year + "", month + "", day + ""];
	};

	this.formerYearMonth = function() {
		var curr = system_date();
		var year = curr.format('yyyy');
		var month = curr.format('MM');
		var day = curr.format('dd');
		//stub
		if (month == 2 && year >= 2015) {
			month = 1;
			day = 31;
		};
		if (month == 1) {
			year = year - 1;
			month = 12;
		} else {
			month = month - 1;
		}
		return [year + "", month + "", day];
	};



	this.minusOneYearMonth = function() {
		var date = new Date();
		var year = date.format('yyyy');
		var month = date.format('MM');
		var day = date.format('dd');
		if (month == 1) {
			return [year - 1, 12, 31];
		} else {
			return [year, month - 1, day];
		}
	};
	this.formatDateTime = function(str) {
		return (new Date(parseInt(str))).format("yyyy-MM-dd hh:mm:ss");
	};
	this.formatDate = function(date){
		return (new Date(date)).format("yyyy-MM-dd");
	};

	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};


});