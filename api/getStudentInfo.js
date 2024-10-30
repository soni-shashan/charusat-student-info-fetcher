const chrome = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')

const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


async function getStudentInfo(studentID) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath(),
      headless: 'new',
      ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    const startTime = Date.now();

    await page.goto('https://charusat.edu.in:912/FeesPaymentApp/', { waitUntil: 'networkidle0' });
    await page.type('#txtStudentID', studentID);
    await page.click('#btnSearch');

    const result = await Promise.race([
      page.waitForSelector('#lblStudentName', { visible: true, timeout: 10000 }).then(() => 'studentFound'),
      page.waitForSelector('.swal-modal', { visible: true, timeout: 10000 }).then(() => 'notFound')
    ]);

    const endTime = Date.now();
    const timeTaken = `${(endTime - startTime) / 1000} s`;

    if (result === 'studentFound') {
      const responseCode = "200";
      const studentName = await page.$eval('#lblStudentName', el => el.innerText);
      const instituteName = await page.$eval('#lblInstitute', el => el.innerText);
      const departmentName = await page.$eval('#lblDegree', el => el.innerText);
      const currentSemester = await page.$eval('#lblCurrSemester', el => el.innerText);
      return {
        responseCode,
        studentName,
        instituteName,
        departmentName,
        currentSemester,
        timeTaken
      };
    } else if (result === 'notFound') {
      const responseCode = "404";
      const error = "Student Not Found";
      return { responseCode, error, timeTaken };
    }

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const studentID = req.query.id;

  if (!studentID) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const data = await getStudentInfo(studentID);
    res.json(data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to fetch student information", details: error.message });
  }
};
