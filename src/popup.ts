import * as $ from 'jquery';

import { Definition } from "./Definition";
import { WordList } from "./WordList";

$(function(){

	let list = new WordList();
	let connection = browser.runtime.connect();

	function displayWords() {

		// Output the word queue.
		let output = `<div class="words">`;
	  	output += list.words.map((e, i) => {
	  		return `<div class="word">
	  					<div class="word__delete" data-index="${i}">❌</div>
	  					<div class="word__left"><ruby>${e.left[0]}<rt>${(e.left.length > 1) ? e.left[1] : ""}</rt></ruby></div>
	  					<div class="word__right">${e.right}</div>
	  				</div>`;
	  	}).join("");

	  	// 0 words queued case
	  	if(list.words.length == 0){
	  		output += `<div class="word"> <em> No words added, go to <a href="https://jisho.org">Jisho</a> and click 'Add to Library' to begin</div>`;
	  	}

	  	output += `</div>`;
		$('#output').html(output);

		// Add behaviour for delete button
	  	$('.word__delete').click(function(e){
	  		list.removeByIndex($(this).data("index"));
	  		list.save();
	  		displayWords();
	  		connection.postMessage({type:"refresh"});
	  	});

	  	// Update "download csv" link data
	  	let data = new Blob([list.toCsv()]);
	  	$('#export-all').attr("href", URL.createObjectURL(data));
	  	$('#export-all').attr("download", `${ (new Date().toLocaleTimeString())}-${list.words.length}-words.csv`);
	}

	connection.onMessage.addListener((m) => {
	  if(m.type == "refresh"){
	  	list.load();
	  	displayWords();
	  }
	});

	$('#remove-all').click(function(e){
		console.log("Removed All");
		list.removeAll();
		list.save();
		connection.postMessage({type:"refresh"});
	  	displayWords();
	});

  	list.load(() => {
  		console.log("List loaded");
  		displayWords();
  	});
});






