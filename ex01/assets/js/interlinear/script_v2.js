$( document ).ready(function() {
    console.log( "ready!" );

// var array = [
//    {caste: "Banda", id: 4},
//    {caste: "Bestha", id: 6}
// ];
    
// console.log(scope.displayDetails.chinese);
console.log(scope.cachedOptions);


// var array = scope.displayDetails.chinese;
// var array = scope.displayDetails.A;
// var array = scope.displayDetails.jesus_is_allright[1]['bbb']; .. wors


var ary = scope.displayDetails.jesus_is_allright;






$target = $("#target");


	

	$title = $('<div>').addClass("title").text(ary[0]['aaa'][0]['name']);
	$author = $('<div>').addClass("author").text(ary[0]['aaa'][0]['author']);
	$translator = $('<div>').addClass("author").text(ary[0]['aaa'][0]['translator']);

	$target.append($title, $author, $translator);


	var array = ary[1]['bbb'];


	x = 1;
	$.each(array, function( index, value ) {

		// $line = $("<div>").addClass("line");
		var isLastElement = index == array.length -1;
		

		// $column = $("<div>").addClass("column");

		

		// console.log('caste: ' + value['one'] + ' | id: ' +value['two']);
		
		$level1 = $("<div>").addClass("level1");
		$level2 = $("<div>").addClass("level2");

		$level1.text(value['one']);
		$level2.text(value['two']);
		$column = $("<div>").addClass("column-" + x).append($level2, $level1);
		// $column.append($level1, $level2);
		$target.append($column);

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








// });


