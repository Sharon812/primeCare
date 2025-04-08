document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const backBtn = document.querySelector(".back-btn");
  const submitBtn = document.querySelector(".submit-btn");

  backBtn.addEventListener("click", () => {
    window.location.href = "/doctor/register/step3";
  });

  submitBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/doctor/register/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit application");
      }

      // Redirect to success page or dashboard
      window.location.href = "/doctor/dashboard";
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  });
});
