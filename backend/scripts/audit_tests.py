"""
PREXCOL Backend Security & QA Audit - Automated Test Suite
Senior Backend QA Engineer - Comprehensive Testing
"""
import requests
import json
from datetime import datetime

BASE_URL = "http://127.0.0.1:8000"
ADMIN_URL = f"{BASE_URL}/admin/"
API_URL = f"{BASE_URL}/api/auth/"

class BackendAudit:
    def __init__(self):
        self.results = []
        self.errors = []
        self.warnings = []
        
    def log(self, category, test_name, status, details=""):
        result = {
            "timestamp": datetime.now().isoformat(),
            "category": category,
            "test": test_name,
            "status": status,
            "details": details
        }
        self.results.append(result)
        print(f"[{status}] {category} - {test_name}")
        if details:
            print(f"    {details}")
    
    def test_login_valid(self):
        """Test login with valid credentials"""
        try:
            response = requests.post(
                f"{API_URL}login/",
                json={"email": "admin@example.com", "password": "admin123"},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 200:
                data = response.json()
                if "tokens" in data or "access" in data:
                    self.log("AUTH", "Login Valid Credentials", "PASS", f"Status: {response.status_code}")
                    return data
                else:
                    self.log("AUTH", "Login Valid Credentials", "FAIL", "No tokens in response")
            else:
                self.log("AUTH", "Login Valid Credentials", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log("AUTH", "Login Valid Credentials", "ERROR", str(e))
        return None
    
    def test_login_invalid_password(self):
        """Test login with incorrect password"""
        try:
            response = requests.post(
                f"{API_URL}login/",
                json={"email": "admin@example.com", "password": "wrongpassword"},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 401:
                self.log("AUTH", "Login Invalid Password", "PASS", "Correctly rejected")
            else:
                self.log("AUTH", "Login Invalid Password", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log("AUTH", "Login Invalid Password", "ERROR", str(e))
    
    def test_login_invalid_email(self):
        """Test login with incorrect email"""
        try:
            response = requests.post(
                f"{API_URL}login/",
                json={"email": "nonexistent@example.com", "password": "admin123"},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 401:
                self.log("AUTH", "Login Invalid Email", "PASS", "Correctly rejected")
            else:
                self.log("AUTH", "Login Invalid Email", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log("AUTH", "Login Invalid Email", "ERROR", str(e))
    
    def test_login_empty_fields(self):
        """Test login with empty fields"""
        try:
            response = requests.post(
                f"{API_URL}login/",
                json={"email": "", "password": ""},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code in [400, 401]:
                self.log("AUTH", "Login Empty Fields", "PASS", "Correctly rejected")
            else:
                self.log("AUTH", "Login Empty Fields", "FAIL", f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log("AUTH", "Login Empty Fields", "ERROR", str(e))
    
    def test_login_sql_injection(self):
        """Test SQL injection attempt"""
        try:
            response = requests.post(
                f"{API_URL}login/",
                json={"email": "admin@example.com' OR '1'='1", "password": "' OR '1'='1"},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 401:
                self.log("SECURITY", "SQL Injection Protection", "PASS", "Attack blocked")
            else:
                self.log("SECURITY", "SQL Injection Protection", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log("SECURITY", "SQL Injection Protection", "ERROR", str(e))
    
    def test_register_endpoint(self):
        """Test user registration"""
        try:
            response = requests.post(
                f"{API_URL}register/",
                json={
                    "email": f"test_{datetime.now().timestamp()}@example.com",
                    "nombre": "Test User",
                    "password": "testpass123",
                    "rol": "cliente"
                },
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 201:
                self.log("API", "Register Endpoint", "PASS", "User created")
            else:
                self.log("API", "Register Endpoint", "FAIL", f"Status: {response.status_code}, Body: {response.text}")
        except Exception as e:
            self.log("API", "Register Endpoint", "ERROR", str(e))
    
    def test_token_refresh(self, tokens):
        """Test token refresh"""
        if not tokens or "refresh" not in tokens.get("tokens", {}):
            self.log("API", "Token Refresh", "SKIP", "No refresh token available")
            return
        
        try:
            response = requests.post(
                f"{API_URL}token/refresh/",
                json={"refresh": tokens["tokens"]["refresh"]},
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 200:
                self.log("API", "Token Refresh", "PASS", "Token refreshed")
            else:
                self.log("API", "Token Refresh", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log("API", "Token Refresh", "ERROR", str(e))
    
    def test_invalid_token_access(self):
        """Test access with invalid token"""
        try:
            response = requests.get(
                f"{API_URL}usuarios/",
                headers={"Authorization": "Bearer invalid_token_12345"}
            )
            if response.status_code == 401:
                self.log("SECURITY", "Invalid Token Protection", "PASS", "Access denied")
            else:
                self.log("SECURITY", "Invalid Token Protection", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log("SECURITY", "Invalid Token Protection", "ERROR", str(e))
    
    def test_no_token_access(self):
        """Test access without token"""
        try:
            response = requests.get(f"{API_URL}usuarios/")
            if response.status_code == 401:
                self.log("SECURITY", "No Token Protection", "PASS", "Access denied")
            else:
                self.log("SECURITY", "No Token Protection", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log("SECURITY", "No Token Protection", "ERROR", str(e))
    
    def run_all_tests(self):
        """Run all automated tests"""
        print("\n" + "="*60)
        print("PREXCOL BACKEND SECURITY & QA AUDIT")
        print("="*60 + "\n")
        
        # Authentication Tests
        print("\n--- AUTHENTICATION TESTS ---")
        tokens = self.test_login_valid()
        self.test_login_invalid_password()
        self.test_login_invalid_email()
        self.test_login_empty_fields()
        
        # Security Tests
        print("\n--- SECURITY TESTS ---")
        self.test_login_sql_injection()
        self.test_invalid_token_access()
        self.test_no_token_access()
        
        # API Tests
        print("\n--- API ENDPOINT TESTS ---")
        self.test_register_endpoint()
        self.test_token_refresh(tokens)
        
        # Generate Summary
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for r in self.results if r["status"] == "PASS")
        failed = sum(1 for r in self.results if r["status"] == "FAIL")
        errors = sum(1 for r in self.results if r["status"] == "ERROR")
        skipped = sum(1 for r in self.results if r["status"] == "SKIP")
        
        print(f"Total Tests: {len(self.results)}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Errors: {errors}")
        print(f"Skipped: {skipped}")
        
        return self.results

if __name__ == "__main__":
    audit = BackendAudit()
    results = audit.run_all_tests()
    
    # Save results to file
    with open("audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("\nResults saved to audit_results.json")
