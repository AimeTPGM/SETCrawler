var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

	url = 'https://www.set.or.th/set/companyhighlight.do?symbol=A&ssoPageId=5&language=th&country=TH';

	request(url, function(error, response, html){
	    if(!error){
	        var $ = cheerio.load(html);

	    var symbol, name, allAsset;
	    var json = { symbol : "", 
	    			name : "", 
	    			info : 
		    			{
		    				allAsset: [ "", "", "", "" ],
		    				allDebt: [ "", "", "", "" ],
		    				personalTotal: [ "", "", "", "" ]
		    			}
					};
		$('#maincontent').each(function(i, element){
	      var a = $(this).prev();
	      // console.log(a.text());
	    });

	    $('#maincontent').filter(function(){
	        var data = $(this);
			// console.log(data.children().children().children().children().first().text());
	        symbol = data.children().children().children().children().first().text();
	        var allValue = data.children().children().children().children();
	        
	        var allAsset = $(allValue).eq(6).children().children().eq(3).children();
	        var allAssetFourYearAgo = $(allAsset).eq(1).text();
	        var allAssetThreeYearAgo = $(allAsset).eq(2).text();
	        var allAssetTwoYearAgo = $(allAsset).eq(3).text();
	        var allAssetOneYearAgo = $(allAsset).eq(4).text();
	        json.symbol = symbol;
	        json.info.allAsset[0] = allAssetFourYearAgo;
	        json.info.allAsset[1] = allAssetThreeYearAgo;
	        json.info.allAsset[2] = allAssetTwoYearAgo;
	        json.info.allAsset[3] = allAssetOneYearAgo;

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