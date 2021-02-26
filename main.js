const puppeteer = require("puppeteer");

const TARGET_PAGE_URL = "https://adachi-tsukasa.github.io/dummylogin/";
const LOGIN_USER_SELECTOR = "hogehoge";
const LOGIN_PASS_SELECTOR = "passpass";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
  });
  await login();
  await form();
  const page = (await browser.pages())[0];
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.evaluate(() => console.log(`url is ${location.href}`));

  await page.goto(TARGET_PAGE_URL);
  await page.type('input[name="uname"]', LOGIN_USER_SELECTOR);
  await page.type('input[name="psw"]', LOGIN_PASS_SELECTOR);

  let xpath = "/html/body/form/div[1]/button";
  await page.waitForXPath(xpath);
  const elementHandleList = await page.$x(xpath);
  await elementHandleList[0].click();

  await Promise.all([page.waitForNavigation(), elementHandleList[0].click()]);
})();
