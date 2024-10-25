import React from 'react';
import Header from './Header';
import Footer from './Footer';

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 p-8 mt-30">
        {/* <div className="w-full flex justify-center mb-8">
          <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300">
            Start a New Workout
          </button>
        </div> */}
        <div className="w-full max-w-4xl mx-auto mt-30">
          <h2 className="text-3xl font-bold mb-6">Welcome to WellFitGPT!</h2>
          <p className="text-lg mb-4">
            Here you can track your workouts, manage your profile, and connect with others who share your fitness goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Your Dashboard</h3>
              <p>Check your fitness progress and track your activities here.</p>
              <a href="/dashboard" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Dashboard
              </a>
            </div> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Workout</h3>
              <p>Start to workout now and get real-time advices for our LLM agents.</p>
              <a href="/workouts" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Start Workouts
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <p>Update your personal details and manage your preferences.</p>
              <a href="/profile" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Profile
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Reports</h3>
              <p>Generate and view your real-time healthcare and exercise reports.</p>
              <a href="/reports" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Reports
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Your Plans</h3>
              <p>Generate and tailor your exercise and healthcare plan with our LLM Agent</p>
              <a href="/plan" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Profile
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p>Join our community and get motivated with our other members.</p>
              <a href="/community" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Community
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p>Ask anything and get assited by our profesisonal team.</p>
              <a href="/main" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Community
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
