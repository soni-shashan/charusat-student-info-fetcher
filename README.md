# CHARUSAT Student Info Fetcher

This project is a web application that fetches student information from CHARUSAT University using a student ID. It uses Puppeteer for web scraping and Express.js for creating an API endpoint.

## Features

- Fetch student information using student ID
- Web scraping of CHARUSAT's fee payment portal
- RESTful API endpoint for retrieving student data
- Performance timing for API requests

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12 or higher recommended)
- npm (Node Package Manager) installed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soni-shashan/charusat-student-info-fetcher.git cd charusat-student-info-fetcher


2. Install the dependencies:
   ```bash
   npm install


## Usage

### Starting the Server

To start the server, run:
  ```bash
  npm start


This will start the server on `http://localhost:3000`.

### API Endpoint

The application exposes a single GET endpoint:
  ```bash
  GET /getInfo?id=<student_id>
  ```

Replace `<student_id>` with the actual student ID you want to query.

## CHARUSAT Student Info Fetcher API Documentation
Welcome to the CHARUSAT Student Info Fetcher API! This API allows you to retrieve information about CHARUSAT students using their unique student ID.

## Features

- **Quick Search**: Get student information instantly with just an ID.
- **Secure**: Safe and secure information retrieval.
- **Fast**: Optimized for quick response times.

## API Endpoint

### Get Student Information

**Endpoint**: ```bash GET https://getcharusatstudentinfo.vercel.app/getInfo?id={studentId}```


### Parameters

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| id        | string | Yes      | Student ID number          |

## Response Format

The API returns a JSON object with the following structure:

```json
{
    "responseCode": "200",
    "studentName": "Student Name",
    "instituteName": "Institute Name",
    "departmentName": "Department Name",
    "currentSemester": "Current Semester",
    "timeTaken": "Time taken in seconds"
}
```

### Example API Calls
#### cURL
  ```bash
  curl -X GET "https://getcharusatstudentinfo.vercel.app/getInfo?id=23csxxx"
  ```

#### JavaScript (Fetch)
  ```javascript
  fetch('https://getcharusatstudentinfo.vercel.app/getInfo?id=23csxxx')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

#### Python (requests)
```python
import requests

url = "https://getcharusatstudentinfo.vercel.app/getInfo"
params = {"id": "23csxxx"}

response = requests.get(url, params=params)
data = response.json()
print(data)
```

#### PHP
```php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://getcharusatstudentinfo.vercel.app/getInfo?id=23csxxx');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
```

#### Node.js (Axios)
```javascript
const axios = require('axios');

async function getStudentInfo() {
    try {
        const response = await axios.get(
            'https://getcharusatstudentinfo.vercel.app/getInfo?id=23csxxx'
        );
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```