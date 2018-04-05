var init = function () {

    var canvas = document.getElementById("canvas");

    var wall1 = new Sprite(new Vector(0,0   ), 1000, 20 , Infinity,canvas);
    var wall2 = new Sprite(new Vector(0,580 ), 1000, 20 , Infinity,canvas);
    var wall3 = new Sprite(new Vector(0,20  ), 20  , 560, Infinity,canvas);
    var wall4 = new Sprite(new Vector(980,20), 20  , 560, Infinity,canvas);

    var engine = new Engine();
    engine.addBody(wall1);
    engine.addBody(wall2);
    engine.addBody(wall3);
    engine.addBody(wall4);
    

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
    

    canvas.addEventListener("click", function (ev) {
    if (this != ev.target) return;
    

    var x = ev.offsetX;
    var y = ev.offsetY;
    console.log("x : "+x + " y : "+y);


    //var div = document.createElement("div");
    
    //div.className = "object";
    var sprite = new Sprite(new Vector(x,y), 30, 30, +document.getElementById("mass").value, canvas);
    

    sprite.force = new Vector(0.01 ,0.01 );
    engine.addBody(sprite);
    
    
    //canvas.appendChild(div);
    //engine.addBody(sprite);

    canvas.addEventListener("click", function (ev) {
        //engine.removeBody(sprite);
    });



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
    
    
};

window.addEventListener("load", init);
