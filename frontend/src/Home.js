import React, { useState } from "react";
import { Upload, Link as LinkIcon, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted for analysis ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">TrueFrame</h1>
      <p className="text-gray-600 mb-8 text-center">
        AI-powered VIP Threat & Deepfake Detection
      </p>

      {/* Auth Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <LogIn size={18} /> Sign In
        </button>
        <button className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          <UserPlus size={18} /> Sign Up
        </button>
      </div>

      {/* Upload Card */}
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload Content for Analysis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Upload File (Image, Video, Text)
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Upload size={18} className="text-gray-500 mr-2" />
              <input
                type="file"
                accept="image/*,video/*,.txt"
                onChange={handleFileChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {file && <p className="text-sm text-gray-500 mt-2">Uploaded: {file.name}</p>}
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Or Enter URL
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <LinkIcon size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Paste social media post URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            Submit for Analysis
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="mt-8 w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-inner text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📊 Results</h3>
        <p className="text-gray-500">Your analysis will appear here...</p>
      </div>
    </div>
  );
}
