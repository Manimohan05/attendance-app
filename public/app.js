document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    const attendanceForm = document.getElementById('attendanceForm');
    const logoutButton = document.getElementById('logoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      window.location.href = '/attendance.html';
                  } else {
                      alert(data.message || 'Login failed!');
                  }
              });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }).then(response => response.json())
            .then(data => {
                const responseArea = document.getElementById('responseArea');
                if (data.success) {
                    window.location.href = 'index.html'; // Redirect to login
                } else {
                    responseArea.innerHTML = `<p>${data.message}</p>`;
                    if (data.userExists) {
                        // Immediate redirect if username already exists
                        window.location.href = 'index.html';
                    }
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            fetch('/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            }).then(response => response.json())
              .then(data => {
                  const responseArea = document.getElementById('responseArea');
                  if (data.success) {
                      responseArea.innerHTML = `Your password is: ${data.password}<br>
                                                <a href="/index.html">Click here to login</a>`;
                  } else {
                      responseArea.innerHTML = `${data.message}<br>
                                                <a href="/register.html">Click here to register</a>`;
                  }
              });
        });
    }

    if (attendanceForm) {
        attendanceForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetch('/mark-attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      alert('Attendance marked successfully!');
                      window.location.href = '/records.html';
                  } else {
                      alert(data.message || 'Failed to mark attendance!');
                  }
              });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.location.href = 'index.html'; // Redirect to login page
        });
    }

    if (window.location.pathname === '/records.html') {
        fetchRecords();
    }

    function fetchRecords() {
        fetch('/view-attendance')
        .then(response => response.json())
        .then(records => {
            const recordsDiv = document.getElementById('records');
            recordsDiv.innerHTML = ''; // Clear previous records
            records.forEach(record => {
                const recordElem = document.createElement('div');
                recordElem.textContent = `Date: ${record.date}, Username: ${record.username}, Status: ${record.message}`;
                recordsDiv.appendChild(recordElem);
            });
        }).catch(error => {
            console.error('Error fetching attendance records:', error);
            alert('Error fetching attendance records, please try again later.');
        });
    }
});
