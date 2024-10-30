function copyToClipboard(button) {
    const codeBlock = button.previousElementSibling;
    const textToCopy = codeBlock.textContent;

    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#3498db';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed to copy';
        button.style.background = '#e74c3c';
    });
}


async function getStudentInfo() {
    const studentId = document.getElementById('studentId').value;
    const resultDiv = document.getElementById('result');

    if (!studentId) {
        resultDiv.innerHTML = '<p class="error">Please enter a student ID</p>';
        return;
    }

    resultDiv.innerHTML = '<p>Loading... Please wait...</p>';

    try {
        const response = await fetch(`./getInfo?id=${studentId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.responseCode === "200") {
            resultDiv.innerHTML = `
                <div class="success-result">
                    <h3>Student Information:</h3>
                    <p><strong>Name:</strong> ${data.studentName}</p>
                    <p><strong>Institute:</strong> ${data.instituteName}</p>
                    <p><strong>Department:</strong> ${data.departmentName}</p>
                    <p><strong>Current Semester:</strong> ${data.currentSemester}</p>
                    <p><strong>Time Taken:</strong> ${data.timeTaken}</p>
                </div>
            `;
        } else if (data.responseCode === "404") {
            resultDiv.innerHTML = `
                <div class="error-result">
                    <p>Student Not Found</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="error-result">
                    <p>${data.error || 'An unknown error occurred'}</p>
                </div>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error-result">
                <p>Error: Unable to fetch student information.</p>
                <p>Please try again later or contact support if the problem persists.</p>
                <p class="technical-error">Technical details: ${error.message}</p>
            </div>
        `;
    }
}

// Add event listener for Enter key
document.getElementById('studentId').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getStudentInfo();
    }
});