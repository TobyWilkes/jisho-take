import * as $ from 'jquery';
import { Definition } from "./Definition";

export class WordList {
	words:Definition[] = [];

	constructor() {
		this.load();
	}

	addWord(newWord:Definition) {
		this.words.push(newWord);
		console.log(`${this.words.length} words`);
		this.save();
	}

	load(callback = ()=>{}) {
		browser.storage.local.get((items) => {
			this.words = <Definition[]>items.words.map((e) => {
				return new Definition(e.l, e.r);
			});
			callback();
			console.log("Loaded", items);
		});
	}

	save() {
		browser.storage.local.set({
		    words: this.words.map((e) => {
		    	return {
		    		l: e.left,
		    		r: e.right,
		    	}
		    })
		});
	}

	removeByIndex(index) {
		this.words.splice(index, 1);
	}

	removeAll(){
		this.words = [];
	}

	toString() {
		return this.words.map((e) => {
			return e.toString();
		}).toString();
	}

	toCsv(){
		return this.words.map((e, i) => {
			let out = `"<span>${e.left[0].replace(';', '%3B')}</span>";"<p><ruby>${e.left[0].replace(';', '%3B')}<rt>${e.left[1].replace(';', '%3B')}</rt></ruby></p>`;
			out += `<p>${e.right.map(rightEl => { return `<p>${rightEl.trim().replace(';', '%3B')}</p>`; })}</p>"`;
			return out;
		}).join("\n");
	}
}







