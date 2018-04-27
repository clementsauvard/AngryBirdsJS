var Cible = function (v, w, h, m, dom) {
    console.log(this);
    Body.call(this,v, w, h, m);
    this.display = dom;
};

Cible.prototype = Object.create (Body.prototype);
Cible.prototype.constructor = Cible;

Cible.prototype.draw = function () {

    var ctx = this.display.getContext("2d");        
    ctx.beginPath();
    
    var img = new Image();   // Crée un nouvel élément Image
    img.src = '/img/cible.png';
    ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();
    
    
    /* begin extra */
    if (this.hasCollision) {
        console.log("Elasticity : " + Constants.elasticity);
        console.log(Constants.gravity);
	    //this.display.style.backgroundColor = "green";
        //cancelAnimationFrame(idAnimation);
        engine.bodies = [];
        bird = null;
        renderer = null;
        init();
	this.setCollision(false);
    } else {
	//this.display.style.backgroundColor = "";
    };

    /* end extra */
};
