import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
// import { Configuration, OpenAIApi } from 'openai';
import { getOpenAIResponse } from './OpenAIService';


function PlansPage() {
  const [userData, setUserData] = useState({
    name: '',
    username:'',
    email: '',
    age: '',
    gender: '',
    phoneNumber: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    },
    weight: '',
    height: '',
    fitnessGoals: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Personal Info');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDietPlan, setGeneratedDietPlan] = useState('');
  const [generatedExercisePlan, setGeneratedExercisePlan] = useState('');
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  // const configuration = new Configuration({
  //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // });
  
  // const openai = new OpenAIApi(configuration);
  


  useEffect(() => {
    // Simulate fetching user data from an API or database
    const fetchUserData = () => {
      const data = {
        name: 'John Doe',
        username:'JD2122',
        password:'12345678',
        email: 'john.doe@example.com',
        age: '30',
        gender: 'Male',
        phoneNumber: '123-456-7890',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '098-765-4321',
          email: 'jane.doe@example.com',
        },
        weight: '75 kg',
        height: '180 cm',
        fitnessGoals: 'Build muscle and improve endurance',
      };
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    // Simulate saving updated data to an API or database
    console.log('User data saved:', userData);
  };

  const importFromDevice = () => {
    setIsLoading(true);
    // Simulate loading and importing data from the device
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      // Sample data imported from wearable device
      setUserData({
        ...userData,
        bodyFatPercentage: '18%',
        muscleMass: '70 kg',
        bloodPressure: '120/80',
        restingHeartRate: '65 bpm',
        sleepPatterns: '7-8 hours per night',
      });
    }, 2000);
  };
  // New state to hold diet plan data
  const [dietPlanData, setDietPlanData] = useState({
    dietType: '',
    allergies: '',
    healthGoal: '',
    dailyCalorieGoal: '',
    mealsPerDay: '',
    currentWeight: '',
    targetWeight: '',
    activityLevel: '',
  });

  const [exercisePlanData, setExercisePlanData] = useState({
    exerciseType: '',
    intensityLevel: '',
    workoutDays: '',
    durationPerSession: '',
    currentFitnessLevel: '',
    targetFitnessLevel: '',
    specificGoals: '',
  });

  
  // Function to handle diet plan generation
const generateDietPlan = async () => {
  setIsLoading(true);

  try {
    const prompt = `Create a diet plan for a user with the following details:
      Diet Type: ${dietPlanData.dietType}
      Food Allergies/Restrictions: ${dietPlanData.allergies}
      Health Goal: ${dietPlanData.healthGoal}
      Daily Calorie Goal: ${dietPlanData.dailyCalorieGoal} kcal
      Number of Meals per Day: ${dietPlanData.mealsPerDay}
      Current Weight: ${dietPlanData.currentWeight} kg
      Target Weight: ${dietPlanData.targetWeight} kg
      Activity Level: ${dietPlanData.activityLevel}.

      Please provide a diet plan for at least three days, with a focus on ${dietPlanData.healthGoal}. Include multiple meals each day. 
      Format the response directly starting with "Requirements: ..." and avoid any introductory phrases like "Sure, I'd be glad to help with that" or any disclaimers at the end.

      DayX MealY: <Description of the meal, including the items and estimated calories if possible>

      Ensure that each meal is listed on a separate line, and make sure the format is consistent so it can be easily parsed into a table. Start the response with a short introductory sentence, then list the meals in the specified format.
      
      Only include meals, no exercise or sleep or any other activies
      Ensure that each meal includes a description and estimated calories. Keep the descriptions simple and concise.`;
      

    const response = await getOpenAIResponse(prompt);

    // Simplify the introductory paragraph
    const simplifiedIntro = `Diet plan for ${dietPlanData.dietType}, ${dietPlanData.healthGoal} condition:`;
    const processedResponse = response.replace(/Sure, here's a simple.*?:/i, simplifiedIntro);
    
    // Check if the generated plan has enough content, otherwise prompt for premium
    if (processedResponse.split('\n').length < 15) {
      setShowUpgradeMessage(true);
    }
    
    setGeneratedDietPlan(processedResponse);
  } catch (error) {
    console.error('Error generating diet plan:', error);
    setGeneratedDietPlan('An error occurred while generating the diet plan. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

// Function to handle exercise plan generation
const generateExercisePlan = async () => {
  setIsLoading(true);

  try {
    const prompt = `Create a week-long exercise plan for a user with the following details:
      Exercise Type: ${exercisePlanData.exerciseType}
      Intensity Level: ${exercisePlanData.intensityLevel}
      Workout Days per Week: ${exercisePlanData.workoutDays}
      Duration per Session: ${exercisePlanData.durationPerSession} minutes
      Current Fitness Level: ${exercisePlanData.currentFitnessLevel}
      Target Fitness Level: ${exercisePlanData.targetFitnessLevel}
      Specific Goals: ${exercisePlanData.specificGoals}.

      Please provide a structured exercise plan day by day for at least seven days. List exercises for each day, with a focus on ${exercisePlanData.specificGoals}.
      Format the response directly starting with "Requirements: exercise type ..." and avoid any introductory phrases like "Sure, I'd be glad to help with that" or any disclaimers at the end.

      Only include exercises, no dietary suggestions or other activities. Ensure each exercise includes a description and duration where applicable.
      Keep the response concise
      Provide the exercise plan in the following format:
      - Each line should start with "Day X Exercise:" or "Day X Exercise: Rest Day."
      - Each day's entry should include the exercise description or state "Rest Day" explicitly.
      - Avoid any additional information, notes, or introduction beyond the daily exercise description.
      - Use this format:

        Day1 Exercise: <Description>
        Day2 Exercise: Rest Day.
        Day3 Exercise: <Description>
        
      Only include these daily entries. Make sure every line starts with "Day X Exercise:".

      Example output:
        Day1 Exercise: Run at medium intensity for 30 minutes.
        Day2 Exercise: Rest Day.
        Day3 Exercise: Warm-up with a 5-minute walk, then run at medium intensity for 25 minutes.
        Day4 Exercise: Rest Day.

      Format the response strictly according to these instructions. 
      be more concise`;

    const response = await getOpenAIResponse(prompt);

    setGeneratedExercisePlan(response);
  } catch (error) {
    console.error('Error generating exercise plan:', error);
    setGeneratedExercisePlan('An error occurred while generating the exercise plan. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


const renderDietPlanTable = () => {
  if (!generatedDietPlan) return null;

  // Split the response into rows and filter out empty lines
  const rows = generatedDietPlan.split('\n').filter(row => row.trim() !== '');

  const planIntro = rows[0]; // First line as the intro
  const mealsData = rows.slice(1); // Remaining lines for table data

  return (
    <>
      <p className="text-lg font-semibold mb-4">{planIntro}</p>
      <table className="min-w-full bg-white border border-gray-300 mt-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Meal</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {mealsData.map((row, index) => {
            // Use regex to split into meal and description while keeping the full description intact
            const match = row.match(/^(Day\d+ Meal\d+):\s*(.+)$/);
            if (match) {
              const meal = match[1];
              const description = match[2];
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{meal}</td>
                  <td className="py-2 px-4 border-b">{description}</td>
                </tr>
              );
            } else {
              // If the format doesn't match, return an empty row (this shouldn't happen if the prompt is correct)
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b" colSpan="2">
                    Invalid format
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

const renderExercisePlanTable = () => {
  if (!generatedExercisePlan) return null;

  // Split the response into rows based on newlines, removing any empty lines
  const rows = generatedExercisePlan.split('\n').filter(row => row.trim() !== '');

  const planIntro = rows[0]; // First line as the intro (optional, based on your response)
  const exercisesData = rows; // Use all rows for table data (since the format is consistent)

  return (
    <>
      <p className="text-lg font-semibold mb-4">{planIntro}</p>
      <table className="min-w-full bg-white border border-gray-300 mt-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Day</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {exercisesData.map((row, index) => {
            // Use regex to capture both rest days and exercise days
            const match = row.match(/^(Day\d+)\sExercise:\s(.+)$/);
            if (match) {
              const day = match[1];
              const description = match[2];
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{day}</td>
                  <td className="py-2 px-4 border-b">{description}</td>
                </tr>
              );
            } else {
              // Handle any unexpected formats (this should not happen if the prompt is followed)
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b" colSpan="2">
                    
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};





 

    const renderDietPlanTab = () => (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Diet Plan Information</h3>
        
        {/* Preferred Diet Type Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Preferred Diet Type:</label>
          <select
            name="dietType"
            value={dietPlanData.dietType}
            onChange={(e) => setDietPlanData({ ...dietPlanData, dietType: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select diet type</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Keto">Keto</option>
            <option value="Omnivore">Omnivore</option>
          </select>
        </div>
    
        {/* Food Allergies / Restrictions Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Allergies / Restrictions:</label>
          <input
            type="text"
            name="allergies"
            value={dietPlanData.allergies}
            onChange={(e) => setDietPlanData({ ...dietPlanData, allergies: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Health Goal Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Health Goal:</label>
          <select
            name="healthGoal"
            value={dietPlanData.healthGoal}
            onChange={(e) => setDietPlanData({ ...dietPlanData, healthGoal: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select health goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Maintain Weight">Maintain Weight</option>
          </select>
        </div>
    
        {/* Daily Calorie Goal Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Daily Calorie Goal:</label>
          <input
            type="number"
            name="dailyCalorieGoal"
            value={dietPlanData.dailyCalorieGoal}
            onChange={(e) => setDietPlanData({ ...dietPlanData, dailyCalorieGoal: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Number of Meals per Day Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Number of Meals per Day:</label>
          <input
            type="number"
            name="mealsPerDay"
            value={dietPlanData.mealsPerDay}
            onChange={(e) => setDietPlanData({ ...dietPlanData, mealsPerDay: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Current Weight Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Current Weight (kg):</label>
          <input
            type="text"
            name="currentWeight"
            value={dietPlanData.currentWeight}
            onChange={(e) => setDietPlanData({ ...dietPlanData, currentWeight: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Target Weight Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Target Weight (kg):</label>
          <input
            type="text"
            name="targetWeight"
            value={dietPlanData.targetWeight}
            onChange={(e) => setDietPlanData({ ...dietPlanData, targetWeight: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Activity Level Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Activity Level:</label>
          <select
            name="activityLevel"
            value={dietPlanData.activityLevel}
            onChange={(e) => setDietPlanData({ ...dietPlanData, activityLevel: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select activity level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </div>
    
        {/* Generate Diet Plan Button */}
        <button
          onClick={generateDietPlan}
          disabled={isLoading}
          className={`mt-4 px-6 py-3 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold rounded-lg transition duration-300`}
        >
          {isLoading ? 'Generating...' : 'Generate Diet Plan'}
        </button>
    
        {/* Display Generated Diet Plan */}
        {generatedDietPlan && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h4 className="text-xl font-bold mb-4">Your Custom Diet Plan</h4>
            {renderDietPlanTable()}
          </div>
        )}
    
        {showUpgradeMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800">
            Want more days or a detailed meal plan? Upgrade to our premium membership!
          </div>
        )}
      </div>
    );

    const renderExercisePlanTab = () => (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Exercise Plan Information</h3>
        
        {/* Exercise Type Field */}
    <div>
      <label className="block text-gray-700 font-semibold mb-2">Exercise Type:</label>
      <select
        name="exerciseType"
        value={exercisePlanData.exerciseType}
        onChange={(e) => setExercisePlanData({ ...exercisePlanData, exerciseType: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>Select exercise type</option>
        <option value="Running">Running</option>
        <option value="Strength Training">Strength Training</option>
        <option value="Yoga">Yoga</option>
        <option value="Cardio">Cardio</option>
      </select>
    </div>
    
        {/* Intensity Level Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Intensity Level:</label>
          <select
            name="intensityLevel"
            value={exercisePlanData.intensityLevel}
            onChange={(e) => setExercisePlanData({ ...exercisePlanData, intensityLevel: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select intensity level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
    
        {/* Workout Days Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Workout Days per Week:</label>
          <input
            type="number"
            name="workoutDays"
            value={exercisePlanData.workoutDays}
            onChange={(e) => setExercisePlanData({ ...exercisePlanData, workoutDays: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Duration Per Session Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Duration per Session (minutes):</label>
          <input
            type="number"
            name="durationPerSession"
            value={exercisePlanData.durationPerSession}
            onChange={(e) => setExercisePlanData({ ...exercisePlanData, durationPerSession: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Current Fitness Level Field */}
        <div>
      <label className="block text-gray-700 font-semibold mb-2">Current Fitness Level:</label>
      <select
        name="currentFitnessLevel"
        value={exercisePlanData.currentFitnessLevel}
        onChange={(e) => setExercisePlanData({ ...exercisePlanData, currentFitnessLevel: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>Select fitness level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
    
        {/* Target Fitness Level Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Target Fitness Level:</label>
          <select
        name="targetFitnessLevel"
        value={exercisePlanData.targetFitnessLevel}
        onChange={(e) => setExercisePlanData({ ...exercisePlanData, targetFitnessLevel: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>Select fitness level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
        </div>
    
        {/* Specific Goals Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Specific Goals:</label>
          <input
            type="text"
            name="specificGoals"
            value={exercisePlanData.specificGoals}
            onChange={(e) => setExercisePlanData({ ...exercisePlanData, specificGoals: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
    
        {/* Generate Exercise Plan Button */}
        <button
          onClick={generateExercisePlan}
          disabled={isLoading}
          className={`mt-4 px-6 py-3 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold rounded-lg transition duration-300`}
        >
          {isLoading ? 'Generating...' : 'Generate Exercise Plan'}
        </button>
    
        {/* Display Generated Exercise Plan */}
        {generatedExercisePlan && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h4 className="text-xl font-bold mb-4">Your Custom Exercise Plan</h4>
            {renderExercisePlanTable()}
          </div>
        )}

        {showUpgradeMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800">
            Want more days or a detailed meal plan? Upgrade to our premium membership!
          </div>
        )}
      </div>
    );
    
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-5 p-8 flex ml-64">
          <aside className="w-1/4 text-white h-full min-h-screen p-6 fixed left-0 mt-20 z-10">
            <ul className="space-y-6">
              <li>
                <button
                  onClick={() => setSelectedTab('Diet Plans')}
                  className={`w-full text-left px-4 py-4 rounded-lg ${selectedTab === 'Diet Plans' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white`}
                >
                  Diet Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('Exercise')}
                  className={`w-full text-left px-4 py-4 rounded-lg ${selectedTab === 'Exercise' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white`}
                >
                  Exercise
                </button>
              </li>
            </ul>
          </aside>
          <section className="w-3/4 bg-white p-16 rounded-lg shadow-md mt-20 flex-1">
            <h2 className="text-3xl font-bold mb-6">
              {selectedTab === 'Diet Plans' ? 'Diet Plan Generator' : 'Exercise Plan Generator'}
            </h2>
            {selectedTab === 'Diet Plans' ? renderDietPlanTab() : renderExercisePlanTab()}
          </section>
        </main>
        <Footer />
      </div>
    );
    
}  

export default PlansPage;
