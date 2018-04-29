var Sprite = function (v, w, h, m,e,l, dom) {
    Body.call(this,v, w, h, m,e,l);
    this.display = dom;
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {

    var ctx = this.display.getContext("2d");    
    ctx.beginPath();

    //change l'image du mur en fonction de son etat    
    ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
    if (this.life <= 0){
        ctx.fillStyle = 'green';    
        ctx.fill();
    }
    else if (this.life == 5){
        ctx.fillStyle = 'dodgerblue';    
        ctx.fill();
    }
    else if(this.life < 5 && this.life > 0){
        ctx.fillStyle = 'red';    
        ctx.fill();
    }
    
    if (this.hasCollision) {
        this.setCollision(false);
    };

};
