function generateMatrixInputs() {
    const size = document.getElementById("matrix-size").value;
    const matrixInputs = document.getElementById("matrix-inputs");
    matrixInputs.innerHTML = ''; // Clear previous inputs

    // Generate input fields for each matrix cell
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
    // Step-by-step LDU decomposition logic goes here
    const size = document.getElementById("matrix-size").value;
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

    // Here, add step-by-step calculations and explanations for L, D, U
    lduSteps.innerHTML = "<p>Calculation steps will be added here for each stage.</p>";
}
