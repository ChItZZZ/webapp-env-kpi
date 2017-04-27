angular.module('app').service('breadCrumbService', function() {
	var current_category;

	var setCategory = function(category) {
		current_category = category;
	}

	var getCategory = function() {
		return current_category;
	}

	return {
		setCategory: setCategory,
		getCategory: getCategory
	};

});