"use client";

import Link from "next/link";
import { useState } from "react";
import users from "@/data/users.json";
import Textarea from "@/app/ui/Textarea";

const industryOptions = [
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Media",
  "Travel",
  "Telecom",
  "Real Estate",
  "Government",
];

export default function Home() {
  const [ndaSafe, setNdaSafe] = useState(true);
  const [industry, setIndustry] = useState("");
  const [clientFocus, setClientFocus] = useState("");
  const [language, setLanguage] = useState("en");
  const [style, setStyle] = useState("Technical");

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">CVGenius</h1>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-lg mb-1">
                  {user.name || `User #${index + 1}`}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{user.position}</p>
                <Link
                  href={`/resume?userId=${
                    index + 1
                  }&ndaSafe=${ndaSafe}&industry=${industry}&clientFocus=${clientFocus}&language=${language}&style=${style}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Create CV
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-blue-200 p-8 rounded-2xl shadow-lg mt-10 ring-1 ring-blue-100">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Custom Parameters
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-gray-700">
              <input
                type="checkbox"
                checked={ndaSafe}
                onChange={(e) => setNdaSafe(e.target.checked)}
              />
              NDA Safe Mode
            </label>

            <label className="block text-gray-700 font-medium">
              Client Industry:
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block col-span-2 text-gray-700 font-medium">
              Client Priorities:
              <Textarea
                value={clientFocus}
                onChange={(e) => setClientFocus(e.target.value)}
                placeholder="AWS, Team Lead, Healthcare"
                className="mt-1"
              />
            </label>

            <label className="block text-gray-700 font-medium">
              Language:
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ru">Russian</option>
              </select>
            </label>

            <label className="block text-gray-700 font-medium">
              Resume Style:
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Technical">Technical</option>
                <option value="Sales-Oriented">Sales-Oriented</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
