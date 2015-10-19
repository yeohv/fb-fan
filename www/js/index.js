var app=angular.module('starter', ['ionic','angularModalService']);

app.run(function($rootScope, $http){
  $rootScope.brand="14226545351";
  $rootScope.accesstoken="CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU";

});


app.factory('pullFb', function($http,$rootScope) {
	var url= "https://graph.facebook.com/v2.3/"+$rootScope.brand;
  var token="access_token="+$rootScope.accesstoken;
  var query="";
  var photos=[];

	return {
		getPosts: function(){

      query="/?fields=posts.fields(name,link,source,description,place,created_time,message, picture)&";
      var link=url+query+token;
      console.log(link);
			$http.get(url+query+token).then(function(response){
        myData=response.data.posts.data;
        console.log("============================ POSTS ============================ ");
        console.log(myData);
       $rootScope.items = myData;
       return $rootScope.items;
			});
		},
    getAbout: function(){
      query="/?fields=id,name,description,about,likes,website,phone,location,link,cover&";
      var link=url+query+token;
      console.log(link);
			$http.get(link).then(function(response){
				data = response.data;
        console.log("============================ ABOUT ============================ ");
        console.log(data);
        $rootScope.about=data;
        return $rootScope.about;
			});
		},
    getBrands: function(){
			$http.get("https://graph.facebook.com/v2.5/search?access_token=CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU&type=page&q=fashion&fields=id,name,category,description,about,likes,website,phone,emails,location,link,cover&limit=9999").then(function(response){
				data = response.data.data;
        console.log("============================ BRANDS ============================ ");
        console.log(data);
        $rootScope.brands=data;
        return $rootScope.brands;
			});
		},
    getEvents: function(){
      query="/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&";
      var link=url+query+token;
      console.log(link);
      $http.get(url+"/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&"+token).then(function(response){
        data = response.data.events.data;
        console.log("============================ EVENTs ============================ ");
        console.log(data);
        $rootScope.events=data;
        return $rootScope.events;
      });
    },
    getVideos: function(){
      query="?fields=videos.fields(id,name,description,updated_time,picture,source)&"
      var link=url+query+token;
      console.log(link);
      $http.get(link).then(function(response){
        data=response.data.videos.data;
        console.log("============================ VIDEOS ============================ ");
        console.log(data);
        $rootScope.videos=data;
        return $rootScope.videos;
      });
    },
		getPhotos: function(id){
      query="?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source,place,name_tags,created_time))&";
      var link=url+query+token;
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
        console.log("============================ PHOTOS ============================ ");
        console.log(photos);
        $rootScope.photos=photos;
        return $rootScope.photos;
      });
		}
	}
});

app.controller("product",function($scope,$rootScope){
    $scope.title="Product";
    $scope.products=[
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6021-70918-large/lb-basics-dagny-striped-top.jpg",descr:"",title:"Striped Top",price:"$20.50"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/5920-69584-home/lb-basics-tavis-tee.jpg",descr:"",title:"Basics Tavis Tee",price:"$18.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/5916-69424-home/lb-basics-lanza-striped-top.jpg",descr:"",title:"Basics Lanza Striped Top",price:"$19.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/4305-49420-home/tasmin-tube.jpg",descr:"",title:"Tasmin Tube",price:"$40.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6143-72323-home/covet-ravyn-tube-playsuit.jpg",descr:"",title:"Ravyn Tube Playsuit",price:"$50.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6098-71838-home/covet-mireille-slit-maxi-skirt.jpg",descr:"",title:"Mireille Slit Maxi Skirt",price:"$19.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6090-71792-home/-covet-taelyn-embellished-collar-top.jpg",descr:"",title:"Embillished Collar Top",price:"$23.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6073-71602-home/covet-pedrine-pants.jpg",descr:"",title:"Covet Pedrine Pants",price:"$36.00"},
      {src:"http://www.lovebonito.com.global.prod.fastly.net/6030-71003-home/covet-basha-belted-playsuit.jpg",descr:"",title:"Covet Basha Belted Playsuit",price:"$43.00"}
    ];


});


app.controller("about",function($scope,$rootScope, $http, pullFb){
    $scope.title="About us";
    $rootScope.about=pullFb.getAbout();
});

app.controller("events",function($scope,$rootScope, $http, pullFb,ModalService){
    $scope.title="Events";
    $rootScope.events=pullFb.getEvents();
    $scope.show = function(src) {
      $scope.src=src;
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});

app.controller("videos",function($scope,$rootScope, $http, pullFb, ModalService){
    $scope.title="Videos";
    $scope.init = function(){
         $rootScope.videos=pullFb.getVideos();
      };
    $scope.show = function(src) {
      $scope.src=src;
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


app.controller("albums",function($scope,$rootScope, $http, pullFb){
    $scope.title="Photos";
$scope.init = function(){
     $rootScope.photos=pullFb.getPhotos();
  }

});
app.controller("brands",function($scope,$rootScope, $http, pullFb){
    $scope.title="Brands";
    $rootScope.brands=pullFb.getBrands();
});

app.controller("help",function($scope,$rootScope,pullFb, ModalService){
    $scope.title="Timeline";
    $rootScope.items=pullFb.getPosts();
    $scope.toggleSearch = function(){
        $scope.query = "";
    };

    $scope.show = function(src) {
      $scope.src=src;
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});


  app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {url: '',abstract: true,templateUrl: 'views/menu.html'})
      .state('app.help', {url:'/help',views: {menuContent: {templateUrl: 'views/list.html',controller:'help'}}})
      .state('app.product', {url:'/product',views: {menuContent: {templateUrl: 'views/product.html',controller:'product'}}})
      .state('app.about', {url:'/about',views: {menuContent: {templateUrl: 'views/about.html',controller:'about'}}})
      .state('app.albums', {url:'/albums',views: {menuContent: {templateUrl: 'views/albums.html',controller:'albums'}}})
      .state('app.events', {url:'/events',views: {menuContent: {templateUrl: 'views/events.html',controller:'events'}}})
      .state('app.videos', {url:'/videos',views: {menuContent: {templateUrl: 'views/videos.html',controller:'videos'}}})
      .state('app.brands', {url:'/brands',views: {menuContent: {templateUrl: 'views/brands.html',controller:'brands'}}})
      $urlRouterProvider.otherwise('/help');
    });
