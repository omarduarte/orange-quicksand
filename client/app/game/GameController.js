angular.module('uGame.game', [])

// GameController (controller)
//===============================
//
// WHAT IT DOES
//
// Controller for the Gameboy Color emulator.
// 
.controller('GameController', function($scope, $window, $stateParams, $http, Game) {
  
  $scope.loadGame = function() {
    Game.get($stateParams.id)
      .success(function(game) {        
        $scope.API.init(game[0].rom);
      })
      .error(function(error) {
        console.error(error);
        $scope.API.init();
      });
  };

  $scope.getGameBoyAPI = function() {
    $scope.API = window.frames.GBC.gameBoyAPI;
    $scope.loadGame();
  };

})

// uGameIframeOnload (directive)
//===============================
//
// WHAT IT DOES
//
// It takes a callback provided in the directive attibute
// and calls it as a $scope function when the element
// has loaded.
//
.directive('uGameIframeOnload', ['$window', function($window){
  var w = angular.element($window);

  return {

    scope: {
      callBack: '&uGameIframeOnload'
    },

    link: function(scope, element, attrs){
      element.on('load', function() {
        return scope.callBack();
      });
    }
  };
}]);
