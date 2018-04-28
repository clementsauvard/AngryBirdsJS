var launch= false;
var level = 0;
var idAnimation;
var engine = new Engine();
var bird;
var savePosX;
var savePosY;
var nbBird;
var init = function (level) {
    $(function(){
        
        $("#niveau").text("Niveau : " + level);
        
        $.getJSON( "levels.json", function( json ) {
            
            Constants.gravity = new Vector (0, 0.0006);
        
            var canvas = document.getElementById("canvas");
            canvas.width = json[level].level[0].width;
            canvas.height = json[level].level[0].height;



            for (var i = 0; i < json[level].level[1].length; i++){
                var wall1 = new Sprite(new Vector(json[level].level[1][i].xWall,json[level].level[1][i].yWall), json[level].level[1][i].width, json[level].level[1][i].height , Infinity,1,-1,canvas);
                engine.addBody(wall1);
            }

            for (var i = 0; i < json[level].level[2].length; i++){
                var wall2 = new Sprite(new Vector(json[level].level[2][i].xWall,json[level].level[2][i].yWall), json[level].level[2][i].width, json[level].level[2][i].height , Infinity,1,-1,canvas);
                engine.addBody(wall2);
            }
            
            if (json[level].level[5] != null){
                for (var i = 0; i < json[level].level[5].length; i++){
                    var box = new Box(new Vector(json[level].level[5][i].xBox,json[level].level[5][i].yBox), json[level].level[5][i].boxWidth, json[level].level[5][i].boxHeight , 2000,0.5,3,canvas);
                    engine.addBody(box);
                }
            }

            bird = new Bird(new Vector(json[level].level[3].birdPosX, json[level].level[3].birdPosY), json[level].level[3].birdWidth, json[level].level[3].birdHeight, Infinity,0.65,canvas);
            nbBird = 3;
            $("#nbOiseau").text("Oiseau restant : " + nbBird);
            bird = new Bird(new Vector(json[level].level[3].birdPosX, json[level].level[3].birdPosY), json[level].level[3].birdWidth, json[level].level[3].birdHeight, Infinity,0.6,-1,canvas);
            savePosX = json[level].level[3].birdPosX;
            savePosY = json[level].level[3].birdPosY;
            bird.force = new Vector(0.0, 0.0);  
            engine.addBody(bird);

            
            var cible = new Cible(new Vector(json[level].level[4].ciblePosX, json[level].level[4].ciblePosY), json[level].level[4].cibleWidth, json[level].level[4].cibleHeight, Infinity,1,-1,canvas);
            engine.addBody(cible);

            var renderer = new Renderer(engine);
            
            var before,now,fps;
            before=Date.now();
            fps = 0;
            
            start();
            
            function drawPage() {
                now = Date.now();
                fps=Math.round(1000/(now-before))
                before = now;
                idAnimation = undefined;
                renderer.update(1000/60);
                start();
            }
            function start() {
                if (!idAnimation) {
                   idAnimation = window.requestAnimationFrame(drawPage);
                   $("#showFPS").text("FPS : "+ fps);
                    if (drag){
                        var img = new Image();   // Crée un nouvel élément Image
                        img.src = '/img/slingshot.png';
                        var ctx=canvas.getContext("2d");
                        ctx.beginPath();
                        ctx.drawImage(img,moveX-20, moveY-50, 50, 50);
                        ctx.moveTo(initX,initY);
                        ctx.lineTo(moveX,moveY);
                        ctx.stroke();
                    }
                }
            }

            var initX;
            var initY;

            var moveX;
            var moveY;

            var drag = false;

            $("#canvas").mousedown(function (e) {
                if(e.offsetX > bird.origin.x && e.offsetX < bird.origin.x + bird.width &&  e.offsetY > bird.origin.y && e.offsetY < bird.origin.y + bird.height){
                    e.preventDefault();
                    initX = e.offsetX;
                    initY = e.offsetY;
                    drag = true;
                }
            });

            $("#canvas").mousemove(function (e) {
                if (e.which == 1) {
                    e.preventDefault();
                    moveX = e.offsetX;
                    moveY = e.offsetY;
                }
            });

            $("#canvas").mouseup(function (e) {
                if (this != e.target || launch==true) return;
                launch=true;
                var xvect = moveX - initX;
                var yvect = moveY - initY;
                var vectTest = new Vector(2*(-xvect), 2*(-yvect));
                if(drag){
                    bird.mass = json[level].level[3].masse;
                    bird.invMass = 1/json[level].level[3].masse;
                    bird.force = vectTest;
                    drag = false;
                }
            });
        });


    });
};
//window.addEventListener("load", init);


function stop() {
    if (idAnimation) {
       window.cancelAnimationFrame(idAnimation);
       idAnimation = undefined;
    }
}
init(level); 
