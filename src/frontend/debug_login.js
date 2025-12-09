// TEMPORARY DEBUG SCRIPT - Login Test
// Run this in browser console at http://localhost:5175/login

(async () => {
  console.log("========== LOGIN DEBUG TEST ==========");
  
  const API_BASE_URL = "http://127.0.0.1:8000/api";
  
  try {
    console.log("1. Sending POST request to:", `${API_BASE_URL}/auth/login/`);
    
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: "admin@prexcol.com",
        password: "Prexcol123!"
      })
    });
    
    console.log("2. Response status:", response.status);
    console.log("3. Response headers:", [...response.headers.entries()]);
    
    const data = await response.json();
    console.log("4. Response data:", data);
    
    if (response.ok) {
      console.log("✅ SUCCESS!");
      console.log("Access token:", data.access?.substring(0, 50) + "...");
      console.log("User:", data.user);
    } else {
      console.log("❌ FAILED!");
      console.log("Error:", data);
    }
    
  } catch (error) {
    console.error("💥 EXCEPTION:", error);
    console.error("Error details:", error.message);
  }
  
  console.log("========== TEST COMPLETE ==========");
})();
