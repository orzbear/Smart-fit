import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getOpenAIResponse } from './OpenAIService';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportPage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    weight: 75,
    height: 180,
    fitnessGoals: 'Build muscle and improve endurance',
    bodyFatPercentage: 18,
    muscleMass: 70,
    bloodPressure: '120/80',
    restingHeartRate: 65,
    sleepPatterns: '7-8 hours per night',
    dietaryPreferences: 'Vegetarian',
    calorieIntakeRequirements: '2500 kcal/day',
    eatingHabits: '3 meals a day with snacks',
  });

  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateReport = async () => {
      setIsLoading(true);
      try {
        const prompt = `Generate a healthcare and fitness report for a user with the following details:
        Name: ${userData.name}
        Age: ${userData.age}
        Gender: ${userData.gender}
        Weight: ${userData.weight} kg
        Height: ${userData.height} cm
        Fitness Goals: ${userData.fitnessGoals}
        Body Fat Percentage: ${userData.bodyFatPercentage}%
        Muscle Mass: ${userData.muscleMass} kg
        Blood Pressure: ${userData.bloodPressure}
        Resting Heart Rate: ${userData.restingHeartRate} bpm
        Sleep Patterns: ${userData.sleepPatterns}
        Dietary Preferences: ${userData.dietaryPreferences}
        Calorie Intake Requirements: ${userData.calorieIntakeRequirements}
        Eating Habits: ${userData.eatingHabits}
        
        Provide a concise analysis of 7 key health metrics.`;

        const response = await getOpenAIResponse(prompt);
        setReport(response);
      } catch (error) {
        console.error('Error generating report:', error);
        setReport('An error occurred while generating the report. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    generateReport();
  }, [userData]);

  // Visualization data
  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [75, 74.5, 74, 73.8],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const exerciseTypeData = {
    labels: ['Cardio', 'Strength Training', 'Flexibility'],
    datasets: [
      {
        label: 'Exercise Type Distribution',
        data: [40, 40, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const sleepPatternData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sleep Hours',
        data: [7, 8, 7.5, 8, 7, 8.5, 7],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-5 p-8 flex ml-64">
        <section className="w-3/4 bg-white p-16 rounded-lg shadow-md mt-20 flex-1">
          <h2 className="text-3xl font-bold mb-6">Health and Fitness Report</h2>
          {isLoading ? (
            <p>Generating report...</p>
          ) : (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Report Summary:</h3>
              <p className="whitespace-pre-wrap">{report}</p>
            </div>
          )}

          <h3 className="text-2xl font-bold mb-4">Visualizations</h3>

          {/* Weight Change Line Chart */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Weight Change Over Time</h4>
            <Line data={weightData} />
          </div>

          {/* Exercise Type Pie Chart */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Exercise Type Distribution</h4>
            <Pie data={exerciseTypeData} />
          </div>

          {/* Sleep Pattern Bar Chart */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Sleep Patterns Over the Week</h4>
            <Bar data={sleepPatternData} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReportPage;

