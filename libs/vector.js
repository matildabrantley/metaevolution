//2d vector class
class Vector {
	constructor(x, y, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
        this.x = x;
	    this.y = y;
		this.min = min;
		this.max = max;
    }

	//distance between two 2d points using Math.hypot
	distance(vector) {
		return Math.hypot(vector.x - this.x, vector.y - this.y)
	}

	//add 2d vectors, returning result
	add(vector) {
		this.x = this.clamp(this.x + vector.x);
		this.y = this.clamp(this.y + vector.y);
		return this;
	}

	//multiply 2d vectors, returning result
	multiply(scalar) {
		this.x = this.clamp(this.x * scalar);
		this.y = this.clamp(this.y * scalar);
		return this;
	}

	//return dot product of 2d vectors
	getDotProduct(vector) {
		return (this.x * vector.x) + (this.y * vector.y);
	}

	//for reversing direction
	reverse() {
		this.x = -this.x, 
		this.y = -this.y;
	}

	//subtract 2d vectors, returning result
	subtract(vector) {
		this.x = this.clamp(this.x - vector.x);
		this.y = this.clamp(this.y - vector.y);
		return this;
	}

	set(x, y) {
		this.x = this.clamp(x);
		this.y = this.clamp(y);
	}

	clamp (number) {
		return Math.min(Math.max(number, this.min), this.max);
	}

	setAngle(angle) {
		this.x = Math.cos(angle);
		this.y = Math.sin(angle);
		return this;
	}

	getAngle() {
		return Math.atan2(this.y, this.x);
	}

	angleDifference(vector) {
		return (this.getAngle() - vector.getAngle());
	}

	//get 2d vector magnitude
	getMagnitude () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	
	// set 2d vector magnitude
	setMagnitude (mag) {
		var angle = this.getAngle(); 
		this.x = Math.cos(angle) * mag;
		this.y = Math.sin(angle) * mag;
	}

	//return new instance of this vector
	getCopy() {
		var newInstance = new Vector(this.x, this.y, this.min, this.max);
		return newInstance;
	}
}

module.exports = Vector;