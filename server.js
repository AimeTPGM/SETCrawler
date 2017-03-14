var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/symbolItem', function(req, res){
	url = 'https://www.set.or.th/set/commonslookup.do?language=th&country=TH';
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var json = { symbol: "",
						fullname: "",
						market: ""
					};
			var list = [];

		$('table').filter(function(){
	        var data = $(this);
			
	       	var test = data.text();
	       	console.log('here')
	       
	       	for (var i = 1; i < data.children().length; i++) {
	       		var json = { symbol: data.children().eq(i).children().eq(0).text(),
						fullname: data.children().eq(i).children().eq(1).text(),
						market: data.children().eq(i).children().eq(2).text()
					};
	       		list.push(json);
	       	};

	    })

	    fs.writeFile('output.json', JSON.stringify(list, null, 4), function(err){


		    console.log('File successfully written! - Check your project directory for the output.json file');

		})



		}
	});

	

	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	res.send('Check your console!')
});


app.get('/scrape', function(req, res){

	url = 'https://www.set.or.th/set/companyhighlight.do?symbol=A&ssoPageId=5&language=th&country=TH';

	request(url, function(error, response, html){
	    if(!error){
	    var $ = cheerio.load(html);
	    var json = { symbol : "", 
	    			name : "", 
	    			info : 
		    			{
		    				totalAsset: [ "", "", "", "" ],
		    				totalDebt: [ "", "", "", "" ],
		    				partOfStakeholders: [ "", "", "", "" ],
		    				marketCap: [ "", "", "", "" ]
		    			}
					};
		
	    $('#maincontent').filter(function(){
	        var data = $(this);
			// console.log(data.children().children().children().children().first().text());
	        var fullname = data.children().children().children().children().first().text();
	        var symbol = fullname;
	        json.symbol = symbol;
	        json.name = fullname.replace(/\s*\s\w\s:\s?\s/,'');
	        var allValue = data.children().children().children().children();
	        
	        var allAsset = $(allValue).eq(6).children().children().eq(3).children();
	        json.info.totalAsset = [
		        $(allAsset).eq(1).text().replace(/\s\s/,''),
		        $(allAsset).eq(2).text().replace(/\s\s/,''),
		        $(allAsset).eq(3).text().replace(/\s\s/,''),
		        $(allAsset).eq(4).text().replace(/\s\s/,'')
	        ];
	        
	        var allDebt = $(allValue).eq(6).children().children().eq(4).children();
	       	json.info.totalDebt = [
		       	$(allDebt).eq(1).text().replace(/\s\s/,''), 
		       	$(allDebt).eq(2).text().replace(/\s\s/,''),
		       	$(allDebt).eq(3).text().replace(/\s\s/,''),
		       	$(allDebt).eq(4).text().replace(/\s\s/,'')
	       	];

	       	var allPartOfStakeholders = $(allValue).eq(6).children().children().eq(5).children();
	       	json.info.partOfStakeholders = [
	       	   	$(allPartOfStakeholders).eq(1).text().replace(/\s\s/,''), 
		       	$(allPartOfStakeholders).eq(2).text().replace(/\s\s/,''),
		       	$(allPartOfStakeholders).eq(3).text().replace(/\s\s/,''),
		       	$(allPartOfStakeholders).eq(4).text().replace(/\s\s/,'')
	       	];

	       	var test = data.text();
	       	console.log(test);

	    })

		$('table').filter(function(){
	        var data = $(this);
			
	       	var test = data.text();
	       	console.log(test);

	    })

		
	}

	// To write to the system we will use the built in 'fs' library.
	// In this example we will pass 3 parameters to the writeFile function
	// Parameter 1 :  output.json - this is what the created filename will be called
	// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
	// Parameter 3 :  callback function - a callback function to let us know the status of our function

	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

	    console.log('File successfully written! - Check your project directory for the output.json file');

	})

	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	res.send('Check your console!')

	    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;