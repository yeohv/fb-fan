var app=angular.module('start', ['ionic']);

app.run(function($rootScope, $http){
  $rootScope.brand="14226545351";
  $rootScope.accesstoken="CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU";
  console.log("here");
});

app.factory('pullFb', function($http,$rootScope) {
	var url= "https://graph.facebook.com/v2.3/"+$rootScope.brand;
  var token="access_token="+$rootScope.accesstoken;
  var query="";
  var photos=[];

	return {
    getBrands: function(){
			$http.get("https://graph.facebook.com/v2.5/search?access_token=CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU&type=page&q=fashion&fields=id,name,category,description,about,likes,website,phone,emails,location,link,cover&limit=9999").then(function(response){
				data = response.data.data;
        console.log("============================ BRANDS ============================ ");
        console.log(data);
        $rootScope.brands=data;
        return $rootScope.brands;
			});
		}
	}
});

app.controller("brands",function($scope,$rootScope, $http, pullFb){
  console.log("brands");
    $scope.title="Brands";
    $rootScope.brands=pullFb.getBrands();

    $scope.create=function(id){
      console.log(id);
    }
});

  app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {url: '/brands',abstract: true,templateUrl: 'load-brand.html',controller:'brands'})
    });
