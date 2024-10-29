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

### Response Format

The API returns a JSON response with the following structure:

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


If the student is not found, it returns:
```json
{
  "responseCode": "404",
  "error": "Student Not Found",
  "timeTaken": "Time taken in seconds"
}
```
### Clean Run Script
To perform a clean installation and run, use:
  ```bash
  npm run clean-run
  ```
#### This script will:
- Delete the node_modules directory
- Remove package-lock.json
- Reinstall dependencies
- Start the server
