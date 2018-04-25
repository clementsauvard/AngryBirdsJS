var Sprite = function (v, w, h, m, dom) {
    console.log(this);
    Body.call(this,v, w, h, m);
    this.display = dom;
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {

    var ctx = this.display.getContext("2d");    
    ctx.beginPath();
    /*
    ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    */
    var img = new Image();   // Crée un nouvel élément Image
    img.src = '/img/wall.png';
    ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();
    
    
    /* begin extra */
    if (this.hasCollision) {
	//this.display.style.backgroundColor = "red";
	this.setCollision(false);
    } else {
	//this.display.style.backgroundColor = "";
    };

    /* end extra */
};
