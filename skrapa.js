const puppeteer = require('puppeteer');



trafikvarket1('https://fp.trafikverket.se/Boka/#/licence');
//trafikvarket2('inget');


async function trafikvarket1(url) {

    
const personnummer = '200412063596';
const stad = 'Örebro';
const körkort = 'B';
const tidigareTid = false;
    
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

    //await page.waitFor(200000000);

    if(tidigareTid){
    await page.waitForSelector('div[class="row alreadyBookedExamination"]');
    await page.click('div[class="row alreadyBookedExamination"]'); }
    else{
        await page.waitForSelector('div[class="row suggestedReservations"]');
        await page.click('div[class="row suggestedReservations"]');   }

    //går till din pesonliga sida

    await page.waitForSelector('input[id=id-control-searchText-1-1]');

    //page.url() = trafikvarket2;

    await page.type('input[id=id-control-searchText-1-1]', stad);

    await page.keyboard.press('Enter');



        await page.waitFor(2000);


    const data = await page.evaluate(
        () =>  Array.from(document.querySelectorAll('strong'))
                    .map(elem => elem.innerText)
      );
      console.log(data);

      const tid = data[0].substring(0,10);
      console.log(tid);

      const year = tid.substring(0,4);
      console.log(year);

      const month = tid.substring(5,7);
      console.log(month);

      const day = tid.substring(8,10);
      console.log(day);

        const dinTid = tidigastdatum;//2022-03-30 format


    //const Txt = await el.getProperty('textContent');
    //const rawTxt = await Txt.jsonValue();
   // const value = await element.evaluate(el => el.textContent);
    //console.log(value);

    browser.close();
}