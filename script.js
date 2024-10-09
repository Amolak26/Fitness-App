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
function getNutritionalAdvice(weight, activityLevel) {
    let advice = "";

    if (activityLevel === "sedentary") {
        advice = `
            Focus on maintaining a balanced diet rich in whole grains, lean protein, and vegetables. 
            Regular light activities like walking are recommended.
        `;
    } else if (activityLevel === "light") {
        advice = `
            Include enough protein to support muscle maintenance and recovery. Focus on balanced meals with carbs, fats, and proteins.
        `;
    } else if (activityLevel === "moderate") {
        advice = `
            Ensure adequate calorie intake, especially carbs for energy and proteins for recovery.
        `;
    } else if (activityLevel === "active") {
        advice = `
            With daily exercise, focus on complex carbs and lean proteins to fuel your workouts and recovery.
        `;
    } else if (activityLevel === "very_active") {
        advice = `
            Your caloric intake should increase to meet your activity demands. Prioritize meals rich in protein, healthy fats, and carbs.
        `;
    }

    // Additional advice based on weight
    if (weight > 80) {
        advice += ` Consider portion control and nutrient-dense foods like leafy greens, lean protein, and whole grains.`;
    } else if (weight < 50) {
        advice += ` Increase your caloric intake with nutritious, calorie-dense foods like nuts, seeds, and avocados.`;
    }

    return advice;
}

// Function to handle form submission
document.getElementById("fitnessForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form inputs
    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const activity = document.getElementById("activity").value;

    // Calculate calories
    const calories = calculateCalories(gender, weight, height, age, activity);

    // Get personalized nutritional advice
    const advice = getNutritionalAdvice(weight, activity);

    // Display the results
    document.getElementById("result").innerHTML = `
        <p>Calories to maintain weight: ${calories.maintainCalories} kcal/day</p>
        <p>Calories for mild weight loss: ${calories.mildWeightLossCalories} kcal/day</p>
        <p>Calories for weight loss: ${calories.weightLossCalories} kcal/day</p>
        <p>Calories for extreme weight loss: ${calories.extremeWeightLossCalories} kcal/day</p>
        <p>Calories for mild weight gain: ${calories.mildWeightGainCalories} kcal/day</p>
        <p>Calories for weight gain: ${calories.weightGainCalories} kcal/day</p>
        <p>Calories for fast weight gain: ${calories.fast
