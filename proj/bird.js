var Bird = function (v, w, h, m,e,l, dom) {
    Body.call(this,v, w, h, m,e,l);
    this.display = dom;
    this.stopcpt=0;
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
        if (Math.abs(this.velocity.x) <0.05 && Math.abs(this.velocity.y) < 0.05){
            this.stopcpt=this.stopcpt+1;
            if (this.stopcpt>100){
            launch=false;
            console.log("XDD");
            this.origin = new Vector(savePosX,savePosY);
            this.force = new Vector(0.0,0.0);
            this.velocity = new Vector(0.0,0.0);
            this.mass = Infinity;
            this.invMass = 1/Infinity;
            this.stopcpt=0;


            }        
        
        }
        //this.elasticity -= 0.15;
        this.setCollision(false);
        //console.log(this.velocity.x)
    } else {
        //this.display.style.backgroundColor = "";
    };

    /* end extra */
};
