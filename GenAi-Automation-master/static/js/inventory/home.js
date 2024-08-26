
// Function to open the chat form
function openForm() {
    const form = document.getElementById('myForm');
    form.classList.add('active'); // Add active class to show the form
}

// Function to close the chat form
function closeForm() {
    const form = document.getElementById('myForm');
    form.classList.remove('active'); // Remove active class to hide the form
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
function handleClickOutside(event) {
    const form = document.getElementById('myForm');
    const button = document.querySelector('.open-button');
    if (form.classList.contains('active') && !form.contains(event.target) && event.target !== button) {
        closeForm();
    }
}

// Add event listener to the document to handle clicks outside
document.addEventListener('click', handleClickOutside);
// Event listener for the Enter key in the textarea
document.getElementById('msg').addEventListener('keydown', function (event) {
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
document.getElementById('msg').addEventListener('keydown', function (event) {
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
document.getElementById('box1').addEventListener('click', function () {
    openModal('stockitems');
});

document.getElementById('box2').addEventListener('click', function () {
    openModal('addnewitem');
});



// Close modals when clicking outside of them
window.onclick = function (event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};


// Handle form submission for adding an operation user


// Function to show alerts
function showAlert(alertId, message) {
    const alertElement = document.getElementById(alertId);
    alertElement.innerText = message;
    alertElement.style.display = 'block';

    // Automatically hide the alert after 5 seconds (optional)
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}





function displayStockTable(stockitems) {
    const tableBody = document.getElementById('stockTableBody');
    tableBody.innerHTML = '';  // Clear any existing content

    // Check if patients is an array
    if (!Array.isArray(stockitems)) {
        console.error('Expected an array but got:', stockitems);
        return;
    }

    // Create table rows
    stockitems.forEach((stockitems, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
            ${stockitems.itemId}
            </td>
            <td>${stockitems.itemName}</td>
            <td>${stockitems.quantity}</td>
            <td>${stockitems.cost}</td>
            <td>${stockitems.expirationDate}</td>
            <td>${stockitems.category}</td>
            <td>${stockitems.supplier}</td>
            <td>
           <a 
    href="javascript:void(0);" 
    title="Edit" 
    text="edit" 
    onclick="oderItem('${stockitems._id}')"
    class="${stockitems.status ? 'btn-danger' : 'btn-icon'}">
    <img src="/static/icons/order_now_icon.png" alt="Edit" class="btn-logo">
</a>


            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Handle form submission for modal2
document.getElementById('stockRegistrationForm').addEventListener('submit', function (e) {
    e.preventDefault();


    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/inventory/add_new_stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                alert(`item ${data.itemName} created successfully`)
                closeModal('addnewitem');
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            alert(error);
        });



});


document.getElementById('box1').addEventListener('click', function () {
    fetch('/inventory/get_stock_list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(stockList => {
            console.log(stockList);
            displayStockTable(stockList)
            openModal('stockitems');

        })
        .catch((error) => {
            console.error('Error:', error);
        });

});


function oderItem(itemId) {
    console.log(itemId);

    fetch('/inventory/order_item', {
        method: 'POST', // Use POST method
        headers: {
            'Content-Type': 'application/json' // Sending JSON data
        },
        body: JSON.stringify({ itemId: itemId }) // Send itemId in request body
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status) {
                console.log(data.draft_mail);
                // Assuming you want to render mail using the draft_mail key in response
                const params = new URLSearchParams({
                    subject: data.draft_mail.subject,
                    content: data.draft_mail.content,
                    email: data.draft_mail.recipientEmail
                }).toString();
                console.log(data.draft_mail.subject);
                window.location.href = `/inventory/render_mail?draft_mail=${params}`;
            } else {
                showAlert('danger-alert', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors here
        });
}
