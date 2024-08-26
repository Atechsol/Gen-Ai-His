
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

// Add event listeners to the boxes to open the corresponding modals
document.getElementById('box1').addEventListener('click', function () {
    openModal('registrationModal');
});


document.getElementById('box2').addEventListener('click', function () {
    fetch('/op/get_doctors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(docs => {
            console.log(docs[0].department+ "-" + docs[0].qualification);
            openModal('Bookappointmentmodel');
            displaydoctors(docs)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

function displaydoctors(doctors){
    const selectElement = document.getElementById('doctor');

            // Check if the select element exists
            if (!selectElement) {
                console.error('Select element not found.');
                return;
            }

            // Clear existing options
            selectElement.innerHTML = '<option value="">Select Doctor</option>';

            // Check if doctors is an array
            if (!Array.isArray(doctors)) {
                console.error('Expected an array but got:', doctors);
                return;
            }
            
            // Populate the select element with options
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor._id;
                option.textContent = doctor.name + "-" + doctor.department+ "-" + doctor.qualification;
                selectElement.appendChild(option);
            });
}


document.getElementById('box3').addEventListener('click', function () {
    fetch('/op/get_patient_list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(patients => {
            console.log(patients);
            displayPatientTable(patients)
            openModal('patientlistmodel');

        })
        .catch((error) => {
            console.error('Error:', error);
        });

});


