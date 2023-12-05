let PlayerRegistrationData = [];
function register() {
	// Get input values
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const dob = document.getElementById('dob').value;
	const gender = document.getElementById('gender').value;
	const email = document.getElementById("email").value;
	// Validate first name, last name, and email
	var nameRegex = /^[A-Za-z]{3,}$/;
	var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
	if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
		alert("Please enter at least 3 letters for First Name and Last Name.");
		return;
	}
	if (!emailRegex.test(email)) {
		alert("Please enter a valid Gmail address.");
		return;
	}
	// Calculate age based on date of birth
	var today = new Date();
	var birthDate = new Date(dob);
	var age = today.getFullYear() - birthDate.getFullYear();
	var monthDiff = today.getMonth() - birthDate.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	// Validate age
	if (age < 8 || age > 12) {
		alert("Age must be between 8 and 12 inclusive.");
		return;
	}
	document.getElementById('age').value = age;
	// Data collection logic
	const playerData = {
		firstName: firstName,
		lastName: lastName,
		dob: dob,
		age: age,
		gender: gender,
		email:email
	};
	// Adds playerData to PlayerRegistrationData array
	PlayerRegistrationData.push(playerData);
	// Disable form fields and buttons, enable necessary buttons
	document.getElementById('firstName').disabled = true;
	document.getElementById('lastName').disabled = true;
	document.getElementById('dob').disabled = true;
	document.getElementById('gender').disabled = true;
	document.getElementById('age').disabled = true;
	document.getElementById('email').disabled = true;
	//disableInputs();
	document.getElementById('registerBtn').disabled = true;
	document.getElementById('startBtn').disabled = false;
	document.getElementById('endBtn').disabled = false;
}
function playGame() {
	// Enable check answer button
	document.getElementById('checkAnswerBtn').disabled = false;
	// Generate random numbers between 1 and 9 (inclusive) and 1 and 5 (inclusive)
	const num1 = Math.floor(Math.random() * 9) + 1;
	const num2 = Math.floor(Math.random() * 5) + 1;
	// Calculate the correct answer
	const correctAnswer = num1 * num2;
	// Select the playArea element by its ID
	var playArea = document.getElementById("playArea");
	// Enable the playArea element by changing its visibility property
	playArea.style.visibility = "visible";
	// Display the equation in the play area
	const equationText = `${num1} x ${num2} = ?`;
	document.getElementById('equation').textContent = equationText;
	// Enable answer input, Accept button, and Next button
	document.getElementById('answer').disabled = false;
	document.getElementById('acceptBtn').disabled = false;
	document.getElementById('nextBtn').disabled = false;
}
function checkAnswer() {
    // Get user's answer from the input field
    const playerAnswer = parseFloat(document.getElementById('answer').value);
    if (isNaN(playerAnswer)) {
        alert("Invalid input. Please enter a valid number.");
    } else {
        // Get num1 and num2 from the equation
        const equationText = document.getElementById('equation').textContent;
        const [num1, num2] = equationText.match(/\d+/g).map(Number);
        // Calculate the correct answer
        const correctAnswer = num1 * num2;
		//Calculate if the player's answer is correct
		const isCorrect = playerAnswer === correctAnswer;
		//Create an object with game data
		const gameData = {
            equation: equationText,
            response: playerAnswer,
            isCorrect: isCorrect,
        };
		PlayerRegistrationData.push(gameData);
		if (isCorrect) {
            alert("Correct! Well done.");
        } else {
            alert(`Incorrect. The correct answer is ${correctAnswer}.`);
        }
		document.getElementById('answer').value='';
    }
}
function enableInputs() {
	// Clear form fields
	document.getElementById('firstName').value = '';
	document.getElementById('lastName').value = '';
	document.getElementById('dob').value = '';
	document.getElementById('gender').value = '';
	document.getElementById('age').value = '';
	document.getElementById('email').value = '';
	document.getElementById('answer').value = '';
	document.getElementById('equation').textContent = '';
	// Enable input fields and buttons
	document.getElementById('firstName').disabled = false;
	document.getElementById('lastName').disabled = false;
	document.getElementById('dob').disabled = false;
	document.getElementById('gender').disabled = false;
	document.getElementById('age').disabled = false;
	document.getElementById('email').disabled = false;
	document.getElementById('registerBtn').disabled = false;
	document.getElementById('startBtn').disabled = false;
	document.getElementById('checkAnswerBtn').disabled = false;
	document.getElementById('nextBtn').disabled = false;
	document.getElementById('answer').disabled = false;
	document.getElementById('acceptBtn').disabled = false;
	return;
}
function disableInputs() {
	// Disable input fields and buttons
	document.getElementById('firstName').disabled = true;
	document.getElementById('lastName').disabled = true;
	document.getElementById('dob').disabled = true;
	document.getElementById('gender').disabled = true;
	document.getElementById('age').disabled = true;
	document.getElementById('email').disabled = true;
	document.getElementById('registerBtn').disabled = true;
	document.getElementById('startBtn').disabled = true;
	document.getElementById('checkAnswerBtn').disabled = true;
	document.getElementById('nextBtn').disabled = true;
	document.getElementById('answer').disabled = true;
	document.getElementById('acceptBtn').disabled = true;
	return;
}
function endRegistration() {
  const percentageScore = findPercentageScore();
  // Clear form inputs and enable them
  firstNameInput.value = '';
  lastNameInput.value = '';
  birthDateInput.value = '';
  ageInput.value = '';
  genderSelect.value = '';
  emailInput.value = '';
  firstNameInput.removeAttribute('disabled');
  lastNameInput.removeAttribute('disabled');
  birthDateInput.removeAttribute('disabled');
  ageInput.removeAttribute('disabled');
  genderSelect.removeAttribute('disabled');
  emailInput.removeAttribute('disabled');
  // Disable buttons and hide the results area
  registerButton.disabled = false; // Enable the "Register" button
  startButton.disabled = true;
  endButton.disabled = true;
  // Hide the results area
  const resultsArea = document.getElementById('resultsArea');
  resultsArea.hidden = true;
  alert(`Your percentage score is ${percentageScore.toFixed(2)}%`);
}
function showCharts() {
	let maleCount = 0;
	let femaleCount = 0;
	for (let i = 0; i < PlayerRegistrationData.length; i++) {
    	if (PlayerRegistrationData[i].gender === "male") {
        	maleCount++;
    	} else if (PlayerRegistrationData[i].gender === "female") {
        	femaleCount++;
    	}
	}
	// console.log(maleCount);
	// console.log(femaleCount);
	// Data for the pie chart
	var data = [maleCount, femaleCount];
	// Colors for the pie chart
	var colors = ['#0022FF', '#DA33FF'];
	drawPieChart(data, colors, 'genderChart');
	// Reset gender counts
	maleCount = 0;
	femaleCount = 0;
	//=======================================================
	// Function to categorize percentage scores and count frequencies
	let frequencyData = {
		'<50': 0,
		'50-59': 0,
		'60-69': 0,
		'70-79': 0,
		'80-89': 0,
		'90-99': 0,
		'100': 0,
	};
	console.log(frequencyData['100'], frequencyData['90-99'], frequencyData['80-89'], frequencyData['70-79'], frequencyData['60-69'], frequencyData['50-59'], frequencyData['<50']);
	// Iterate over the PlayerRegistrationData array
	PlayerRegistrationData.forEach(player => {
		let percentageScore = player.percentageScore;
			if (percentageScore < 50) {
				frequencyData['<50']++;
			} else if (percentageScore >= 50 && percentageScore <= 59) {
				frequencyData['50-59']++;
			} else if (percentageScore >= 60 && percentageScore <= 69) {
				frequencyData['60-69']++;
			} else if (percentageScore >= 70 && percentageScore <= 79) {
				frequencyData['70-79']++;
			} else if (percentageScore >= 80 && percentageScore <= 89) {
				frequencyData['80-89']++;
			} else if (percentageScore >= 90 && percentageScore <= 99) {
				frequencyData['90-99']++;
			} else if (percentageScore === 100) {
				frequencyData['100']++;
			}
		}
	);
	// Data for the pie chart
	var data = [
		frequencyData['<50'],
		frequencyData['50-59'],
		frequencyData['60-69'],
		frequencyData['70-79'],
		frequencyData['80-89'],
		frequencyData['90-99'],
		frequencyData['100']
	];
	// Colors for the bar chart
	var colors = ['#0022FF', '#DA33FF', '#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'];
	drawPieChart(data, colors, 'frequencyChart');
	// Reset frequencyData
	frequencyData = {
		'<50': 0,
		'50-59': 0,
		'60-69': 0,
		'70-79': 0,
		'80-89': 0,
		'90-99': 0,
		'100': 0,
	};
}
function drawPieChart(data, colors, canvasId) {
    // function drawPieChart(data, colors, canvasId) {
    // Get the canvas element by its ID
    var canvas = document.getElementById(canvasId);
    // Get the 2D rendering context of the canvas
    var ctx = canvas.getContext('2d');
    // Check if the data array is empty or has no meaningful values
    if (!data || data.length === 0 || data.every(value => value === 0)) {
        // Display "No data to display" message
        ctx.fillStyle = '#000'; // Set text color
        ctx.font = '16px Arial'; // Set font size and type
        ctx.fillText('No data to display', canvas.width / 2 - 80, canvas.height / 2);
        return; // Exit the function
    }
    // Calculate the total sum of data values
    var total = data.reduce((acc, value) => acc + value, 0);
    // Initialize the starting angle for drawing the slices
    var startAngle = 0;
    // Loop through each data value to draw the corresponding slice
    for (var i = 0; i < data.length; i++) {
        // Skip slices with a value of 0
        if (data[i] === 0) {
            continue;
        }
        // Calculate the angle for the current slice
        var sliceAngle = (data[i] / total) * 2 * Math.PI;
        // Set the fill color for the current slice
        ctx.fillStyle = colors[i];
        // Begin a new path for the slice
        ctx.beginPath();
        // Move to the center of the canvas
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        // Draw an arc for the slice
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 3, startAngle, startAngle + sliceAngle);
        // Draw a line to the center to close the path
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        // Fill the slice with the specified color
        ctx.fill();
        // Calculate label position at the edge of the section
        var labelX = canvas.width / 2 + Math.cos(startAngle + sliceAngle / 2) * (canvas.width / 3);
        var labelY = canvas.height / 2 + Math.sin(startAngle + sliceAngle / 2) * (canvas.width / 3);
        // Adjust label position to move it to the edge
        if (labelX > canvas.width / 2) {
            labelX += 10; // Move to the right
        } else {
            labelX -= 10; // Move to the left
        }
        if (labelY > canvas.height / 2) {
            labelY += 10; // Move downward
        } else {
            labelY -= 10; // Move upward
        }
        ctx.fillStyle = '#000'; // Set label text color
        ctx.font = '12px Arial'; // Set label font size and type
        ctx.fillText(data[i], labelX, labelY);
        // Update the starting angle for the next slice
        startAngle += sliceAngle;
    }
}
showCharts();
// Show charts every 5 seconds
setInterval(() => { showCharts(); }, 5000);