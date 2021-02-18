//const ppteer = require('fast-install-puppeteer');
const { log, getAgrType } = require('./utils');

const ppteer = require('puppeteer-core');

const findChrome = require('../node_modules/carlo/lib/find_chrome')

const devices = {
  mobile: [375, 667, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'],
  ipad: [1024, 1366, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'],
  pc: [1200, 1000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1']
};

async function pp({device = 'mobile', headless = false}) {
  let findChromePath = await findChrome({});
  let executablePath = findChromePath.executablePath;
  console.log(executablePath)
  const browser = await ppteer.launch({
    executablePath,
    headless: false
  });


  //const browser = await ppteer.launch({headless});
  async function openPage(url, extraHTTPHeaders) {
    const page = await browser.newPage();
    try {
      let deviceSet = devices[device];
      page.setUserAgent(deviceSet[2]);
      page.setViewport({width: deviceSet[0], height: deviceSet[1]});
      if(extraHTTPHeaders && getAgrType(extraHTTPHeaders) === 'object') {
        await page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
      }
      await page.goto(url, {
        timeout: 10 * 60 * 1000,
        waitUntil: 'networkidle0'
      });
    } catch (e) {
      console.log('\n');
      log.error(e.message);
    }
    return page;
  }
  return {
    browser,
    openPage
  }
};

module.exports = pp;