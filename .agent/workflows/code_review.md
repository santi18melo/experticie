---
description: Comprehensive code review starting from tests and proposing improvements
---

# Code Review Workflow

This workflow automates a deep review of the entire codebase, beginning with running all tests, collecting coverage, and then generating a structured report with improvement suggestions.

## Steps

1. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   // turbo

2. **Run the full test suite with coverage**
   ```bash
   pytest --cov=backend --cov-report=term-missing
   ```
   // turbo

3. **Generate a summary of test results**
   - Capture the output of the previous command.
   - Save it to `test_report.txt` for later reference.
   ```bash
   pytest --cov=backend --cov-report=term-missing > test_report.txt
   ```
   // turbo

4. **Open the test report for review**
   - Use the IDE to view `test_report.txt`.

5. **Run static analysis (flake8)**
   ```bash
   pip install flake8
   flake8 backend > lint_report.txt
   ```
   // turbo

6. **Collect a list of all Python source files**
   ```bash
   find backend -name "*.py" > python_files.txt
   ```
   // turbo

7. **Create a markdown summary of findings**
   - Combine `test_report.txt` and `lint_report.txt` into `code_review_summary.md`.
   - Add sections for:
     - Test coverage gaps
     - Linting issues
     - Architectural observations
     - Performance considerations
     - Security recommendations
     - UI/UX enhancements (frontend)
   ```bash
   echo "# Code Review Summary" > code_review_summary.md
   echo "## Test Results" >> code_review_summary.md
   cat test_report.txt >> code_review_summary.md
   echo "\n## Linting Issues" >> code_review_summary.md
   cat lint_report.txt >> code_review_summary.md
   ```
   // turbo

8. **Open the summary for the user**
   - The assistant will display the contents of `code_review_summary.md`.

---

**Note**: Steps marked with `// turbo` will be automatically executed when this workflow is run.
