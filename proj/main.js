var idAnimation;
var engine = new Engine();
var bird;
var init = function () {
    $(function(){
        
        $.getJSON( "levels.json", function( json ) {
            //console.log(json.level1[1].length);
            
            Constants.gravity = new Vector (0, 0.0002);
            
            var canvas = document.getElementById("canvas");
            canvas.width = json.level1[0].width;
            canvas.height = json.level1[0].height;


            for (var i = 0; i < json.level1[1].length; i++){
                var wall1 = new Sprite(new Vector(json.level1[1][i].xWall,json.level1[1][i].yWall), json.level1[1][i].width, json.level1[1][i].height , Infinity,1,canvas);

                engine.addBody(wall1);
            }


            for (var i = 0; i < json.level1[2].length; i++){
                var wall2 = new Sprite(new Vector(json.level1[2][i].xWall,json.level1[2][i].yWall), json.level1[2][i].width, json.level1[2][i].height , Infinity,1,canvas);

                engine.addBody(wall2);
            }

            bird = new Bird(new Vector(json.level1[3].birdPosX, json.level1[3].birdPosY), json.level1[3].birdWidth, json.level1[3].birdHeight, Infinity,0.8,canvas);
            bird.force = new Vector(0.0, 0.0);  
            engine.addBody(bird);


            //HARDCODE    
            var cible = new Cible(new Vector(900, 500), 30, 30, Infinity,1,canvas);
            //cible.force = new Vector(0.0, 0.0);  
            engine.addBody(cible);

            

            var box1 = new Box(new Vector(800, 400), 50, 50, 500,0.5,canvas);
            engine.addBody(box1);
            var box1 = new Box(new Vector(800, 300), 50, 50, 500,0.5,canvas);
            engine.addBody(box1);
            var box1 = new Box(new Vector(800, 250), 50, 50, 500,0.5,canvas);
            engine.addBody(box1);
            var box1 = new Box(new Vector(400, 300), 50, 50, 500,0.5,canvas);
            engine.addBody(box1);
            var box1 = new Box(new Vector(400, 360), 50, 50, 500,0.5,canvas);
            engine.addBody(box1);


            //HARDCODE

            var renderer = new Renderer(engine);
            
            start();
            function drawPage() {
                idAnimation = undefined;
                renderer.update(1000/60);
                start();
            }
            function start() {
                if (!idAnimation) {
                   idAnimation = window.requestAnimationFrame(drawPage);
                }
            }

            var initX;
            var initY;

            var moveX;
            var moveY;

            var drag = false;

            $("#canvas").mousedown(function (e) {
                if(e.offsetX > bird.origin.x && e.offsetX < bird.origin.x + bird.width &&  e.offsetY > bird.origin.y && e.offsetY < bird.origin.y + bird.height){
                    initX = e.offsetX;
                    initY = e.offsetY;
                    drag = true;
                }
            });

            $("#canvas").mousemove(function (e) {
                if (e.which == 1) {
                    moveX = e.offsetX;
                    moveY = e.offsetY;
                }
            });

            $("#canvas").mouseup(function (e) {
                if (this != e.target) return;
                var xvect = moveX - initX;
                var yvect = moveY - initY;
                var vectTest = new Vector(-xvect, -yvect);
                if(drag){
                    bird.mass = json.level1[3].masse;
                    bird.invMass = 1/json.level1[3].masse;
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
init(); 
