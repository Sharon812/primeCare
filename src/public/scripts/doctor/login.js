class AlertManager {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "alert-container";
    document.body.appendChild(this.container);
  }

  clearAlerts() {
    const alerts = this.container.querySelectorAll(".alert");
    alerts.forEach((alert) => this.remove(alert));
  }

  show(message, type = "error") {
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
            <div class="alert-close"><i class="fas fa-times"></i></div>
        `;

    this.container.appendChild(alert);
    alert
      .querySelector(".alert-close")
      .addEventListener("click", () => this.remove(alert));

    if (type !== "processing") {
      setTimeout(() => this.remove(alert), 5000);
    }
  }

  remove(alert) {
    alert.classList.add("removing");
    setTimeout(() => alert.remove(), 500);
  }
}

class LoginHandler {
  constructor() {
    this.form = document.querySelector(".login-form");
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.alertManager = new AlertManager();
    this.setupFormHandler();
  }

  setupFormHandler() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Add input validation
    this.form.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => this.validateForm());
    });
  }

  validateForm() {
    const email = this.form.querySelector('input[name="email"]').value;
    const password = this.form.querySelector('input[name="password"]').value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 6;

    this.submitButton.disabled = !(emailValid && passwordValid);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Show processing message
    const processingAlert = document.createElement("div");
    processingAlert.className = `alert warning`;
    processingAlert.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="alert-message processing">Logging in...</div>
        `;
    this.alertManager.clearAlerts();
    this.alertManager.container.appendChild(processingAlert);
    this.submitButton.disabled = true;

    try {
      const response = await fetch("/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.form.querySelector('input[name="email"]').value,
          password: this.form.querySelector('input[name="password"]').value,
        }),
      });

      const data = await response.json();
      processingAlert.remove();

      if (!response.ok || data.error) {
        this.submitButton.disabled = false;
        // Create and show a proper error alert
        this.alertManager.show(data.error || "Login failed", "error");
        return;
      }

      // Show success message and redirect
      this.alertManager.show("Login successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/doctor/dashboard";
      }, 2000);
    } catch (error) {
      processingAlert.remove();
      this.alertManager.show("An error occurred during login", "error");
      this.submitButton.disabled = false;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LoginHandler();
});
