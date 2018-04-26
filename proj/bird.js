var Bird = function (v, w, h, m, dom) {
    console.log(this);
    Body.call(this,v, w, h, m);
    this.display = dom;
};

Bird.prototype = Object.create (Body.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.draw = function () {

    
    var ctx = this.display.getContext("2d");    
    
    ctx.beginPath();
    var img = new Image();   // Crée un nouvel élément Image
    img.src = '/img/bird1.jpg';
    ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();
    
    
    /* begin extra */
    if (this.hasCollision && Constants.elasticity > 0) {
        console.log(Constants.elasticity);
	   Constants.elasticity -= 0.15;
	this.setCollision(false);
    } else {
	//this.display.style.backgroundColor = "";
    };

    /* end extra */
};
