$(function(){
        

var init = function () {

    $.getJSON( "levels.json", function( json ) {
    console.log(json.level1[1].length);
 
    
    var canvas = document.getElementById("canvas");
    canvas.width = json.level1[0].width;
    canvas.height = json.level1[0].height;
    
    var engine = new Engine();
    
    for (var i = 0; i < json.level1[1].length; i++){
        var wall1 = new Sprite(new Vector(json.level1[1][i].xWall,json.level1[1][i].yWall), json.level1[1][i].width, json.level1[1][i].height , Infinity,canvas);

        engine.addBody(wall1);
    }
          
    var bird = new Bird(new Vector(200, 400), 30, 30, 100,canvas);
    bird.force = new Vector(0.0, 0.0);
    bird.mass = 1000000;   
    engine.addBody(bird);
        
    var renderer = new Renderer(engine);
      
    function drawPage() {
        renderer.update(1000/60);
        requestAnimationFrame(drawPage);
    }
    requestAnimationFrame(drawPage);

    var initX;
    var initY;

    var moveX;
    var moveY;

    var xvect;
    var yvect;

    var vectTest;
    var masse;

    canvas.addEventListener("click", function (ev) {
        if (this != ev.target) return;

        var x = ev.offsetX;
        var y = ev.offsetY;
        console.log("x : "+x + " y : "+y);

        
        
        var sprite = new Bird(new Vector(x, y), 30, 30, masse, canvas);

        sprite.force = vectTest.normalize();
        engine.addBody(sprite);
        
    });

    $("#canvas").mousedown(function (e) {
        initX = e.offsetX;
        initY = e.offsetY;
    });

    $("#canvas").mousemove(function (e) {
        if (e.which == 1) {
            moveX = e.offsetX;
            moveY = e.offsetY;
        }
    });

    $("#canvas").mouseup(function (e) {
        xvect = moveX - initX;
        yvect = moveY - initY;
        vectTest = new Vector(-xvect, -yvect);
        masse = Distance(initX,initY,moveX,moveY);
    });
        
   function sqr(a) {
       return a * a;
   }

   function Distance(x1, y1, x2, y2) {
       return Math.sqrt(sqr(y2 - y1) + sqr(x2 - x1));
   }
        
        
        
        
        
        
        
        
        
        
        
        
        
    /* begin extra */
    var gravityInput = document.getElementById("gravity");
    var elasticityInput = document.getElementById("elasticity");


    gravityInput.value = Constants.gravity.y;
    elasticityInput.value = Constants.elasticity;

    gravityInput.addEventListener ("input", function () {
    Constants.gravity = new Vector (0, +(gravityInput.value));
    });
    elasticityInput.addEventListener ("input", function () {
    Constants.elasticity = +(elasticityInput.value);
    });
    /* end extra */
    
    
});
};

window.addEventListener("load", init);
    

});
