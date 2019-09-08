(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var number = document.getElementById("number");

var coins = 0;

var darken = 1;

var from=1,to=0.5








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