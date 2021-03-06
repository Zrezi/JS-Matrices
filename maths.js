function generateMatrix_FromString(matrixString) {

	// Check for the leading and trailing bracket bracket
	if (matrixString.charAt(0) != '{' || matrixString.charAt(matrixString.length - 1) != '}') {
		console.log('Matrix String missing leading or trailing bracket');
		return null;
	}

	// Make sure there are the same number of open brackets as there are closed brackets
	if ((matrixString.match(/{/g) || []).length != (matrixString.match(/}/g) || []).length) {
		console.log('Mismatched brackets');
		return null;
	}

	// Create the matrix object
	var matrix = [];
	matrix.rows = 0;
	matrix.columns = 0;

	// Remove leading and trailing brackets
	matrixString = matrixString.slice(1, -1);

	// Calculate the number of rows by splitting on an open bracket.
	// Splice the first array element since it will always be the blank before the first row
	// (in between the '{{' at the start of the string)
	matrixString = matrixString.split('{');
	matrixString.splice(0, 1);

	// For every row
	for (var i = 0; i < matrixString.length; i++) {

		matrix.rows++;

		var submatrix = [];

		// Eliminate all characters that aren't numbers
		matrixString[i] = matrixString[i].replace(/{/g, '');
		matrixString[i] = matrixString[i].replace(/}/g, '');
		matrixString[i] = matrixString[i].replace(/,/g, '');
		matrixString[i] = matrixString[i].trim();

		//console.log('Row: ' + matrixString[i] + ';');
		
		// Submatrix (the row) is calculated by splitting the now-formatted string by spaces
		// since all that should be left is the numerical values of the matrix
		submatrix = matrixString[i].split(' ');
		matrix.columns = submatrix.length;

		for (var k = 0; k < submatrix.length; k++) {
			//console.log(submatrix[k]);
		}

		// Then push the submatrix onto the matrix as a row
		matrix.push(submatrix);

	}

	return matrix;

}

function matrixAddition(m1, m2) {

	// Make sure that the dimensions are equal
	if (m1.rows != m2.rows || m1.columns != m2.columns) {
		console.log('Cannot compute addition: matrices are different dimensions');
		return null;
	}

	// Create the matrix object
	var matrix = [];

	// For every row
	for (var i = 0; i < m1.length; i++) {

		// Create the submatrix (the row)
		var submatrix = [];
		
		// For every column
		for (var k = 0; k < m1[0].length; k++) {

			// Push the addition value onto the submatrix
			submatrix.push(parseInt(m1[i][k]) + parseInt(m2[i][k]));
		}

		// Push the submatrix (the row) onto the matrix
		matrix.push(submatrix);
	}

	// Since we know that the dimensions are equal, it's safe to assume that the dimensions
	// of the result are equal to the dimensions of the arguments
	matrix.rows = m1.rows;
	matrix.columns = m1.columns;

	// Return the object
	return matrix;
}

function matrixSubtraction(m1, m2) {
	
	// Make sure that the dimensions are equal
	if (m1.rows != m2.rows || m1.columns != m2.columns) {
		console.log('Cannot compute addition: matrices are different dimensions');
		return null;
	}

	// Create the matrix object
	var matrix = [];

	// For every row
	for (var i = 0; i < m1.length; i++) {

		// Create the submatrix (the row)
		var submatrix = [];
		
		// For every column
		for (var k = 0; k < m1[0].length; k++) {

			// Push the subtraction value onto the submatrix
			submatrix.push(parseInt(m1[i][k]) - parseInt(m2[i][k]));
		}

		// Push the submatrix (the row) onto the matrix
		matrix.push(submatrix);
	}

	// Since we know that the dimensions are equal, it's safe to assume that the dimensions
	// of the result are equal to the dimensions of the arguments
	matrix.rows = m1.rows;
	matrix.columns = m1.columns;

	// Return the object
	return matrix;

}

function matrixDeterminant2x2(matrix, verbose) {

	// Make sure the matrix supplied is in fact a 2x2 matrix
	if (matrix.rows != 2 || matrix.columns != 2) {
		console.log('Cannot find 2x2 determinant, matrix isn\'t a 2x2 matrix');
		return null;
	}

	// Use the fact that |A| = ad - bc
	var determinant = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);

	if (verbose) {
		console.log(determinant);
	}

	// Return the determinant value
	return determinant;
}

function matrixDeterminantLargerThan2x2(matrix) {

	// Make sure the matrix is square
	if (matrix.rows != matrix.columns) {
		console.log('Cannot find larger matrix determinant, matrix isn\' square');
		return null;
	}

	var determinant = 0;

	// Going to do this column-based first-row cofactor expansion
	for (var i = 0; i < matrix[0].length; i++) {

		var m = [];

		for (var k = 0; k < matrix.length; k++) {

			var submatrix = [];

			for (var j = 0; j < matrix[0].length; j++) {

				if (k != 0 && j != i) {
					submatrix.push(parseInt(matrix[k][j]));
				}

			}

			if (submatrix.length > 0)
				m.push(submatrix);


		}

		m.rows = m.length;
		m.columns = m[0].length;

		if (m.rows == 2 && m.columns == 2) {
			var addition = matrix[0][i] * matrixDeterminant2x2(m);
			if (i % 2 == 1) {
				addition *= -1;
			}
			determinant += addition;
		} else {
			var addition = matrix[0][i] * matrixDeterminantLargerThan2x2(m);
			if (i % 2 == 1) {
				addition *= -1;
			}
			determinant += addition;
		}

	}

	return determinant;

}

function generateMatrix_OnesAndZeroes(rows, columns, negatives) {

	// Create the matrix object
	var matrix = [];

	// For every row
	for (var i = 0; i < rows; i++) {

		// Generate a submatrix (the row)
		var submatrix = [];

		// For every column in that row
		for (var k = 0; k < columns; k++) {

			// Generate a random 1 or zero
			var value = Math.round(Math.random());

			// If negatives are allowed, randomly make it negative
			if (negatives) {
				if (Math.round(Math.random()) == 0) value *= -1;
			}
			
			// Push the value onto the submatrix (the row)
			submatrix.push(value);
		}

		// After all columns have been created, push the row to the matrix
		matrix.push(submatrix);
	}

	// Set the matrix object properties
	matrix.rows = rows;
	matrix.columns = columns;

	// Return the matrix object
	return matrix;
}

function logMatrix(matrix) {

	if (matrix == null) {
		console.log('Matrix is null, cannot print');
		return false;
	}

	// Create the final output string
	var log = "";

	// For every row
	for (var i = 0; i < matrix.rows; i++) {

		// Create the row's individual string
		var row = "{ ";

		// For every column in that row
		for (var k = 0; k < matrix.columns; k++) {

			// Append the matrix's value to the row's string
			row += (matrix[i][k]);

			// And if it's not the last column, add a comma after the value
			if (k != matrix.columns - 1) row += ", ";
		}

		// Close the row's string with a bracket
		row += " }";

		// Append the row's string to the final output
		log += row + "\n";
	}

	// Console log the final output string
	console.log(log);
}

$(document).ready(function() {

	var m1 = generateMatrix_FromString('{{1, 2, 3, 4},{2, 3, 4, 1},{3, 4, 1, 2},{9, 9, 9, 8}}');
	console.log(matrixDeterminantLargerThan2x2(m1));

});