const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const transactionService = {
  async addTransaction(categoryId: string, name: string, amount: number) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    // Get budgetID first
    const budgetResponse = await fetch(`${API_URL}/budget/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!budgetResponse.ok) {
      throw new Error("Failed to fetch budget");
    }

    const budgetData = await budgetResponse.json();
    const budgetId = budgetData[0]._id;

    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        budgetId,
        category: categoryId,
        name,
        amount: Number(amount),
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add transaction: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  async getTransactions(category: string) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    // Get budgetID
    const budgetResponse = await fetch(`${API_URL}/budget/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!budgetResponse.ok) {
      throw new Error("Failed to fetch budget");
    }

    const budgetData = await budgetResponse.json();
    const budgetId = budgetData[0]._id;

    // Get list of transactions
    const response = await fetch(
      `${API_URL}/budget/${budgetId}/category/${category}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return response.json();
  },

  async deleteTransaction(transactionId: string) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    return response.json();
  },
};
