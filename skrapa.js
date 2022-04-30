const puppeteer = require('puppeteer');


trafikvarket1('https://fp.trafikverket.se/Boka/#/licence');
trafikvarket2('Inget här än');


async function trafikvarket1(url) {

    // 200412063596 200403305378
const personnummer = '200412063596';
//const stad = 'Örebro';
const stad = 'Vänersborg';
const körkort = 'A2';
const tidigareTid = false;
const teoriprov = false;
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
    else if(körkort=='A1')
    await page.click('a[title="A1"]');
    else if(körkort=='A2')
    await page.click('a[title="A2"]');
    else if(körkort=='B')
    await page.click('a[title="B"]');
    else{ console.log('Du har inte valt en giltig körkortstyp');  browser.close();}
   

    if(tidigareTid){
    await page.waitForSelector('div[class="row alreadyBookedExamination"]');
    await page.click('div[class="row alreadyBookedExamination"]'); }
    else{
        await page.waitForSelector('div[class="row suggestedReservations"]');
        await page.click('div[class="row suggestedReservations"]'); }

    if(tidigareTid==false&&teoriprov==false){
        await page.waitForSelector('select[id="examination-type-select"]');
        await page.click('select[id="examination-type-select"]');
        await page.click('option[value="50"]');
    }

     //går till din pesonliga sida
    
     //await page.waitFor(200000000);

    await page.waitForSelector('input[id=id-control-searchText-1-1]');

    trafikvarket2 = page.url();

    await page.type('input[id=id-control-searchText-1-1]', stad);

    await page.keyboard.press('Enter');

    
  try {
    await page.waitForSelector('a[class="hidden-xs pull-right"]', {timeout: 5000});
  } catch (e) {
    if (e) {
        console.log('Det fanns inga lediga tider :(')
        browser.close();
    }
  }
    
        

    const data = await page.evaluate(
        () =>  Array.from(document.querySelectorAll('strong'))
                    .map(elem => elem.innerText)
      );
      console.log(data.length);

     if(data.length==0){console.log('hittade inget i strong')}else{

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