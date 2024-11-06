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

// Function to handle matrix submission and begin factorization
let eliminationMatrices = []; // Store elimination matrices here

// Modified function to handle matrix submission and begin factorization
function submitMatrix() {
    const dimension = parseInt(document.getElementById('matrix-dimension').value);
    const matrix = [];

    // Gather matrix values from the input fields
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            const value = document.getElementById(`matrix-${i}-${j}`).value;
            row.push(Number(value));
        }
        matrix.push(row);
    }

    console.log("Initial Matrix:", matrix);
    displayMatrix(matrix, "Initial Matrix");

    // Begin the elimination process to convert to upper triangular form
    let currentMatrix = matrix.map(row => row.slice());
    for (let k = 0; k < dimension - 1; k++) {
        const eliminationMatrix = createEliminationMatrix(currentMatrix, dimension, k);
        eliminationMatrices.push(eliminationMatrix); // Store elimination matrix
        displayMatrix(eliminationMatrix, `Elimination Matrix for Row ${k + 1}`);

        // Multiply the current matrix by the elimination matrix to zero out elements below the pivot
        currentMatrix = multiplyMatrices(eliminationMatrix, currentMatrix);
        displayMatrix(currentMatrix, `Matrix after Applying Elimination Matrix ${k + 1}`);
    }

    // Multiply all elimination matrices in reverse order
    const L = multiplyEliminationMatricesInReverseOrder(dimension);
    displayMatrix(L, "L (Product of Elimination Matrices in Reverse Order)");

    // Calculate the inverse of L
    const LInverse = calculateInverse(L);
    displayMatrix(LInverse, "L Inverse");
    // After converting to upper triangular form, extract D and U
    const D = extractDiagonalMatrix(currentMatrix);
    const U = extractUpperTriangularMatrix(currentMatrix);

    // Display the D and U matrices
    displayMatrix(D, "D (Diagonal Matrix)");
    displayMatrix(U, "U (Upper Triangular Matrix with 1s on the diagonal)");

}
// Function to extract the diagonal matrix D from the upper triangular matrix
function extractDiagonalMatrix(upperMatrix) {
    const dimension = upperMatrix.length;
    const D = Array.from({ length: dimension }, () => Array(dimension).fill(0));

    for (let i = 0; i < dimension; i++) {
        D[i][i] = upperMatrix[i][i];
    }

    return D;
}

// Function to extract the upper triangular matrix U with 1s on the diagonal
function extractUpperTriangularMatrix(upperMatrix) {
    const dimension = upperMatrix.length;
    const U = Array.from({ length: dimension }, () => Array(dimension).fill(0));

    for (let i = 0; i < dimension; i++) {
        for (let j = i; j < dimension; j++) {
            U[i][j] = i === j ? 1 : upperMatrix[i][j];
        }
    }

    return U;
}


// Function to multiply stored elimination matrices in reverse order
function multiplyEliminationMatricesInReverseOrder(dimension) {
    let result = eliminationMatrices[eliminationMatrices.length - 1]; // Start with the last elimination matrix

    // Multiply matrices from the last to the first
    for (let i = eliminationMatrices.length - 2; i >= 0; i--) {
        result = multiplyMatrices(result, eliminationMatrices[i]);
    }

    return result;
}

// Function to create an elimination matrix for zeroing out entries below the k-th pivot
function createEliminationMatrix(matrix, dimension, k) {
    const eliminationMatrix = Array.from({ length: dimension }, (_, i) =>
        Array.from({ length: dimension }, (__, j) => (i === j ? 1 : 0))
    );

    for (let i = k + 1; i < dimension; i++) {
        if (matrix[k][k] !== 0) {
            eliminationMatrix[i][k] = -matrix[i][k] / matrix[k][k];
        }
    }

    return eliminationMatrix;
}

// Function to calculate the inverse of a lower triangular matrix (L)
function calculateInverse(L) {
    const n = L.length;
    const inverse = Array.from({ length: n }, () => Array(n).fill(0));

    // Set up identity values in inverse
    for (let i = 0; i < n; i++) inverse[i][i] = 1;

    // Calculate inverse using forward substitution
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (i === j) {
                inverse[i][j] /= L[i][i];
            } else {
                let sum = 0;
                for (let k = j; k < i; k++) {
                    sum += L[i][k] * inverse[k][j];
                }
                inverse[i][j] = -sum / L[i][i];
            }
        }
    }

    return inverse;
}

// Function to multiply two matrices
function multiplyMatrices(A, B) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}


// Function to create an elimination matrix for zeroing out entries below the k-th pivot
function createEliminationMatrix(matrix, dimension, k) {
    const eliminationMatrix = Array.from({ length: dimension }, (_, i) =>
        Array.from({ length: dimension }, (__, j) => (i === j ? 1 : 0))
    );

    for (let i = k + 1; i < dimension; i++) {
        if (matrix[k][k] !== 0) {
            eliminationMatrix[i][k] = -matrix[i][k] / matrix[k][k];
        }
    }

    return eliminationMatrix;
}

// Function to multiply two matrices
function multiplyMatrices(A, B) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}
// Helper to create a container for the steps if not already present
function createStepsContainer() {
    const container = document.createElement('div');
    container.id = 'steps-container';
    container.style.marginTop = '20px';
    document.body.appendChild(container);
    return container;
}


// Function to display a matrix on the page with a title
// Function to display a matrix on the page with a title and formatted layout
function displayMatrix(matrix, title, isProductStep = false) {
    const container = document.getElementById('steps-container') || createStepsContainer();
    
    const titleElement = document.createElement('h3');
    titleElement.innerText = title;
    container.appendChild(titleElement);

    const rowContainer = document.createElement('div');
    rowContainer.className = 'matrix-step';

    if (isProductStep) {
        // Display in the format "Elimination Matrix * Matrix = Result Matrix"
        rowContainer.appendChild(formatMatrix(matrix, "Elimination Matrix"));
        
        const multiplySymbol = document.createElement('span');
        multiplySymbol.className = 'operation-symbol';
        multiplySymbol.innerText = '*';
        rowContainer.appendChild(multiplySymbol);

        rowContainer.appendChild(formatMatrix(matrix, "Original Matrix"));
        
        const equalSymbol = document.createElement('span');
        equalSymbol.className = 'operation-symbol';
        equalSymbol.innerText = '=';
        rowContainer.appendChild(equalSymbol);

        rowContainer.appendChild(formatMatrix(matrix, "Transformed Matrix"));
    } else {
        rowContainer.appendChild(formatMatrix(matrix, title));
    }

    container.appendChild(rowContainer);
}

// Function to format matrix as HTML for clear display
function formatMatrix(matrix, label) {
    const matrixDiv = document.createElement('div');
    matrixDiv.className = 'matrix-display';

    matrix.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        row.forEach(value => {
            const cell = document.createElement('span');
            cell.className = 'matrix-cell';
            cell.innerText = value.toFixed(2); // Display up to 2 decimal places
            rowDiv.appendChild(cell);
        });
        matrixDiv.appendChild(rowDiv);
    });

    return matrixDiv;
}
