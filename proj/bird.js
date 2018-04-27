var Bird = function (v, w, h, m,e, dom) {
    Body.call(this,v, w, h, m,e);
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
        if (this.velocity.x <0.01 && this.velocity.y < 0.01){
            this.stopcpt=this.stopcpt+1;
            if (this.stopcpt>100){
            launch=false;
            console.log("XDD");

            //$.getJSON( "levels.json", function( json ) {
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
