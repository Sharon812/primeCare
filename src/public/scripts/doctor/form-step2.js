document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init();

  // Set initial progress (step 1 completed)
  document
    .querySelector(".progress-bar")
    .style.setProperty("--progress", "33.33%");

  // Ensure step 1 shows completed state
  const step1 = document.querySelector(".step:nth-child(1)");
  step1.classList.add("completed");
  step1.querySelector(".step-number").innerHTML =
    '<i class="fas fa-check"></i>';

  // File upload handlers for certification
  const setupFileUpload = (
    dropzoneId,
    uploadId,
    previewContainerId,
    previewImageId,
    fileNameDisplayId,
    removeButtonId
  ) => {
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

      const reader = new FileReader();
      reader.onload = function (e) {
        if (file.type === "application/pdf") {
          previewImage.src = "/assets/pdf-icon.png";
        } else {
          previewImage.src = e.target.result;
        }
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
    });
  };

  // Setup both file upload sections
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

  // Add hospital entry functionality
  const hospitalsContainer = document.querySelector(".hospitals-container");
  const addHospitalBtn = document.querySelector(".add-hospital-btn");

  addHospitalBtn.addEventListener("click", () => {
    const newEntry = document.createElement("div");
    newEntry.className = "hospital-entry";
    newEntry.innerHTML = `
            <div class="input-group">
                <i class="fas fa-hospital"></i>
                <input type="text" placeholder="Previous Hospital/Clinic Name" />
            </div>
            <button type="button" class="remove-hospital-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
    hospitalsContainer.appendChild(newEntry);

    // Add remove functionality
    const removeBtn = newEntry.querySelector(".remove-hospital-btn");
    removeBtn.addEventListener("click", () => {
      newEntry.remove();
    });
  });

  // Form navigation
  const form = document.getElementById("step2Form");
  const backBtn = document.querySelector(".back-btn");

  backBtn.addEventListener("click", () => {
    window.location.href = "/doctor/register/step1"; // Updated route
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form validation and submission logic here
    window.location.href = "/doctor/registration/step3";
  });

  // Progress calculation
  function calculateProgress() {
    const requiredInputs = Array.from(
      form.querySelectorAll("input[required], select[required]")
    );
    const certificationFile = document.getElementById("certificationUpload");
    const experienceFile = document.getElementById("experienceUpload");

    // Check if all required inputs are filled
    const allInputsFilled = requiredInputs.every(
      (input) => input.value.trim() !== ""
    );
    // Check if both files are uploaded
    const filesUploaded =
      certificationFile.files.length > 0 && experienceFile.files.length > 0;

    // Calculate the base progress (33.33% from step 1)
    let progress = 33.33;

    if (allInputsFilled && filesUploaded) {
      // If everything is complete, show full progress and update steps
      progress = 66.66;
      const step2 = document.querySelector(".step:nth-child(2)");
      const step3 = document.querySelector(".step:nth-child(3)");

      step2.classList.remove("active");
      step2.classList.add("completed");
      step2.querySelector(".step-number").innerHTML =
        '<i class="fas fa-check"></i>';

      step3.classList.add("active");
    } else if (allInputsFilled || filesUploaded) {
      // If partially complete, show intermediate progress
      const totalFields = requiredInputs.length + 2; // +2 for files
      const filledFields =
        requiredInputs.filter((input) => input.value.trim() !== "").length +
        (certificationFile.files.length > 0 ? 1 : 0) +
        (experienceFile.files.length > 0 ? 1 : 0);
      progress = 33.33 + (filledFields / totalFields) * 33.33;
    }

    // Update progress bar
    document
      .querySelector(".progress-bar")
      .style.setProperty("--progress", `${progress}%`);
  }

  // Add event listeners for real-time progress updates
  const formInputs = form.querySelectorAll("input, select");
  formInputs.forEach((input) => {
    ["input", "change"].forEach((eventType) => {
      input.addEventListener(eventType, calculateProgress);
    });
  });

  // Update event listeners to include file inputs
  document
    .getElementById("certificationUpload")
    .addEventListener("change", calculateProgress);
  document
    .getElementById("experienceUpload")
    .addEventListener("change", calculateProgress);

  // Add event listener for file removals
  document
    .getElementById("removeCertFile")
    .addEventListener("click", calculateProgress);
  document
    .getElementById("removeExpFile")
    .addEventListener("click", calculateProgress);

  // Initialize progress
  calculateProgress();
});
