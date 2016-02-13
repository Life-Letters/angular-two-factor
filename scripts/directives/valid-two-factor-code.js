'use strict';

/**
 * Checks whether a given two-factor code is valid.
 * 
 * @ngdoc directive
 * @name life.twoFactor.directive:validTwoFactorCode
 * @description
 * # validTwoFactorCode
 */
angular.module('life.twoFactor')
  .directive('validTwoFactorCode', function (twoFactor) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.validTwoFactorCode = function(modelValue) {
	        return twoFactor.isValidTwoFactorCode(modelValue);
	      };
      }
    };
  });