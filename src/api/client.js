const baseUrl = "http://localhost:5000/api"

export async function apiRequest(endpoint, method = "GET", body, token) {
    const res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
    throw new Error("API Error");
    }

  return res.json();
    
}