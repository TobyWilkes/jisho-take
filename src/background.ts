import * as $ from 'jquery';

import { Definition } from "./Definition";
import { WordList } from "./WordList";

let list = new WordList();
list.load();

var clients:Array<any> = [];

function broadcast(m) {
	console.log("Broadcasting", m, `to ${clients.length} clients`, clients);
	clients.forEach(client => {
		console.log(client);
		client.postMessage(m);
	});
}

function connected(p:browser.runtime.Port) {
	clients.push(p);
	p.name = `test${clients.length}`;
	p.onMessage.addListener(m => {
		switch(m.type){
			case "add": {
			  	let def = new Definition();
			  	def.left = m.l;
			  	def.right = m.r;

			  	list.addWord(def);

			  	broadcast({type: "refresh"});
			    console.log("Ordered refresh");
			   	break;
			}
			case "refresh": {
				broadcast({type: "refresh"});
				list.load();

			    console.log("Ordered refresh");
				break;
			}
		}
  	});

  	p.onDisconnect.addListener( event =>{
  		clients.splice(clients.findIndex(e => {
  			return e.name == p.name;
  		}), 1);
  		console.log("Removed client");
  	})
}

browser.runtime.onConnect.addListener(connected);



