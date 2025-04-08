document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const form = document.getElementById("step3Form");
  const consultationFeeInput = document.getElementById("consultationFee");
  const adminFeeSpan = document.getElementById("adminFee");
  const finalEarningsSpan = document.getElementById("finalEarnings");
  const termsCheckbox = document.getElementById("termsAccept");
  const privacyCheckbox = document.getElementById("privacyAccept");

  const ADMIN_FEE_PERCENTAGE = 10;

  function calculateFees(amount) {
    const adminFee = (amount * ADMIN_FEE_PERCENTAGE) / 100;
    const finalEarnings = amount - adminFee;

    adminFeeSpan.textContent = `₹${adminFee.toFixed(2)}`;
    finalEarningsSpan.textContent = `₹${finalEarnings.toFixed(2)}`;
  }

  function showError(element, message) {
    const errorDiv = element.parentElement.querySelector(".error-message");
    errorDiv.textContent = message;
    element.parentElement.classList.add("error");
  }

  function clearError(element) {
    const errorDiv = element.parentElement.querySelector(".error-message");
    errorDiv.textContent = "";
    element.parentElement.classList.remove("error");
  }

  function validateConsultationFee() {
    const fee = parseFloat(consultationFeeInput.value);
    clearError(consultationFeeInput);

    if (!fee || fee <= 0) {
      showError(consultationFeeInput, "Please enter a valid consultation fee");
      return false;
    }
    return true;
  }

  function validateTerms() {
    let isValid = true;

    if (!termsCheckbox.checked) {
      showError(termsCheckbox, "You must accept the Terms and Conditions");
      isValid = false;
    } else {
      clearError(termsCheckbox);
    }

    if (!privacyCheckbox.checked) {
      showError(privacyCheckbox, "You must accept the Privacy Policy");
      isValid = false;
    } else {
      clearError(privacyCheckbox);
    }

    return isValid;
  }

  function calculateProgress() {
    const isFormValid = validateConsultationFee() && validateTerms();
    const progressBar = document.querySelector(".progress-bar");

    if (isFormValid) {
      progressBar.style.setProperty("--progress", "100%");
      document.querySelector(".step:nth-child(3)").classList.add("completed");
      document.querySelector(".step:nth-child(4)").classList.add("active");
      document.querySelector(".step:nth-child(3)").classList.remove("active");
    } else {
      progressBar.style.setProperty("--progress", "66.66%");
      document.querySelector(".step:nth-child(3)").classList.add("active");
      document
        .querySelector(".step:nth-child(3)")
        .classList.remove("completed");
      document.querySelector(".step:nth-child(4)").classList.remove("active");
    }
  }

  consultationFeeInput.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0) {
      calculateFees(value);
    } else {
      adminFeeSpan.textContent = "₹0";
      finalEarningsSpan.textContent = "₹0";
    }
    if (consultationFeeInput.classList.contains("error")) {
      validateConsultationFee();
    }
    calculateProgress();
  });

  [termsCheckbox, privacyCheckbox].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.parentElement.classList.contains("error")) {
        validateTerms();
      }
      calculateProgress();
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isValid = validateConsultationFee() && validateTerms();
    if (!isValid) return;

    try {
      const formData = new FormData(form);
      const consultationFee = parseFloat(formData.get("consultationFee"));
      const adminFee = (consultationFee * ADMIN_FEE_PERCENTAGE) / 100;
      const doctorEarnings = consultationFee - adminFee;

      const response = await fetch("/doctor/register/step3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultationFee: consultationFee,
          adminFee: adminFee,
          doctorEarnings: doctorEarnings,
          termsAccepted: formData.get("termsAccept") === "on",
          privacyAccepted: formData.get("privacyAccept") === "on",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit the form");
      }

      window.location.href = "/doctor/register/step4";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  });

  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    window.location.href = "/doctor/register/step2";
  });

  // Calculate initial values if fee is present
  if (consultationFeeInput.value) {
    calculateFees(parseFloat(consultationFeeInput.value));
  }

  calculateProgress();
});
