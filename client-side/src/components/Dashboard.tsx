"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { budgetService } from "../services/budgetService";

export default function DashboardComponent() {
  const router = useRouter();
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const budgetData = await budgetService.getCurrentBudget();
      // Get the first budget from the array
      const currentBudget = budgetData[0];
      // console.log("Current Budget:", currentBudget);
      // console.log("Needs Amount:", currentBudget.needs);
      setBudget(currentBudget);
      setIncome(currentBudget.income);
    } catch (err) {
      setError("Failed to fetch budget");
      console.error(err);
    }
  };

  const handleUpdateIncome = async () => {
    try {
      await budgetService.updateBudget(income);
      await fetchBudget();
      setError("");
    } catch (err) {
      setError("Failed to update income");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">ManageIt</h1>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/auth/login");
              }}
              className="text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm p-4 w-fit mx-auto flex items-center gap-3">
          <span className="text-sm text-gray-600">Monthly Income:</span>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-40 px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={income || ""}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
          <button
            onClick={handleUpdateIncome}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {budget && (
          <>
            {/* Income Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">
                💰 Income: {income} PHP
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>📊 Needs (50%) → {(budget as any).needs} PHP</span>
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>📊 Wants (30%) → {(budget as any).wants} PHP</span>
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>📊 Savings (20%) → {(budget as any).savings} PHP</span>
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Needs", "Wants", "Savings"].map((category) => (
                <div key={category} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {category} - Budget:{" "}
                    {(budget as any)[category.toLowerCase()]} PHP
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span>📝 Rent</span>
                      <span>5,000 PHP</span>
                      <button className="text-red-500">❌</button>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>🛒 Groceries</span>
                      <span>3,000 PHP</span>
                      <button className="text-red-500">❌</button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="w-24 px-3 py-2 border rounded"
                    />
                    <button className="px-3 py-2 bg-blue-600 text-white rounded">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
