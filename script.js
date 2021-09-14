const canvas= document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;
let particleArray= [];
let adjustX= 30;
let adjustY= 5;

//handle mouse
const mouse={
    x:null,
    y:null,
    radius:150
}

window.addEventListener('mousemove',function(event){
    mouse.x= event.x;
    mouse.y= event.y;
    
   // console.log(mouse.x,mouse.y);
});

ctx.fillStyle= 'white';
ctx.font= '30px Verdana';
ctx.fillText('ASHISH', 0, 40);
let particleColor= ctx.fillStyle;
//ctx.fllText(text, x-cord, y-cord)
// ctx.strokeStyle= 'white';
// ctx.strokeRect(0, 0, 100, 100);
const textCoordinates= ctx.getImageData(0, 0, 400, 100);
//getImageData gives pixel by pixel information about any image in array

class Particle{
    constructor(x,y){
        this.x= x;
        this.y= y;
        this.size= 1.5;
        this.baseX= this.x;
        this.baseY= this.y;
        this.density= (Math.random()*45) +5;
    }
    draw(){
        ctx.fillStyle= 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

    }
    update(){
        //here dx and dy are difference between position of mouse and particle in x and y cord
        let dx= mouse.x- this.x;
        let dy= mouse.y- this.y;
        //distence is length of hypotenus formed by sides dx and dy( dx perpandi to dy)
        let distance= Math.sqrt(dx*dx + dy*dy);

        let forceDirectionX= dx/distance;
        let forceDirectionY= dy/distance;
        let maxDistance = mouse.radius;

        //force variable will help in changing the velocity of particle at diff. instant
        let force= (maxDistance-distance)/maxDistance;
        let directionX= forceDirectionX*force*this.density;
        let directionY= forceDirectionY*force*this.density;

        //size increses when mouse come closer
        if(distance< mouse.radius){
           // this.size = 20;
           this.x -= directionX;
           this.y-= directionY;
          // particleColor='yellow';
        }
        else{
            //baseX is initial positon of particle
            if(this.x!==this.baseX){
                let dx= this.x- this.baseX;
                this.x-= dx/10;
            }
            if(this.y != this.baseY){
                let dy= this.y - this.baseY;
                this.y-= dy/10;
            }
        }
    }
}
//textCoordinate is special type of array containing only numbers(pixel color) called as clamped array
//console.log(textCoordinates);
function init(){
    particleArray= [];
    for(let y=0, y2 = textCoordinates.height; y<y2;y++){
        for(let x=0,x2= textCoordinates.width; x<x2;x++){
            //if statement is checking opacity of pixel
             if(textCoordinates.data[(y*4* textCoordinates.width) + (x*4)+3]>128){
                let positionX=x + adjustX;
                let positionY=y+adjustY;
                particleArray.push(new Particle(positionX*7, positionY*7));
             }
        }
    }
  
}
init();
//console.log(particleArray);

//here animate is a recursive function which is calling itself again and redrawing it 
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    //connect();
    requestAnimationFrame(animate);
}
animate();

//connect function will connect line between the dots i am not calling it because it takes a lot of memorey and doesnot working properly here 
function connect(){
    let opacityValue= 1;
    for(let a=10; a<particleArray.length; a++){
        for(let b= a; b< particleArray.length;b++){
            let dx= particleArray[a].x-particleArray[b].x;
            let dy= particleArray[a].y- particleArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            opacityValue = 1- (distance/25);
            ctx.strokeStyle = 'rgba(255,255,255,'+opacityValue+')';
            if(distance< 25){
                
                ctx.lineWidthh =2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}