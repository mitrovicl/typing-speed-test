/* function createChart(dataArray) {
        // create an instance of a pie chart
        var chart = anychart.area();
        // set the data
        chart.data(dataArray);
        // set chart title
        chart.title("Speed over seconds");
        // set the container element 
        chart.container("container");
        // initiate chart display
        chart.draw();
} */

var words = ["The truth that many people never understand, until it is too late, is that the more you try to avoid suffering the more you suffer because smaller and more insignificant things begin to torture you in proportion to your fear of being hurt.",
	 "\"That proves you are unusual,\" returned the Scarecrow; \"and I am convinced that the only people worthy of consideration in this world are the unusual ones. For the common folks are like the leaves of a tree, and live and die unnoticed.\"",
	 "A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be",
	 "\"No snowflake in an avalanche ever feels responsible\"",
	 "\"Be yourself; everyone else is already taken.\"",
	 "\"I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.\"",
	 "All the darkness in the world cannot extinguish the light of a single candle.",
	 "If she's amazing, she won't be easy. If she's easy, she won't be amazing. If she's worth it, you wont give up. If you give up, you're not worthy. ... Truth is, everybody is going to hurt you; you just gotta find the ones worth suffering for.",
	 "Once you have tasted flight, you will forever walk the earth with your eyes turned skyward, for there you have been, and there you will always long to return.",
	 "I get the biggest enjoyment from the random and unexpected places. Linux on cellphones or refrigerators, just because it's so not what I envisioned it. Or on supercomputers.",
	 "Microsoft isn't evil, they just make really crappy operating systems.",
	 "There should be a law that no ordinary newspaper should be allowed to write about art. The harm they do by their foolish and random writing it would be impossible to overestimate - not to the artist, but to the public, blinding them to all but harming the artist not at all.",
	 "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.",
	 "The knowledge that you have emerged wiser and stronger from setbacks means that you are, ever after, secure in your ability to survive.",
	 "What is it about possessing things? Why do we feel the need to own what we love, and why do we become jerks when we do? We've all been there-- you want something, to possess it. By possessing something you lose it. You finally win the girl of your dreams, the first thing you do is change her. The little things she does with her hair, the way she wears her clothes or the way she chews her gum. Pretty soon what you like, what you changed, what you don't like, blends together like a watercolor in the rain.",
	 "Heaven knows we need never be ashamed of our tears, for they are rain upon the blinding dust of earth, overlying our hard hearts.",
	 "Time and tide will wait for no man, saith the adage. But all men have to wait for time and tide.",
	 "I have always believed that each man makes his own happiness and is responsible for his own problems. It is a simple philosophy.",
	 "A man should have the aim and the determination to be honest and upright and sincere in all that he undertakes. If he adds persistency to this he can hardly help being successful",
	 "Only one thing is ever guaranteed, that is that you will definitely not achieve the goal if you don't take the shot.",
	 "The true wealth of a nation lies not in it's gold or silver but in it's learning, wisdom and in the uprightness of its sons.",
	 "If you can't explain it simply, you don't understand it well enough.",
	 "There are basically two types of people. People who accomplish things, and people who claim to have accomplished things. The first group is less crowded.",
	 "The best way to cheer yourself up is to try to cheer somebody else up.",
	 "Good friends, good books and a sleepy conscience: this is the ideal life."
	 ];  
	 var intervalID;
// function funFocus() {
// 	 document.getElementById("textinput").focus();
// } 
let times_finished = 0;

