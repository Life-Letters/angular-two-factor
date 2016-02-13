'use strict';

/**
 * Supports the two factor process.
 * 
 * @ngdoc service
 * @name life.twoFactor.twoFactor
 * @description
 * # twoFactor
 * Service in the life.twoFactor.
 */
angular.module('life.twoFactor')
  .provider('twoFactor', function() {

    var baseUrl = null;

    this.setUrl = function(url) { 
      baseUrl = url;
    };

    this.$get = function($log, $http, $q) {
      if ( !baseUrl ) {
        $log.warn('please set the two-factor URL via the twoFactorProvider');
        return;
      }

      return {
        /**
         * Requests a two factor code for establishing or updating a user's mobile
         * number.
         * 
         * @param  {[type]} mobileNumber [description]
         * @return {[type]}              [description]
         */
        requestVerificationCode: function(mobileNumber, countryCode) {
          var url = baseUrl+'mobiles',
              body = {
                mobileNumber: mobileNumber,
                countryCode: countryCode,
              };

          return $http.post(url, body)
            .then(function(response) {
              return response.data;
            }, function(error) {
              return $q.reject(error);
            });
        },
        checkVerificationCode: function(verificationCode, mobileNumber, countryCode) {
          var url = baseUrl+'mobiles',
              body = {
                mobileNumber: mobileNumber,
                countryCode: countryCode,
                code: verificationCode,
              };

          return $http.put(url, body)
            .then(function(response) {
              return response.data;
            }, function(error) {
              return $q.reject(error);
            });
        },
        /**
         * Request a two factor code for a protected route.
         * 
         * @return {[type]} [description]
         */
        requestTwoFactorCode: function() {
          var url = baseUrl+'tfa-codes';

          return $http.post(url)
            .then(function(response) {
              return response.data;
            }, function(error) {
              return $q.reject(error);
            });
        },
        /**
         * Validate that a chosen two factor code exists. Used by the
         * two factor validator.
         * 
         * @param  {[type]}  code [description]
         * @return {Boolean}      [description]
         */
        isValidTwoFactorCode: function(code) {
          var url = baseUrl+'tfa-codes/check';

          return $http.put(url, null, {
              headers: {
                TWOFACTOR_AUTHORIZATION: code,
              },
            })
            .then(function(response) {
              return response.data;
            }, function(error) {
              return $q.reject(error);
            });
        },
      };
    };
  });
