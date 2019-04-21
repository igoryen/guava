$( document ).ready(function() {
    console.log( "interlineator ready!" );
    
	// console.log(scope.stories.chinese);
	console.log(scope.cachedStories);

	// var array = scope.stories.chinese;
	// var array = scope.stories.A;
	// var array = scope.stories.jesus_is_allright;
	// var array = scope.stories.oath;
	// var array = scope.stories.john316;
	// var array = scope.stories.frombattle;
	// var array = scope.stories.jesusis;
	// var array = scope.stories.spjohn;
	// var array = scope.stories.uheep;
	// var ary = scope.stories.heaven180902;
	// var ary = scope.stories.ps23;
	// var ary = scope.stories.che;
	// var ary = scope.stories.cascada;
	var ary = scope.stories.este_es_el_dia;


	// 









	$target = $("#target");
	$video = $("#video");
	$desc = $("#desc");

	$lines = $("#lines");


	$title = $('<div>').addClass("title").text(ary[0]['aaa'][0]['name']);
	$author = $('<div>').addClass("author").text(ary[0]['aaa'][0]['author']);
	$translator = $('<div>').addClass("translator").text(ary[0]['aaa'][0]['translator']);
	$date = $('<div>').addClass("tr-date").text(ary[0]['aaa'][0]['date']);
	// $link = $('<iframe width="420" height="315">').addClass("author").attr('src', ary[0]['aaa'][0]['link']).attr("target", "_blank").text("link");

	$link = $('<iframe>').addClass("video").attr('src', ary[0]['aaa'][0]['link']).text("link");



	// $target.append($title, $author, $translator, $date, $link);
	$video.append($link);
	$desc.append($title, $author);


	var array = ary[1]['bbb'];



	x = 1;
	$.each(array, function( index, value ) {

		// $line = $("<div>").addClass("line");
		var isLastElement = index == array.length -1;
		

		// $column = $("<div>").addClass("column");

		

		// console.log('caste: ' + value['one'] + ' | id: ' +value['two']);
		
		$level1 = $("<div>").addClass("level1");
		$level2 = $("<div>").addClass("level2");
		

		// console.log( 'number of columns: ' + Object.keys(value).length + ".. " );



		$level1.text(value['one']);
		$level2.text(value['two']);

		$column = $("<div>").addClass("column-" + x);

		if(Object.keys(value).length == 3) {
			// console.log("three");
			$level3 = $("<div>").addClass("level3");
			$level3.text(value['three']);
			$column.append($level3);
		}

		
		
		
		$column.append($level2);
		$column.append($level1);

		// $column.append($level1, $level2);
		$lines.append($column);

		// if(!value['one'] || !value['two']) { // if empty
		if(!value['one']) { // if empty

			console.log("empty");
			// $target.append($column);
			$( ".column-"+x ).wrapAll( "<div class='line-"+x+"' />");
			x++;
		}
	 
		
		if (isLastElement) {
	        // console.log('last item')
	        // $( ".column" ).wrapAll( "<div class='line' />");
	        $( ".column-"+x ).wrapAll( "<div class='line-"+x+"' />");
	    }

		// $( ".column" ).wrapAll( "<div class='line' />");

	});
});

