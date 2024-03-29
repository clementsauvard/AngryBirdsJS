var Box  = function ( v, w, h, m, e, l, dom ) {
    Body.call(this,v,w,h,m,e,l);
    this.display = dom;

};

Box.prototype = Object.create (Body.prototype);
Box.prototype.constructor = Box;
Box.prototype.draw = function () {

    var ctx = this.display.getContext("2d");        
    ctx.beginPath();
    var img = new Image();
    
    img.src = './img/box.png';
    ctx.drawImage(img,this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();

    if (this.hasCollision ) {this.setCollision(false);};
};
