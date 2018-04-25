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
    

    var renderer = new Renderer(engine);
    var interval;
    interval = setInterval(function () {
    try {
            renderer.update(1000/60);
    } catch (e) {
        clearInterval(interval);
        throw (e);
    }
    }, 1000/60);
    

    var initX;
    var initY;

    var moveX;
    var moveY;

    var xvect;
    var yvect;
    
    canvas.addEventListener("click", function (ev) {
        if (this != ev.target) return;

        var x = ev.offsetX;
        var y = ev.offsetY;
        console.log("x : "+x + " y : "+y);


        var sprite = new Sprite(new Vector(x,y), 30, 30, +document.getElementById("mass").value, canvas);


        sprite.force = new Vector(0.01 ,-0.01);
        engine.addBody(sprite);

        /*
        canvas.addEventListener("click", function (ev) {
            //engine.removeBody(sprite);
        });
        */
    });

    $("#canvas").mousedown(function(e){
        initX = e.offsetX;
        initY = e.offsetY;
        console.log(initX + " " + initY);
    });

    $("#canvas").mousemove(function(e){
     if(e.which==1)
         {
            moveX = e.offsetX;
            moveY = e.offsetY;
            console.log("x : "+moveX + " y : "+moveY);
         }
    });

    $("#canvas").mouseup(function(e){
        xvect = moveX - initX;
        yvect = moveY - initY;
        console.log("x : "+xvect + " y : "+yvect);
    });
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
