"""
MANUAL TESTING GUIDE - PREXCOL Authentication System
=====================================================================================================

This guide provides step-by-step instructions to manually test all authentication flows:
- Registration
- Login  
- Password Recovery
- All user roles (admin, cliente, comprador, proveedor, logistica)

PREREQUISITES:
1. Backend running: python manage.py runserver 0.0.0.0:8000
2. Frontend running: npm run dev (should be on http://localhost:5175)
3. Fresh database or test users created via scripts/create_test_users.py

=====================================================================================================
TEST 1: USER REGISTRATION
=====================================================================================================

1.1 Navigate to: http://localhost:5175/register

1.2 Test Admin Registration:
   - Email: admin@prexcol.com
   - Nombre: Admin User
   - Password: Prexcol123!
   - Rol: admin
   - Expected: Success 201, redirect to /admin, tokens stored

1.3 Test Cliente Registration:
   - Email: cliente1@prexcol.com
   - Nombre: Cliente One
   - Password: Cliente123!
   - Rol: cliente
   - Expected: Success 201, redirect to /dashboard, tokens stored

1.4 Test Comprador Registration:
   - Email: comprador1@prexcol.com
   - Nombre: Comprador One
   - Password: Comprador123!
   - Rol: comprador
   - Expected: Success 201, redirect to /dashboard, tokens stored

1.5 Test Proveedor Registration:
   - Email: proveedor1@prexcol.com
   - Nombre: Proveedor One
   - Password: Proveedor123!
   - Rol: proveedor
   - Expected: Success 201, redirect to /dashboard, tokens stored

1.6 Test Logistica Registration:
   - Email: logistica1@prexcol.com
   - Nombre: Logistica One
   - Password: Logistica123!
   - Rol: logistica
   - Expected: Success 201, redirect to /dashboard, tokens stored

VALIDATION CHECKLIST FOR EACH:
☐ User created in database
☐ Access token received and stored in localStorage
☐ Refresh token received and stored in localStorage
☐ User data stored in localStorage
☐ Redirected to correct dashboard based on role
☐ No console errors

=====================================================================================================
TEST 2: USER LOGIN
=====================================================================================================

2.1 Navigate to: http://localhost:5175/login

2.2 Test Admin Login:
   - Email: admin@prexcol.com
   - Password: Prexcol123!
   - Expected: Redirect to /admin, tokens stored

2.3 Test Cliente Login:
   - Email: cliente1@prexcol.com
   - Password: Cliente123!
   - Expected: Redirect to /dashboard, tokens stored

2.4 Test Comprador Login:
   - Email: comprador1@prexcol.com
   - Password: Comprador123!
   - Expected: Redirect to /dashboard, tokens stored

2.5 Test Proveedor Login:
   - Email: proveedor1@prexcol.com
   - Password: Proveedor123!
   - Expected: Redirect to /dashboard, tokens stored

2.6 Test Logistica Login:
   - Email: logistica1@prexcol.com
   - Password: Logistica123!
   - Expected: Redirect to /dashboard, tokens stored

2.7 Test Invalid Login:
   - Email: invalid@test.com
   - Password: wrongpassword
   - Expected: Error message displayed, no redirection, no tokens stored

VALIDATION CHECKLIST FOR EACH SUCCESSFUL LOGIN:
☐ Access token stored in localStorage ('token' key)
☐ Refresh token stored in localStorage ('refresh' key)
☐ User object stored in localStorage ('user' key)
☐ Correct redirection based on rol field
☐ ultimo_ingreso field updated in database
☐ No console errors
☐ Network tab shows 200 OK response from /api/auth/login/

=====================================================================================================
TEST 3: PASSWORD RECOVERY FLOW
=====================================================================================================

3.1 Navigate to: http://localhost:5175/login

3.2 Click "Olvidé mi contraseña" link

3.3 Enter email: admin@prexcol.com

3.4 Submit form

3.5 Check backend console output for reset link
   Expected format: http://localhost:5175/reset-password/{uid}/{token}/

3.6 Copy the link and paste it in browser

3.7 Enter new password: NewPass123!

3.8 Submit

3.9 Try logging in with NEW password:
   - Email: admin@prexcol.com
   - Password: NewPass123!
   - Expected: Successful login

3.10 Verify OLD password no longer works:
   - Email: admin@prexcol.com
   - Password: Prexcol123!
   - Expected: Login fails with error

VALIDATION CHECKLIST:
☐ Forgot password request returns success message
☐ Reset link generated in console (DEBUG mode uses console email backend)
☐ Reset link contains valid uid and token
☐ Can access reset password page with link
☐ New password is accepted
☐ Can login with new password
☐ Cannot login with old password
☐ Token is one-time use (reusing same link should fail)

=====================================================================================================
TEST 4: PROTECTED ROUTES
=====================================================================================================

4.1 Logout (if logged in)

4.2 Try accessing protected routes while logged out:
   - http://localhost:5175/dashboard
   - http://localhost:5175/admin
   - http://localhost:5175/profile
   - Expected: Redirect to /login

4.3 Login as cliente

4.4 Try accessing admin route:
   - http://localhost:5175/admin
   - Expected: Redirect or unauthorized message

4.5 Login as admin

4.6 Access admin route:
   - http://localhost:5175/admin
   - Expected: Success, admin dashboard loads

VALIDATION CHECKLIST:
☐ Unauthenticated users redirected to /login
☐ Role-based access control working
☐ Admin can access /admin
☐ Non-admin cannot access /admin

=====================================================================================================
TEST 5: TOKEN REFRESH
=====================================================================================================

5.1 Login as any user

5.2 Open browser DevTools > Application > Local Storage

5.3 Note the current 'token' value

5.4 Wait for token expiration (default: 1 hour) OR manually trigger refresh

5.5 Make an authenticated request (e.g., access profile page)

5.6 Verify token was refreshed:
   - New access token in localStorage
   - Request succeeded
   - No logout occurred

VALIDATION CHECKLIST:
☐ Expired access token triggers refresh
☐ New access token is obtained using refresh token
☐ User remains logged in
☐ Original request succeeds after refresh

=====================================================================================================
TEST 6: LOGOUT
=====================================================================================================

6.1 Login as any user

6.2 Click logout button (if available in UI) OR navigate to logout endpoint

6.3 Verify:
   - Redirected to /login
   - All tokens removed from localStorage
   - Cannot access protected routes
   - Refresh token blacklisted in backend

VALIDATION CHECKLIST:
☐ User redirected to /login
☐ localStorage cleared (token, refresh, user)
☐ Cannot access protected routes
☐ Refresh token blacklisted (cannot be reused)

=====================================================================================================
BACKEND API ENDPOINTS TO TEST
=====================================================================================================

Use Postman, cURL, or browser DevTools to test these endpoints directly:

1. POST /api/auth/register/
   Body: {"email": "test@test.com", "nombre": "Test", "password": "pass123", "rol": "cliente"}
   Expected: 201, returns tokens and user data

2. POST /api/auth/login/
   Body: {"email": "test@test.com", "password": "pass123"}
   Expected: 200, returns access, refresh, and user

3. POST /api/auth/token/refresh/
   Body: {"refresh": "<refresh_token>"}
   Expected: 200, returns new access token

4. POST /api/auth/logout/
   Headers: Authorization: Bearer <access_token>
   Body: {"refresh": "<refresh_token>"}
   Expected: 204, refresh token blacklisted

5. POST /api/auth/forgot-password/
   Body: {"email": "test@test.com"}
   Expected: 200, message sent (check console in DEBUG mode)

6. POST /api/auth/reset-password/<uid>/<token>/
   Body: {"password": "newpass123"}
   Expected: 200, password updated

=====================================================================================================
TESTING RESULTS LOG
=====================================================================================================

Date: _______________
Tester: _______________

TEST 1 - REGISTRATION:
[ ] Admin Registration - PASS / FAIL - Notes: _________________________________
[ ] Cliente Registration - PASS / FAIL - Notes: _________________________________
[ ] Comprador Registration - PASS / FAIL - Notes: _________________________________
[ ] Proveedor Registration - PASS / FAIL - Notes: _________________________________
[ ] Logistica Registration - PASS / FAIL - Notes: _________________________________

TEST 2 - LOGIN:
[ ] Admin Login - PASS / FAIL - Notes: _________________________________
[ ] Cliente Login - PASS / FAIL - Notes: _________________________________
[ ] Comprador Login - PASS / FAIL - Notes: _________________________________
[ ] Proveedor Login - PASS / FAIL - Notes: _________________________________
[ ] Logistica Login - PASS / FAIL - Notes: _________________________________
[ ] Invalid Login - PASS / FAIL - Notes: _________________________________

TEST 3 - PASSWORD RECOVERY:
[ ] Forgot Password - PASS / FAIL - Notes: _________________________________
[ ] Reset Password - PASS / FAIL - Notes: _________________________________
[ ] Login with New Password - PASS / FAIL - Notes: _________________________________
[ ] Old Password Rejected - PASS / FAIL - Notes: _________________________________

TEST 4 - PROTECTED ROUTES:
[ ] Unauthenticated Access - PASS / FAIL - Notes: _________________________________
[ ] Role-based Access - PASS / FAIL - Notes: _________________________________

TEST 5 - TOKEN REFRESH:
[ ] Token Refresh - PASS / FAIL - Notes: _________________________________

TEST 6 - LOGOUT:
[ ] Logout Flow - PASS / FAIL - Notes: _________________________________

OVERALL ASSESSMENT:
Total Tests: ______
Passed: ______
Failed: ______

Critical Issues: ___________________________________________________________________
___________________________________________________________________
___________________________________________________________________

Minor Issues: ___________________________________________________________________
___________________________________________________________________
___________________________________________________________________

=====================================================================================================
"""
