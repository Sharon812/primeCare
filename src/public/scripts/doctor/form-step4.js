document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const backBtn = document.querySelector(".back-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const confirmModal = document.getElementById("confirmModal");
  const cancelSubmit = document.getElementById("cancelSubmit");
  const confirmSubmit = document.getElementById("confirmSubmit");

  backBtn.addEventListener("click", () => {
    window.location.href = "/doctor/register/step3";
  });

  submitBtn.addEventListener("click", () => {
    confirmModal.style.display = "flex";
  });

  cancelSubmit.addEventListener("click", () => {
    confirmModal.style.display = "none";
  });

  confirmSubmit.addEventListener("click", async () => {
    try {
      const response = await fetch("/doctor/register/step4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed: true }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      confirmModal.style.display = "none";
    }
  });

  // Close modal if clicked outside
  window.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = "none";
    }
  });
});
