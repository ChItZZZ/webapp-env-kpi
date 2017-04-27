'use strict';

angular.module('app').controller('eduGuaranteeCtrl', function($scope,kpiDetailService,dateService,inform,$http,$rootScope) {
	
	var recentTime;
	$http.post("/api/data/EduGuaranteeData/lastestObject",["applyTime"],{ headers: {'x-auth-token': $rootScope.token}}).success(function(lastObjRaw){
		var lastObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
		recentTime = lastObj.applyTime;
		
		var startOprtr = new Date(recentTime);
		var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
		var endDate =  dateService.formatDate(moment(recentTime).endOf('year'));  //alert(endDate);
		var tableName='EduGuaranteeData';
		
		kpiDetailService.query(tableName,startDate,endDate,processFunction);
	});
	
	//显示最新一年的数据
	$scope.tchrGrntLastYearList = [];
	
	$scope.investGrntLastYearList=[];
	$scope.perEduFundGrntLastYearList=[];
	
	//chartData
	var yearData = [];
	$scope.tchrGrntList = [];
	
	$scope.investGrntList=[];//投资保障
	$scope.perEduFundGrntList=[];
	$scope.perEduFundGrntRateList=[];
	$scope.perFundGrntList=[];
	$scope.perFundGrntRateList=[];
	
	//处理函数返回data的函数，就是原来的http.success()里面的function
	//现在返回404，是因为数据库中没有这个表
	var processFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		
		var kndrgrtnTchrJnrRateList = [];
		var prmrySchlTchrUndrgrdtRateList = [];
		var mdlSchlTchrUndrgrdtRateList = [];
		var hghSchlTchrPstgrdtRateList = [];
		
		var sctyEduInvstmntGrwthRateList = [];
		
		var pubFinanceEduFundList=[];//公共财政预算教育拨款（万元）
		var pubFinanceEduFundRateList=[];//公共财政预算教育拨款增减率
		var financeRegIncomeList=[];//财政经常性收入（亿元）
		var financeRegIncomeRateList=[];//财政经常性收入增减率
		var pubEduFundHigherRegIncomeRateList=[];//公共财政预算教育拨款增长高于财政经常性收入增长（%）
		var perEduExpenseRisePrimarySchlList=[];//生均公共财政预算教育事业费支出增长情况(普通小学（元）)
		var perEduExpenseRisePrimarySchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通小学（元）)增减率
		var perEduExpenseRiseMiddleSchlList=[];//生均公共财政预算教育事业费支出增长情况(普通中学（元）)
		var perEduExpenseRiseMiddleSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通中学（元）)增减率
		var perEduExpenseRiseHighSchlList=[];//生均公共财政预算教育事业费支出增长情况(普通高中（元）)
		var perEduExpenseRiseHighSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通高中（元）)增减率
		var perEduExpenseRiseSecVocSchlList=[];//生均公共财政预算教育事业费支出增长情况(中等职业学校（元）)
		var perEduExpenseRiseSecVocSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(中等职业学校（元）)增减率
		var perPubFundRisePrimarySchlList=[];//生均公共财政预算公用经费支出增长情况 (普通小学（元）)
		var perPubFundRisePrimarySchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率
		var perPubFundRiseMiddleSchlList=[];//生均公共财政预算公用经费支出增长情况 (普通中学（元）)
		var perPubFundRiseMiddleSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率
		var perPubFundRiseHighSchlList=[];//生均公共财政预算公用经费支出增长情况 (普通高中（元）)
		var perPubFundRiseHighSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率
		var perPubFundRiseSecVocSchlList=[];//生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)
		var perPubFundRiseSecVocSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率
		var stateEduFinanceRateList=[];//国家财政性教育经费占国内生产总值的比例（%）
		var stateEduFinanceRateRateList=[];//国家财政性教育经费占国内生产总值的比例（%）增减率
		var pubEduFinanceRateList=[];//公共财政预算教育经费占公共财政预算支出的比例（%）
		var pubEduFinanceRateRateList=[];//公共财政预算教育经费占公共财政预算支出的比例（%）增减率
		
		var applyDate;
		
		for(var i=0; i<data.length; i++){
			kndrgrtnTchrJnrRateList.push(data[i].kndrgrtnTchrJnrRate);
			prmrySchlTchrUndrgrdtRateList.push(data[i].prmrySchlTchrUndrgrdtRate);
			mdlSchlTchrUndrgrdtRateList.push(data[i].mdlSchlTchrUndrgrdtRate);
			hghSchlTchrPstgrdtRateList.push(data[i].hghSchlTchrPstgrdtRate);
			
			sctyEduInvstmntGrwthRateList.push(data[i].sctyEduInvstmntGrwthRate);
			
			pubFinanceEduFundList.push(data[i].pubFinanceEduFund);//
			pubFinanceEduFundRateList.push(data[i].pubFinanceEduFundRate);
			financeRegIncomeList.push(data[i].financeRegIncome);
			financeRegIncomeRateList.push(data[i].financeRegIncomeRate);
			pubEduFundHigherRegIncomeRateList.push(data[i].pubEduFundHigherRegIncomeRate);
			perEduExpenseRisePrimarySchlList.push(data[i].perEduExpenseRisePrimarySchl);
			perEduExpenseRisePrimarySchlRateList.push(data[i].perEduExpenseRisePrimarySchlRate);
			perEduExpenseRiseMiddleSchlList.push(data[i].perEduExpenseRiseMiddleSchl);
			perEduExpenseRiseMiddleSchlRateList.push(data[i].perEduExpenseRiseMiddleSchlRate);
			perEduExpenseRiseHighSchlList.push(data[i].perEduExpenseRiseHighSchl);
			perEduExpenseRiseHighSchlRateList.push(data[i].perEduExpenseRiseHighSchlRate);
			perEduExpenseRiseSecVocSchlList.push(data[i].perEduExpenseRiseSecVocSchl);
			perEduExpenseRiseSecVocSchlRateList.push(data[i].perEduExpenseRiseSecVocSchlRate);
			perPubFundRisePrimarySchlList.push(data[i].perPubFundRisePrimarySchl);
			perPubFundRisePrimarySchlRateList.push(data[i].perPubFundRisePrimarySchlRate);
			perPubFundRiseMiddleSchlList.push(data[i].perPubFundRiseMiddleSchl);
			perPubFundRiseMiddleSchlRateList.push(data[i].perPubFundRiseMiddleSchlRate);
			perPubFundRiseHighSchlList.push(data[i].perPubFundRiseHighSchl);
			perPubFundRiseHighSchlRateList.push(data[i].perPubFundRiseHighSchlRate);
			perPubFundRiseSecVocSchlList.push(data[i].perPubFundRiseSecVocSchl);
			perPubFundRiseSecVocSchlRateList.push(data[i].perPubFundRiseSecVocSchlRate);
			stateEduFinanceRateList.push(data[i].stateEduFinanceRate);
			stateEduFinanceRateRateList.push(data[i].stateEduFinanceRateRate);
			pubEduFinanceRateList.push(data[i].pubEduFinanceRate);
			pubEduFinanceRateRateList.push(data[i].pubEduFinanceRateRate);//
			
			
			applyDate = new Date(data[i].applyTime);
			yearData.push(applyDate.getFullYear());
		}
		$scope.tchrGrntList.push({
			name: '幼儿园教师专科率',
			data: kndrgrtnTchrJnrRateList,
			comment: ''
		});
		$scope.tchrGrntList.push({
			name: '小学教师本科率',
			data: prmrySchlTchrUndrgrdtRateList,
			comment: ''
		});
		$scope.tchrGrntList.push({
			name: '初中教师本科率',
			data: mdlSchlTchrUndrgrdtRateList,
			comment: ''
		});
		$scope.tchrGrntList.push({
			name: '高中阶段教师研究生率',
			data: hghSchlTchrPstgrdtRateList,
			comment: ''
		});
		

		
		
		$scope.investGrntList.push({   //
			name: '公共财政预算教育拨款（万元）',
			data: pubFinanceEduFundList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '公共财政预算教育拨款增减率',
			data: pubFinanceEduFundRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '财政经常性收入（亿元）',
			data: financeRegIncomeList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '财政经常性收入增减率',
			data: financeRegIncomeRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '公共财政预算教育拨款增长高于财政经常性收入增长（%）',
			data: pubEduFundHigherRegIncomeRateList,
			comment: ''
		});
		$scope.perEduFundGrntList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)',
			data: perEduExpenseRisePrimarySchlList,
			comment: ''
		});
		$scope.perEduFundGrntRateList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率',
			data: perEduExpenseRisePrimarySchlRateList,
			comment: ''
		});
		$scope.perEduFundGrntList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)',
			data: perEduExpenseRiseMiddleSchlList,
			comment: ''
		});
		$scope.perEduFundGrntRateList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)增减率',
			data: perEduExpenseRiseMiddleSchlRateList,
			comment: ''
		});
		$scope.perEduFundGrntList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)',
			data: perEduExpenseRiseHighSchlList,
			comment: ''
		});
		$scope.perEduFundGrntRateList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)增减率',
			data: perEduExpenseRiseHighSchlRateList,
			comment: ''
		});
		$scope.perEduFundGrntList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)',
			data: perEduExpenseRiseSecVocSchlList,
			comment: ''
		});
		$scope.perEduFundGrntRateList.push({   
			name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)增减率',
			data: perEduExpenseRiseSecVocSchlRateList,
			comment: ''
		});
		$scope.perFundGrntList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)',
			data: perPubFundRisePrimarySchlList,
			comment: ''
		});
		$scope.perFundGrntRateList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率',
			data: perPubFundRisePrimarySchlRateList,
			comment: ''
		});
		$scope.perFundGrntList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)',
			data: perPubFundRiseMiddleSchlList,
			comment: ''
		});
		$scope.perFundGrntRateList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
			data: perPubFundRiseMiddleSchlRateList,
			comment: ''
		});
		$scope.perFundGrntList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)',
			data: perPubFundRiseHighSchlList,
			comment: ''
		});
		$scope.perFundGrntRateList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率',
			data: perPubFundRiseHighSchlRateList,
			comment: ''
		});
		$scope.perFundGrntList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)',
			data: perPubFundRiseSecVocSchlList,
			comment: ''
		});
		$scope.perFundGrntRateList.push({   
			name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率',
			data: perPubFundRiseSecVocSchlRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '国家财政性教育经费占国内生产总值的比例（%）',
			data: stateEduFinanceRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
			data: stateEduFinanceRateRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
			data: pubEduFinanceRateList,
			comment: ''
		});
		$scope.investGrntList.push({   
			name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
			data: pubEduFinanceRateRateList,
			comment: ''
		});
		
		$scope.tchrGrntKindSelected = $scope.tchrGrntList[0].name;
		$scope.tchrGrntByKindBarChart.series[0].name = $scope.tchrGrntList[0].name;
		$scope.tchrGrntByKindBarChart.series[0].data = $scope.tchrGrntList[0].data;
		$scope.tchrGrntByKindBarChart.options.yAxis.title.text = $scope.tchrGrntList[0].name+"(%)";
		
		$scope.pubFinEduChart.series[0].data=$scope.investGrntList[0].data;//
		$scope.pubFinEduChart.series[1].data=$scope.investGrntList[1].data;//
		$scope.financeRegIncomeChart.series[0].data=$scope.investGrntList[2].data;//
		$scope.financeRegIncomeChart.series[1].data=$scope.investGrntList[3].data;//
		$scope.HigherChart.series[0].data=$scope.investGrntList[4].data;//
		
		$scope.investGrntKindSelected = $scope.perEduFundGrntList[0].name;
		$scope.perEduFundChart.series[0].name = $scope.perEduFundGrntList[0].name;
		$scope.perEduFundChart.series[0].data = $scope.perEduFundGrntList[0].data;
		$scope.perEduFundChart.options.yAxis.title.text = $scope.perEduFundGrntList[0].name;
		
		$scope.investGrntRateKindSelected = $scope.perEduFundGrntRateList[0].name;
		$scope.perEduFundRateChart.series[0].name = $scope.perEduFundGrntRateList[0].name;
		$scope.perEduFundRateChart.series[0].data = $scope.perEduFundGrntRateList[0].data;
		$scope.perEduFundRateChart.options.yAxis.title.text = $scope.perEduFundGrntRateList[0].name;
		
		$scope.investpubGrntKindSelected = $scope.perFundGrntList[0].name;
		$scope.perFundChart.series[0].name = $scope.perFundGrntList[0].name;
		$scope.perFundChart.series[0].data = $scope.perFundGrntList[0].data;
		$scope.perFundChart.options.yAxis.title.text = $scope.perFundGrntList[0].name;
		
		$scope.investpubGrntRateKindSelected = $scope.perFundGrntRateList[0].name;
		$scope.perFundRateChart.series[0].name = $scope.perFundGrntRateList[0].name;
		$scope.perFundRateChart.series[0].data = $scope.perFundGrntRateList[0].data;
		$scope.perFundRateChart.options.yAxis.title.text = $scope.perFundGrntRateList[0].name;
		
		$scope.stateChart.series[0].data=$scope.investGrntList[5].data;//
		$scope.stateChart.series[1].data=$scope.investGrntList[6].data;//
		$scope.pubEduFinanceChart.series[0].data=$scope.investGrntList[7].data;//
		$scope.pubEduFinanceChart.series[1].data=$scope.investGrntList[8].data;//
	
		
		$scope.tchrGrntLastYearList.push({
			name: '幼儿园教师专科率',
			number: kndrgrtnTchrJnrRateList[data.length-1]
		});
		$scope.tchrGrntLastYearList.push({
			name: '小学教师本科率',
			number: prmrySchlTchrUndrgrdtRateList[data.length-1]
		});
		$scope.tchrGrntLastYearList.push({
			name: '初中教师本科率',
			number: mdlSchlTchrUndrgrdtRateList[data.length-1]
		});
		$scope.tchrGrntLastYearList.push({
			name: '高中阶段教师研究生率',
			number: hghSchlTchrPstgrdtRateList[data.length-1]
		});
		
		$scope.investGrntLastYearList.push({
			name: '公共财政预算教育拨款（万元）',
			number: pubFinanceEduFundList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '公共财政预算教育拨款增减率',
			number: pubFinanceEduFundRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '财政经常性收入（亿元）',
			number: financeRegIncomeList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '财政经常性收入增减率',
			number: financeRegIncomeRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '公共财政预算教育拨款增长高于财政经常性收入增长（%）',
			number: pubEduFundHigherRegIncomeRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)',
			number: perEduExpenseRisePrimarySchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率',
			number: perEduExpenseRisePrimarySchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)',
			number: perEduExpenseRiseMiddleSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
			number: perEduExpenseRiseMiddleSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)',
			number: perEduExpenseRiseHighSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)增减率',
			number: perEduExpenseRiseHighSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)',
			number: perEduExpenseRiseSecVocSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)增减率',
			number: perEduExpenseRiseSecVocSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)',
			number: perPubFundRisePrimarySchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率',
			number: perPubFundRisePrimarySchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)',
			number: perPubFundRiseMiddleSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
			number: perPubFundRiseMiddleSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)',
			number: perPubFundRiseHighSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率',
			number: perPubFundRiseHighSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)',
			number: perPubFundRiseSecVocSchlList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率',
			number: perPubFundRiseSecVocSchlRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '国家财政性教育经费占国内生产总值的比例（%）',
			number: stateEduFinanceRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
			number: stateEduFinanceRateRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
			number: pubEduFinanceRateList[data.length-1]
		});
		$scope.investGrntLastYearList.push({
			name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
			number: pubEduFinanceRateRateList[data.length-1]
		});
		
		$scope.lastYear = yearData[data.length-1];
		$scope.invstGrntBarChart.series[0].data = sctyEduInvstmntGrwthRateList;
		
	};
	
	//highcharts
	$scope.tchrGrntByKindBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '%'                                       
			        },                                                                 
			        plotOptions: {                                                     
			            bar: {                                                         
			                dataLabels: {                                              
			                    enabled: true                                          
			                }                                                          
			            }                                                              
			        },                                                                 
			        legend: {                                                          
			            enabled: false                                                  
			        }
			},
	        title: {
	            text: '近五年幼儿园教师专科率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.invstGrntBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                                                                                  
			            title: {                                                       
			                text: '增长比例 (%)'                                             
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '%'                                       
			        },                                                                 
			        plotOptions: {                                                     
			            bar: {                                                         
			                dataLabels: {                                              
			                    enabled: true                                          
			                }                                                          
			            }                                                              
			        },                                                                 
			        legend: {                                                          
			            enabled: false                                                  
			        }
			},
	        title: {
	            text: '近五年全社会教育投入增长比例情况'
	        },
			series: [{
		            name: '增长比例',
		            data: []
		    }]
		};
