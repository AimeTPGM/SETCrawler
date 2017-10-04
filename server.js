var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app     = express();


/**
* เดี๋ยวทำ creditor และ debt เพิ่ม
* ทำ group ของสินค้านั้นๆเพิ่มด้วย
**/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/symbol', function(req, res){
	
	var prefixList = [];
	var first = "A", last = "Z";
	var list = [];
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
							"market" : "",
							// "creditor": "",
							// "debt": "",
							"info" : 
				    			{
				    				"totalAsset": [ "", "", "", "" ],
				    				"totalDebt": [ "", "", "", "" ],
				    				"partOfStakeholders": [ "", "", "", "" ],
				    				// "marketCap": [ "", "", "", "" ],
				    				"totalIncome": [ "", "", "", "" ],
				    				"totalProfit": [ "", "", "", "" ],
				    				"ROE": [ "", "", "", "" ],
				    				"percentProfit": [ "", "", "", "" ],
				    				"paidShare": [ "", "", "", "" ]
				    			}
						}
						json.symbol = data.children().eq(k).children().eq(0).text();
						json.fullname = data.children().eq(k).children().eq(1).text();
						json.market = data.children().eq(k).children().eq(2).text();
						
						
						var getInfo = function(){
							
								url = 'https://www.set.or.th/set/companyhighlight.do?symbol='+json.symbol+'&ssoPageId=5&language=th&country=TH';
								
								request(url, function(error, response, html){
									if(!error){
										console.log(json.symbol)
										var $ = cheerio.load(html);
										$('table').filter(function(){
											var scrape = $(this);
											var baseTotalAsset = scrape.children().children().eq(3).children();
											var baseTotalDebt = scrape.children().children().eq(4).children();
											var basePOSH = scrape.children().children().eq(5).children();
											var baseTotalIncome = scrape.children().children().eq(7).children();
											var baseTotalProfit = scrape.children().children().eq(8).children();
											var basePercentProfilt = scrape.children().children().eq(13).children();
											var baseROE = scrape.children().children().eq(12).children();
											var basePaidShare = scrape.children().children().eq(6).children();
											var k = 0;
											for (var j = 1; j < 5; j++) {
												var tta = baseTotalAsset.eq(j).text().replace(/\s\s/, '');
												var ttd = baseTotalDebt.eq(j).text().replace(/\s\s/, '');
												var posh = basePOSH.eq(j).text().replace(/\s\s/, '');
												// var mc = baseMarketCap.eq(j).text().replace(/\s\s/, '');
												var tti = baseTotalIncome.eq(j).text().replace(/\s\s/, '');
												var ttp = baseTotalProfit.eq(j).text().replace(/\s\s/, '');
												var pp = basePercentProfilt.eq(j).text().replace(/\s\s/, '');
												var roe = baseROE.eq(j).text().replace(/\s\s/, '');
												var ps = basePaidShare.eq(j).text().replace(/\s\s/, '');
												json.info.totalAsset[k] = tta;
												json.info.totalDebt[k] = ttd;
												json.info.partOfStakeholders[k] = posh;
												// json.info.marketCap[k] = mc;
												json.info.totalIncome[k] = tti;
												json.info.totalProfit[k] = ttp;
												json.info.percentProfit[k] = pp;
												json.info.ROE[k] = roe;
												json.info.paidShare[k] = ps;
												k++;
											};

											// var getDebtAndCreditor = function(){
											// 	url = 'https://www.set.or.th/set/companyfinance.do?type=balance&symbol='+json.symbol+'&language=th&country=TH';
											// 	request(url, function(error, response, html){
											// 		if(!error){
											// 		    var $ = cheerio.load(html);
											// 			$('table.table.table-hover.table-info').filter(function(){
											// 		        var data = $(this);
											// 		        var base = data.children().children();
											// 		        console.log(data.text());
											// 		        for (var i = 0; i < data.children().children().length; i++) {
											// 		        	console.log(i)
											// 		        	console.log(data.children().children().eq(i).text())
											// 		        };
											// 		        json.creditor = base.eq(76).text();
											// 		        var debtCal;
											// 		        var debt1 = base.eq(82).text();
											// 		        var debt2 = base.eq(85).text();
											// 		        var debt3 = base.eq(115).text();

											// 		    })
											// 		}
											// 	})
											// } // getDebtAndCreditor
											
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

	res.send('check at console')

});

app.get('/read', function(req, res){
	var outputFile = fs.readFileSync('output.json');
	var outputTOJSON = JSON.parse(outputFile);
	console.log('get read file')	
	res.send(outputTOJSON);

})

app.get('/scrape', function(req, res){
	console.log('scarping A')
	url = 'https://www.set.or.th/set/companyhighlight.do?symbol=A&ssoPageId=5&language=th&country=TH';

	request(url, function(error, response, html){
	    if(!error){
	    var $ = cheerio.load(html);
		$('table').filter(function(){
	        var data = $(this);
	        var base = data.children().children();
	        var t = data.children();
	        // console.log(data.find('caption').length)
	        // console.log(data.find('thead').length)
	        // console.log(data.find('tbody').length)
	        // console.log(data.find('tr').length)
	        for (var i = 0; i < data.children().children().length; i++) {
	        	console.log(i)
	        	console.log(data.children().children().eq(i).text())
	        };
	       	

	    })

		
	}
	res.send('Check your console!')

	}) ;
})

app.get('/debt', function(req, res){
	console.log('debt A')
	url = 'https://www.set.or.th/set/companyfinance.do?type=balance&symbol=A&language=th&country=TH';

	request(url, function(error, response, html){
	    if(!error){
	    var $ = cheerio.load(html);
		$('table.table.table-hover.table-info').filter(function(){
	        var data = $(this);
	        var base = data.children().children();
	        console.log(data.text());
	        for (var i = 0; i < data.children().children().length; i++) {
	        	console.log(i)
	        	console.log(data.children().children().eq(i).text())
	        };
	       	

	    })

		
	}
	

	}) ;
	res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;