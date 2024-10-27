import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function ProfilePage() {
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




  const renderAccountTab = () => {
    const isEditable = editMode && selectedTab === 'Account';
    return (
      <div className="space-y-4 w-full">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            readOnly={!isEditable}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            readOnly={!isEditable}
          />
        </div>
      <button
        onClick={() => console.log('Account deleted')}
        className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
      >
        Delete Account
      </button>
      </div>
    );
  };
  

  const renderPersonalInfoTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Role:</label>
        <select
          name="role"
          value={userData.role || ''}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>Select your role</option>
          <option value="Fitness User">Fitness User</option>
          <option value="Professional Trainer">Professional Trainer</option>
          <option value="Healthcare Management Trainer">Healthcare Management Trainer</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Age:</label>
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Gender:</label>
        <input
          type="text"
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Emergency Contact Name:</label>
        <input
          type="text"
          name="emergencyContact.name"
          value={userData.emergencyContact.name}
          onChange={(e) =>
            setUserData({ ...userData, emergencyContact: { ...userData.emergencyContact, name: e.target.value } })
          }
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Emergency Contact Relationship:</label>
        <input
          type="text"
          name="emergencyContact.relationship"
          value={userData.emergencyContact.relationship}
          onChange={(e) =>
            setUserData({ ...userData, emergencyContact: { ...userData.emergencyContact, relationship: e.target.value } })
          }
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Emergency Contact Phone:</label>
        <input
          type="text"
          name="emergencyContact.phone"
          value={userData.emergencyContact.phone}
          onChange={(e) =>
            setUserData({ ...userData, emergencyContact: { ...userData.emergencyContact, phone: e.target.value } })
          }
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Emergency Contact Email:</label>
        <input
          type="email"
          name="emergencyContact.email"
          value={userData.emergencyContact.email}
          onChange={(e) =>
            setUserData({ ...userData, emergencyContact: { ...userData.emergencyContact, email: e.target.value } })
          }
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
  

  const renderBodyAndHealthTab = () => (
    <div className="space-y-8">
      {/* Basic Info Group */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Basic Info</h3>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Height:</label>
          <input
            type="text"
            name="height"
            value={userData.height}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Weight:</label>
          <input
            type="text"
            name="weight"
            value={userData.weight}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Activity Level:</label>
          <select
            name="activityLevel"
            value={userData.activityLevel || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select activity level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Fitness Goals:</label>
          <textarea
            name="fitnessGoals"
            value={userData.fitnessGoals}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Target Timeline:</label>
          <input
            type="text"
            name="targetTimeline"
            value={userData.targetTimeline || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
  
{/* Body Information Group */}
<div className="space-y-4">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Body Information</h3>
  <div>
    <label className="block text-gray-700 font-semibold mb-2">Body Fat Percentage:</label>
    <input
      type="text"
      name="bodyFatPercentage"
      value={userData.bodyFatPercentage || ''}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-semibold mb-2">Muscle Mass:</label>
    <input
      type="text"
      name="muscleMass"
      value={userData.muscleMass || ''}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-semibold mb-2">Blood Pressure:</label>
    <input
      type="text"
      name="bloodPressure"
      value={userData.bloodPressure || ''}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-semibold mb-2">Resting Heart Rate:</label>
    <input
      type="text"
      name="restingHeartRate"
      value={userData.restingHeartRate || ''}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-semibold mb-2">Sleep Patterns:</label>
    <input
      type="text"
      name="sleepPatterns"
      value={userData.sleepPatterns || ''}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <button
    onClick={() => setIsModalOpen(true)}
    className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
  >
    Import from your wearable devices
  </button>
</div>

  {/* Dim Background Overlay */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
  )}

  {/* Modal for Selecting Device */}
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Choose Your Device</h2>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Device Name</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 transition duration-300 cursor-pointer">
              <td className="border px-4 py-2">Garmin Watch</td>
              <td className="border px-4 py-2">
                <button
                  onClick={importFromDevice}
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  {isLoading ? 'Loading...' : 'Select'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => setIsModalOpen(false)}
          className={`px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  )}

  
      {/* Dietary Information Group */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Dietary Information</h3>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Dietary Preferences:</label>
          <input
            type="text"
            name="dietaryPreferences"
            value={userData.dietaryPreferences || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Allergies:</label>
          <input
            type="text"
            name="foodAllergies"
            value={userData.foodAllergies || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Calorie Intake Requirements:</label>
          <input
            type="text"
            name="calorieIntakeRequirements"
            value={userData.calorieIntakeRequirements || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Eating Habits:</label>
          <input
            type="text"
            name="eatingHabits"
            value={userData.eatingHabits || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
  
      {/* Other Information Group */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Other Information</h3>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Other Information</label>
          <input
            type="text"
            name="other"
            value={userData.other || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-5 p-8 flex ml-64">
        <aside className="w-1/4 text-white h-full min-h-screen p-6 fixed left-0 mt-20 z-10 ">
          <ul className="space-y-6">
            <li>
              <button onClick={() => setSelectedTab('Account')} className="w-full text-left px-4 py-4 rounded-lg bg-gray-200 text-black hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                Account
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedTab('Personal Info')} className="w-full text-left px-4 py-4 rounded-lg bg-gray-200 text-black hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                Personal Info
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedTab('Body And Health')} className="w-full text-left px-4 py-4 rounded-lg bg-gray-200 text-black hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                Body and Health Info
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedTab('Body And Health')} className="w-full text-left px-4 py-4 rounded-lg bg-gray-200 text-black hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white">
                Body and Health Info
              </button>
            </li>
          </ul>
        </aside>
        <section className="w-3/4 bg-white p-16 rounded-lg shadow-md mt-20 flex-1">
          <h2 className="text-3xl font-bold mb-6 w-full">{selectedTab}</h2>
          {selectedTab === 'Account' ? (
            editMode ? (
              <>
                {renderAccountTab()}
                <button
                  onClick={handleSave}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {renderAccountTab()}
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Edit Account
                </button>
              </>
            )
          ) : (
            <>
              {selectedTab === 'Personal Info' && renderPersonalInfoTab()}
              {selectedTab === 'Body And Health' && renderBodyAndHealthTab()}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;

//testing