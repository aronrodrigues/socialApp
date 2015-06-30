(function () {
  
  angular.module('socialApp').controller('LoginCtrl', function ($scope, loginSrvc) {

    $scope.login = function (username, password) {

      loginSrvc.login(username, password)
      .then(function (response) {
        $scope.$emit('login', response.data);
      });

    };

  });

})();