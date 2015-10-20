var app=angular.module('starter', ['ionic','angularModalService']);

app.run(function($rootScope){
  $rootScope.accesstoken="CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU";

});

app.factory('pullFb', function($http,$rootScope,$ionicLoading) {
  //$rootScope.brand="14226545351";
	var url= "https://graph.facebook.com/v2.3/";
  var token="access_token="+$rootScope.accesstoken;
  var query="";
  var photos=[];

	return {
		getPosts: function(){
      //console.log("getPosts:"+$rootScope.brand);
      query="/?fields=posts.fields(name,link,source,description,place,created_time,message, picture)&";
      var link=url+$rootScope.brand+query+token;
    //  console.log(link);
			$http.get(link).then(function(response){
        myData=response.data.posts.data;
        //console.log("============================ POSTS ============================ ");
        //console.log(myData);
       $rootScope.items = myData;
        $ionicLoading.hide();
       return $rootScope.items;
			});
		},
    getAbout: function(){
      query="/?fields=id,name,description,about,likes,website,phone,location,link,cover&";
      var link=url+$rootScope.brand+query+token;
      //console.log(link);
			$http.get(link).then(function(response){
				data = response.data;
        //console.log("============================ ABOUT ============================ ");
        //console.log(data);
        $rootScope.about=data;
          $ionicLoading.hide();
        return $rootScope.about;
			});
		},
    getBrands: function(query){
      console.log("query here");
      console.log(query);
			$http.get("https://graph.facebook.com/v2.5/search?access_token=CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU&type=page&q="+query+"&fields=id,name,category,description,about,likes,website,phone,emails,location,link,cover&limit=9999").then(function(response){
				data = response.data.data;
        //console.log("============================ BRANDS ============================ ");
        console.log(data);
        $rootScope.brands=data;
        $ionicLoading.hide();
        return $rootScope.brands;
			});
		},
    getEvents: function(){
      query="/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&";
      var link=url+$rootScope.brand;
        //console.log($rootScope.brand);
      $http.get(url+$rootScope.brand+"/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&"+token).then(function(response){
        data = response.data.events.data;
        //console.log("============================ EVENTs ============================ ");
        //console.log(data);
        $rootScope.events=data;
          $ionicLoading.hide();
        return $rootScope.events;
      });
    },
    getVideos: function(){
      query="?fields=videos.fields(id,name,description,updated_time,picture,source)&"
      var link=url+$rootScope.brand+query+token;
      //console.log(link);
      $http.get(link).then(function(response){
        data=response.data.videos.data;
        //console.log("============================ VIDEOS ============================ ");
        //console.log(data);
        $rootScope.videos=data;
          $ionicLoading.hide();
        return $rootScope.videos;
      });
    },
		getPhotos: function(id){
      query="?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source,place,name_tags,created_time))&";
    var link=url+$rootScope.brand+query+token;
      console.log(link);

      $http.get(link).then(function(response){
        var albums=response.data.albums.data;
        console.log(albums)
        for(var i=0;i<albums.length;i++){
          if(albums[i].photos==undefined||albums[i].photos.data==undefined ||albums[i].photos.data.length<1 ){continue;}
          for(var x=0;x<albums[i].photos.data.length;x++){
            photos.push(albums[i].photos.data[x]);
          }
        }
        //console.log("============================ PHOTOS ============================ ");
        //console.log(photos);
        $rootScope.photos=photos;
        $ionicLoading.hide();
        return $rootScope.photos;
      });
		}
	}
});

app.controller("product",function($scope,$rootScope,$ionicSideMenuDelegate){
    $ionicSideMenuDelegate.toggleRight();
    $scope.title="Product";
    $scope.products=[
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Striped Top",price:"$20.50"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Basics Tavis Tee",price:"$18.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Basics Lanza Striped Top",price:"$19.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Tasmin Tube",price:"$40.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Ravyn Tube Playsuit",price:"$50.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Mireille Slit Maxi Skirt",price:"$19.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Embillished Collar Top",price:"$23.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Covet Pedrine Pants",price:"$36.00"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"",title:"Covet Basha Belted Playsuit",price:"$43.00"}
    ];
});

