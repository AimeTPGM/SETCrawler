var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app     = express();

app.get('/symbol', function(req, res){
	
	var prefixList = [];
	var first = "A", last = "Z";
	var list = [];
	var companyList = [];
	var count =0;
	var anotherList = [];
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

					
					



					var getAll = function (k){
						var json = {
							"symbol" : "",
							"fullname" : "",
							// "link" : "",
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
						// json.link = "https://www.set.or.th/set/companyhighlight.do?symbol="+json.symbol+"&ssoPageId=5&language=th&country=TH";
						if(!companyList.includes(json.symbol)){
							companyList.push(json.symbol);
						}
						

						var getInfo = function(){
							
								url = 'https://www.set.or.th/set/companyhighlight.do?symbol='+json.symbol+'&ssoPageId=5&language=th&country=TH'
								
								request(url, function(error, response, html){
									if(!error){
										console.log(json.symbol)
										var $ = cheerio.load(html);
										$('table').filter(function(){
											var scrape = $(this);
											var baseTotalAsset = scrape.children().children().eq(3).children();
											var baseTotalDebt = scrape.children().children().eq(4).children();
											var basePOSH = scrape.children().children().eq(5).children();
											var baseMarketCap = scrape.children().children().eq(6).children();
											var k = 0;
											for (var j = 1; j < 5; j++) {
												var tta = baseTotalAsset.eq(j).text().replace(/\s\s/, '');
												var ttd = baseTotalDebt.eq(j).text().replace(/\s\s/, '');;
												var posh = basePOSH.eq(j).text().replace(/\s\s/, '');;
												var mc = baseMarketCap.eq(j).text().replace(/\s\s/, '');;
												json.info.totalAsset[k] = tta;
												json.info.totalDebt[k] = ttd;
												json.info.partOfStakeholders[k] = posh;
												json.info.marketCap[k] = mc;
												k++;
											};
											
											
											
											list.push(json)
											var toWriteFile = {
													"data" : list
												}
										    fs.writeFile('output.json', JSON.stringify(toWriteFile));
									       
										})
										

									}
								})

							
							

						} //getInfo		
						var q = async.queue(function () {

							getInfo();
									
						}, 726);
						q.push();
			       	} // getAll


			       	var p = async.queue(function (k) {

							getAll(k);
									
					}, data.children().length-1);

					for (var k = 1; k < data.children().length; k++) {
						p.push(k)
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
	var list = json.data;

	var getInfo = function(i){
		// console.log(i)
		url = 'https://www.set.or.th/set/companyhighlight.do?symbol='+data[i].symbol+'&ssoPageId=5&language=th&country=TH'
		request(url, function(error, response, html){
			if(!error){
				console.log(i)
				console.log(data[i].symbol)
				var $ = cheerio.load(html);
				$('table').filter(function(){
					var scrape = $(this);
					var base = scrape.children().children().eq(3).children();
					var k = 0;
					for (var j = 1; j < 5; j++) {
						data[i].info.totalAsset[k] = base.eq(j).text();
						k++;
						
					};
				})
				

			}
		})

	}

	var q = async.queue(function (i) {
			getInfo(i);
	}, 726);
	for (var i = 0; i < data.length; i++) {
			// console.log(i)
			q.push(i);
	};
	console.log('done');
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