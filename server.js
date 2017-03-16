var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/symbol', function(req, res){
	
	var prefixList = [];
	var first = "A", last = "Z";
	var list = [];
	var companyList = [];
	var count =0;
	for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
		prefixList.push(String.fromCharCode(i));
	};
	prefixList.push("NUMBER");
	console.log('removing content from output.json')
	fs.writeFile('output.json', '', function(){
	})
	console.log('removed!')

	for (var j = 0; j < prefixList.length; j++) {
		console.log(prefixList[j])
		url = 'https://www.set.or.th/set/commonslookup.do?language=th&country=TH&prefix='+prefixList[j];
		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
				$('table').filter(function(){
					var data = $(this);
					for (var k = 1; k < data.children().length; k++) {
						var json = {
							"symbol" : "",
							"fullname" : "",
							"market" : "",
							"info" : 
				    			{
				    				"totalAsset": [ "", "", "", "" ],
				    				"totalDebt": [ "", "", "", "" ],
				    				"partOfStakeholders": [ "", "", "", "" ],
				    				"marketCap": [ "", "", "", "" ]
				    			}
						}
						json.symbol = data.children().eq(k).children().eq(0).text();
						json.fullname = data.children().eq(k).children().eq(1).text();
						json.market = data.children().eq(k).children().eq(2).text();
						companyList.push(json.symbol);
						list.push(json);
						var toWriteFile = {
							"data" : list
						}
			       		fs.writeFile('output.json', JSON.stringify(toWriteFile));
						
					
			       	};

				});
			}
		})
	};

	console.log("done!")
	res.send('done!')
});

app.get('/info', function(req,res){
	var outputFile = fs.readFileSync('output.json');
	var json = JSON.parse(outputFile);
	var data = json.data;
	for (var i = 0; i < data.length; i++) {
		url = 'https://www.set.or.th/set/companyhighlight.do?symbol='+data[i]+'&ssoPageId=5&language=th&country=TH'
		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
				$('table').filter(function(){
					var scrape = $(this);
					var base = scrape.children().children().eq(3).children();
					data[i].info.totalAsset = [base.eq(1).text(),base.eq(2).text(),base.eq(3).text(),base.eq(4).text()];
					fs.writeFile('output.json', JSON.stringify(data));
				})
			}
		})

	};

	res.send();
})

app.get('/read', function(req, res){
	var outputFile = fs.readFileSync('output.json');
	var outputTOJSON = JSON.parse(outputFile);
	console.log(outputTOJSON)
	res.send();

})

app.get('/scrape', function(req, res){

	url = 'https://www.set.or.th/set/companyhighlight.do?symbol=A&ssoPageId=5&language=th&country=TH';

	request(url, function(error, response, html){
	    if(!error){
	    var $ = cheerio.load(html);
		$('table').filter(function(){
	        var data = $(this);
	        for (var i = 0; i < data.children().children().length; i++) {
	        	console.log(i)
	        	console.log(data.children().children().eq(i).text());
	        };
	        var base = data.children().children().eq(3).children();
	        console.log('totalAsset')
	        console.log(base.eq(0).text())
	       	console.log(base.eq(1).text())
	       	console.log(base.eq(2).text())
	       	console.log(base.eq(3).text())
	       	

	    })

		
	}
	res.send('Check your console!')

	}) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;