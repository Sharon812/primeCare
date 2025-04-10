document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  // Initialize constants at the top
  const currentYear = new Date().getFullYear();

  function setupFileUpload(
    dropzoneId,
    uploadId,
    previewContainerId,
    previewImageId,
    fileNameDisplayId,
    removeButtonId
  ) {
    const dropzone = document.getElementById(dropzoneId);
    const fileUpload = document.getElementById(uploadId);
    const previewContainer = document.getElementById(previewContainerId);
    const previewImage = document.getElementById(previewImageId);
    const fileNameDisplay = document.getElementById(fileNameDisplayId);
    const removeButton = document.getElementById(removeButtonId);

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, preventDefaults);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, () => {
        dropzone.classList.add("dragover");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, () => {
        dropzone.classList.remove("dragover");
      });
    });

    dropzone.addEventListener("drop", handleDrop);
    dropzone.addEventListener("click", () => fileUpload.click());

    function handleDrop(e) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }

    fileUpload.addEventListener("change", (e) => {
      if (e.target.files.length) {
        handleFile(e.target.files[0]);
      }
    });

    function handleFile(file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = "block";
        dropzone.querySelector(".dropzone-content").style.display = "none";
        fileNameDisplay.textContent = file.name;
      };
      reader.readAsDataURL(file);
    }

    removeButton.addEventListener("click", () => {
      previewImage.src = "";
      previewContainer.style.display = "none";
      dropzone.querySelector(".dropzone-content").style.display = "flex";
      fileNameDisplay.textContent = "";
      fileUpload.value = "";
      calculateProgress(); // Add this line to update progress when image is removed
    });
  }

  setupFileUpload(
    "certificationDropzone",
    "certificationUpload",
    "certPreviewContainer",
    "certPreviewImage",
    "certFileNameDisplay",
    "removeCertFile"
  );

  setupFileUpload(
    "experienceDropzone",
    "experienceUpload",
    "expPreviewContainer",
    "expPreviewImage",
    "expFileNameDisplay",
    "removeExpFile"
  );

  const form = document.getElementById("step2Form");
  const inputs = form.querySelectorAll("input, select");

  function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    input.classList.add("error");
    input.parentElement.appendChild(errorDiv);
  }

  function clearError(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
    input.classList.remove("error");
  }

  function validateField(input) {
    const value = input.value.trim();
    clearError(input);

    if (!value) {
      showError(input, `${input.placeholder || "This field"} is required`);
      return false;
    }

    switch (input.name) {
      case "graduationYear":
        const year = parseInt(value);
        if (isNaN(year) || year < 1950 || year > currentYear) {
          showError(
            input,
            `Enter a valid graduation year between 1950 and ${currentYear}`
          );
          return false;
        }
        break;

      case "yearsOfExperience":
        const experience = parseInt(value);
        if (isNaN(experience) || experience < 0) {
          showError(input, "Years of experience cannot be negative");
          return false;
        }
        const gradYear = parseInt(
          document.querySelector('[name="graduationYear"]').value
        );
        if (gradYear && experience > currentYear - gradYear) {
          showError(
            input,
            `Experience years cannot exceed ${
              currentYear - gradYear
            } years (based on graduation year)`
          );
          return false;
        }
        break;

      case "qualification":
        if (value.length < 2 || value.length > 50) {
          showError(
            input,
            "Qualification should be between 2 and 50 characters"
          );
          return false;
        }
        break;

      case "university":
        if (value.length < 2 || value.length > 100) {
          showError(
            input,
            "University name should be between 2 and 100 characters"
          );
          return false;
        }
        break;

      case "previousHospital":
        if (value.length < 2 || value.length > 100) {
          showError(
            input,
            "Hospital name should be between 2 and 100 characters"
          );
          return false;
        }
        break;

      case "studyCountry":
        if (value.length < 2 || value.length > 100) {
          showError(
            input,
            "Country name should be between 2 and 100 characters"
          );
          return false;
        }
        break;
    }

    return true;
  }

  inputs.forEach((input) => {
    input.removeAttribute("required");

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      }
      calculateProgress();
    });

    input.addEventListener("blur", () => {
      validateField(input);
      calculateProgress();
    });
  });

  function validateImages() {
    let isValid = true;
    const certFile = document.getElementById("certificationUpload").files[0];
    const expFile = document.getElementById("experienceUpload").files[0];
    const certPreview = document.getElementById("certPreviewImage");
    const expPreview = document.getElementById("expPreviewImage");

    clearError(document.getElementById("certificationUpload"));
    clearError(document.getElementById("experienceUpload"));

    if (
      !certFile &&
      (!certPreview.src ||
        certPreview.src === "data:," ||
        certPreview.src.endsWith("undefined"))
    ) {
      showError(
        document.getElementById("certificationUpload"),
        "Certification document is required"
      );
      isValid = false;
    }

    if (
      !expFile &&
      (!expPreview.src ||
        expPreview.src === "data:," ||
        expPreview.src.endsWith("undefined"))
    ) {
      showError(
        document.getElementById("experienceUpload"),
        "Experience certificate is required"
      );
      isValid = false;
    }

    return isValid;
  }

  function calculateProgress() {
    const requiredFields = form.querySelectorAll("input, select");
    const totalFields = requiredFields.length + 2; // +2 for certification and experience documents
    let filledCount = 0;

    requiredFields.forEach((field) => {
      if (field.value.trim() && validateField(field)) {
        filledCount++;
      }
    });

    // Check certification document
    const certPreview = document.getElementById("certPreviewImage");
    const certFile = document.getElementById("certificationUpload").files[0];
    if (
      certFile ||
      (certPreview.src &&
        certPreview.src !== "data:," &&
        !certPreview.src.endsWith("undefined"))
    ) {
      filledCount++;
    }

    // Check experience document
    const expPreview = document.getElementById("expPreviewImage");
    const expFile = document.getElementById("experienceUpload").files[0];
    if (
      expFile ||
      (expPreview.src &&
        expPreview.src !== "data:," &&
        !expPreview.src.endsWith("undefined"))
    ) {
      filledCount++;
    }

    // Calculate progress (starting from 33.33% and going to 66.66%)
    const progress = 33.33 + (filledCount / totalFields) * 33.33;

    // Update progress bar
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.setProperty(
      "--progress",
      `${Math.min(progress, 66.66)}%`
    );

    // Update step status
    const steps = document.querySelectorAll(".step");
    if (progress >= 66.66) {
      steps[1].classList.add("completed");
      steps[2].classList.add("active");
      steps[1].classList.remove("active");
    } else {
      steps[1].classList.add("active");
      steps[1].classList.remove("completed");
      steps[2].classList.remove("active");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!validateImages()) {
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData(form);
      const certFile = document.getElementById("certificationUpload").files[0];
      const expFile = document.getElementById("experienceUpload").files[0];

      if (certFile) formData.set("certification", certFile);
      if (expFile) formData.set("experience", expFile);

      const response = await fetch("/doctor/register/step2", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit the form");
      }

      window.location.href = "/doctor/register/step3";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  });

  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    window.location.href = "/doctor/register/step1";
  });

  calculateProgress();
});
