var Bird = function ( v, w, h, m , e, l, dom ) {
    Body.call(this,v,w,h,m,e,l);
    this.display = dom;
    this.stopcpt=0;
};

Bird.prototype = Object.create (Body.prototype);
Bird.prototype.constructor = Bird;
Bird.prototype.draw = function () {

    var ctx = this.display.getContext("2d");        
    ctx.beginPath();
    var img = new Image();

    img.src = './img/bird1.jpg';
    ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();
    
    if (this.hasCollision ) 
    {
        //si l'oiseau est trop lent
        if (Math.abs(this.velocity.x) <0.12 && Math.abs(this.velocity.y) < 0.12)
        {
            //on note qu'il est lent
            this.stopcpt=this.stopcpt+1;
            
            //si l'oiseau a trop été lent
            if (this.stopcpt>100)
            {
                
                nbBird--;
                $("#nbOiseau").text("Oiseau restant : " + nbBird);
                if (nbBird == 0)
                {
                    $("#partieLose").text("GAME OVER");
                    $("#partieLose").slideToggle(400, function(){$("#partieLose").slideToggle(3000)});
                    launch=false;
                    stop();
                    engine.bodies = [];
                    bird = null;
                    init(level);
                }
                else
                {
                    launch=false;
                    this.origin = new Vector(savePosX,savePosY);
                    this.force = new Vector(0.0,0.0);
                    this.velocity = new Vector(0.0,0.0);
                    this.mass = Infinity;
                    this.invMass = 1/Infinity;
                    this.stopcpt=0;
                }
            }                
        }
        this.setCollision(false);
    }
};
