var Sprite = function (v, w, h, m, dom) {
    console.log(m);
    Body.call(this,v, w, h, m);
    this.display = dom;

};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {

    
    
    var ctx = this.display.getContext("2d");    
    
    //ctx.moveTo(this.origin.x, this.origin.y);
    //ctx.lineTo(this.origin.x+this.height,this.origin.y+this.width );
    //ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(this.origin.x, this.origin.y, this.origin.x+this.width, this.origin.y+this.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
    
    /*
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke(); 
    
    ctx.moveTo(200, 100);
    ctx.lineTo(400, 000);
    ctx.stroke();
    */
    
    //sprite.js:25 x :0 y : 0height : 560width : 20
    //sprite.js:25 x :980 y : 980height : 560width : 20
    //sprite.js:25 x :0 y : 0height : 20width : 1000
    //sprite.js:25 x :0 y : 0height : 560width : 20
    
    //console.log("x :" + this.origin.x + " y : "+this.origin.x + "height : " +this.height + "width : " +this.width );
    /* begin extra */
    if (this.hasCollision) {
	//this.display.style.backgroundColor = "red";
	this.setCollision(false);
    } else {
	//this.display.style.backgroundColor = "";
    };

    /* end extra */
};
