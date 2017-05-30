'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    /*otherwids 有bug*/
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/main');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'views/app.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "scripts/directives/ioc-header.js",
                                "scripts/directives/ioc-footer.js"
                            ]);
                        }
                    ]
                }
            })
            .state('app.main', {
                url: '^/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/main.js'
                            ]);
                        }
                    ]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/login.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.kpicategory', {
                url: '^/kpicategory?categoryId',
                templateUrl: 'views/kpicategory.html',
                controller: 'KPICategoryCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/kpicategory.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.kpiAir',{
                url:"^/kpiAir",
                templateUrl: 'views/kpiAir.html',
                controller:'KPIAirCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/kpicategory.js'
                            ]);
                        }
                    ]
                }


            })
            .state('app.userConfig', {
                url: '^/userConfig',
                templateUrl: 'views/userConfig.html',
                controller: 'UserConfigCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/factories/account-factory.js',
                                'scripts/factories/department-factory.js',
                                'scripts/controllers/userconfig.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.kpiConfig', {
                url: '^/kpiConfig',
                templateUrl: 'views/kpiConfig.html',
                controller: 'KpiConfigCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/factories/kpiconfig-factory.js',
                                'scripts/factories/department-factory.js',
                                'scripts/controllers/kpiconfig.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.airEnvironment', {
                url: '^/airEnvironment',
                templateUrl: 'views/details/airEnvironment.html',
                controller: 'AirEnvironmentCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/environment/airenvironment-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.waterEnvironment', {
                url: '^/waterEnvironment',
                templateUrl: 'views/details/waterEnvironment.html',
                controller: 'WaterEnvironmentCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/environment/waterenvironment-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.waterEnvironmentBI', {
                url: '^/waterEnvironmentBI',
                controller: 'WaterEnvironmentBICtrl',
                templateUrl: 'views/details/waterEnvironmentBI.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/environment/echarts-plain.js',
                                'scripts/factories/bi-factory.js',
                                'scripts/controllers/environment/waterenvironmentbi-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.airEnvironmentBI', {
                url: '^/airEnvironmentBI',
                controller: 'AirEnvironmentBICtrl',
                templateUrl: 'views/details/airEnvironmentBI.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/environment/echarts-plain.js',
                                'scripts/factories/bi-factory.js',
                                'scripts/controllers/environment/airenvironmentbi-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.landResource', {
                url: '^/landResource',
                controller: 'landResourceCtrl',
                templateUrl: 'views/details/landResource.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/environment/landresource-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.driverTrain', {
                url: '^/driverTrain',
                controller: 'DriverTrainCtrl',
                templateUrl: 'views/details/driverTrain.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/drivertrain-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.eduEquityUniversal', {
                url: '^/eduEquityUniversal',
                controller: 'eduEquityUniversalCtrl',
                templateUrl: 'views/details/eduEquityUniversal.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/edueqtyunvsl-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.eduGuarantee', {
                url: '^/eduGuarantee',
                templateUrl: 'views/details/eduGuarantee.html',
                controller: 'eduGuaranteeCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/eduguarantee-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.eduQualityContrib', {
                url: '^/eduQualityContrib',
                templateUrl: 'views/details/eduQualityContrib.html',
                controller: 'eduQualityContribCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/eduqualitycontrib-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.gdsTrans', {
                url: '^/gdsTrans',
                templateUrl: 'views/details/gdsTrans.html',
                controller: 'gdsTransCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/gdstrans-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.hlthPblcHlth', {
                url: '^/hlthPblcHlth',
                templateUrl: 'views/details/hlthPblcHlth.html',
                controller: 'hlthPblcHlthCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/hlthpblchlth-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.hlthRscSvc', {
                url: '^/hlthRscSvc',
                templateUrl: 'views/details/hlthRscSvc.html',
                controller: 'hlthRscSvcCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/hlthrscsvc-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.psngrTransportation', {
                url: '^/psngrTransportation',
                templateUrl: 'views/details/psngrTransportation.html',
                controller: 'psngrTransportationCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/psngrtransportation-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.telecomInfr', {
                url: '^/telecomInfr',
                templateUrl: 'views/details/telecomInfr.html',
                controller: 'telecomInfrCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/telecominfr-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.trnspAdminPermit', {
                url: '^/trnspAdminPermit',
                templateUrl: 'views/details/trnspAdminPermit.html',
                controller: 'trnspAdminPermitCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/trnspadminpermit-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.trnspInfstCnstr', {
                url: '^/trnspInfstCnstr',
                templateUrl: 'views/details/trnspInfstCnstr.html',
                controller: 'trnspInfstCnstrCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicService/trnspinfstcnstr-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.policeCall', {
                url: '^/policeCall',
                controller: 'PoliceCallCtrl',
                templateUrl: 'views/details/policeCall.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/policeCall-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.police', {
                url: '^/police',
                controller: 'PoliceCtrl',
                templateUrl: 'views/details/police.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/police-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.criminal', {
                url: '^/criminal',
                controller: 'CriminalCtrl',
                templateUrl: 'views/details/criminal.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/criminal-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.trafficAccident', {
                url: '^/trafficAccident',
                controller: 'TrafficAccidentCtrl',
                templateUrl: 'views/details/trafficAccident.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/trafficAccident-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.fireAccident', {
                url: '^/fireAccident',
                controller: 'FireAccidentCtrl',
                templateUrl: 'views/details/fireAccident.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/fireAccident-controller.js',
                                'scripts/factories/dict-factory.js',
                                'scripts/services/dict-service.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.productionSafety', {
                url: '^/productionSafety',
                controller: 'ProductionSafetyCtrl',
                templateUrl: 'views/details/productionSafety.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/productionSafety-controller.js',
                                'scripts/factories/dict-factory.js',
                                'scripts/services/dict-service.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.petitionLetter', {
                url: '^/petitionLetter',
                controller: 'PetitionLetterCtrl',
                templateUrl: 'views/details/petitionLetter.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/publicSafety/petitionLetter.js',
                                'scripts/factories/dict-factory.js',
                                'scripts/services/dict-service.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.illegalConstruction', {
                url: '^/illegalConstruction',
                controller: 'IllegalConstructionCtrl',
                templateUrl: 'views/details/illegalConstruction.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/citymanager/illegalConstruction-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.administrativePenalty', {
                url: '^/administrativePenalty',
                controller: 'AdministrativePenaltyCtrl',
                templateUrl: 'views/details/administrativePenalty.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/citymanager/administrativePenalty-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.citymanager_rubbish', {
                url: '^/citymanager_rubbish',
                controller: "citymanager_lajicontroller",
                templateUrl: 'views/details/citymanager/citymanager_laji.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/citymanager/citymanager_laji.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.citymanager_jiandu', {
                url: '^/citymanager_supervise',
                controller: "citymanager_jianducontroller",
                templateUrl: 'views/details/citymanager/citymanager_jiandu.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/citymanager/citymanager_jiandu.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.finance', {
                url: '^/economic/finance',
                controller: "financeCtrl",
                templateUrl: 'views/details/economic/financeDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/finance-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.industry', {
                url: '^/economic/industry',
                controller: "industryCtrl",
                templateUrl: 'views/details/economic/industryDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/industry-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.invest', {
                url: '^/economic/invest',
                controller: "investCtrl",
                templateUrl: 'views/details/economic/investDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/invest-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.trade', {
                url: '^/economic/trade',
                controller: "tradeCtrl",
                templateUrl: 'views/details/economic/tradeDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/trade-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.gdp', {
                url: '^/economic/gdp',
                controller: "gdpCtrl",
                templateUrl: 'views/details/economic/gdpDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/gdp-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.fiscal', {
                url: '^/economic/fiscal',
                controller: "fiscalCtrl",
                templateUrl: 'views/details/economic/fiscalDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/fiscal-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.fiscalInout', {
                url: '^/economic/fiscal-inout',
                controller: "fiscalInOutCtrl",
                templateUrl: 'views/details/economic/fiscalInoutDetails.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/fiscal-inout-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.keqiangIndex', {
                url: '^/economic/tj.bi/kqIndex',
                controller: "KeQiangIndexCtrl",
                templateUrl: 'views/tj.bi/keqiangindex.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/economic/keqiangindex-controller.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.CPITrendChart', {
                url: '^/CPITrendChart',
                controller: "CPIDataController",
                templateUrl: 'views/details/wellbeing/CPITrendChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/CPITrendChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.PopulationStructure', {
                url: '^/DetailPlanBorn/PopulationStructure',
                controller: "DetailPlanBornController",
                templateUrl: 'views/details/wellbeing/DetailPlanBorn.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/DetailPlanBorn.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.TerminalPopulation', {
                url: '^/DetailPlanBorn/TerminalPopulation',
                controller: "DetailPlanBornController",
                templateUrl: 'views/details/wellbeing/DetailPlanBorn.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/DetailPlanBorn.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.BornDeath', {
                url: '^/DetailPlanBorn/BornDeath',
                controller: "DetailPlanBornController",
                templateUrl: 'views/details/wellbeing/DetailPlanBorn.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/DetailPlanBorn.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.BearingWomen', {
                url: '^/DetailPlanBorn/BearingWomen',
                controller: "DetailPlanBornController",
                templateUrl: 'views/details/wellbeing/DetailPlanBorn.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/DetailPlanBorn.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.FirstMarriage', {
                url: '^/DetailPlanBorn/FirstMarriage',
                controller: "DetailPlanBornController",
                templateUrl: 'views/details/wellbeing/DetailPlanBorn.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/DetailPlanBorn.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.UrbanBasicEndowmentInsuranceData', {
                url: '^/InsuranceChart/UrbanBasicEndowmentInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.UnemploymentInsuranceData', {
                url: '^/InsuranceChart/UnemploymentInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.UrbanBasicMedicalInsuranceData', {
                url: '^/InsuranceChart/UrbanBasicMedicalInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.UrbanResidentsMedicalInsuranceData', {
                url: '^/InsuranceChart/UrbanResidentsMedicalInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.EmploymentInjuryInsuranceData', {
                url: '^/InsuranceChart/EmploymentInjuryInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.MaternityInsuranceData', {
                url: '^/InsuranceChart/MaternityInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.ResidentsBasicEndowmentInsuranceData', {
                url: '^/InsuranceChart/ResidentsBasicEndowmentInsuranceData',
                controller: "InsuranceChartController",
                templateUrl: 'views/details/wellbeing/InsuranceChart.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/InsuranceChart.js'
                            ]);
                        }
                    ]
                }
            })
            .state('app.PopulationStructurePrediction', {
                url: '^/DetailPlanBorn/PopulationStructurePrediction',
                controller: "PopulationStructurePredictionController",
                templateUrl: 'views/tj.bi/PopulationStructurePrediction.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controllers/wellbeing/PopulationStructurePrediction.js'
                            ]);
                        }
                    ]
                }
            })
            .state('dataApp', {
                url: '/dataApp',
                templateUrl: 'views/dataIndex.html',
                controller: 'DataIndexCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "scripts/factories/table-factory.js",
                                "scripts/controllers/dataManage/dataIndex.js"
                            ]);
                        }
                    ]
                }
            })
            .state('dataApp.data', {
                url: '^/data?table',
                templateUrl: 'views/dataManage/data.html',
                controller: 'DataCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "scripts/controllers/dataManage/data.js"
                            ]);
                        }
                    ]
                }
            })
            .state('dataApp.dict', {
                url: '^/dict',
                templateUrl: 'views/dataManage/dict.html',
                controller: 'DictCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "scripts/controllers/dataManage/dict.js"
                            ]);
                        }
                    ]
                }
            });
    });
