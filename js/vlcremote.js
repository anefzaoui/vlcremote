var vlcrem = {

loadJSON : function json_load(url,id,callback){
console.log("===== Loading Json =====");
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = url+"?callback="+callback;
newScript.id = "script"+id;
headID.appendChild(newScript);
console.log("===== Main Json Successfullly Loaded");
},


showStats : function stats_(obj){
document.getElementById("now-playing").innerHTML=obj["information"].category.meta.filename;
},


init : function initialize(){
vlcrem.loadJSON("http://localhost:8080/requests/status.json","status","showStats");
}

}


window.addEventListener('load', function readerOnLoad(evt) {
  window.removeEventListener('load', readerOnLoad);
  vlcrem.init();
  
});