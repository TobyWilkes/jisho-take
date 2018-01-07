import * as $ from 'jquery';

import { Definition } from "./Definition";
import { WordList } from "./WordList";

$("document").ready((e) => {
	let connection = browser.runtime.connect();

	let linkNodes = document.querySelectorAll(".concept_light-status_link[data-dropdown]");
	let list = new WordList();
	let addLibraryNodes:HTMLElement[] = [];

	// Create button to add words to bank under definitions.
	for(let linkNode of <HTMLElement[]><any>linkNodes) {
		let n:HTMLElement = <HTMLElement>document.createElement("a");
		n.innerHTML = "Add To Library";
		n.className = linkNode.className;
		n.setAttribute("data-word", addLibraryNodes.length.toString());

		addLibraryNodes.push(n);
		linkNode.parentNode.insertBefore(n, linkNode.nextSibling);
	}

	// Add behaviours for "add word" button click.
	$("a[data-word]").click(function(e){
		let root = $(this).parents(".concept_light");
		let d = new Definition();
		let definitionNodes = $(root).find(".meanings-wrapper .meaning-meaning, .meanings-wrapper .meaning-tags");
		let definitions:String[] = [];

		for(let node of <HTMLElement[]><any>definitionNodes){
			definitions.push(node.innerText.trim() + "\n");
		}

		d.left = [$(root).find(".concept_light-representation .text").text().trim(), $(root).find(".concept_light-representation .furigana").text().trim()];
		d.right = definitions;

		connection.postMessage({type: "add", l: d.left, r: d.right});
		console.info("Word sent");
	});

	connection.onMessage.addListener((m) => {
		console.log("Word Added");
	});

});

console.info('[Jisho Take Extension Started]');
