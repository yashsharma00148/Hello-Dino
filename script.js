let dino=document.querySelector(".dino")
let enemy=document.querySelector(".enemy")
let points=0
enemy.classList.add("animatedenemy")
let score=document.querySelector(".score")
let overaudio=new Audio("gameover.mp3")
let audio=new Audio("bg.mp3")
let jumpaudio=new Audio("jump.mp3")
let over=document.querySelector(".over")
let game_end=false

audio.loop
audio.play()

document.onkeydown=function(e){
   console.log(e.keyCode)
   if(e.keyCode==38){
    dino.classList.add("animateddino")
    jumpaudio.play()
   }
   setTimeout(() => {
       dino.classList.remove("animateddino")
    //    jumpaudio.pause()
   }, 600);

   if(e.keyCode==39){
    let dx=parseInt(window.getComputedStyle(dino).getPropertyValue("left"))
    dino.style.left=dx+30+"px"
   
    
   }
   if(e.keyCode==13){
    window.location.reload()
   }
}

setInterval(() => {
    let enemy_speed=window.getComputedStyle(enemy).getPropertyValue("animation-duration")
    console.log("speed:",enemy_speed)
    enemy_speed=parseFloat(enemy_speed)
    if(enemy_speed<1.5){
    enemy_speed=1.5

    }
    else{
        enemy_speed-=.02
    }
    enemy.style.animationDuration=enemy_speed+"s"
},5000);
setInterval(() => {
    let dx=parseInt(window.getComputedStyle(dino).getPropertyValue("left"))
    let dz=parseInt(window.getComputedStyle(dino).getPropertyValue("right"))
    let dy=parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"))

    let ex=parseInt(window.getComputedStyle(enemy).getPropertyValue("left"))
    let ey=parseInt(window.getComputedStyle(enemy).getPropertyValue("bottom"))
    let offsetx=Math.abs(dx-ex)
    let offsety=Math.abs(dy-ey)
    console.log("dz:",dz)
    //  console.log("offsetx:",offsetx)
    //  console.log("offsety:",offsety)
    if(offsetx<70 && offsety<100){
        game_end=true
        audio.pause()
        audio.currentTime=0
        overaudio.play()
        setTimeout(() => {
            overaudio.pause();
            overaudio.currentTime = 0;
        }, 1000); 
     

        enemy.classList.remove("animatedenemy")
        over.style.top="0px"

        // alert("Game over Reload to continue")
        // window.location.reload()
    }
    if(dz<=70){
        alert("dino won")
        dino.style.left="0px"
        enemy.style.right="0px"
    }
    



},100);


setInterval(() => {
    if(!game_end){
        points+=1
        score.innerHTML=`Score:${points}`


    }
}, 1000);