function displayPatientTable(patients) {
    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = '';  // Clear any existing content

    // Check if patients is an array
    if (!Array.isArray(patients)) {
        console.error('Expected an array but got:', patients);
        return;
    }

    // Create table rows
    patients.forEach((patient, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <input type="text" class="form-control" id="tokenNumber${patient._id}"
                    placeholder="P Number" value="${patient._id}" required>
            </td>
            <td>${patient.firstname}</td>
            <td>${patient.gender}</td>
            <td>
                <button class="btn-icon" title="Edit" text="edit" onclick="editPatient('${patient._id}')">
                    <img src="" alt="Edit" class="btn-logo">
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}


// Close modals when clicking outside of them
window.onclick = function (event) {
    const modals = document.getElementsByClassName('custom-modal'); // Updated class name
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};


// Function to open a specific modal
// function openModal(modalId) {
//     document.getElementById(modalId).style.display = 'block';
// }

// Function to close a specific modal
// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }

// // Add event listener to Box 2 to open its corresponding modal
// document.getElementById('box2').addEventListener('click', function () {
//     openModal('modal2');
// });

// Close modals when clicking outside of them
window.onclick = function (event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};


// // Function to open a specific modal
// function openModal(modalId) {
//     document.getElementById(modalId).style.display = 'block';
// }

// // Function to close a specific modal
// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }

// Add event listener to Box 2 to open its corresponding modal
document.getElementById('box2').addEventListener('click', function () {
    openModal('modal2');
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


// // Function to open a specific modal
// function openModal(modalId) {
//     document.getElementById(modalId).style.display = 'block';
// }

// // Function to close a specific modal
// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }



// Close modals when clicking outside of them
window.onclick = function (event) {
    const modals = document.getElementsByClassName('custom-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};


// Function to open the patient registration modal
function openPatientRegistrationModal() {
    var modal = document.getElementById('modal2');
    modal.style.display = 'block';
}

// Function to close the patient registration modal
function closeappointmentRegistrationModal() {
    var modal = document.getElementById('Bookappointmentmodel');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    var modal = document.getElementById('modal2');
    if (event.target === modal) {
        closePatientRegistrationModal();
    }
};
// Function to open the patient registration modal
function openPatientRegistrationModal() {
    var modal = document.getElementById('modal2');
    modal.style.display = 'block';
}

// Function to close the patient registration modal
function closePatientRegistrationModal() {
    var modal = document.getElementById('modal2');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', function (event) {
    var modal = document.getElementById('modal2');
    var modalContent = document.querySelector('.custom-modal-content');

    if (event.target === modal && !modalContent.contains(event.target)) {
        closePatientRegistrationModal();
    }
});

function closePatientListModal() {
    var modal = document.getElementById('patientlistmodel');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', function (event) {
    var modal = document.getElementById('patientlistmodel');
    var modalContent = document.querySelector('.custom-modal-content');

    if (event.target === modal && !modalContent.contains(event.target)) {
        closePatientListModal();
    }
});

function copyTokenNumber() {
    const tokenInput = document.getElementById('tokenNumber');
    tokenInput.disabled = false; // Temporarily enable the input for copying
    tokenInput.select();
    navigator.clipboard.writeText(tokenInput.value).then(() => {
        alert('Token number copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
    tokenInput.disabled = true;
}
document.getElementById('patientRegistrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/op/patient_registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                const tokenInput = document.getElementById('tokenNumber');
                tokenInput.value = data.user_id;
                alert(data.message);
                closePatientRegistrationModal()
            } else {
                showAlert('danger-alert', data.message);
            }
        })
        .catch((error) => {
            showAlert('danger-alert', error);
        });

    return false; // Ensure the form doesn't reload the page
});


// Example usage: openPatientRegistrationModal();

// Example usage: openPatientRegistrationModal();

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

function showAlert(alertId, message) {
    const alertElement = document.getElementById(alertId);
    alertElement.innerText = message;
    alertElement.style.display = 'block';

    // Automatically hide the alert after 5 seconds (optional)
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}

// Initialize DataTables
$(document).ready(function () {
    $('#patientTable').DataTable({
        "paging": true,    // Enable pagination
        "ordering": true,  // Enable column ordering
        "info": true,      // Enable table information display
        "searching": true, // Enable the search bar
        "columnDefs": [
            { "orderable": false, "targets": [3, 4] } // Disable ordering for Gender and Result columns
        ],
        "language": {
            "paginate": {
                "next": "Next",       // Custom text for next button
                "previous": "Previous" // Custom text for previous button
            }
        }
    });

    // Handle dropdown change event
    $('.gender-dropdown').on('change', function () {
        const selectedValue = $(this).val();
        console.log(`Selected gender: ${selectedValue}`);
    });

    // Handle result link click event
    $('.result-link').on('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const href = $(this).attr('href');
        window.open(href, '_blank'); // Open PDF in a new tab
    });
});
// script.js

// Function to handle Edit button click
function handleEdit(rowId) {
    alert(`Edit action for row ID: ${rowId}`);
    // Implement your edit logic here
}

// Function to handle Delete button click
function handleDelete(rowId) {
    if (confirm(`Are you sure you want to delete row ID: ${rowId}?`)) {
        alert(`Delete action for row ID: ${rowId}`);
        // Implement your delete logic here
    }
}

// Bind click events to buttons within the table rows
$(document).ready(function () {
    $('.btn-icon').on('click', function () {
        const row = $(this).closest('tr');
        const rowId = row.find('td:first').text(); // Assuming ID is in the first column

        if ($(this).find('img').attr('alt') === 'Edit') {
            handleEdit(rowId);
        } else if ($(this).find('img').attr('alt') === 'Delete') {
            handleDelete(rowId);
        }
    });
});


function tokenChange() {
    var tokenInput = document.getElementById("tokenNumberID");
    if (tokenInput) {
        tokenInput.addEventListener("input", function () {
            console.log('Input value changed:', tokenInput.value);
            fetch('/op/fetch_patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID: tokenInput.value }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("firstname").value = data.firstname
                    document.getElementById("lastname").value = data.lastname
                    document.getElementById("DOB").value = data.date
                    document.getElementById("Gender").value = data.gender
                    document.getElementById("phoneno").value = data.phonenumber
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.error('Element with ID "tokenNumber" not found');
    }

}

document.getElementById('appointmentRegistrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    fetch('/op/appoinment_registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                alert(data.message);
                closeappointmentRegistrationModal()
            } else {
                alert('danger-alert', data.message);
            }
        })
        .catch((error) => {
            alert('danger-alert', error);
        });

    return false; // Ensure the form doesn't reload the page
});

