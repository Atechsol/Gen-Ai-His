
document.addEventListener('DOMContentLoaded', function () {
    const responseTextBox = document.getElementById('responseTextBox');

    // Mock Backend URL
    const backendUrl = 'https://api.example.com/medical-summary';

    // Fetch data from the backend when the page loads
    async function fetchData() {
        try {
            const response = await fetch(backendUrl); // Use your actual API endpoint
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            responseTextBox.value = data.summary; // Assume the response contains a 'summary' field
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data.');
        }
    }

    // Save data to the backend automatically when the textarea changes
    async function saveData() {
        try {
            const editedText = responseTextBox.value;
            const response = await fetch(backendUrl, {
                method: 'POST', // or 'PUT' depending on your API design
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ summary: editedText })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Fetch data when the page loads


    fetchData();

    // Add event listener for input changes
    responseTextBox.addEventListener('input', function () {
        // Debounce the saveData function to avoid making too many requests
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
            saveData();
        }, 1000000); // Save changes after 1 second of inactivity
    });
});

const names = [
    "Acute",
    "Chronic",
    "Idiopathic",
    "Bilateral",
    "Unilateral",
    "Prognosis",
    "Etiology",
    "Symptom",
    "Syndrome",
    "Pathology",
    "Lesion",
    "Hyper",
    "Hypo",
    "Benign",
    "Malignant",
    "Infection",
    "Inflammation",
    "Degenerative",
    "Congenital",
    "Metastasis",
    "Remission",
    "Relapse",
    "Diagnosis"
];


let sortedNames = names.sort();
let input = document.getElementById("input");
let currentFocus = -1;

// Execute function on keyup
// input.addEventListener("input", () => {
//   const inputValue = input.value;
//   const words = inputValue.split(/\s+/);
//   const currentWord = words[words.length - 1];

//   removeElements();

//   if (currentWord === "") {
//       toggleListDisplay();
//       return;
//   }

//   for (let name of sortedNames) {
//       if (name.toLowerCase().startsWith(currentWord.toLowerCase())) {
//           let listItem = document.createElement("li");
//           listItem.classList.add("list-items");
//           listItem.style.cursor = "pointer";
//           listItem.setAttribute("onclick", `displayNames('${name}')`);

//           let highlightedText = `<b>${name.substr(0, currentWord.length)}</b>`;
//           highlightedText += name.substr(currentWord.length);

//           listItem.innerHTML = highlightedText;
//           document.querySelector(".list").appendChild(listItem);
//       }
//   }

//   toggleListDisplay();
// });

// Function to display the name in the input and clear suggestions
function displayNames(selectedName) {
    const words = input.value.split(/\s+/);
    words[words.length - 1] = selectedName;
    input.value = words.slice(0, -1).join(' ') + ' ' + selectedName;
    removeElements();
    currentFocus = -1;
}

// Function to remove all list items
function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach(item => item.remove());
}

// Function to show or hide the suggestion list
function toggleListDisplay() {
    const list = document.querySelector('.list');
    const items = document.querySelectorAll('.list-items');
    list.style.display = items.length > 0 ? 'block' : 'none';
}

// Function to handle keyboard navigation
function handleKeyNavigation(e) {
    let items = document.querySelectorAll('.list-items');
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
    } else if (e.key === "ArrowUp") {
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentFocus > -1) {
            if (items[currentFocus]) {
                items[currentFocus].click();
            }
        }
        return;
    }

    addActive(items);
}

// Function to add the active class to the focused list item
function addActive(items) {
    if (!items) return false;
    removeActive(items);

    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;

    items[currentFocus].classList.add("active");
}

// Function to remove the active class from all list items
function removeActive(items) {
    items.forEach(item => item.classList.remove("active"));
}

// Add an event listener for keydown to handle Enter key and arrow keys
input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        handleKeyNavigation(e);
    }
});
// Reference to the submit button
let submitBtn = document.getElementById("submitBtn");

// Add event listener for the submit button
submitBtn.addEventListener("click", () => {
    // Handle the submit action
    handleSubmit();
});

// Function to handle the form submission
function handleSubmit() {
    // Get the current value of the textarea
    const inputValue = input.value;

    // Process the input value as needed
    console.log("Submitted text:", inputValue);

    // Optionally, clear the textarea and suggestions
    input.value = '';
    removeElements();
}

function inputChange() {
    var input = document.getElementById("input");
    if (input) {
        input.addEventListener("keydown", function (e) {
            console.log('Input:', input.value); // e.which is for key codes
            console.log('Key pressed:', e.which); // e.which is for key codes
            
            if (e.which === 32) { // 9 is the key code for space
                

                const words = input.value.trim().split(/\s+/);
                const lastWord = words.length > 0 ? words[words.length - 1] : '';
                console.log('lastword : ',lastWord);

                fetch('/doctor/fetch_next_words', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ word: lastWord }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('data from model : ',data.next_sentace);
                       
                        // Split the input value into an array of words
                        const words = data.next_sentace.trim().split(/\s+/); // Split by one or more whitespace characters
                        
                        // Remove the first word and get the remaining words
                        const remainingWords = words.length > 1 ? words.slice(1).join(' ') : '';
    
                        
                        console.log('Input value after removing first word:', remainingWords);
                        
                        document.querySelector(".list").innerHTML = "";
                        let listItem = document.createElement("li");
                        listItem.classList.add("list-items");
                        listItem.style.cursor = "pointer";
                        listItem.setAttribute("onclick", `displayNames('${remainingWords}')`);
    
                        let highlightedText = `<b>${remainingWords.substr(0)}</b>`;
                        // highlightedText += data.next_sentace.substr(currentWord.length);
    
                        listItem.innerHTML = highlightedText;
                        document.querySelector(".list").appendChild(listItem);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
            
            


           
        });
    } else {
        console.error('Element with ID "tokenNumber" not found');
    }

}