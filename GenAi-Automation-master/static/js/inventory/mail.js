const senderInput = document.getElementById('sender');
const recipientInput = document.getElementById('recipient');
const subjectInput = document.getElementById('subject');
const contentInput = document.getElementById('content');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
    if (senderInput.value.trim() === '' ||
    recipientInput.value.trim() === '' ||
    subjectInput.value.trim() === '' ||
    contentInput.value.trim() === '') {
  alert('Please fill in all fields.');
  return;
}

  // Send email (replace with your backend logic)
  sendEmail(sender, recipient, subject, content)
    .then(() => {
      // Handle successful email sending
      alert('Email sent successfully');
    })
    .catch(error => {
      // Handle error
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    });
});

// Function to send email (replace with your backend implementation)
function sendEmail(sender, recipient, subject, content) {
  // Example using fetch API (replace with your backend logic)
  return fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sender, recipient, subject, content })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// Function to update content from backend (example)
function updateContent(newContent) {
  contentInput.value = newContent;
}
