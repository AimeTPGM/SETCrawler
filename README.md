# SETCrawler

this project is to crawl the information of each company in SET market, Thailand

if you wants to use the information just simply download output.json

anyway, if you want the code too, feel free to clone it to your computer

P.S. there is no suggestion for put an investment on a particular stock according to the law


ดึงข้อมูลมาจากเว็บตลาดหลักทรัพย์แห่งประเทศไทย ทั้งนี้ไม่มีการบอกใบ้ว่าควรลงทุนตัวนี้แต่อย่างใด ไม่อยากกินข้าวแดง คำนวณงบการเงินกันเอาเองนะจ้ะ

ใครใคร่ใช้ให้โหลด output.json ไปก็พอ แต่ถ้าอยากเอาโค้ดด้วย clone ตามสบายเลยค่ะ อย่าไปยิง request ใส่เซิร์ฟเวอร์เค้าจนบึ้มล่ะ

ป.ล. ภาษาอังกฤษผิดๆไปบ้าง เพราะไม่รู้ศัพท์เฉพาะของภาษาอังกฤษค่ะ

## JSON Structure

``` 
{ "data" :
	[{
	"symbol" : "",                 // สัญลักษณ์
	"fullname" : "",            // ชื่อบริษัทเต็มๆ
	"market" : "",              // อยู่ในตลาดหลักทรัพย์ไหน
	"info" :                    // ข้อมูลอื่นๆ ตัว array คือ [4 years ago, 3 years ago, 2 years ago, 1 years ago]
		{
		"totalAsset": [ "", "", "", "" ],             // สืนทรัพย์รวม 
		"totalDebt": [ "", "", "", "" ],              // หนี้สินรวม
		"partOfStakeholders": [ "", "", "", "" ],     // ส่วนของผู้ถือหุ้น
		"totalIncome": [ "", "", "", "" ],            // รายได้รวม
		"totalProfit": [ "", "", "", "" ],            // กำไรสุทธิ
		"ROE": [ "", "", "", "" ],                    // Return on Equity
		"percentProfit": [ "", "", "", "" ],          // กำไร(เป็น%)
		"paidShare": [ "", "", "", "" ]               // มูลค่าหุ้นที่เรียกชำระแล้ว
		}
          }]
}
```
