var Bird = function (v, w, h, m,e, dom) {
    Body.call(this,v, w, h, m,e);
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
    if (this.hasCollision && this.elasticity > 0) {
        //this.elasticity -= 0.15;
        this.setCollision(false);
    } else {
        //this.display.style.backgroundColor = "";
    };

    /* end extra */
};
