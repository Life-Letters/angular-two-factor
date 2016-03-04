'use strict';

/**
 * @ngdoc service
 * @name life.twoFactor.twoFactorInterceptor
 * @description
 * # twoFactorInterceptor
 * Factory in the life.twoFactor.
 */
angular.module('life.twoFactor')
  .controller('TwoFactorModalCtrl', function ($scope, $uibModalInstance) {
    $scope.continue = function (code) {
      if ( $scope.form.$invalid ) {
        return;
      }
      $uibModalInstance.close(code);
    };
  })
  .factory('twoFactorInterceptor', function ($q, $injector) {
    
    var twoFactorReturnCode = 503;

    return {
      // request: function(config) {
      //   if ( twoFactorCode ) {
      //     config.headers.TWOFACTOR_AUTHORIZATION = twoFactorCode;
      //   }
      //   return config;
      // },
      // requestError: function(config) {},
      // response: function() {}
      responseError: function(response) {

        // Was it a 2-factor error?
        if (response.status === twoFactorReturnCode) {
          var defer = $q.defer();

          // Avoid circular dependencies
          var $uibModal = $injector.get('$uibModal'),
              twoFactor = $injector.get('twoFactor');

          // twoFactor.requestTwoFactorCode()
          //   .then(function(response) {
          //     console.log(response);
          //   });

          // Display the content in the modal
          var modalInstance = $uibModal
              .open({
                animation: true,
                templateUrl: '/views/angular-two-factor/modal.html',
                controller: 'TwoFactorModalCtrl',
                size: 'md',
              });

          modalInstance.result
              .then(function(code) {
                var $http = $injector.get('$http');
                console.log(code);
                // twoFactorCode = code;
                // Repeat the original request
                $http(
                  angular.extend(response.config, {
                    headers: {
                      TWOFACTOR_AUTHORIZATION: code,
                    }
                  })
                ).then(defer.resolve, defer.reject);

              }, function () {
                defer.reject();
              });
          
          return defer.promise;

        } else {
          return $q.reject(response);
        }
      },
    };
  });
