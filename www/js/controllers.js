angular.module('starter.controllers', [])

.controller('BoluoCtrl', function($scope, $http, $stateParams) {
    var env = "dev";
    var type_id = $stateParams.id;
    console.log(type_id);
    var node_host = "http://localhost:3000"
    if (env == 'production') {
        node_host = "http://192.168.1.113:3001";
    }
    $http.get(node_host + "/news/" + type_id).success(function(data) {
        console.log(data);
        $scope.Models = data.data;
    });
})

.controller('HuizhouCtrl', function($scope,$http,$stateParams) {
    var env = "dev";
    var type_id = $stateParams.id;
    console.log(type_id);
    var node_host = "http://localhost:3000"
    if (env == 'production') {
        node_host = "http://192.168.1.113:3001";
    }
    $http.get(node_host + "/news/" + type_id).success(function(data) {
        console.log(data);
        $scope.Models = data.data;
    });
})

.controller('NewDetailCtrl', ['$scope', function($scope) {
    console.log('hello world');
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AboutCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
