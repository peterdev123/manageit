const API_URL = "http://localhost:3000";

export const budgetService = {
  async getCurrentBudget() {
    // GET Budget using USERID default income:0
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    const response = await fetch(`${API_URL}/budget/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch budget");
    }

    return response.json();
  },

  async updateBudget(income: number) {
    // POST Method after user changes income (updates DB)
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    const response = await fetch(`${API_URL}/budget`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, income }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update budget");
    }

    return response.json();
  },
};
