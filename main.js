var launch= false;
var level = 0;
var idAnimation;
var engine = new Engine();
var bird;
var savePosX;
var savePosY;
var nbBird;
var gravity = new Vector(0, 0.0006)
var init = function (level) {
    $(function(){
        
        $("#lvl").val(level);
        
        //Récupération des données du fichiers json
        $.getJSON( "levels.json", function( json ) {
            
            //Dimension du canvas
            var canvas = document.getElementById("canvas");
            canvas.width = json[level].level[0].width;
            canvas.height = json[level].level[0].height;

            //Création des 4 murs du canvas
            for (var i = 0; i < json[level].level[1].length; i++){
                var wall1 = new Sprite(new Vector(json[level].level[1][i].xWallCanvas,json[level].level[1][i].yWallCanvas), json[level].level[1][i].width, json[level].level[1][i].height , Infinity,json[level].level[1][i].elasticity,-1,canvas);
                engine.addBody(wall1);
            }

            //Création de tout les murs qui font partie du jeu excepté les 4 murs du canvas
            for (var i = 0; i < json[level].level[2].length; i++){
                var wall2 = new Sprite(new Vector(json[level].level[2][i].xWall,json[level].level[2][i].yWall), json[level].level[2][i].width, json[level].level[2][i].height , Infinity,json[level].level[2][i].elasticity,json[level].level[2][i].life,canvas);
                engine.addBody(wall2);
            }
            //Création des caisses
            if (json[level].level[5] != null){
                for (var i = 0; i < json[level].level[5].length; i++){
                    var box = new Box(new Vector(json[level].level[5][i].xBox,json[level].level[5][i].yBox), json[level].level[5][i].boxWidth, json[level].level[5][i].boxHeight , 2000,json[level].level[5][i].elasticity,3,canvas);
                    engine.addBody(box);
                }
            }
            //On initialise le nombre d'oiseau max par niveau (3)
            nbBird = 3;
            $("#nbOiseau").text("Oiseau restant : " + nbBird);
            //Création de l'oiseau (sa masse vaut infinity car il ne doit pas bouger au début)
            bird = new Bird(new Vector(json[level].level[3].birdPosX, json[level].level[3].birdPosY), json[level].level[3].birdWidth, json[level].level[3].birdHeight, Infinity,json[level].level[3].elasticity,-1,canvas);
            //On sauvegarde la position de base de l'oiseau pour le replacer si on n'a pas touché la cible (évite de recharger le json)
            savePosX = json[level].level[3].birdPosX;
            savePosY = json[level].level[3].birdPosY;
            // La force de l'oiseau (nul au début)
            bird.force = new Vector(0.0, 0.0);  
            engine.addBody(bird);

            //Création de la cible
            var cible = new Cible(new Vector(json[level].level[4].ciblePosX, json[level].level[4].ciblePosY), json[level].level[4].cibleWidth, json[level].level[4].cibleHeight, json[level].level[4].masse,json[level].level[4].elasticity,json[level].level[4].life,canvas);
            engine.addBody(cible);

            //----------------------- Renderer, RequestAnimationFrame et affichage des FPS
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
                        img.src = './img/slingshot.png';
                        var ctx=canvas.getContext("2d");
                        ctx.beginPath();
                        ctx.drawImage(img,moveX-20, moveY-50, 50, 50);
                        ctx.moveTo(initX,initY);
                        ctx.lineTo(moveX,moveY);
                        ctx.stroke();
                    }
                }
            }
            //----------------------------------------------------------------------------
            
            var initX;
            var initY;

            var moveX;
            var moveY;

            var drag = false;

            //Le cri quand on lance l'oiseau
            var obj = document.createElement("audio");
            obj.src="./img/cri.mp3";
            obj.volume=0.10;
            obj.autoPlay=false;
            obj.preLoad=true; 
            
            //Le bruit d'étirement du lance pierre
            var obj2 = document.createElement("audio");
            obj2.src="./img/stretched.mp3";
            obj2.volume=0.50;
            obj2.autoPlay=false;
            obj2.preLoad=true;
            
            //Quand on appuie (uniquement sur la position de l'oiseau), on sauvegarde sa position
            $("#canvas").mousedown(function (e) {
                if(e.offsetX > bird.origin.x && e.offsetX < bird.origin.x + bird.width &&  e.offsetY > bird.origin.y && e.offsetY < bird.origin.y + bird.height && launch==false){
                    e.preventDefault();
                    obj2.play();
                    initX = e.offsetX;
                    initY = e.offsetY;
                    drag = true;
                    launch = true;
                }
            });
            
            //On sauvegarde la position lorsque la souris est en mouvement
            $("#canvas").mousemove(function (e) {
                if (e.which == 1) {
                    e.preventDefault();
                    moveX = e.offsetX;
                    moveY = e.offsetY;
                }
            });

            //Lorsqu'on relache la souris, le vecteur pour la force est calculé, on récupère la masse de l'oiseau définit dans le json et on
            //change les paramètres de l'oiseau, ce qui le lance
            $("#canvas").mouseup(function (e) {
                if (this != e.target) return;
                var xvect = moveX - initX;
                var yvect = moveY - initY;
                var vectTest = new Vector(2*(-xvect), 2*(-yvect));
                if(drag){
                    obj.play();
                    bird.mass = json[level].level[3].masse;
                    bird.invMass = 1/json[level].level[3].masse;
                    bird.force = vectTest;
                    drag = false;
                    initX = undefined;
                    initY = undefined;
                    moveX = undefined;
                    moveY = undefined;
                }
            });
            
        });


    });
};

//Permet de stoper l'animation
function stop() {
    if (idAnimation) {
       window.cancelAnimationFrame(idAnimation);
       idAnimation = undefined;
    }
}

init(level); 
//Passer au niveau suivant, en réinitialisant l'engine
function newLevel() {
    launch=false;
    level++;
    stop();
    engine.bodies = [];
    bird = null;
    init(level);
}
