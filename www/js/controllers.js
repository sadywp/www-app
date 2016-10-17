angular.module('starter.controllers', [])

.controller('NewsListCtrl', function($scope, $http, $state) {
    var env = "production";
    var type_id = $state.current.data.type_id;
    $scope.title = "";
    $scope.typePath = "";
    if (type_id == 1) {
        $scope.title = "博罗新闻";
        $scope.typePath = "detail-boluo";
    } else if (type_id == 2) {
        $scope.title = "惠州新闻";
        $scope.typePath = "detail-huizou";
    }

    var node_host = "http://localhost:3000"
    if (env == 'production') {
        node_host = "http://120.77.16.167:3000";
    }
    else if (env == 'test') {
        node_host = "http://192.168.1.113:3000";
    }

    $http.get(node_host + "/news/" + type_id).success(function(data) {
        console.log(data);
        $scope.Models = data.data;
    });
})

.controller('NewBoluoDetailCtrl', ['$scope', '$http', '$stateParams', '$sce', '$timeout', function($scope, $http, $stateParams, $sce, $timeout) {
    var id = $stateParams.id;
    var env = "production";
    var node_host = "http://localhost:3000"
    if (env == 'production') {
        node_host = "http://120.77.16.167:3000";
    }
    else if (env == 'test') {
        node_host = "http://192.168.1.113:3000";
    }
    var getContent = function(data) {
        return $sce.trustAsHtml(data);
    }
    $http.get(node_host + "/news/getDetials/" + id).success(function(data) {
        var htmlstr=data.data[0].detailshtml;
        var exep=/src.+img/ig;
         htmlstr = htmlstr.replace(exep,'src="cms/plus/img').replace(/&nbsp;&nbsp;&nbsp;&nbsp;/ig, "");
       $scope.hidcontent=getContent(htmlstr);
        
    });

    $timeout(function() {
        $('.content').find('*').each(function(i, item) {
            $(item).removeAttr('style').removeAttr('width').removeAttr('size');
        });
       $scope.content = getContent( $("#hidcontent").html());
       $("#hidcontent").html('');
    }, 200, true);
}])

.controller('NewHuizouDetailCtrl', ['$scope', '$http', '$stateParams', '$sce','$timeout', function($scope, $http, $stateParams, $sce,$timeout) {
    var id = $stateParams.id;
    var env = "production";
    var node_host = "http://localhost:3000"
    if (env == 'production') {
        node_host = "http://120.77.16.167:3000";
    }
    else if (env == 'test') {
        node_host = "http://192.168.1.113:3000";
    }
    var getContent = function(data) {
        return $sce.trustAsHtml(data);
    }
    $http.get(node_host + "/news/getDetials/" + id).success(function(data) {
        console.log(data);
        $scope.content = getContent(data.data[0].detailshtml);
    });
    $timeout(function() {
        $('#dMain >div').find('div').find('div:first').addClass('title');
        $('.LinkMap').remove();
    }, 100, true);
}])

.controller('AboutCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
