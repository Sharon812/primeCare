class AlertManager {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "alert-container";
    document.body.appendChild(this.container);
  }

  // Add new method to clear existing alerts
  clearAlerts() {
    const alerts = this.container.querySelectorAll(".alert");
    alerts.forEach((alert) => this.remove(alert));
  }

  show(message, type = "error") {
    // Clear existing alerts before showing new one
    this.clearAlerts();
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.innerHTML = `
            <div class="alert-icon">
                ${
                  type === "error"
                    ? '<i class="fas fa-exclamation"></i>'
                    : '<i class="fas fa-check"></i>'
                }
            </div>
            <div class="alert-message">${message}</div>
            <div class="alert-close">
                <i class="fas fa-times"></i>
            </div>
        `;

    this.container.appendChild(alert);

    // Close button handler
    alert.querySelector(".alert-close").addEventListener("click", () => {
      this.remove(alert);
    });

    // Auto remove after 5 seconds
    setTimeout(() => this.remove(alert), 5000);
  }

  remove(alert) {
    alert.classList.add("removing");
    setTimeout(() => {
      if (alert.parentElement) {
        alert.remove();
      }
    }, 500);
  }
}

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.alertManager = new AlertManager();
    this.setupValidation();
  }

  validationRules = {
    name: {
      required: true,
      minLength: 3,
      pattern: /^[a-zA-Z\s]+$/,
      message: "Please enter a valid name (minimum 3 characters, letters only)",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    phone: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit phone number",
    },
    password: {
      required: true,
      minLength: 6,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message:
        "Password must be at least 6 characters with letters and numbers",
    },
    confirmPassword: {
      required: true,
      match: "password",
      message: "Passwords do not match",
    },
  };

  setupValidation() {
    this.form.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        this.validateField(input);
        this.updateSubmitButton();
      });
      input.addEventListener("blur", () => {
        this.validateField(input);
        this.updateSubmitButton();
      });
    });

    // Add checkbox validation
    const checkbox = this.form.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => this.updateSubmitButton());

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  updateSubmitButton() {
    const allFieldsValid = Array.from(
      this.form.querySelectorAll('input:not([type="checkbox"])')
    ).every((input) => {
      const inputGroup = input.closest(".input-group");
      return inputGroup.classList.contains("success");
    });

    const termsAccepted = this.form.querySelector(
      'input[type="checkbox"]'
    ).checked;

    this.submitButton.disabled = !(allFieldsValid && termsAccepted);
  }

  validateField(input) {
    const field = input.name;
    const value = input.value;
    const rules = this.validationRules[field];
    const inputGroup = input.closest(".input-group");

    // Guard clause for non-form inputs (like checkbox)
    if (!inputGroup) return true;

    const errorElement = inputGroup.querySelector(".error-message");
    if (!errorElement) return true;

    inputGroup.classList.remove("success", "error");
    errorElement.classList.remove("show");

    if (!rules) return true;

    // Required check
    if (rules.required && !value) {
      this.showError(
        input,
        `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      );
      return false;
    }

    // MinLength check
    if (rules.minLength && value.length < rules.minLength) {
      this.showError(input, rules.message);
      return false;
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(value)) {
      this.showError(input, rules.message);
      return false;
    }

    // Match check (for password confirmation)
    if (rules.match) {
      const matchInput = this.form.querySelector(`[name="${rules.match}"]`);
      if (value !== matchInput.value) {
        this.showError(input, rules.message);
        return false;
      }
    }

    // Valid field
    inputGroup.classList.add("success");
    return true;
  }

  showError(input, message) {
    const inputGroup = input.closest(".input-group");
    const errorElement = inputGroup.querySelector(".error-message");

    inputGroup.classList.add("error");
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    errorElement.classList.add("show");
  }

  async handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    // Only validate input fields within input-groups
    this.form.querySelectorAll(".input-group input").forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    const termsCheckbox = this.form.querySelector('input[type="checkbox"]');
    if (!termsCheckbox.checked) {
      this.alertManager.show("Please accept the terms and conditions");
      return;
    }

    if (!isValid) {
      this.alertManager.show("Please fix the errors before submitting");
      return;
    }

    // Show processing message without auto-removal
    const processingAlert = document.createElement("div");
    processingAlert.className = `alert warning`;
    processingAlert.innerHTML = `
        <div class="alert-icon">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div class="alert-message processing">Processing your registration...</div>
    `;
    this.alertManager.clearAlerts();
    this.alertManager.container.appendChild(processingAlert);
    this.submitButton.disabled = true;

    // Get only the form data we need
    const formData = {
      name: this.form.querySelector('input[name="name"]').value,
      email: this.form.querySelector('input[name="email"]').value,
      phone: this.form.querySelector('input[name="phone"]').value,
      password: this.form.querySelector('input[name="password"]').value,
    };

    try {
      const response = await fetch("/doctor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Remove processing alert before showing result
      processingAlert.remove();

      if (!response.ok) {
        this.submitButton.disabled = false;
        throw new Error(result.error || "Registration failed");
      }

      this.alertManager.show(
        "Registration successful! Redirecting...",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/doctor/verify-otp";
      }, 2000);
    } catch (error) {
      processingAlert.remove();
      this.alertManager.show(error.message);
      this.submitButton.disabled = false;
    }
  }
}

// Initialize form validation
new FormValidator("doctorRegisterForm");
