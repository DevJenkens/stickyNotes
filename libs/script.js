// JavaScript Document

$(function() {

	//Z Index Counter
	var zIndexCounter=1;

	//Retrieve local storage if exists
	var localData = localStorage.getItem("stickyNotes");
	var localZIndex = localStorage.getItem("zIndex");

	if (localData !== null) {
		stickyNotes = localData;
		zIndexCounter = localZIndex;
		$("#board").append(localData);
	} else {
        $("#board").append('<h3>Try adding a sticky note <br/>by clicking anywhere</h3><img src = "arrow.png" />')
	}

	//Store data locally
	function storeData(notes) {
		localStorage.setItem("stickyNotes", notes);
		localStorage.setItem("zIndex", zIndexCounter);
	}

	//Add events
	addEvents();

	//Create StickyNotes
	$(document).on("click", function(e){
		var x = e.pageX + 'px';
		var y = e.pageY + 'px';
		var colours = ["#85C0F1", "#ffcc00", "#ffff99", "#ccff99"];
		var colour = colours[Math.floor((Math.random() * 4 - 0) + 0)];
		$("#board").append('<div class="notes ui-widget-content" style="position: absolute; z-index: ' + zIndexCounter + ';left: ' + x + '; top: ' + y +';"><button class="delButton">x</button><p class="text" style="background-color:' + colour + ';" contenteditable="true"></p></div>');
		$(".notes").draggable();
		$(".text").focus();
		addEvents();
		zIndexCounter++;
		//Call Store data function
		storeData($("#board").html());

	});

	function addEvents() {
		$(".notes").click(function(e) {
			e.stopPropagation();

			$(this).css("z-index", zIndexCounter)
			zIndexCounter++;
			//Call Store data function
			storeData($("body").html());
		});

		$(".text").click(function(e) {
			$(this).focus();
			$(this).parent().css("z-index", zIndexCounter)
			zIndexCounter++;
			//Call Store data function
			storeData($("body").html());
		});

		$(".delButton").click(function(e) {
			e.stopPropagation();
			$(this).parent().remove();
			//Call Store data function
			storeData($("body").html());
		});

		$(".text").keyup(function(){
			//Call Store data function
			storeData($("body").html());
		});
	};

});
