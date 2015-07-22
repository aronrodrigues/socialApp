(function () {

  angular.module('socialApp')
  .service('registerSrvc', function ($http) {

    var srvc = this;

    srvc.register = function (username, password) {
      return $http.post('/api/users', {
        username: username, password: password
      });
    };

    return srvc;

  });

})();