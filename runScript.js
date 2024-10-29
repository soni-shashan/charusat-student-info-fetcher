const { exec } = require('child_process');
const fs = require('fs');

const deleteNodeModules = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('node_modules')) {
      exec('rmdir /s /q node_modules', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error deleting node_modules: ${stderr}`);
          reject(err);
        } else {
          console.log(stdout); // Log the output of the command
          resolve();
        }
      });
    } else {
      console.log('node_modules directory does not exist.');
      resolve();
    }
  });
};

const deletePackageLock = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('package-lock.json')) {
      exec('del package-lock.json', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error deleting package-lock.json: ${stderr}`);
          reject(err);
        } else {
          console.log(stdout); // Log the output of the command
          resolve();
        }
      });
    } else {
      console.log('package-lock.json does not exist.');
      resolve();
    }
  });
};

const installDependencies = () => {
  return new Promise((resolve, reject) => {
    exec('npm install', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error during npm install: ${stderr}`);
        reject(err);
      } else {
        console.log(stdout); // Log the output of the command
        resolve();
      }
    });
  });
};

const runScript = () => {
  return new Promise((resolve, reject) => {
    console.log(`Server is running on http://localhost:3000`);
    exec('node api/getStudentInfo.js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running getStudentInfo.js: ${stderr}`);
        reject(err);
      } else {
        console.log(stdout); // Log the output of the command
        resolve();
      }
    });
  });
};

const main = async () => {
  try {
    await deleteNodeModules();
    await deletePackageLock();
    await installDependencies();
    await runScript();
    console.log('Script executed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