function doIt() {
	document.getElementById("textinput").disabled = false;
	if (intervalID !== undefined) {
		window.clearInterval(intervalID);
	}

	//document.getElementById("container").innerHTML = "";
	document.getElementById("speedcpm").innerHTML = "0";
	document.getElementById("speedwpm").innerHTML = "0";
	var textin = document.querySelector("#quote");
	document.getElementById("textinput").focus();
	if (document.getElementById("textinput").classList.contains("redBackground")) {
		document.getElementById("textinput").classList.remove("redBackground");
	}
	textin.innerHTML = "";
	document.getElementById("textinput").value = "";
	var rand = Math.floor(Math.random() * words.length);
	console.log(rand);
	var wordsArray = words[rand].split("");
	//console.log(wordsArray);
	for (let i = 0; i < wordsArray.length; i++) {
		var span = document.createElement("span");
		span.classList.add("span");
		span.innerHTML = wordsArray[i];
		textin.appendChild(span);
	}
	var spans = document.querySelectorAll(".span");

	var cText = document.getElementById("quote").textContent;
	var nText = document.getElementById("textinput");

	console.log(cText);
	console.log(nText.value);

	//nText.value = cText;

	var newText = cText;
	console.log(newText);


	var el = document.getElementById("textinput");
	el.oninput = checkInput;


	var dataArray = [];
	var start;
	var end;
	var timePassed;
	var time = 0;
	var speed;
	var arrCounter = 1;

	if (times_finished == 0) {
		document.getElementById("results-table").style.visibility = "hidden";
	}
	function addResult(indx, sp_cpm, sp_wpm) {

		if (indx == 1) {
			document.getElementById("results-table").style.visibility = "visible";
		}
		var table = document.getElementById("results-table");

		var row = document.createElement("tr");
		var index = document.createElement("td");
		var speed_cpm = document.createElement("td");
		var speed_wpm = document.createElement("td");
		index.innerHTML = indx;
		speed_cpm.innerHTML = sp_cpm;
		speed_wpm.innerHTML = sp_wpm;
		row.appendChild(index);
		row.appendChild(speed_cpm);
		row.appendChild(speed_wpm);
		table.appendChild(row);
	}

	function checkInput() {
		var text = nText.value;
		let textLength = text.length;
		var lastLetter = text[textLength-1];
		if (time == 0) {
			start = window.performance.now();
			time++;
			intervalID = window.setInterval(myCallback, 1000);
		}
		//var ttt = Math.round((performance.now() - start) / 1000);
		//document.getElementById("speedcpm").innerHTML = Math.round((textLength / ttt) * 60);
		
		

		if (textLength < wordsArray.length) {
			if (spans[textLength].classList.contains("highlight")) {
				spans[textLength].classList.remove("highlight");
			}
			if (spans[textLength].classList.contains("redBackground")) {
				spans[textLength].classList.remove("redBackground");
			}
		}

		if (lastLetter !== newText[textLength-1]) {
			document.getElementById("textinput").className = "redBackground";
			spans[textLength-1].className = "redBackground";
			console.log("Wrong!");
		} else {
			if (textLength - 1 > 0) {
				if (!(spans[textLength-2].classList.contains("highlight"))) {
					spans[textLength-1].className = "redBackground";
				} else {
					document.getElementById("textinput").className = "whiteBackground";
					spans[textLength-1].className = "highlight";
				}
			} else {
				document.getElementById("textinput").className = "whiteBackground";
				spans[textLength-1].className = "highlight";
			}
		}	
		if (text == newText) {
			end = window.performance.now();
			window.clearInterval(intervalID);
			document.getElementById("textinput").disabled = true;
			timePassed = end - start; 
			timePassed = timePassed / 1000;
			speed = wordsArray.length / timePassed;
			speed = speed * 60;
			speed = Math.round(speed);
			console.log("Time: " + Math.round(timePassed));
			console.log("Speed(in minutes): " + speed + " CPM");
			document.getElementById("speedcpm").innerHTML = speed;
			document.getElementById("speedwpm").innerHTML = speed / 5;

			times_finished++;
			addResult(times_finished, speed, speed / 5);
			//createChart(dataArray);
		}
		function myCallback(textLength) {
			var a = nText.value;
			var ttt = (performance.now() - start) / 1000;
			var spcpm = Math.round((a.length / ttt) * 60);
			var spwpm = Math.round(spcpm / 5);
			document.getElementById("speedcpm").innerHTML = spcpm;
			document.getElementById("speedwpm").innerHTML = spwpm;
			/* var newArrCounter = arrCounter + "s";
			var newArray = [newArrCounter, spwpm];
			dataArray.push(newArray);
			arrCounter++; */
		}

	}
}

doIt();