app.controller("deals",function($scope,$rootScope,$ionicSideMenuDelegate){
    $ionicSideMenuDelegate.toggleRight();
    $scope.title="Promotions";
    $scope.promotions=[
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Check out our newest items on Sale",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"10% off Selected Items",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Buy one get one free",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Check out our newest items on Sale",title:"The Big Summer Promotion"},
    ];
});

app.controller("about",function($scope,$rootScope, $http, pullFb,$ionicSideMenuDelegate){
    $ionicSideMenuDelegate.toggleRight();
    $scope.title="About us";
    $rootScope.about=pullFb.getAbout();
});

app.controller("events",function($scope,$rootScope, $http, pullFb,ModalService,$ionicSideMenuDelegate){
    $ionicSideMenuDelegate.toggleRight();
    $scope.title="Events";
    $rootScope.events=pullFb.getEvents();
    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});

app.controller("videos",function($scope,$rootScope, $http, pullFb, ModalService,$ionicSideMenuDelegate){
    $ionicSideMenuDelegate.toggleRight();
    $scope.title="Videos";
    $rootScope.videos=pullFb.getVideos();
    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };

});

app.controller('ModalController', function($scope, close, $rootScope,$sce) {
$scope.play = $sce.trustAsResourceUrl($rootScope.src);
console.log($scope.play);
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});


app.controller("albums",function($scope,$rootScope, $http, pullFb,$ionicSideMenuDelegate){
  $ionicSideMenuDelegate.toggleRight();
    $scope.title="Photos";
$scope.init = function(){
     $rootScope.photos=pullFb.getPhotos();
  }

});
app.controller("brands",function($scope,$rootScope, $http, pullFb){
    console.log("brands");
    $scope.init = function(){
      $scope.title="Brands";
    }
    $scope.search=function(query){
      $rootScope.brands=pullFb.getBrands(query);
      console.log($rootScope.brands);
    }

    $scope.send=function(){
      
    }

});

app.controller("help",function($scope,$rootScope,$stateParams,pullFb, ModalService,$ionicSideMenuDelegate){
    $scope.init = function(){
      $ionicSideMenuDelegate.toggleRight();
      console.log("help");
      console.log($stateParams.id);
      $rootScope.id=$stateParams.id;
      $rootScope.brand=$rootScope.id;
      console.log("brand: "+$rootScope.brand);
        $scope.title="Timeline";
        $rootScope.items=pullFb.getPosts();
    };
    $scope.clickSearch = function(){
        $scope.query = "";
    };

    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});
app.controller("load",function($scope,$rootScope,$stateParams,$sce,pullFb, ModalService){
  console.log($stateParams.id);
  $rootScope.brand=$stateParams.id;
  console.log("load");
  var link="https://fb-fan.herokuapp.com/#/app/"+$stateParams.id;
  console.log(link);
  $scope.link = $sce.trustAsResourceUrl(link);
});

app.controller("menu",function($ionicLoading){
  $ionicLoading.show({
    template: '<ion-spinner icon="spiral"></ion-spinner>',
  })

});


  app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {url: '',abstract: true,templateUrl: 'views/menu.html',controller:'menu'})
      .state('load',{url:'/demo/:id',templateUrl: 'views/load-brand.html',controller:'load'})
      .state('brands', {url:'/brands',templateUrl: 'views/brands.html',controller:'brands'})
      .state('app.help',{url:'/app/:id',views:{menuContent: {templateUrl: 'views/list.html',controller:'help'}}})
      .state('app.product', {url:'/app/:id/product',views: {menuContent: {templateUrl: 'views/product.html',controller:'product'}}})
      .state('app.deals', {url:'/app/:id/deals',views: {menuContent: {templateUrl: 'views/deals.html',controller:'deals'}}})
      .state('app.about', {url:'/app/:id/about',views: {menuContent: {templateUrl: 'views/about.html',controller:'about'}}})
      .state('app.albums', {url:'/app/:id/albums',views: {menuContent: {templateUrl: 'views/albums.html',controller:'albums'}}})
      .state('app.events', {url:'/app/:id/events',views: {menuContent: {templateUrl: 'views/events.html',controller:'events'}}})
      .state('app.videos', {url:'/app/:id/videos',views: {menuContent: {templateUrl: 'views/videos.html',controller:'videos'}}})
      .state('error',{url:'/error',templateUrl: 'views/error.html'})
      $urlRouterProvider.otherwise('/error');
    });
