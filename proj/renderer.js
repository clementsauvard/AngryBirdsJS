var Renderer = function (e) {
    this.engine = e;
};


Renderer.prototype.update = function (dt) {

    var ctx = canvas.getContext("2d");    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.engine.update(dt);
    this.engine.bodies.forEach(function (b) {
        
        b.draw();
        
    });
};
