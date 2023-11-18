let PlayerRegistrationData = [];
let playerCount = 0
// Data collection logic
let playerData = {};
function register() {
	// Get input values
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var dob = document.getElementById('dob').value;
	var gender = document.getElementById('gender').value;
	var email = document.getElementById('email').value;
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
	// New playerData object properties
	playerData = {
	firstName: '', // Initialize as an empty array
	lastName: '',
	dob: '',
	age: 0,
	gender: '',
	email: '',
	correctAnswer: 0, // Initialize correctAnswer
	incorrectAnswer: 0, // Initialize incorrectAnswer
	totalQuestions: 0, // Initialize totalQuestions
	percentageScore: 0, // Initialize percentageScore
	tracker: 0, // Initialize tracker
	equations: [], // Initialize equations
	responses: [], // Initialize responses
	correctResponses: [], // Initialize correctResponses
};
	// Set playerData object properties
	playerData.firstName = firstName;
	playerData.lastName = lastName;
	playerData.dob = dob;
	playerData.age = age;
	playerData.gender = gender;
	playerData.email = email;
	// Adds playerData to PlayerRegistrationData array
	PlayerRegistrationData.push(playerData);
	// Disable form fields and buttons, enable necessary buttons
	document.getElementById('firstName').disabled = true;
	document.getElementById('lastName').disabled = true;
	document.getElementById('dob').disabled = true;
	document.getElementById('gender').disabled = true;
	document.getElementById('age').disabled = true;
	document.getElementById('email').disabled = true;
	document.getElementById('registerBtn').disabled = true;
	document.getElementById('startBtn').disabled = false;
	// playerCount++;
}
function playGame() {
	// Disable buttons
	document.getElementById('startBtn').disabled = true;
	document.getElementById('nextBtn').disabled = true;
	// Enable buttons
	document.getElementById('endBtn').disabled = false;
	document.getElementById('checkAnswerBtn').disabled = false;
	document.getElementById('percentageScoreBtn').disabled = false;
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
	playerData.equations[playerData.tracker]=(equationText);
	document.getElementById('equation').textContent = equationText;
	// Enable answer input, Accept button, and Next button
	document.getElementById('answer').disabled = false;
	// document.getElementById('acceptBtn').disabled = false;
}
function checkAnswer() {
	// Enable next button
	document.getElementById('nextBtn').disabled = false;
	// Change the visibility of the results area
	var resultsArea = document.getElementById('showpercentage');
	resultsArea.style.visibility = "visible";
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
		if (isCorrect) {
			alert("Correct! Well done.");
			// Increment correctAnswer
			playerData.correctAnswer++;
			playerData.correctResponses[playerData.tracker] = ('Correct');
        } else {
			alert(`Incorrect. The correct answer is ${correctAnswer}.`);
			// Increment incorrectAnswer
			playerData.correctResponses[playerData.tracker]=('Incorrect');
			playerData.incorrectAnswer++;
		}
		// Get the input element by its ID
		var inputElement = document.getElementById("answer");
		playerData.responses[playerData.tracker]=(inputElement.value);
		playerData.tracker++;
		playerData.totalQuestions++;
		// Disable and clear input field
		inputElement.disabled = true;
		document.getElementById('answer').value = '';
		// Need somewhere to call findPercentageScore() (wasn't requested to be here and make button on form useless)
		findPercentageScore();
		// Calling show all stats was requested
		showAllStats();
	}
}
function endGame() {
	// Add data to leaderboard
	findPercentageScore();
    // Get the input elements by their IDs
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const birthDateInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const emailInput = document.getElementById('email');
    const registerButton = document.getElementById('registerBtn');
	const startButton = document.getElementById('startBtn');
	const checkAnswerButton = document.getElementById('checkAnswerBtn');
	const endButton = document.getElementById('endBtn');
	const percentageScoreBtn = document.getElementById('percentageScoreBtn');
	const nextButton = document.getElementById('nextBtn');
	// Re-enable input fields and buttons
	const formInputs = [firstNameInput, lastNameInput, birthDateInput, genderSelect, emailInput];
    formInputs.forEach(input => input.removeAttribute('disabled'));
	// Clear form inputs and enable them
    firstNameInput.value = '';
    lastNameInput.value = '';
    birthDateInput.value = '';
    ageInput.value = '';
    genderSelect.value = '';
    emailInput.value = '';
	// Enable the "Register" button
	registerButton.disabled = false;
	// Disable buttons
	checkAnswerButton.disabled = true;
	startButton.disabled = true;
	endButton.disabled = true;
	percentageScoreBtn.disabled = true;
	nextButton.disabled = true;
	// Hide the results and play area
	var resultsArea = document.getElementById('showpercentage');
	resultsArea.style.visibility = "hidden";
	var playArea = document.getElementById("playArea");
	playArea.style.visibility = "hidden";
}
function findPercentageScore() {
	// Calculate the percentage score
	const percentageScore = (playerData.correctAnswer / playerData.totalQuestions) * 100;
	// Set the percentageScore property of the playerData object
	playerData.percentageScore = percentageScore.toFixed(2);
    // Get the textarea element for displaying statistics
    const showPercentageTextarea = document.getElementById("showPercentageArea");
    // Clear the existing content in the textarea
    showPercentageTextarea.value = "";
    // Create a string to display the current player's data
    let displayString = '';
    // Append the current player's data to the display string
    displayString += `Date: ${new Date().toLocaleDateString()}\n`;
    displayString += `Name: ${playerData.firstName} ${playerData.lastName}\n`;
    displayString += `Total Questions: ${playerData.totalQuestions}\n`;
    displayString += `Correct Answers: ${playerData.correctAnswer}\n`;
    displayString += `Percentage Score: ${playerData.percentageScore}%\n`;
    displayString += `-----------------\n`;
    // Set the display string as the content of the textarea
    showPercentageTextarea.value = displayString;
}
function showAllStats() {
	// Get the textarea element for displaying statistics
    const showStatisticsTextArea = document.getElementById("showStatisticsArea");
    // Clear the existing content in the textarea
	showStatisticsTextArea.value = "";
    // Create a string to display all player data
    let displayString = '';
    // Iterate over the PlayerRegistrationData array
	PlayerRegistrationData.forEach((player, index) => {
		// Get the value of tracker
		let trackerValue = player.tracker;
		// Append the player data to the display string
		// displayString += `Player ${index + 1}:\n`;
		displayString += `First Name: ${player.firstName}\n`;
		displayString += `Last Name: ${player.lastName}\n`;
		displayString += `Age: ${player.age}\n`;
		displayString += `Total Questions: ${player.totalQuestions}\n`;
		for (let i = 0; i < trackerValue; i++) {
			let equation = player.equations[i];
			displayString += (`Equation ${i + 1}: ${equation} Resopnse: ${player.responses[i]} Answer status: ${player.correctResponses[i]},\n`);
		}
		displayString += `Correct Answers: ${player.correctAnswer}\n`;
		displayString += `Percentage Score: ${(player.percentageScore)}%\n`;
		displayString += `-----------------\n`;
	});
    // Set the display string as the content of the playerDataDisplay element
    showStatisticsTextArea.value = displayString;
}
// Display the player data to console for testing purposes
console.log(PlayerRegistrationData);
// showAllStats();