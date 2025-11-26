import subprocess
import time
import sys
import os
from datetime import datetime, timedelta

def run_tests_continuously(duration_hours=3):
    start_time = datetime.now()
    end_time = start_time + timedelta(hours=duration_hours)
    
    print(f"Starting continuous testing for {duration_hours} hours.")
    print(f"Start time: {start_time}")
    print(f"End time:   {end_time}")
    print("="*60)
    
    iteration = 1
    failures = 0
    successes = 0
    
    while datetime.now() < end_time:
        current_time = datetime.now().strftime("%H:%M:%S")
        print(f"\n[{current_time}] ITERATION {iteration}")
        print("-" * 30)
        
        try:
            # Run the playwright test
            # Using shell=True to ensure npx is found in path
            # Force UTF-8 encoding for output
            env = os.environ.copy()
            env["PYTHONIOENCODING"] = "utf-8"
            
            result = subprocess.run(
                ["npx", "playwright", "test", "tests/e2e/full-user-journey.spec.js", "--reporter=list"],
                cwd=os.getcwd(),
                capture_output=True,
                text=True,
                shell=True,
                env=env,
                encoding='utf-8', 
                errors='replace'
            )
            
            if result.returncode == 0:
                print("[PASS] TEST PASSED")
                successes += 1
            else:
                print("[FAIL] TEST FAILED")
                print("Output:")
                print(result.stdout)
                print("Error:")
                print(result.stderr)
                failures += 1
                
        except Exception as e:
            print(f"[ERROR] EXECUTION ERROR: {e}")
            failures += 1
            
        print("-" * 30)
        print(f"Stats: {successes} Passed, {failures} Failed")
        
        # Wait a bit between runs to not overwhelm the system
        time.sleep(5)
        iteration += 1

    print("="*60)
    print("CONTINUOUS TESTING COMPLETED")
    print(f"Total Iterations: {iteration - 1}")
    print(f"Successes: {successes}")
    print(f"Failures:  {failures}")
    print("="*60)

if __name__ == "__main__":
    # Default to 3 hours if not specified
    duration = 3
    if len(sys.argv) > 1:
        try:
            duration = float(sys.argv[1])
        except ValueError:
            pass
            
    run_tests_continuously(duration)
