// Function to generate matrix input fields based on dimension
function generateMatrixInputs() {
    const container = document.getElementById('matrix-container');
    const dimension = document.getElementById('matrix-dimension').value;

    // Clear any existing input fields
    container.innerHTML = '';

    if (dimension <= 0) {
        alert("Please enter a valid dimension greater than zero.");
        return;
    }

    // Set grid dimensions
    container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;

    // Create input fields for matrix with labeled placeholders
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-input';
            input.id = `matrix-${i}-${j}`;
            input.placeholder = `a${i + 1}${j + 1}`; // Set placeholder as a[row][column]
            container.appendChild(input);
        }
    }

    // Show the submit button after generating inputs
    document.getElementById('submit-matrix').style.display = 'inline-block';
}