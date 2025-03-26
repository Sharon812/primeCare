document.addEventListener("DOMContentLoaded", function () {
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
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate if all inputs are filled
    const isComplete = Array.from(otpInputs).every(
      (input) => input.value.length === 1
    );

    if (!isComplete) {
      alert("Please enter the complete OTP");
      return;
    }

    // If validation passes, submit the form
    this.submit();
  });
});

// Timer functionality (keep existing timer code)
// ...existing timer code...
