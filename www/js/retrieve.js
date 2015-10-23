
var utils = angular.module("retrieve",[]);


utils.factory("analytics",function($http){
  var analytics = {};
  analytics.appName = "Fan";
  analytics.appId = "com.fan.app";
  analytics.appVersion = "0.1";
  //analytics.trackerId = "UA-61221904-2";
  analytics.userId ="0";


  analytics.event = function(e,id){
    ga('send','event','dev',e,id);
  };

  return analytics;
});
