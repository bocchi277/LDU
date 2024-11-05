function generateMatrixInputs() {
    const size = document.getElementById("matrix-size").value;
    const matrixInputs = document.getElementById("matrix-inputs");
    matrixInputs.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.className = "matrix-row";
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("input");
            cell.type = "number";
            cell.className = "matrix-cell";
            cell.placeholder = `a${i + 1}${j + 1}`;
            cell.dataset.row = i;
            cell.dataset.col = j;
            row.appendChild(cell);
        }
        matrixInputs.appendChild(row);
    }
}

function calculateLDU() {
    const size = parseInt(document.getElementById("matrix-size").value);
    const matrix = [];
    const lduSteps = document.getElementById("ldu-steps");
    lduSteps.innerHTML = ''; // Clear previous results

    // Fetch matrix inputs
    const inputs = document.querySelectorAll(".matrix-cell");
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(Number(inputs[i * size + j].value));
        }
        matrix.push(row);
    }

    // Initialize L, D, U matrices
    let L = Array.from({ length: size }, () => Array(size).fill(0));
    let D = Array.from({ length: size }, () => Array(size).fill(0));
    let U = Array.from({ length: size }, () => Array(size).fill(0));

    displayStep("Original Matrix", matrix);

    // LDU factorization with more detailed steps
    for (let i = 0; i < size; i++) {
        // Diagonal element in D
        D[i][i] = matrix[i][i];
        let stepText = `D[${i + 1}][${i + 1}] = ${matrix[i][i]}`;
        displayMinorStep(stepText);

        for (let j = 0; j < size; j++) {
            if (i < j) {
                // Upper triangular matrix U
                U[i][j] = matrix[i][j] / D[i][i];
                stepText = `U[${i + 1}][${j + 1}] = matrix[${i + 1}][${j + 1}] / D[${i + 1}][${i + 1}] = ${matrix[i][j]} / ${D[i][i]} = ${U[i][j]}`;
                displayMinorStep(stepText);
            } else if (i > j) {
                // Lower triangular matrix L
                L[i][j] = matrix[i][j] / D[j][j];
                stepText = `L[${i + 1}][${j + 1}] = matrix[${i + 1}][${j + 1}] / D[${j + 1}][${j + 1}] = ${matrix[i][j]} / ${D[j][j]} = ${L[i][j]}`;
                displayMinorStep(stepText);
            } else {
                L[i][i] = 1; // Set 1 on the diagonal of L
                U[i][i] = 1; // Set 1 on the diagonal of U
                displayMinorStep(`L[${i + 1}][${i + 1}] = 1 (diagonal of L)`);
                displayMinorStep(`U[${i + 1}][${i + 1}] = 1 (diagonal of U)`);
            }
        }
    }

    // Display L, D, U Matrices
    displayStep("Lower Triangular Matrix (L)", L);
    displayStep("Diagonal Matrix (D)", D);
    displayStep("Upper Triangular Matrix (U)", U);

    // Final Result
    lduSteps.innerHTML += "<h3>Final Answer:</h3>";
    lduSteps.innerHTML += `<p>L = ${JSON.stringify(L)}</p>`;
    lduSteps.innerHTML += `<p>D = ${JSON.stringify(D)}</p>`;
    lduSteps.innerHTML += `<p>U = ${JSON.stringify(U)}</p>`;
}

// Function to display main calculation steps
function displayStep(title, matrix) {
    const lduSteps = document.getElementById("ldu-steps");
    const step = document.createElement("div");
    step.className = "step";
    step.innerHTML = `<h3>${title}:</h3>`;
    step.innerHTML += `<pre>${matrix.map(row => row.join(" ")).join("\n")}</pre>`;
    lduSteps.appendChild(step);
}

// Function to display minor calculation steps
function displayMinorStep(text) {
    const lduSteps = document.getElementById("ldu-steps");
    const minorStep = document.createElement("div");
    minorStep.className = "minor-step";
    minorStep.innerHTML = `<p>${text}</p>`;
    lduSteps.appendChild(minorStep);
}
