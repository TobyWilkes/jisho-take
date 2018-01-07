export class Definition {
	left:String[] = [];
	right:String[] = [];

	constructor(_left:String[] = [], _right:String[] = []){
		this.left = _left;
		this.right = _right;
	}

	toString = function(){
		return `${this.left.toString()} | ${this.right.toString()}`;
	}
}