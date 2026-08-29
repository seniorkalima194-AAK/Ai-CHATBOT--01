
import { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and application preferences.
          </p>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">

          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              General
            </h2>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-5 border-b">

            <div>
              <h3 className="font-medium text-gray-800">
                Dark Mode
              </h3>

              <p className="text-sm text-gray-500">
                Change the appearance of the application.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition ${
                darkMode ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                  darkMode ? "left-7" : "left-1"
                }`}
              />
            </button>

          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-5">

            <div>
              <h3 className="font-medium text-gray-800">
                Notifications
              </h3>

              <p className="text-sm text-gray-500">
                Receive notifications about your learning.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition ${
                notifications ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                  notifications ? "left-7" : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm">

          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Account
            </h2>
          </div>

          <div className="p-5 border-b">
            <h3 className="font-medium text-gray-800">
              Language
            </h3>

            <select className="mt-2 border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 outline-none">
              <option>English</option>
              <option>Swahili</option>
            </select>
          </div>

          <div className="p-5">
            <h3 className="font-medium text-gray-800">
              Learning Level
            </h3>

            <select className="mt-2 border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 outline-none">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;

