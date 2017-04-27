'use strict';

angular.module('app').controller('trnspInfstCnstrCtrl', function($scope,dateService,kpiDetailService,inform,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/TrnspPrjctPrgrsData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		$scope.displayYear = new Date(recentTime).getFullYear();
	
		var startDate = dateService.formatDate(moment(recentTime).startOf('month')); // alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));  // alert(endDate);
		
		kpiDetailService.query('TrnspPrjctPrgrsData',startDate,endDate,notCompletedProcessFunction);
		kpiDetailService.query('TrnspPrjctPrgrsData','2008-01-01',endDate,completedProcessFunction);
	});
	
	//table data
	$scope.projectsUnderConstructionList=[];
	$scope.completedProjectList = [];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var notCompletedProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		var applyDate = new Date(data[data.length-1].applyTime);
		var finalMonth = applyDate.getMonth()+1;
		$scope.displayMonth = finalMonth;
		var finalList = [];
		var month;
		for(var i=0; i<data.length; i++){
			//var aa = new Date(data[i].applyTime);
		    month = new Date(data[i].applyTime).getMonth()+1;
			if(month==finalMonth){
				finalList.push(data[i]);
			}
		}
		for(var j=0; j<finalList.length; j++){
			if(!finalList[j].completedOrNot){
				$scope.projectsUnderConstructionList.push({
					prjctName : finalList[j].projectName, 
        			year: finalList[j].project.year,
        			month: finalList[j].project.month,
        			cntrctPrice: finalList[j].project.cntrctPrice.toFixed(2),
        			prjctcost: finalList[j].addUpCost.toFixed(2),
        			progressPercentage : (finalList[j].addUpCost/finalList[j].project.cntrctPrice*100).toFixed(2)
				});
			}
		}
		$scope.underConstructionProjectSelected = $scope.projectsUnderConstructionList[0];	
	};
	
	var completedProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		for(var i=data.length-1; i>=0; i--){
			var startTime;
			var endTime;
			if(data[i].completedOrNot){
				if(data[i].project.year==null)
					startTime = '无记录';
				else if(data[i].project.month==null)
					startTime = data[i].project.year+'年';
				else 
					startTime = data[i].project.year+'年'+data[i].project.month+'月';
				
				var endYear = new Date(data[i].applyTime).getFullYear();
				var endMonth = new Date(data[i].applyTime).getMonth()+1;
					
				$scope.completedProjectList.push({
					prjctName : data[i].projectName, 
					startTime: startTime,
           	        year: endYear,
           	        month: endMonth,
           	        cntrctPrice: data[i].project.cntrctPrice.toFixed(2),
           	        addUpCost: data[i].addUpCost.toFixed(2), 
           	        remark: data[i].remark
				}); 
			}
		}
	}
	// 点击事件
	$scope.projectsDetails = function(underConstructionProject){
		$scope.underConstructionProjectSelected = underConstructionProject;
	};

});