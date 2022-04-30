const puppeteer = require('puppeteer');



trafikvarket1('https://fp.trafikverket.se/Boka/#/licence');
//trafikvarket2('inget');


async function trafikvarket1(url) {

    //bil = 200412063596 
const personnummer = '200403305378';
const stad = 'Örebro';
const körkort = 'A2';
const tidigareTid = true;
//const dinTid = tidigastdatum;
//2022-03-30 format 
//behöver inte svaras på om tidigareTid = false

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    await page.goto(url);
    
    await page.waitForSelector('input[id=social-security-number-input]');

    await page.type('input[id=social-security-number-input]', personnummer);

    if(körkort=='A')
    await page.click('a[title="A"]');
    if(körkort=='A1')
    await page.click('a[title="A1"]');
    if(körkort=='A2')
    await page.click('a[title="A2"]');
    if(körkort=='B')
    await page.click('a[title="B"]');

   

    if(tidigareTid){
    await page.waitForSelector('div[class="row alreadyBookedExamination"]');
    await page.click('div[class="row alreadyBookedExamination"]'); }
    else{
        await page.waitForSelector('div[class="row suggestedReservations"]');
        await page.click('div[class="row suggestedReservations"]');   }

     //går till din pesonliga sida
    
     //await page.waitFor(200000000);

    await page.waitForSelector('input[id=id-control-searchText-1-1]');

    //page.url() = trafikvarket2;

    await page.type('input[id=id-control-searchText-1-1]', stad);

    await page.keyboard.press('Enter');



        
        

    const data = await page.evaluate(
        () =>  Array.from(document.querySelectorAll('strong'))
                    .map(elem => elem.innerText)
      );
      console.log(data.length);

      if(data.length==0){
          console.log('Det fanns inga lediga tider :(')
      }else{

      tid = data[0]
      console.log(data);
        tid=tid.substring(0,10);

      const year = tid.substring(0,4);
      console.log(year);

      const month = tid.substring(5,7);
      console.log(month);

      const day = tid.substring(8,10);
      console.log(day);

        

      }
    

    //const Txt = await el.getProperty('textContent');
    //const rawTxt = await Txt.jsonValue();
   // const value = await element.evaluate(el => el.textContent);
    //console.log(value);

    browser.close();
}