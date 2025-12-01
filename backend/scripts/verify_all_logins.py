import requests, sys

BASE_URL = "http://127.0.0.1:8000"

users = [
    ("admin1@prexcol.com", "PassAdmin1*"),
    ("logistica1@prexcol.com", "PassLogistica1*"),
    ("proveedor1@prexcol.com", "PassProveedor1*"),
    ("cliente1@prexcol.com", "PassCliente1*"),
]

def login(email, password):
    url = f"{BASE_URL}/api/auth/login/"
    try:
        resp = requests.post(url, json={"email": email, "password": password})
        if resp.status_code == 200:
            print(f"✅ {email} login successful. Token received.")
            return True
        else:
            print(f"❌ {email} login failed. Status {resp.status_code}: {resp.text}")
            return False
    except Exception as e:
        print(f"❌ {email} login exception: {e}")
        return False

if __name__ == "__main__":
    all_ok = True
    for email, pwd in users:
        ok = login(email, pwd)
        all_ok = all_ok and ok
    if not all_ok:
        sys.exit(1)
    else:
        print("All logins succeeded.")
