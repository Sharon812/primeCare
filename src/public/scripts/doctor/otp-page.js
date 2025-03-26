// Import AlertManager class (or redefine it if needed)
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
      <div class="alert-close">
        <i class="fas fa-times"></i>
      </div>
    `;

    this.container.appendChild(alert);
    alert.querySelector(".alert-close").addEventListener("click", () => {
      this.remove(alert);
    });
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

document.addEventListener("DOMContentLoaded", function () {
  const alertManager = new AlertManager();
  const form = document.querySelector(".otp-form");
  const otpInputs = document.querySelectorAll(".otp-input-group input");
  const combinedOtpInput = document.getElementById("combinedOtp");

  // Handle OTP input
  otpInputs.forEach((input, index) => {
    // Allow only numbers
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");

      if (e.target.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      updateCombinedOtp();
    });

    // Handle backspace
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    // Prevent paste except for the first input
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      if (index === 0) {
        const pastedData = e.clipboardData.getData("text");
        const numbersOnly = pastedData.replace(/[^0-9]/g, "").slice(0, 6);

        if (numbersOnly.length > 0) {
          [...numbersOnly].forEach((num, i) => {
            if (i < otpInputs.length) {
              otpInputs[i].value = num;
            }
          });
          updateCombinedOtp();
          otpInputs[Math.min(numbersOnly.length, otpInputs.length - 1)].focus();
        }
      }
    });
  });

  // Update hidden input with combined OTP value
  function updateCombinedOtp() {
    const combinedValue = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");
    combinedOtpInput.value = combinedValue;
  }

  // Form submission handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate if all inputs are filled
    const isComplete = Array.from(otpInputs).every(
      (input) => input.value.length === 1
    );

    if (!isComplete) {
      alertManager.show("Please enter the complete OTP");
      return;
    }

    // Show processing message
    const processingAlert = document.createElement("div");
    processingAlert.className = `alert success`;
    processingAlert.innerHTML = `
      <div class="alert-icon">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <div class="alert-message">Verifying OTP...</div>
    `;
    alertManager.clearAlerts();
    alertManager.container.appendChild(processingAlert);

    try {
      const response = await fetch("/doctor/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: combinedOtpInput.value,
        }),
      });

      const result = await response.json();
      processingAlert.remove();

      if (!response.ok) {
        throw new Error(result.error || "OTP verification failed");
      }

      alertManager.show("OTP verified successfully! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/doctor/login";
      }, 2000);
    } catch (error) {
      processingAlert.remove();
      alertManager.show(error.message);
      // Reset OTP inputs on error
      otpInputs.forEach((input) => (input.value = ""));
      otpInputs[0].focus();
      updateCombinedOtp();
    }
  });

  // Timer functionality (keep existing timer code)
  // ...existing timer code...
});
