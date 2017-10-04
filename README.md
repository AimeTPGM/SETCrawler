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

### How to install วิธีลง

Open a terminal program then clone this repository to your computer

เปิดโปรแกรมเทอร์มินอล (เช่น Terminal ในแมค หรือ cmd ในวินโดว์) แล้วโคลนโปรเจ็คนี้ลงบนคอม

``` git clone https://github.com/AimeTPGM/SETCrawler.git ```

Change directory to the cloned project

เปลี่ยนไดเร็กทอรี่ไปที่ที่โคลนโปรเจ็คไว้

``` cd ~/your/path/to/project/SETCrawler

install npm

สั่งอินสตอล์ npm

``` npm install ``` 

run the server

รันเซิร์ฟเวอร์

``` node server.js ``` 

it will show Magic happens on port 8081

จะขึ้นว่า: Magic happens on port 8081

### Usage วิธีใช้

## English

1. Open a web browser

2. Open this url http://localhost:8081/symbol

3. Back to your terminal, you will see it's crawling the data from set.or.th

4. Wait until it go through all the pages and stop scrolling

5. Check output.json file. That's the latest data from SET

*** the output format is provided above

## Thai

1. เปิดเว็บบราวเซอร์ขึ้นมา 

2. เปิดเว็บนี้ >> http://localhost:8081/symbol

3. กลับมาดูที่ Terminal จะเห็นว่าเซิร์ฟเวอร์กำลังดึงข้อมูลจาก set.or.th

4. รอจนกว่าเทอร์มินอลจะหยุดเลื่อนสัญลักษณ์ต่างๆ จนนิ่งสนิท

5. เช็ค output.json จะได้ดาต้าล่าสุดจากเว็บ SET ในขณะนั้น 

*** ฟอร์แม็ตของ output บอกไว้ด้านบนจ้า

### Enjoy!
