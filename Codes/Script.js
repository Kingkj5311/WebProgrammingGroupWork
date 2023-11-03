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

function findPercentageScore() {
	// Calculate the total number of questions, excluding the player registration data
	const totalQuestions = PlayerRegistrationData.length - 1;
  
	// Calculate the number of correct answers
	const correctAnswers = PlayerRegistrationData.filter((data) => data.isCorrect).length;
  
	// Calculate the percentage score
	const percentageScore = (correctAnswers / totalQuestions) * 100;
  
	// Get the player's name from the registration data
	const playerName = PlayerRegistrationData[0].firstName; // Assuming player name is stored in the first registration data
  
	// Get the current date
	const currentDate = new Date().toLocaleDateString();
  
	// Select the 'showpercentage' statistic display area by its ID
	const showPercentageArea = document.getElementById('showpercentage');
  
	// Clear the 'showpercentage' area
	showPercentageArea.innerHTML = '';
  
	// Create and append elements to display the statistics
	const totalQuestionsElement = document.createElement('p');
	totalQuestionsElement.textContent = `Total Questions: ${totalQuestions}`;
  
	const correctAnswersElement = document.createElement('p');
	correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
  
	const percentageScoreElement = document.createElement('p');
	percentageScoreElement.textContent = `Percentage Score: ${percentageScore.toFixed(2)}%`;
  
	const playerNameElement = document.createElement('p');
	playerNameElement.textContent = `Player's Name: ${playerName}`;
  
	const currentDateElement = document.createElement('p');
	currentDateElement.textContent = `Current Date: ${currentDate}`;
  
	// Append elements to the 'showpercentage' area
	showPercentageArea.appendChild(totalQuestionsElement);
	showPercentageArea.appendChild(correctAnswersElement);
	showPercentageArea.appendChild(percentageScoreElement);
	showPercentageArea.appendChild(playerNameElement);
	showPercentageArea.appendChild(currentDateElement);
  }
  
