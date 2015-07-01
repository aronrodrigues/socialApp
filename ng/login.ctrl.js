(function () {
  
  angular.module('socialApp').controller('LoginCtrl', function ($scope, $location, loginSrvc) {

    $scope.login = function (username, password) {

      loginSrvc.login(username, password)
      .then(function (response) {
        $scope.$emit('login', response.data);
        $location.url('/');
      });

    };

    $scope.logout = function () {
      loginSrvc.logout();
      console.log('Logging out');
       $scope.$emit('logout');
    }

  });

})();