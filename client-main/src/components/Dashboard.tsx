"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { budgetService } from "../services/budgetService";
import { transactionService } from "../services/transactionService";

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  category: string;
}

export default function DashboardComponent() {
  const [income, setIncome] = useState<number>(0);
  const [budget, setBudget] = useState(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransactions, setNewTransactions] = useState({
    needs: { name: "", amount: 0 },
    wants: { name: "", amount: 0 },
    savings: { name: "", amount: 0 },
  });
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchBudget();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const categories = ["needs", "wants", "savings"];
      let allTransactions: Transaction[] = [];

      for (const category of categories) {
        const response = await transactionService.getTransactions(category);
        if (response && response.transactions) {
          const categoryTransactions = response.transactions.map((t: any) => ({
            ...t,
            category,
          }));
          allTransactions = [...allTransactions, ...categoryTransactions];
        }
      }

      setTransactions(allTransactions);
    } catch (err) {
      setError(`Failed to fetch transactions: ${(err as any).message}`);
    }
  };

  const fetchBudget = async () => {
    try {
      const budgetData = await budgetService.getCurrentBudget();
      const currentBudget = budgetData[0];
      setBudget(currentBudget);
      setIncome(currentBudget.income);
    } catch (err) {
      setError("Failed to fetch budget");
    }
  };

  const handleUpdateIncome = async () => {
    try {
      await budgetService.updateBudget(income);
      await fetchBudget();
      setError("");
    } catch (err) {
      setError("Failed to update income");
    }
  };

  const handleAddTransaction = async (category: string) => {
    try {
      const transaction =
        newTransactions[category as keyof typeof newTransactions];

      if (!transaction.name.trim() || !transaction.amount) {
        return;
      }

      const result = await transactionService.addTransaction(
        category,
        transaction.name,
        transaction.amount
      );
      setTransactions([...transactions, result]);
      setNewTransactions({
        ...newTransactions,
        [category]: { name: "", amount: 0 },
      });
      setError("");
    } catch (err) {
      setError("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await transactionService.deleteTransaction(transactionId);
      setTransactions(transactions.filter((t) => t._id !== transactionId));
    } catch (err) {
      setError("Failed to delete transaction");
    }
  };

  // Calculate total spent for a category
  const calculateCategoryTotal = (category: string) => {
    return transactions
      .filter((t) => t.category === category.toLowerCase())
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  // For debugging purposes
  // useEffect(() => {
  //   if (transactions.length > 0) {
  //     console.log("Transactions have been updated:", transactions);
  //     transactions.forEach((transaction) => {
  //       console.log(
  //         `Transaction: ${transaction.name} - ${transaction.amount} - ${transaction.category}`
  //       );
  //     });
  //   }
  // }, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-emerald-50 animate-gradient-x bg-[length:200%_200%]">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2 hover:scale-105 transition-transform">
              <span className="text-blue-800">💼</span> ManageIt
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/auth/login");
              }}
              className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium border-2 border-transparent hover:border-blue-600 cursor-pointer hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {error && (
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r relative animate-fade-in"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 right-0 p-4 hover:text-red-800"
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-fit mx-auto flex flex-col sm:flex-row items-center gap-4 hover:shadow-xl transition-shadow duration-300">
          <span className="text-gray-700 font-medium flex items-center gap-2 text-lg">
            <span className="text-green-600 animate-bounce">💵</span> Monthly Income:
          </span>
          <div className="flex w-full sm:w-auto gap-3">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full sm:w-48 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={income || ""}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
            <button
              onClick={handleUpdateIncome}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {budget && (
          <>
            {/* Income Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3 border-b pb-4">
                <span className="text-green-600 animate-pulse">💰</span> Income Summary:{" "}
                <span className="text-blue-600">
                  ₱{income.toLocaleString()}
                </span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Needs",
                    percent: 50,
                    bgColor: "bg-blue-600",
                    icon: "🏠",
                  },
                  {
                    name: "Wants",
                    percent: 30,
                    bgColor: "bg-green-600",
                    icon: "🎮",
                  },
                  {
                    name: "Savings",
                    percent: 20,
                    bgColor: "bg-purple-600",
                    icon: "💎",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <span className="text-base sm:text-lg text-gray-700 flex items-center gap-2">
                      <span>{item.icon}</span> {item.name} ({item.percent}%) →
                      <span className="font-semibold text-blue-600">
                        ₱
                        {(budget as any)[
                          item.name.toLowerCase()
                        ].toLocaleString()}
                      </span>
                    </span>
                    <div className="w-full sm:w-80 bg-gray-200 rounded-full h-3 flex-shrink-0">
                      <div
                        className={`${item.bgColor} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { category: "Needs", icon: "🏠", color: "blue" },
                { category: "Wants", icon: "🎮", color: "green" },
                { category: "Savings", icon: "💎", color: "purple" },
              ].map(({ category, icon, color }) => (
                <div
                  key={category}
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-[500px] transform hover:-translate-y-1`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pb-2 border-b text-gray-800 flex items-center gap-2">
                    <span>{icon}</span> {category} -{" "}
                    <span
                      className={`font-bold ${
                        calculateCategoryTotal(category) >
                        (budget as any)[category.toLowerCase()]
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ₱{calculateCategoryTotal(category).toLocaleString()}
                    </span>
                    <span className="text-gray-500 font-normal">
                      /₱
                      {(budget as any)[category.toLowerCase()].toLocaleString()}
                    </span>
                  </h3>
                  <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
                    {transactions
                      .filter((t) => t.category === category.toLowerCase())
                      .map((transaction) => (
                        <div
                          key={`${transaction._id}-${transaction.category}-${transaction.name}`}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-700">
                            📝 {transaction.name}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-semibold">
                              ₱{transaction.amount.toLocaleString()}
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteTransaction(transaction._id)
                              }
                              className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-auto bg-gray-50 p-3 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Transaction name"
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={
                          newTransactions[
                            category.toLowerCase() as keyof typeof newTransactions
                          ].name
                        }
                        onChange={(e) =>
                          setNewTransactions({
                            ...newTransactions,
                            [category.toLowerCase()]: {
                              ...newTransactions[
                                category.toLowerCase() as keyof typeof newTransactions
                              ],
                              name: e.target.value,
                              amount:
                                newTransactions[
                                  category.toLowerCase() as keyof typeof newTransactions
                                ].amount,
                            },
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        className="w-1/2 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={
                          newTransactions[
                            category.toLowerCase() as keyof typeof newTransactions
                          ].amount || ""
                        }
                        onChange={(e) =>
                          setNewTransactions({
                            ...newTransactions,
                            [category.toLowerCase()]: {
                              ...newTransactions[
                                category.toLowerCase() as keyof typeof newTransactions
                              ],
                              name: newTransactions[
                                category.toLowerCase() as keyof typeof newTransactions
                              ].name,
                              amount: Number(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                    <button
                      onClick={() =>
                        handleAddTransaction(category.toLowerCase())
                      }
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1"
                    >
                      Add
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
