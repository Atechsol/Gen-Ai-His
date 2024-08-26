// Function to open the chat form
function openForm() {
    document.getElementById('myForm').style.display = 'block';
}

// Function to close the chat form
function closeForm() {
    document.getElementById('myForm').style.display = 'none';
}

// Function to send a message
function sendMessage() {
    const messageContainer = document.getElementById('chatMessages');
    const messageInput = document.getElementById('msg');
    const message = messageInput.value;

    if (message.trim() !== "") {
        // Display the user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.textContent = message;
        messageContainer.appendChild(userMessage);
        messageInput.value = '';
        messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom

        // Send the message to the backend
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ msg: message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayResponse(data.response_message);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

// Function to display the backend response
function displayResponse(response) {
    const messageContainer = document.getElementById('chatMessages');
    const backendMessage = document.createElement('div');
    backendMessage.classList.add('chat-message', 'backend');
    backendMessage.textContent = response;

    messageContainer.appendChild(backendMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
}

// Event listener for the Enter key in the textarea
document.getElementById('msg').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Function to open a specific modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add event listeners to the boxes to open the corresponding modals
document.getElementById('box1').addEventListener('click', function() {
    openModal('registrationModal');
});

document.getElementById('box2').addEventListener('click', function() {
    openModal('modal2');
});

document.getElementById('box3').addEventListener('click', function() {
    openModal('modal3');
});
document.getElementById('box4').addEventListener('click', function() {
    openModal('modal4');
});
// Close modals when clicking outside of them
window.onclick = function(event) {
    const modals = document.getElementsByClassName('custom-modal'); // Updated class name
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};

// Form Submission Logic
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch('/admin/add_doctor_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert(`User ${data.name} created successfully`)
            closeModal('modal2');
        } else {
            showAlert('danger-alert', data.message);
        }
    })
    .catch((error) => {
        showAlert('danger-alert', error);
    });

});

document.getElementById('registrationForm3').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch('/admin/add_op_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert(`User ${data.name} created successfully`)
            closeModal('modal3');
        } else {
            showAlert('danger-alert', data.message);
        }
    })
    .catch((error) => {
        showAlert('danger-alert', error);
    });

});

// Function to open a specific modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add event listener to Box 2 to open its corresponding modal
document.getElementById('box2').addEventListener('click', function() {
    openModal('modal2');
});

// Close modals when clicking outside of them
window.onclick = function(event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};

// Handle form submission for modal2
document.getElementById('registrationFormInventoryUser').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch('/admin/add_inventory_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.status) {
            alert(`User ${data.name} created successfully`)
            closeModal('modal2');
        } else {
            showAlert('danger-alert', data.message);
        }
    })
    .catch((error) => {
        showAlert('danger-alert', error);
    });

   
    
});
// Function to open a specific modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add event listener to Box 2 to open its corresponding modal
document.getElementById('box2').addEventListener('click', function() {
    openModal('modal2');
});

// Close modals when clicking outside of them
window.onclick = function(event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};

// Function to open a specific modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add event listener to Box 4 to open its corresponding modal
document.getElementById('box4').addEventListener('click', function() {
    openModal('modal4');
});

// Close modals when clicking outside of them
window.onclick = function(event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};

// Handle form submission for modal4
document.getElementById('registrationFormNurse').addEventListener('submit', function(e) {
    e.preventDefault()

    const password = document.getElementById('password4').value;
    const confirmPassword = document.getElementById('confirmPassword4').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch('/admin/add_nurse_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert(`User ${data.name} created successfully`);
            closeModal('modal4'); 
        } else {
            showAlert('danger-alert', data.message);
        }
    })
    .catch((error) => {
        showAlert('danger-alert', error);
    });
});

function showAlert(alertId, message) {
    const alertElement = document.getElementById(alertId);
    alertElement.innerText = message;
    alertElement.style.display = 'block';

    // Automatically hide the alert after 5 seconds (optional)
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}