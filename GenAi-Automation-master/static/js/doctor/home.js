// Initialize DataTables
$(document).ready(function() {
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
    $('.gender-dropdown').on('change', function() {
        const selectedValue = $(this).val();
        console.log(`Selected gender: ${selectedValue}`);
    });

    // Handle result link click event
    $('.result-link').on('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const href = $(this).attr('href');
        window.open(href, '_blank'); // Open PDF in a new tab
    });
});
// script.js



// Function to handle Delete button click
function handleDelete(rowId) {
    if (confirm(`Are you sure you want to delete row ID: ${rowId}?`)) {
        alert(`Delete action for row ID: ${rowId}`);
        // Implement your delete logic here
    }
}

// Bind click events to buttons within the table rows
// $(document).ready(function() {
//     $('.btn-icon').on('click', function() {
//         const row = $(this).closest('tr');
//         const rowId = row.find('td:first').text(); // Assuming ID is in the first column
        
//         if ($(this).find('img').attr('alt') === 'Edit') {
//             handleEdit(rowId);
//         } else if ($(this).find('img').attr('alt') === 'Delete') {
//             handleDelete(rowId);
//         }
//     });
// });

function diagnosis(params) {
    console.log(params);
    
    
}