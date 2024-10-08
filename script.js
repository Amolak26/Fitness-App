// Function to calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(gender, weight, height, age) {
    if (gender === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
}

// Function to calculate TDEE based on activity level
function calculateTDEE(bmr, activityLevel) {
    switch(activityLevel) {
        case 'sedentary': 
            return bmr * 1.2;  // Little or no exercise
        case 'light':
            return bmr * 1.375; // Light exercise (1-3 days/week)
        case 'moderate':
            return bmr * 1.55;  // Moderate exercise (4-5 days/week)
        case 'active':
            return bmr * 1.725; // Intense exercise (3-4 days/week)
        case 'very_active':
            return bmr * 1.9;   // Intense exercise (6-7 days/week)
        default:
            return bmr * 1.2;   // Default to sedentary
    }
}

// Function to calculate daily calorie needs for different goals (with safety limits)
function calculateCalories(gender, weight, height, age, activityLevel) {
    const bmr = calculateBMR(gender, weight, height, age);
    const tdee = calculateTDEE(bmr, activityLevel);

    const maintainCalories = tdee;

    // Safe limits: no more than a 1,000-calorie deficit or surplus
    const mildWeightLossCalories = Math.max(tdee - 500, tdee * 0.8); // 10-20% calorie reduction
    const weightLossCalories = Math.max(tdee - 1000, tdee * 0.7);    // Max of 1,000-calorie deficit
    const extremeWeightLossCalories = Math.max(tdee - 1000, tdee * 0.6); // Prevents excessive loss
    
    const mildWeightGainCalories = Math.min(tdee + 500, tdee * 1.2);  // 10-20% calorie increase
    const weightGainCalories = Math.min(tdee + 1000, tdee * 1.3);     // Max of 1,000-calorie surplus
    const fastWeightGainCalories = Math.min(tdee + 1000, tdee * 1.4); // Prevents excessive gain

    return {
        maintainCalories: Math.round(maintainCalories),
        mildWeightLossCalories: Math.round(mildWeightLossCalories),
        weightLossCalories: Math.round(weightLossCalories),
        extremeWeightLossCalories: Math.round(extremeWeightLossCalories),
        mildWeightGainCalories: Math.round(mildWeightGainCalories),
        weightGainCalories: Math.round(weightGainCalories),
        fastWeightGainCalories: Math.round(fastWeightGainCalories)
    };
}

// Function to provide nutritional advice based on the user's goal
function getNutritionalAdvice(goal) {
    let advice = "";
    if (goal === "weightLoss") {
        advice = `
            To lose weight effectively, focus on a well-balanced diet rich in whole grains, lean protein, vegetables, and healthy fats. 
            Ensure you're consuming enough fiber to keep you full, and aim for a caloric deficit of around 500-1,000 calories per day, 
            which will result in healthy weight loss of 1-2 pounds per week. Avoid crash diets, and combine your plan with regular physical activity.
        `;
    } else if (goal === "weightGain") {
        advice = `
            For healthy weight gain, focus on consuming nutrient-dense foods rather than processed or high-fat options. 
            Incorporate lean protein, complex carbohydrates, and healthy fats, and aim to eat more frequently throughout the day. 
            A caloric surplus of 500-1,000 calories per day is a safe way to gain weight without overloading your system.
        `;
    } else {
        advice = `
            To maintain your current weight, it’s essential to balance your calorie intake with your activity level. 
            Stick to a diet rich in fruits, vegetables, lean protein, and whole grains. Make sure to stay active with at least 150 minutes 
            of moderate exercise per week to support overall health.
        `;
    }
    return advice;
}

// Function to handle form submission
document.getElementById("fitnessForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const activity = document.getElementById("activity").value;

    const calories = calculateCalories(gender, weight, height, age, activity);

    let goal = "maintain";  // Default goal is to maintain weight

    // Determine goal from user choice (you can set this up with additional input options)
    // For now, we are assuming weight maintenance for this example.

    const advice = getNutritionalAdvice(goal);

    document.getElementById("result").innerHTML = `
        <p>Calories to maintain weight: ${calories.maintainCalories} kcal/day</p>
        <p>Calories for mild weight loss: ${calories.mildWeightLossCalories} kcal/day</p>
        <p>Calories for weight loss: ${calories.weightLossCalories} kcal/day</p>
        <p>Calories for extreme weight loss: ${calories.extremeWeightLossCalories} kcal/day</p>
        <p>Calories for mild weight gain: ${calories.mildWeightGainCalories} kcal/day</p>
        <p>Calories for weight gain: ${calories.weightGainCalories} kcal/day</p>
        <p>Calories for fast weight gain: ${calories.fastWeightGainCalories} kcal/day</p>
        <h3>Nutritional Advice:</h3>
        <p>${advice}</p>
    `;
});
