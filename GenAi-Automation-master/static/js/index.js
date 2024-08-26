function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
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


function displayResponse(response) {
    const messageContainer = document.getElementById('chatMessages');
    const backendMessage = document.createElement('div');
    backendMessage.classList.add('chat-message', 'backend');
    backendMessage.textContent = response;
    messageContainer.appendChild(backendMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
}

// Function to open the login modal
function openLoginModal() {
    document.getElementById('id01').style.display = 'block';
}

// Function to close the login modal
function closeLoginModal() {
    document.getElementById('id01').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('id01');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch('/sign_in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status) {
            if (data.render == "admin/home") {
                const params = new URLSearchParams({
                    id: data._id,
                    name: data.name,
                    userType: data.User
                }).toString();
               
                window.location.href = `/admin/home?${params}`;
            } else if (data.render == "op/home") {
                const params = new URLSearchParams({
                    id: data._id,
                    name: data.name,
                    userType: data.User
                }).toString();
                window.location.href = `/op/home?${params}`;
            } else if (data.render == "inventory/home") {
                const params = new URLSearchParams({
                    id: data._id,
                    name: data.name,
                    userType: data.User
                }).toString();
                window.location.href = `inventory/home?${params}`;
            }else if (data.render == "doctor/home") {
                const params = new URLSearchParams({
                    id: data._id,
                    name: data.name,
                    userType: data.User
                }).toString();
                window.location.href = `doctor/home?${params}`;
            }
        } else {
            showAlert('danger-alert', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
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