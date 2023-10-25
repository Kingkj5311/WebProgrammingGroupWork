let PlayerRegistrationData = [];

function Register() {
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
	disableInputs();
	document.getElementById('startBtn').disabled = false;
	document.getElementById('endBtn').disabled = false;
}

