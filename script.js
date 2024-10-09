// Function to calculate calories based on gender, weight, height, age, and activity level
function calculateCalories(gender, weight, height, age, activity) {
    let bmr;

    // Mifflin-St Jeor Equation for Basal Metabolic Rate (BMR)
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;  // BMR for males
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161; // BMR for females
    }

    // Activity multipliers based on user's activity level
    let activityMultiplier;
    switch (activity) {
        case "sedentary":
            activityMultiplier = 1.2; // Sedentary (little or no exercise)
            break;
        case "light":
            activityMultiplier = 1.375; // Light exercise (1-3 days per week)
            break;
        case "moderate":
            activityMultiplier = 1.55; // Moderate exercise (4-5 days per week)
            break;
        case "active":
            activityMultiplier = 1.725; // Active (daily exercise)
            break;
        case "very_active":
            activityMultiplier = 1.9; // Very active (intense exercise 6-7 days per week)
            break;
    }

    // Calculate daily caloric needs
    const dailyCalories = Math.round(bmr * activityMultiplier);

    return {
        maintainCalories: dailyCalories,
        mildWeightLossCalories: Math.round(dailyCalories * 0.9),
        weightLossCalories: Math.round(dailyCalories * 0.8),
        extremeWeightLossCalories: Math.round(dailyCalories * 0.7),
        mildWeightGainCalories: Math.round(dailyCalories * 1.1),
        weightGainCalories: Math.round(dailyCalories * 1.2),
        fastWeightGainCalories: Math.round(dailyCalories * 1.3)
    };
}

// Function to provide more personalized nutritional advice based on activity and weight
function getNutritionalAdvice(gender, weight, activityLevel) {
    let advice = "";

    if (activityLevel === "sedentary") {
        advice = `
            As you have a sedentary lifestyle, focus on maintaining a balanced diet rich in whole grains, lean protein, and vegetables. 
            Avoid overeating and limit processed foods. Regular light activities like walking are recommended to improve your overall health.
        `;
    } else if (activityLevel === "light") {
        advice = `
            With light exercise 1-3 days a week, ensure you're getting enough protein to support muscle maintenance and recovery. 
            Incorporate lean protein sources like chicken, fish, or legumes into your diet. Focus on balanced meals with a mix of carbohydrates, fats, and proteins.
        `;
    } else if (activityLevel === "moderate") {
        advice = `
            With moderate exercise (4-5 days per week), it's important to maintain a diet that supports your activity level. 
            Make sure you're consuming enough calories, especially carbohydrates for energy and proteins for muscle recovery.
        `;
    } else if (activityLevel === "active") {
        advice = `
            With intense activity daily, your body needs more energy. Include complex carbs like brown rice, oats, and sweet potatoes 
            along with lean proteins to fuel your workouts and promote recovery. Stay hydrated and eat balanced meals throughout the day.
        `;
    } else if (activityLevel === "very_active") {
        advice = `
            With very intense exercise (6-7 days a week), your caloric intake should increase to meet the demands of your activity. 
            Prioritize meals rich in protein, healthy fats, and carbohydrates. Make sure to replenish lost electrolytes by staying hydrated and including fruits and vegetables.
        `;
    }

    // Additional advice based on weight
    if (weight > 80) {
        advice += `
            Since your weight is above 80 kg, focus on portion control and nutrient-dense foods like leafy greens, lean protein, and whole grains. 
            Consider reducing your intake of refined sugars and saturated fats to support overall health.
        `;
    } else if (weight < 50) {
        advice += `
            Since your weight is below 50 kg, it's important to increase your caloric intake gradually. Incorporate calorie-dense yet nutritious foods like nuts, 
            seeds, avocados, and whole grains to support healthy weight gain.
        `;
    }

    return advice;
}

// Function to handle form submission and disable inputs after submission
document.getElementById("fitnessForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const activity = document.getElementById("activity").value;

    const calories = calculateCalories(gender, weight, height, age, activity);
    const advice = getNutritionalAdvice(gender, weight, activity);

    document.getElementById("result").innerHTML = `
        <p>Calories to maintain weight: ${calories.maintainCalories} kcal/day</p>
        <p>Calories for mild weight loss: ${calories.mildWeightLossCalories} kcal/day</p>
        <p>Calories for weight loss: ${calories.weightLossCalories} kcal/day</p>
        <p>Calories for extreme weight loss: ${calories.extremeWeightLossCalories} kcal/day</p>
        <p>Calories for mild weight gain: ${calories.mildWeightGainCalories} kcal/day</p>
        <p>Calories for weight gain: ${calories.weightGainCalories} kcal/day</p>
        <p>Calories for fast weight gain: ${calories.fastWeightGainCalories} kcal/day</p>
    `;

    document.getElementById("advice").innerHTML = `
        <h3>Nutritional Advice:</h3>
        <p>${advice}</p>
    `;

    // Disable all form inputs and submit button after submission
    document.querySelectorAll("input, select, button").forEach(function(element) {
        element.disabled = true;
    });

    // Add reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.style.marginTop = "20px";
    resetButton.onclick = function() {
        document.querySelectorAll("input, select, button").forEach(function(element) {
            element.disabled = false;
        });
        document.getElementById("fitnessForm").reset();
        document.getElementById("result").innerHTML = "";
        document.getElementById("advice").innerHTML = "";
        resetButton.remove(); // Remove the reset button after resetting the form
    };

    document.body.appendChild(resetButton);
});
