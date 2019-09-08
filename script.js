(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var number = document.getElementById("number");

var coins = 0;


var socket = io();

socket.on('connect', function () {
    socket.send('hi');

    socket.on('coins', function (count) {
        coins = count;
      number.innerHTML = coins;
    });
  });

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var entregar = document.getElementById("entregar");

var darken = 1;

var from=1,to=0.5


    

    
    function anim(from,to){
        
        $({ n: from }).animate({ n: to}, {
    duration: 10000,
    step: function(now, fx) {
        darken = now;
        draw();
        
    },
    complete:function(){
        
        setTimeout(function(){anim(to,from)},1000);
    }
});
        
    }
anim(from,to);

function draw(){
    
    var grd = ctx.createLinearGradient(0,0,720,450);
    
grd.addColorStop(0,"rgb(0, 0,"+139*darken+")");
grd.addColorStop(1,"rgb("+128*darken+", 0, "+128*darken+")");
    
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,720,450)
    
}







var timer = document.getElementById("timer");

var horaDelRegalo = new Date(2019, 08, 09, 12, 00, 00, 0);
//var horaDelRegalo = new Date(2019, 07, 28, 12, 00, 00, 0);

var segundoAnterior;

console.log(horaDelRegalo.toString())

var animFrame = requestAnimationFrame(update);

function update(){
    
    
    

var horaActual = Date.now();



var difTiempo  = horaDelRegalo.getTime()-horaActual

if(difTiempo <= 0){
   
    //se acabó la espera.
    timer.innerHTML="Su presente está disponible.";
    
    entregar.style.display="block";
    
    entregar.onclick = function(){
        if(coins === 0){return}
        
        socket.emit("entregar","hee hee");
        
        timer.innerHTML = "Ha adquirido su presente. Los detalles le serán enviados en discord."
        coins = 0;
        number.innerHTML = coins;
        
    }
    
    
   }else{
      var animFrame = requestAnimationFrame(update);
       
       
      var s = Math.floor(difTiempo/1000);
      var m = Math.floor(s/60);
              s = s % 60;
      var h = Math.floor(m/60);
       m = m % 60;
       
      var d = Math.floor(h/24);
       h = h % 24;
       
       
       var segundoActual = Math.floor(s);
       
       if(!segundoAnterior){
          
           updateTime(segundoActual,m,h,d);
           segundoAnterior = segundoActual;
        return;
           
          }else{
              
              if(segundoAnterior !== segundoActual){
                  
                  updateTime(s,m,h,d);
                  segundoAnterior = segundoActual;
                  return
              }
              
              
          }
       
       
   }
    
    
    
}

function updateTime(s,m,h,d){
   
    
    if(d<10){d="0"+d}
    if(h<10){h="0"+h}
    if(m<10){m="0"+m}
    if(s<10){s="0"+s}
    
    var str = d+":"+h+":"+m+":"+s;
    timer.innerHTML=str;
}