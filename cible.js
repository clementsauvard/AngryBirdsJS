var Cible = function (v, w, h, m ,e ,l,dom ) {
    Body.call(this,v, w, h, m,e,l);
    this.display = dom;
    this.testLife = l;
};

Cible.prototype = Object.create (Body.prototype);
Cible.prototype.constructor = Cible;
Cible.prototype.draw = function () {

    var ctx = this.display.getContext("2d");        
    ctx.beginPath();
    var img = new Image();

    //change l'image de la cible en fonction de son etat
    if (this.life == 1 && this.testLife != 5){
        img.src = './img/cible.png';
        ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
        ctx.stroke();
    }
    else if (this.life == 5){
        img.src = './img/cible3.png';
        ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
        ctx.stroke();
    }
    else if (this.life < 5 && this.life > 0){
        img.src = './img/cible2.png';
        ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
        ctx.stroke();
    }
    
    if (this.hasCollision) {this.setCollision(false);};

};
