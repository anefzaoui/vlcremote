var vlcremote = {

state : null,
position : null,
curWidth : null,
ClearState : null,
slave : false,
remove : function remove(id){
var elem;
return (elem=document.getElementById(id)).parentNode.removeChild(elem);
},

updatePosition : function(p){
vlcremote.curWidth = document.getElementById("totalporgress").clientWidth;
//vlcremote.curWidth = document.body.clientWidth - 20;
document.getElementById("progress").style.width=Math.round((vlcremote.curWidth/100)*(vlcremote.position*100))+"px";
},
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

update : function(){
vlcremote.remove("scriptstatus");
setTimeout(vlcremote.init, 500);
},

read : function(obj){
if(obj["version"]) vlcremote.slave=true;
else vlcremote.slave=false;
if(vlcremote.slave){

vlcremote.state=obj["state"];
vlcremote.position=obj["position"];
if(vlcremote.state=="playing") vlcremote.ClearState="Playing"
else if(vlcremote.state=="paused") vlcremote.ClearState="Paused"
else if(vlcremote.state=="stopped") vlcremote.ClearState="Stopped";

if(vlcremote.state=="playing" || vlcremote.state=="paused")
{
document.getElementById("now-playing").innerHTML=vlcremote.ClearState+" : "+obj["information"].category.meta.title;
document.getElementById("volume").innerHTML="Volume : "+calc.volume(obj["volume"]) + "%";
document.getElementById("time-info").innerHTML=calc.format_time(obj["time"]) + " / " + calc.format_time(obj["length"]);
vlcremote.updatePosition();
}
else if(vlcremote.state=="stopped"){
document.getElementById("now-playing").innerHTML=vlcremote.ClearState;
document.getElementById("volume").innerHTML="Volume : "+calc.volume(obj["volume"]) + "%";
document.getElementById("time-info").innerHTML=calc.format_time(obj["time"]) + " / " + calc.format_time(obj["length"]);
vlcremote.updatePosition();
}
					}
else if(vlcremote.slave==false){
document.getElementById("now-playing").innerHTML="Can not connect to Server";
document.getElementById("volume").innerHTML="Volume : --";
document.getElementById("time-info").innerHTML="-- / --";
	}

},


init : function initialize(){
vlcremote.loadJSON("http://localhost:8080/requests/status_c.json","status","vlcremote.read");
vlcremote.update();
}

}


window.addEventListener('load', function readerOnLoad(evt) {
  window.removeEventListener('load', readerOnLoad);
  vlcremote.init();
  
});