
var slider_interestrate = new Slider("#interestrate", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

var slider_amortise = new Slider("#amortise", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

var slider_highestprice = new Slider("#highestprice", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

var slider_lowestprice = new Slider("#lowestprice", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

var slider_othercosts = new Slider("#othercosts", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

var slider_monthlyfee = new Slider("#monthlyfee", {
	tooltip: 'always',
	tooltip_position:'bottom'
});

$( "#calculatebutton" ).click(function() {
	var settings = {};
	settings.interestrate 	= slider_interestrate.getValue();
	settings.amortiselvl 	= slider_amortise.getValue();
	settings.highestprice 	= slider_highestprice.getValue();
	settings.lowestprice 	= slider_lowestprice.getValue();
	settings.monthlyfee		= slider_monthlyfee.getValue();
	settings.other 			= slider_othercosts.getValue();

	splitData(settings);
});

function splitData(settings) {
	if(settings.highestprice < settings.lowestprice) {
		var temp = settings.highestprice;
		settings.highestprice = settings.lowestprice;
		settings.lowestprice = temp; 
	}

	var values = [];
	var current_value = settings.lowestprice;
	while(current_value < settings.highestprice) {
		values.push(current_value);
		current_value += 100000;
	}
	values.push(settings.highestprice);

	$("#tablebody").empty();

	for(var i = 0 ; i < values.length ; i++) {
		addRow(values[i], settings);
	}
}

function addRow(value, settings) {
	var cash_deposit = value*0.15;
	var loan = value - cash_deposit;
	var interest = Math.round((loan*settings.interestrate*0.01*0.7)/12);
	var amortise = Math.round((settings.amortiselvl*0.01*loan)/12);

	var totalcost = interest + amortise + settings.monthlyfee + settings.other;
	var totalnoamort = interest + settings.monthlyfee + settings.other;

	var row = "<tr><td>" + value + "</td> <td>" + cash_deposit + "</td> <td>" + loan + "</td> <td>" + interest + "</td> <td>" + amortise + "</td> <td>" + settings.monthlyfee + "</td> <td>" + settings.other + "</td> <td>" + totalcost + " ("+totalnoamort+")</td>	</tr>";

	$("#tablebody").append(row);
}
