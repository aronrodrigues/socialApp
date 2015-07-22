(function () {
  
  angular.module('socialApp').controller('RegisterCtrl', function ($scope, $location, registerSrvc) {

    $scope.register = function (username, password) {

      registerSrvc.register(username, password)
      .then(function (response) {
        $location.url('/login');
      });

    };


  });

})();