import React, { useState } from "react";
import { Upload, Link as LinkIcon, Send, LogOut } from "lucide-react";

export default function TrueFrame() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // signin | signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [reports, setReports] = useState([]); // history of reports
  const [selectedReport, setSelectedReport] = useState(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [chatInput, setChatInput] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitAnalysis = (e) => {
    e.preventDefault();

    // Fake AI analysis report
    const newReport = {
      id: Date.now(),
      title: file ? file.name : url,
      summary: "This content appears authentic with 92% confidence.",
      risks: ["No deepfake detected", "No major threats found"],
      messages: [
        { sender: "ai", text: "✅ Analysis complete! Report generated below." },
      ],
    };

    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    setFile(null);
    setUrl("");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const updated = { ...selectedReport };
    updated.messages.push({ sender: "user", text: chatInput });
    updated.messages.push({
      sender: "ai",
      text: `Answer based on analysis of "${updated.title}".`,
    });

    setReports(reports.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedReport(updated);
    setChatInput("");
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsAuthenticated(true);
    } else {
      alert("Enter valid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setReports([]);
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {!isAuthenticated ? (
        // ---------- AUTH SCREEN ----------
        <div className="w-full flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
              TrueFrame
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              AI-powered VIP Threat & Deepfake Detection
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {authMode === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-4">
              {authMode === "signin" ? (
                <p className="text-sm">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setAuthMode("signup")}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("signin")}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // ---------- MAIN APP ----------
        <>
          {/* Sidebar - Report History */}
          <div className="w-full md:w-1/4 bg-white shadow-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">📂 Reports</h2>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
            {reports.length === 0 && (
              <p className="text-gray-500">No reports yet.</p>
            )}
            <ul className="space-y-2 flex-1 overflow-y-auto">
              {reports.map((r) => (
                <li
                  key={r.id}
                  onClick={() => setSelectedReport(r)}
                  className={`p-2 rounded-lg cursor-pointer ${
                    selectedReport?.id === r.id
                      ? "bg-indigo-100 text-indigo-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {r.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            {/* Upload Panel */}
            <div className="p-4 bg-white shadow flex flex-col md:flex-row gap-4 items-center">
              <form
                onSubmit={handleSubmitAnalysis}
                className="flex flex-col md:flex-row gap-4 w-full"
              >
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 flex-1">
                  <Upload size={18} className="text-gray-500 mr-2" />
                  <input
                    type="file"
                    accept="image/*,video/*,.txt"
                    onChange={handleFileChange}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 flex-1">
                  <LinkIcon size={18} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Paste social media post URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Analyse
                </button>
              </form>
            </div>

            {/* Report + Chat */}
            <div className="flex-1 flex flex-col p-4">
              {selectedReport ? (
                <>
                  {/* Report Section */}
                  <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <h3 className="text-lg font-semibold">📊 Report</h3>
                    <p className="text-gray-600 mt-2">
                      {selectedReport.summary}
                    </p>
                    <ul className="list-disc ml-6 mt-2 text-gray-500">
                      {selectedReport.risks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Chat Section */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                    <div className="space-y-3">
                      {selectedReport.messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg max-w-xs ${
                            msg.sender === "user"
                              ? "ml-auto bg-indigo-600 text-white"
                              : "mr-auto bg-gray-300 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center mt-3"
                  >
                    <input
                      type="text"
                      placeholder="Ask about this report..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 px-3 py-2 outline-none rounded-lg border mr-2"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Upload a file or select a report from history.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
