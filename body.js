var Body = function (v, w, h, m ,e ,l ) {
    Rect.call(this, v, w, h);
    this.mass = m || 0;
    this.invMass = 1/this.mass;
    this.velocity = Vector.ZERO;
    this.force = Vector.ZERO;
    this.elasticity=e;
    this.life=l;
    this.hasCollision = false;
};

Body.prototype = Object.create(Rect.prototype);
Body.prototype.constructor = Body;
Body.prototype.setCollision = function (b) {
    this.hasCollision = b;
};

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

        // On calcule l'impulsion j :
        var v = this.velocity.sub(b.velocity);
        var e = this.elasticity; 

        var j1 = -(1 + b.elasticity) * v.dot(n) / (this.invMass + b.invMass);
		var j2 = -(1 + e) * v.dot(n) / (this.invMass + b.invMass);

        // On calcule les nouvelle vitesse:
        var new_v = this.velocity.add(n.mult(j1  * this.invMass));
        var new_bv = b.velocity.sub(n.mult(j2 * b.invMass));

	b.setCollision(true);
	this.setCollision(true);
		
		//si l'oiseau percute un objet
		if(b.constructor.name=="Bird" || this.constructor.name=="Bird")
		{
			//oiseau == s1 objet == s2
			if (b.constructor.name != "Bird")
			{
				s1=this;
				s2=b;
			}
			else
			{
				s1=b;
				s2=this;	
			}
			
			//si la cible est destructible
			if(s2.life>0)
			{

				//calcul des degats de l'impact
				var impact=(Math.abs(s1.velocity.x)-Math.abs(s2.velocity.x))+(Math.abs(s1.velocity.y)-Math.abs(s2.velocity.y));
				impact=Math.floor(Math.log2(impact*100))-3;
				if(impact<0){impact=0;}
				if (isNaN(impact)){impact=0;}

				s2.life = s2.life - impact;
				
				//si on detruit la cible
				if(s2.life<1)
				{
                    if (s2.constructor.name != "Cible"){
					   engine.removeBody(s2);				
                    }
                    else{
		                $("#partieWonLose").text("Level Suivant");
		                $("#partieWonLose").css("color", "white");
		                $("#partieWonLose").slideToggle(400, function(){$("#partieWonLose").slideToggle(3000)});
		                newLevel();
                    }
				}
			}
		}		

        return { velocity1 : new_v, velocity2 : new_bv };

    } else {
        return null;
    }
};
