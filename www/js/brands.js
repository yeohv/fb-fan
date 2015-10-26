
var brands = angular.module("brands",[]);


var OnokoDB = {};
OnokoDB.put = function(type,data,callback){
	$.getJSON("http://onokodb.appspot.com/put",{type:type,payload:JSON.stringify(data)},callback);
};
OnokoDB.list = function(type,callback){
	$.getJSON("http://onokodb.appspot.com/list",{type:type},callback);
};
