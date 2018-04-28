var Body = function (v, w, h, m,e,l) {
    Rect.call(this, v, w, h);
    this.mass = m || 0;
    this.invMass = 1/this.mass;
    this.velocity = Vector.ZERO;
    this.force = Vector.ZERO;
    this.elasticity=e;
    this.life=l;
    /* begin en bonus */
    this.hasCollision = false;
    /* end en bonus */
};

Body.prototype = Object.create(Rect.prototype);
Body.prototype.constructor = Body;



/* begin en bonus */

Body.prototype.setCollision = function (b) {
    this.hasCollision = b;
};

/* end en bonus */



/* Dectection de collision entre l'objet courrant et l'objet b.

   Renvoie null si pas de collision, sinon renvoie les nouveau vecteur vitesses
   pour l'objet courant et pour b
*/



Body.prototype.collision = function (b) {

    var mdiff = this.mDiff(b);
    if (mdiff.hasOrigin()) {

	var vectors = [ new Vector (0,mdiff.origin.y),
			new Vector (0,mdiff.origin.y+mdiff.height),
			new Vector (mdiff.origin.x, 0),
			new Vector (mdiff.origin.x + mdiff.width, 0) ];

	var n = vectors[0];

	for (var i = 1; i < vectors.length; i++) {
	    if (vectors[i].norm() < n.norm())
		n = vectors[i];
	};

	var norm_v = this.velocity.norm();
	var norm_vb = b.velocity.norm();
	var kv = norm_v / (norm_v + norm_vb);
	var kvb = norm_vb / (norm_v + norm_vb);

	if (norm_v == 0 && norm_vb == 0) {
	    if (this.invMass == 0 && this.invMass == 0)
		return null;
	    else {
		if (this.mass <= b.mass)
		    kv = 1;
		else
		    kvb = 1
	    }

	};

	this.move(n.mult(kv));
	b.move(n.mult(-kvb));

	n = n.normalize();

        // (2) On calcule l'impulsion j :
        var v = this.velocity.sub(b.velocity);
        var e = this.elasticity; // pour les étudiants, juste faire var e = 1;

        var j1 = -(1 + e) * v.dot(n) / (this.invMass + b.invMass);
		var j2 = -(1 + b.elasticity) * v.dot(n) / (this.invMass + b.invMass);

        // (3) On calcule les nouvelle vitesse:
        var new_v = this.velocity.add(n.mult(j1  * this.invMass));
        var new_bv = b.velocity.sub(n.mult(j2 * b.invMass));

	b.setCollision(true);
	this.setCollision(true);
		
		if (b.constructor.name > this.constructor.name)
		{
			s1 =b
			s2 =this
		}
		else
		{
			s1 =this
			s2 =b
		}

		if(s1.constructor.name=="Cible" && s2.constructor.name=="Bird")
		{
            if (s1.life < 1){
                $("#partieWonLose").text("Level Suivant");
                $("#partieWonLose").css("color", "green");
                $("#partieWonLose").slideToggle(400, function(){$("#partieWonLose").slideToggle(3000)});
                launch=false;
                level++;
                stop();
                engine.bodies = [];
                bird = null;
                init(level);
            }
		}



		if(s1.constructor.name=="Bird" || s2.constructor.name=="Bird")
		{
			if (s1.constructor.name != "Bird")
			{
				let x=s1;
				s1=s2;
				s2=x;
			}
			//console.log(s1);
			//console.log(s2);
			var impact=(Math.abs(s1.velocity.x)-Math.abs(s2.velocity.x))+(Math.abs(s1.velocity.y)-Math.abs(s2.velocity.y));
			impact=Math.floor(Math.log2(impact*100))-3;
			if(impact<0){impact=0;}
			
			if(s2.life>0)
			{
				s2.life = s2.life - impact;
				if(s2.life<1)
				{
                    if (s2.constructor.name != "Cible"){
					   engine.removeBody(s2);				
                    }
				}
			}
		}		

        return { velocity1 : new_v, velocity2 : new_bv };

    } else {
        return null;
    }
};
