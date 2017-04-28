'use strict';

angular.module('app')
  .directive('iocBtnGroup', function () {
    return {
      restrict: 'A',
      controller: function($scope) {
        var self = this,
        btnGroup = self.btnGroup = $scope.btnGroup = [];
        self.addBtn = function(btn, element){
          btn.$element = element;
          if(btn.category.sortOrder == 1) {
            self.changeBtn(btn);
          }
          btnGroup.push(btn);
        };

        self.changeBtn = function(btn){
          for(var i = 0; i < self.btnGroup.length; i++) {
            self.btnGroup[i].$element.css("border", "none");
          }
          btn.$element.addClass('active');
          btn.$element.siblings().removeClass('active')
        };
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  })

  .directive('iocBtn', function () {
    return {
      require: '^iocBtnGroup',
      restrict: 'A',
      link: function postLink(scope, element, attrs, controller) {
        controller.addBtn(scope, element);

        element.click(function(){
          controller.changeBtn(scope);
        });
      }
    };
  });
