const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

async function getStudentInfo(studentID) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Capture the start time
  const startTime = Date.now();

  try {
    await page.goto('https://charusat.edu.in:912/FeesPaymentApp/', { waitUntil: 'domcontentloaded' });
    await page.type('#txtStudentID', studentID);
    await page.click('#btnSearch');

    const result = await Promise.race([
      page.waitForSelector('#lblStudentName', { visible: true, timeout: 10000 }).then(() => 'studentFound'),
      page.waitForSelector('.swal-modal', { visible: true, timeout: 10000 }).then(() => 'notFound')
    ]);

    // Capture the end time
    const endTime = Date.now();
    const totalTime = endTime - startTime; // Calculate total time taken
    const timeTaken=String(totalTime/1000)+" s";

    if (result === 'studentFound') {
      const responseCode = "200";
      const studentName = await page.$eval('#lblStudentName', el => el.innerText);
      const instituteName = await page.$eval('#lblInstitute', el => el.innerText);
      const departmentName = await page.$eval('#lblDegree', el => el.innerText);
      const currentSemester = await page.$eval('#lblCurrSemester', el => el.innerText);
      await browser.close();
      return {
        responseCode,
        studentName,
        instituteName,
        departmentName,
        currentSemester,
        timeTaken// Include total time in response
      };
    } else if (result === 'notFound') {
      const responseCode = "404";
      const error = "Student Not Found";
      await browser.close();
      return { responseCode, error, timeTaken }; // Include total time in response
    }

  } catch (error) {
    console.error("An error occurred:", error);
    await browser.close();
    throw error;
  }
}

// Define a GET endpoint with query parameter
app.get('/getStudentInfo', async (req, res) => {
  const studentID = req.query.id;

  if (!studentID) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const data = await getStudentInfo(studentID);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student name" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
