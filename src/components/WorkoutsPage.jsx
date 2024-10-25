import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getOpenAIResponse } from './OpenAIService';

const WorkoutsPage = () => {
  const [linkedDevice, setLinkedDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [showDevicePopup, setShowDevicePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [poseAdvice, setPoseAdvice] = useState('');
  const [fileName, setFileName] = useState('');
  const [monitorData, setMonitorData] = useState({
    heartRate: 80,
    caloriesBurned: 1,
    duration: 0,
    stepsCount: 0,
  });
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);
  const [emergencyHandled, setEmergencyHandled] = useState(false);
  const [workoutActive, setWorkoutActive] = useState(false);


useEffect(() => {
    let interval;
  
    if (linkedDevice && workoutActive) {
      console.log('Workout started, setting interval for monitoring data updates');
      interval = setInterval(() => {
        setMonitorData((prevData) => {
          // Update duration every second
          const newDuration = prevData.duration + 1;
  
          // Update steps count every 2 seconds
          const newStepsCount = newDuration % 2 === 0 ? prevData.stepsCount + 1 : prevData.stepsCount;
  
          // Update calories every 20 seconds and every 5 steps
          const newCaloriesBurned =
            prevData.caloriesBurned +
            (newDuration % 20 === 0 ? 1 : 0) +
            (newStepsCount % 5 === 0 && newStepsCount !== 0 ? 1 : 0);
  
          // Update heart rate randomly between 90-150 bpm every second to ensure it changes consistently
          const newHeartRate = Math.floor(Math.random() * 60) + 90;
  
          console.log('Updating monitor data', {
            heartRate: newHeartRate,
            caloriesBurned: newCaloriesBurned,
            duration: newDuration,
            stepsCount: newStepsCount,
          });
  
          // Check for dangerous values
          if (newHeartRate > 140 && !showEmergencyPopup) {
            setShowEmergencyPopup(true);
            setLinkedDevice(false);
            setWorkoutActive(false);
            console.log('Emergency detected due to high heart rate');
          }
  
          return {
            heartRate: newHeartRate,
            caloriesBurned: newCaloriesBurned,
            duration: newDuration,
            stepsCount: newStepsCount,
          };
        });
      }, 1000); // Update every second
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Clearing interval');
      }
    };
  }, [linkedDevice, workoutActive, showEmergencyPopup]);
  
  
  const handleLinkDevice = () => {
    setShowDevicePopup(true);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setLinkedDevice(true);
    setWorkoutActive(true);
    setShowDevicePopup(false);
  };



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setUploadedImage(URL.createObjectURL(file));
      setFileName(file.name.split('.')[0]); // Set the file name without extension
    }
  };

  const handleAnalyzePose = async () => {
    if (uploadedImage && fileName) {
      setIsLoading(true);
      try {
        // Create a prompt based on the filename for mock analysis
        const prompt = `A user has uploaded an image with the filename "${fileName}". Provide customized feedback on the user's workout pose, considering the type of workout activity implied by the filename. If the filename includes details like "pushup" or "squat," offer specific advice based on those exercises.
        Do not include anything like "As an AI, I'm afraid I cannot physically view or analyze images. However, I can provide some general advice on doing a proper"
        or "Please consult with a personal trainer to ensure you're doing the exercise correctly."
        only include the advices 
        Mentioned Your analysis is based on the upload IMG, dont mention the file name. Like "Based on your pose"`;
  
        // Make API call with the prompt to get advice
        const response = await getOpenAIResponse(prompt);
        setPoseAdvice(response);
      } catch (error) {
        console.error('Error analyzing pose:', error);
        setPoseAdvice('An error occurred while analyzing the pose. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmergencyResponse = () => {
    setShowEmergencyPopup(false);
    setEmergencyHandled(true);
  };

  const handleStopWorkout = () => {
    setWorkoutActive(false);
    setLinkedDevice(false);
    setMonitorData({
      heartRate: 80,
      caloriesBurned: 1,
      duration: 0,
      stepsCount: 0,
    });
    setEmergencyHandled(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-5 p-8 flex ml-64">
        <section className="w-3/4 bg-white p-16 rounded-lg shadow-md mt-20 flex-1">
          <h2 className="text-3xl font-bold mb-6">Workout Tracker</h2>
          {!linkedDevice ? (
            <button
              onClick={handleLinkDevice}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Link to Wearable Devices
            </button>
          ) : (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-800">
              Now your stats are monitored
              <div className="mt-4 space-y-4">
                <div>Heart Rate: <span className="font-bold">{monitorData.heartRate} bpm</span></div>
                <div>Calories Burned: <span className="font-bold">{monitorData.caloriesBurned} kcal</span></div>
                <div>Duration: <span className="font-bold">{Math.floor(monitorData.duration / 60)}:{monitorData.duration % 60} minutes</span></div>
                <div>Steps Count: <span className="font-bold">{monitorData.stepsCount} steps</span></div>
              </div>
              <button
                onClick={handleStopWorkout}
                className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Stop Workout
              </button>
            </div>
          )}

          {/* Device Selection Popup */}
          {showDevicePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Select a Device to Link</h3>
                <ul className="space-y-4">
                  <li><button onClick={() => handleDeviceSelect('Fitbit')} className="px-4 py-2 bg-gray-200 rounded">Fitbit</button></li>
                  <li><button onClick={() => handleDeviceSelect('Apple Watch')} className="px-4 py-2 bg-gray-200 rounded">Apple Watch</button></li>
                  <li><button onClick={() => handleDeviceSelect('Garmin')} className="px-4 py-2 bg-gray-200 rounded">Garmin</button></li>
                </ul>
              </div>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Upload Workout Image</h3>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {uploadedImage && (
              <div className="mt-4">
                <img src={uploadedImage} alt="Uploaded Workout" className="w-64 h-64 object-cover mb-4" />
                <button
                  onClick={handleAnalyzePose}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Start Analyze Pose'}
                </button>
              </div>
            )}
            {poseAdvice && (
              <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <h4 className="font-bold mb-2">Pose Analysis:</h4>
                <p>{poseAdvice}</p>
                <button
                  onClick={handleAnalyzePose}
                  className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Re-analyze Pose
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Emergency Popup */}
      {showEmergencyPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Emergency Detected!</h3>
            <p>Abnormal heart rate detected. Please respond to confirm you are okay.</p>
            <button
              onClick={handleEmergencyResponse}
              className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
            >
              I am okay
            </button>
          </div>
        </div>
      )}

      {/* Emergency Contact Notification */}
      {showEmergencyPopup && !emergencyHandled && (
        setTimeout(() => {
          if (showEmergencyPopup) {
            setShowEmergencyPopup(false);
            alert('Emergency contact has been notified.');
          }
        }, 5000)
      )}
    </div>
  );
};

export default WorkoutsPage;
