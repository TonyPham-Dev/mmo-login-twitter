const puppeteer = require("puppeteer");
const accounts = [
  // "GeraldBarn61920|CamChe@2022|3T5RZ6U2W7IUG4YI",
  // "CodyGarris16445|CamChe@2022|EBDAOUJTBIBYJU4Q",
  "RosettaBec40908|CamChe@2022|CGH4O5K7PZSLBP5U",
  "MatildaC90244|CamChe@2022|CNPV6K2ILTCO27LD",
  "CobbBetty18228|CamChe@2022|C3A3D6H5RQ3NPZ4S",
  "RalphBenso15819|CamChe@2022|FYE6DMMFIFP4PMK5",
  "DurhamNath52746|CamChe@2022|3DEDCNVEI4HELSRF",
  "GlenFlanna82073|CamChe@2022|A45J5M7VSPJ3J7EE",
  "josephine_70421|CamChe@2022|5MRDHFLCMQLOHOLJ",
  "JBradshaw94215|CamChe@2022|3LW2QJ5ZUHBQBY76",
  "CPowers15786|CamChe@2022|2WRVFAIO7SCAAAPY",
  "MarkDonova88646|CamChe@2022|72M2ONMJ5JH3DQLK",
  "JoeMitchel32935|CamChe@2022|AM4XHDYL5GUTB5NS",
  "CodyFaber18372|CamChe@2022|74UCQALML37SJUXK",
  "CarrollDea1739|CamChe@2022|3NCHFD2ROVBHPDEH",
  "MarionMann54141|CamChe@2022|DFIP4QPJHF7SNPVS",
  "DerekMille61655|CamChe@2022|AX22EV6SYUX27EWV",
  "ChaseBisho984|CamChe@2022|A2M2LQU5M5JBUUSO",
  "PeterWilli7478|CamChe@2022|4VSYVVLTKTIXYLHF",
  "AndrewsTil77017|CamChe@2022|DBL4ATA3HDABCZ7I",
  "BobbyEvans41000|CamChe@2022|3XUKKENC54INBS4Q",
];

const proxies = [
  "45.41.169.70:6731:xgptTop1VN:xgpt1688",
  // "104.239.91.205:5929:xgptTop1VN:xgpt1688",
  "64.137.59.225:6818:xgptTop1VN:xgpt1688",
  "104.239.13.213:6842:xgptTop1VN:xgpt1688",
  "64.43.89.41:6300:xgptTop1VN:xgpt1688",
  "45.61.97.123:6649:xgptTop1VN:xgpt1688",
  "155.254.49.79:6639:xgptTop1VN:xgpt1688",
  // "89.40.222.137:6513:xgptTop1VN:xgpt1688", //error
  "84.33.224.177:6201:xgptTop1VN:xgpt1688",
  "45.192.146.50:6061:xgptTop1VN:xgpt1688",
  "64.137.8.112:6794:xgptTop1VN:xgpt1688",
  "104.249.29.205:5898:xgptTop1VN:xgpt1688",
  "150.107.224.165:6080:xgptTop1VN:xgpt1688",
  "45.43.64.85:6343:xgptTop1VN:xgpt1688",
  "64.43.91.125:6896:xgptTop1VN:xgpt1688",
  "94.46.206.244:7017:xgptTop1VN:xgpt1688",
  "45.41.173.222:6589:xgptTop1VN:xgpt1688",
  "84.33.11.22:6304:xgptTop1VN:xgpt1688",
  "45.41.171.222:6258:xgptTop1VN:xgpt1688",
  "104.239.53.20:7438:xgptTop1VN:xgpt1688",
  "176.116.231.32:7374:xgptTop1VN:xgpt1688",
  "206.41.174.202:6157:xgptTop1VN:xgpt1688",
  "37.35.42.251:8853:xgptTop1VN:xgpt1688",
  "45.43.186.178:6396:xgptTop1VN:xgpt1688",
  "216.173.80.121:6378:xgptTop1VN:xgpt1688",
  "216.173.80.183:6440:xgptTop1VN:xgpt1688",
  "104.233.20.55:6071:xgptTop1VN:xgpt1688",
  "104.239.38.166:6699:xgptTop1VN:xgpt1688",
];

async function loginTwitter(data, proxy) {
  const [userName, password, keyFa] = data.split("|");
  const [endpoint, port, userNameProxy, passwordProxy] = proxy.split(":");
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=http://${endpoint}:${port}`],
  });

  const page = await browser.newPage();
  if (userNameProxy && passwordProxy) {
    await page.authenticate({
      username: userNameProxy,
      password: passwordProxy,
    });
  }
  await page.goto("https://twitter.com/i/flow/login", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  await page.waitForNetworkIdle(2000);
  await page.waitForNetworkIdle("[autocomplete=username]");
  await page.waitForNetworkIdle(2000);
  await page.type("input[autocomplete=username]", userName, {
    delay: 50,
  });
  await page.evaluate(() =>
    document.querySelectorAll('div[role="button"]')[2].click()
  );
  await page.waitForNetworkIdle(2000);
  await page.waitForNetworkIdle('[autocomplete="current-password"]');
  await page.type('input[autocomplete="current-password"]', password, {
    delay: 50,
  });
  await page.evaluate(() =>
    document.querySelectorAll('div[role="button"]')[2].click()
  );

  const page2Fa = await browser.newPage();
  await page2Fa.goto("https://2fa.live", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  await page2Fa.waitForNetworkIdle(2000);
  await page2Fa.waitForNetworkIdle("textarea[id=listToken]");
  await page2Fa.type("textarea[id=listToken]", keyFa, {
    delay: 50,
  });
  await page2Fa.evaluate(() =>
    document.querySelector('a[id="submit"]').click()
  );
  await page2Fa.waitForNetworkIdle(2000);
  await page2Fa.waitForNetworkIdle("textarea[id=output]");
  const result2Fa = await page2Fa.evaluate(() => {
    const twoFaCodeElement = document.querySelector("textarea[id=output]");
    return twoFaCodeElement.value 
  });
  const [key, twoFa] = result2Fa.split("|");
  page2Fa.close();
  await page.waitForNetworkIdle(2000);
  await page.waitForNetworkIdle('input[data-testid="ocfEnterTextTextInput"]');
  await page.type('input[data-testid="ocfEnterTextTextInput"]', twoFa, {
    delay: 50,
  });

  await page.evaluate(() =>
    document.querySelector('div[data-testid="ocfEnterTextNextButton"]').click()
  );
  
}

async function main() {
  await runAccount(0);
}

async function runAccount(index) {
  if (index < accounts.length) {
    const account = accounts[index];
    const proxy = proxies[index % proxies.length];
    console.log({
      account,
      proxy,
    });
    await loginTwitter(account, proxy);
    await delay(2000);
    await runAccount(index + 1); 
  }
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