$scope.pubFinEduChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					zoomType: 'xy'                                                   
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '公共财政预算教育拨款增减率',
		            }
		        }, { // Secondary yAxis
		            title: {
		                text: '公共财政预算教育拨款（万元）',
		              
		            },
		            labels: {
		                format: '{value} 万元',
		               
		            },
		            opposite: true
		        }],                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年公共财政预算教育拨款情况'
        },
		series: [{
            name: '公共财政预算教育拨款（万元）',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: '万元'
            }

        }, {
            name: '公共财政预算教育拨款增减率',
            type: 'spline',
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.financeRegIncomeChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					zoomType: 'xy'                                                   
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '财政经常性收入增减率',
		            }
		        }, { // Secondary yAxis
		            title: {
		                text: '财政经常性收入（亿元）',
		              
		            },
		            labels: {
		                format: '{value} 亿元',
		               
		            },
		            opposite: true
		        }],                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年财政经常性收入情况'
        },
		series: [{
            name: '财政经常性收入（亿元）',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: '亿元'
            }

        }, {
            name: '财政经常性收入增减率',
            type: 'spline',
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.HigherChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					type: 'spline',                                                
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '公共财政预算教育拨款增长高于财政经常性收入增长增减率',
		            }
		        }],                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年公共财政预算教育拨款增长高于财政经常性收入增长情况'
        },
		series: [ {
            name: '公共财政预算教育拨款增长高于财政经常性收入增长增减率',
            
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.perEduFundChart = {
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
		            type: 'column'                                                    
		        },                                                                  
		        xAxis: {                                                           
		            categories: yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: {                                                           
		            min: 0,                                                        
		            title: {  useHTML:true,                                                     
		                text: ''                                              
		            },                                                             
		            labels: {                                                      
		                overflow: 'justify'                                        
		            }                                                              
		        },                                                                 
		        tooltip: {                                                         
		            valueSuffix: '元'                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年生均公共财政预算教育事业费支出增长情况 (普通小学（元）)情况'
        },
		series: [{
	            name: '',
	            data: []
	    }]
	};
$scope.perEduFundRateChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					type: 'spline',                                                
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: { // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '',
		            }
		        },                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率情况'
        },
		series: [ {
            name: '',
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.perFundChart = {
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
		            type: 'column'                                                    
		        },                                                                  
		        xAxis: {                                                           
		            categories: yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: {                                                           
		            min: 0,                                                        
		            title: {                                                       
		                text: ''                                              
		            },                                                             
		            labels: {                                                      
		                overflow: 'justify'                                        
		            }                                                              
		        },                                                                 
		        tooltip: {                                                         
		            valueSuffix: '元'                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年生均公共财政预算公用经费支出增长情况 (普通小学（元）)情况'
        },
		series: [{
	            name: '',
	            data: []
	    }]
	};
$scope.perFundRateChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					type: 'spline',                                                
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: { // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '',
		            }
		        },                                                                   
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率情况'
        },
		series: [ {
            name: '',       
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.stateChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					zoomType: 'xy'                                                   
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '国家财政性教育经费占国内生产总值的比例（%）增减率',
		            }
		        }, { // Secondary yAxis
		            title: {
		                text: '国家财政性教育经费占国内生产总值的比例（%）',
		              
		            },
		            labels: {
		                format: '{value}%',
		               
		            },
		            opposite: true
		        }],                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年国家财政性教育经费占国内生产总值的比例情况'
        },
		series: [{
            name: '国家财政性教育经费占国内生产总值的比例（%）',
            type: 'spline',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
            type: 'spline',
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
$scope.pubEduFinanceChart={
		options:{
			credits: {
				enabled: false
				},
				chart: {                                                           
					zoomType: 'xy'                                                   
		        },                                                                  
		        xAxis: {                                                           
		            categories:yearData,
		            title: {
		                text: '年份'
		            },                                                             
		        },                                                                 
		        yAxis: [{ // Primary yAxis
		            labels: {
		                format: '{value}%',
		            },
		            title: {
		                text: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
		            }
		        }, { // Secondary yAxis
		            title: {
		                text: '公共财政预算教育经费占公共财政预算支出的比例（%）',
		              
		            },
		            labels: {
		                format: '{value}%',
		               
		            },
		            opposite: true
		        }],                                                                 
		        tooltip: {                                                         
		        	shared: true                                       
		        },                                                                 
		        plotOptions: {                                                     
		            bar: {                                                         
		                dataLabels: {                                              
		                    enabled: true                                          
		                }                                                          
		            }                                                              
		        },                                                                 
		        legend: {                                                          
		            enabled: false                                                  
		        }
		},
        title: {
            text: '近五年公共财政预算教育经费占公共财政预算支出的比例情况'
        },
		series: [{
            name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
            type: 'spline',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
            type: 'spline',
            data: [],
            tooltip: {
                valueSuffix: '%'
            }
        }]
	    };
	$scope.tchrGrntKindChange = function(tchrGrntOne){
		$scope.tchrGrntByKindBarChart.title.text = "近五年"+tchrGrntOne.name+"情况";
		$scope.tchrGrntByKindBarChart.series[0].name = tchrGrntOne.name;
		$scope.tchrGrntByKindBarChart.series[0].data = tchrGrntOne.data;
		$scope.tchrGrntByKindBarChart.options.yAxis.title.text = tchrGrntOne.name+"(%)";
		$scope.tchrGrntListCommentSelected = tchrGrntOne.comment;
	};

	$scope.investGrntKindChange = function(investGrntOne){
		$scope.perEduFundChart.title.text = "近五年"+investGrntOne.name+"情况";
		$scope.perEduFundChart.series[0].name = investGrntOne.name;
		$scope.perEduFundChart.series[0].data = investGrntOne.data;
		$scope.perEduFundChart.options.yAxis.title.text = investGrntOne.name;
		$scope.investGrntListCommentSelected = investGrntOne.comment;
	};
	
	$scope.investGrntRateKindChange = function(investGrntTwo){
		$scope.perEduFundRateChart.title.text = "近五年"+investGrntTwo.name+"情况";
		$scope.perEduFundRateChart.series[0].name = investGrntTwo.name;
		$scope.perEduFundRateChart.series[0].data = investGrntTwo.data;
		$scope.perEduFundRateChart.options.yAxis.title.text = investGrntTwo.name;
		$scope.investGrntRateListCommentSelected = investGrntTwo.comment;
	};
	
	$scope.investpubGrntKindChange = function(investpubGrntOne){
		$scope.perFundChart.title.text = "近五年"+investpubGrntOne.name+"情况";
		$scope.perFundChart.series[0].name = investpubGrntOne.name;
		$scope.perFundChart.series[0].data = investpubGrntOne.data;
		$scope.perFundChart.options.yAxis.title.text = investpubGrntOne.name;
		$scope.investpubGrntListCommentSelected = investpubGrntOne.comment;
	};
	
	$scope.investpubGrntRateKindChange = function(investpubGrntTwo){
		$scope.perFundRateChart.title.text = "近五年"+investpubGrntTwo.name+"情况";
		$scope.perFundRateChart.series[0].name = investpubGrntTwo.name;
		$scope.perFundRateChart.series[0].data = investpubGrntTwo.data;
		$scope.perFundRateChart.options.yAxis.title.text = investpubGrntTwo.name;
		$scope.investpubGrntRateListCommentSelected = investpubGrntTwo.comment;
	};
	
});