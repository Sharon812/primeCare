document.addEventListener("DOMContentLoaded", function () {
  // Photo upload functionality
  const photoDropzone = document.getElementById("photoDropzone");
  const photoUpload = document.getElementById("photoUpload");
  const previewImage = document.getElementById("previewImage");
  const photoPreviewContainer = document.getElementById(
    "photoPreviewContainer"
  );

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    photoDropzone.addEventListener(eventName, preventDefaults);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    photoDropzone.addEventListener(eventName, () => {
      photoDropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    photoDropzone.addEventListener(eventName, () => {
      photoDropzone.classList.remove("dragover");
    });
  });

  photoDropzone.addEventListener("drop", handlePhotoDrop);
  photoDropzone.addEventListener("click", () => photoUpload.click());

  function handlePhotoDrop(e) {
    const file = e.dataTransfer.files[0];
    handlePhotoFile(file);
  }

  photoUpload.addEventListener("change", (e) => {
    if (e.target.files.length) {
      handlePhotoFile(e.target.files[0]);
    }
  });

  let cropper = null;
  const cropModal = document.getElementById("cropModal");
  const cropImage = document.getElementById("cropImage");
  const closeCropModal = document.getElementById("closeCropModal");
  const cropBtn = document.getElementById("cropBtn");

  function handlePhotoFile(file) {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      cropImage.src = e.target.result;
      cropModal.style.display = "flex";

      // Initialize cropper
      if (cropper) {
        cropper.destroy();
      }

      cropper = new Cropper(cropImage, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "move",
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
      });
    };
    reader.readAsDataURL(file);
  }

  closeCropModal.addEventListener("click", () => {
    cropModal.style.display = "none";
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
    photoUpload.value = "";
  });

  cropBtn.addEventListener("click", () => {
    if (!cropper) return;

    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    });

    croppedCanvas.toBlob((blob) => {
      const croppedImage = URL.createObjectURL(blob);
      previewImage.src = croppedImage;
      cropModal.style.display = "none";
      cropper.destroy();
      cropper = null;
    });
  });

  // Calculate age from DOB
  const dobInput = document.getElementById("dob");
  const ageInput = document.getElementById("age");

  dobInput.addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    ageInput.value = age;
    // Trigger store data
    storeFormData();
  });

  // File upload display
  const idProofUpload = document.getElementById("idProofUpload");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  idProofUpload.addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) {
      fileNameDisplay.textContent = e.target.files[0].name;
    }
  });

  // ID Proof drag and drop functionality
  const dropzone = document.getElementById("idProofDropzone");
  const idPreviewImage = document.getElementById("idPreviewImage");
  const previewContainer = document.getElementById("previewContainer");
  const removeFileBtn = document.getElementById("removeFile");

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, preventDefaults);
  });

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
  dropzone.addEventListener("click", () => idProofUpload.click());

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
  }

  idProofUpload.addEventListener("change", (e) => {
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
      idPreviewImage.src = e.target.result;
      previewContainer.style.display = "block";
      dropzone.querySelector(".dropzone-content").style.display = "none";
      fileNameDisplay.textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  removeFileBtn.addEventListener("click", () => {
    idPreviewImage.src = "";
    previewContainer.style.display = "none";
    dropzone.querySelector(".dropzone-content").style.display = "flex";
    fileNameDisplay.textContent = "";
    idProofUpload.value = "";
  });

  // Form submission
  const form = document.getElementById("step1Form");

  function showError(inputElement, message) {
    const errorDiv =
      inputElement.parentElement.querySelector(".error-message") ||
      document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    if (!inputElement.parentElement.querySelector(".error-message")) {
      inputElement.parentElement.appendChild(errorDiv);
    }
    inputElement.classList.add("error");
  }

  function clearError(inputElement) {
    const errorDiv = inputElement.parentElement.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
    inputElement.classList.remove("error");
  }

  function validateField(field) {
    // Skip file inputs as they are validated separately based on image preview values.
    if (field.type === "file") return true;

    const value = field.value.trim();
    const name = field.getAttribute("name");
    clearError(field);

    if (!value) {
      showError(field, `${field.placeholder} is required`);
      return false;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(field, "Please enter a valid email address");
        return false;
      }
    }

    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        showError(field, "Please enter a valid 10-digit phone number");
        return false;
      }
    }

    if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        showError(field, "Please enter a valid 6-digit pincode");
        return false;
      }
    }

    return true;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear all existing errors
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());

    let isValid = true;

    // Validate all text/select/textarea fields
    allFormInputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Validate profile photo:
    // Only require if previewImage.src is empty or default AND no new file is chosen.
    if (
      (!previewImage.src ||
        previewImage.src === "/assets/default-avatar.png" ||
        previewImage.src.trim() === "") &&
      !photoUpload.files.length
    ) {
      showError(photoUpload, "Profile photo is required");
      isValid = false;
    }

    // Validate ID proof:
    // Only require if idPreviewImage.src is empty (or equals the empty data URL) AND no new file is chosen.
    if (
      (!idPreviewImage.src ||
        idPreviewImage.src === "data:," ||
        idPreviewImage.src.trim() === "") &&
      !idProofUpload.files.length
    ) {
      showError(idProofUpload, "ID proof is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      const formData = new FormData();

      // Add text fields including age
      allFormInputs.forEach((input) => {
        if (input.name) {
          if (input.name === "age") {
            formData.append(input.name, Number(input.value)); // Ensure age is sent as a number
          } else {
            formData.append(input.name, input.value.trim());
          }
        }
      });

      // Get the actual File objects from the input elements
      const profileImageFile = photoUpload.files[0];
      const idProofFile = idProofUpload.files[0];

      // Append files with correct field names
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      } else if (
        previewImage.src &&
        previewImage.src !== "/assets/default-avatar.png"
      ) {
        // If no file selected but preview image exists, convert base64 to blob
        const profileImageResponse = await fetch(previewImage.src);
        const profileImageBlob = await profileImageResponse.blob();
        formData.append("profileImage", profileImageBlob, "profile.jpg");
      }

      if (idProofFile) {
        formData.append("idProof", idProofFile);
      } else if (idPreviewImage.src && idPreviewImage.src !== "data:,") {
        // If no file selected but preview image exists, convert base64 to blob
        const idProofResponse = await fetch(idPreviewImage.src);
        const idProofBlob = await idProofResponse.blob();
        formData.append("idProof", idProofBlob, "idproof.jpg");
      }

      // Send form data
      const response = await fetch("/doctor/register/step1", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Redirect to next step
      window.location.href = "/doctor/register/step2";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred. Please try again.");
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = false;
      btn.innerHTML = 'Next Step <i class="fas fa-arrow-right"></i>';
    }
  });

  // Add input validation for pincode
  const pincodeInput = document.querySelector('input[placeholder="Pincode"]');
  pincodeInput.addEventListener("input", function (e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/\D/g, "");

    // Ensure max length of 6
    if (this.value.length > 6) {
      this.value = this.value.slice(0, 6);
    }
  });

  // Progress bar functionality
  function updateProgress(currentStep) {
    const steps = document.querySelectorAll(".step");
    const progressBar = document.querySelector(".progress-bar");

    steps.forEach((step, index) => {
      if (index < currentStep) {
        step.classList.add("completed");
        step.classList.remove("active");
      } else if (index === currentStep) {
        step.classList.add("active");
        step.classList.remove("completed");
      } else {
        step.classList.remove("completed", "active");
      }
    });

    // Update progress bar line
    const progress = (currentStep / (steps.length - 1)) * 100;
    progressBar.style.setProperty("--progress", `${progress}%`);
  }

  // Initialize progress
  updateProgress(0); // Start at first step

  // Update progress on form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // ...existing submit code...

    // Update progress (for demo)
    const currentStep = 1; // Increment this based on actual step
    updateProgress(currentStep);
  });

  // Remove all existing progress tracking code and replace with this single implementation
  function calculateProgress() {
    const form = document.getElementById("step1Form");
    const formFields = [
      'input[type="text"]:required',
      'input[type="email"]:required',
      'input[type="tel"]:required',
      'input[type="date"]:required',
      "textarea:required", // Removed select from here since we no longer have dropdowns
    ]
      .map((selector) => Array.from(form.querySelectorAll(selector)))
      .flat()
      .filter((field) => !field.readOnly && !field.disabled);

    const totalFields = formFields.length;
    const filledFields = formFields.filter((field) => {
      const value = field.value.trim();
      return value !== "";
    }).length;

    // Changed to 33.33% max for first section
    const progress = Math.min((filledFields / totalFields) * 33.33, 33.33);

    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.setProperty("--progress", `${progress}%`);

      const steps = document.querySelectorAll(".step");
      if (progress === 33.33) {
        steps[0].classList.add("completed");
        steps[1].classList.add("active");
        steps[0].classList.remove("active");
      } else if (progress > 0) {
        steps[0].classList.add("active");
        steps[0].classList.remove("completed");
        steps[1].classList.remove("active");
      }
    }
  }

  // Add event listeners for real-time progress updates
  const formInputs = document.querySelectorAll(
    "input:required, textarea:required"
  );
  formInputs.forEach((input) => {
    ["input", "change"].forEach((eventType) => {
      input.addEventListener(eventType, calculateProgress);
    });
  });

  // Initialize progress
  calculateProgress();

  // Add this function to store form data
  function storeFormData() {
    const formData = {
      firstName: document.querySelector('input[placeholder="First Name"]')
        .value,
      lastName: document.querySelector('input[placeholder="Last Name"]').value,
      dob: document.getElementById("dob").value,
      age: document.getElementById("age").value,
      phone: document.querySelector('input[placeholder="Phone Number"]').value,
      email: document.querySelector('input[placeholder="Email Address"]').value,
      country: document.querySelector('input[placeholder="Country"]').value,
      state: document.querySelector('input[placeholder="State"]').value,
      district: document.querySelector('input[placeholder="District"]').value,
      locality: document.querySelector('input[placeholder="Locality"]').value,
      pincode: document.querySelector('input[placeholder="Pincode"]').value,
      address: document.querySelector('textarea[placeholder="Full Address"]')
        .value,
      idType: document.getElementById("idType").value,
      profileImage: previewImage.src,
      idProofPreview: idPreviewImage.src,
    };
    localStorage.setItem("doctorFormStep1", JSON.stringify(formData));
  }

  // Load saved form data if exists
  function loadSavedFormData() {
    // Only load from localStorage if fields are empty (no backend data)
    const savedData = localStorage.getItem("doctorFormStep1");
    if (savedData) {
      const formData = JSON.parse(savedData);
      const inputs = form.querySelectorAll(
        'input:not([type="file"]), textarea, select'
      );

      inputs.forEach((input) => {
        // Only fill if current value is empty
        if (!input.value && formData[input.name]) {
          input.value = formData[input.name];
        }
      });

      // Handle images only if not already set from backend
      if (
        !previewImage.src ||
        previewImage.src.endsWith("default-avatar.png")
      ) {
        if (
          formData.profileImage &&
          formData.profileImage !== "/assets/default-avatar.png"
        ) {
          previewImage.src = formData.profileImage;
        }
      }

      if (!idPreviewImage.src) {
        if (formData.idProofPreview && formData.idProofPreview !== "data:,") {
          idPreviewImage.src = formData.idProofPreview;
          previewContainer.style.display = "block";
          dropzone.querySelector(".dropzone-content").style.display = "none";
          const fileName = formData.idType
            ? `${formData.idType} ID Proof`
            : "ID Proof";
          fileNameDisplay.textContent = fileName;
        }
      }
    }
  }

  // Add input event listeners to all form fields
  const formFields = document.querySelectorAll(
    'input:not([type="file"]), textarea, select'
  );
  formFields.forEach((input) => {
    input.addEventListener("input", storeFormData);
    input.addEventListener("change", storeFormData);
  });

  // Modify existing file handling functions to store image data
  const originalHandlePhotoFile = handlePhotoFile;
  handlePhotoFile = function (file) {
    originalHandlePhotoFile(file);
    // The cropped image will be stored when crop button is clicked
  };

  const originalCropBtnClick = cropBtn.onclick;
  cropBtn.onclick = function () {
    if (originalCropBtnClick) {
      originalCropBtnClick.call(this);
    }
    setTimeout(storeFormData, 100); // Store after crop is complete
  };

  const originalHandleFile = handleFile;
  handleFile = function (file) {
    originalHandleFile(file);
    setTimeout(storeFormData, 100); // Store after ID proof is loaded
  };

  // Load saved data when page loads
  loadSavedFormData();

  function calculateProgress() {
    const requiredFields = {
      firstName: document.querySelector('input[name="firstName"]'),
      lastName: document.querySelector('input[name="lastName"]'),
      dob: document.getElementById("dob"),
      phone: document.querySelector('input[name="phone"]'),
      email: document.querySelector('input[name="email"]'),
      country: document.querySelector('input[name="country"]'),
      state: document.querySelector('input[name="state"]'),
      district: document.querySelector('input[name="district"]'),
      locality: document.querySelector('input[name="locality"]'),
      pincode: document.querySelector('input[name="pincode"]'),
      address: document.querySelector('textarea[name="address"]'),
      idType: document.getElementById("idType"),
    };

    let filledCount = 0;
    let totalFields = Object.keys(requiredFields).length + 2; // +2 for profile photo and ID proof

    // Check text inputs, select, and textarea
    Object.entries(requiredFields).forEach(([key, field]) => {
      if (field && field.value.trim()) {
        // Additional validation for specific fields
        switch (key) {
          case "email":
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()))
              filledCount++;
            break;
          case "phone":
            if (/^\d{10}$/.test(field.value.trim())) filledCount++;
            break;
          case "pincode":
            if (/^\d{6}$/.test(field.value.trim())) filledCount++;
            break;
          default:
            filledCount++;
        }
      }
    });

    // Check profile photo
    if (previewImage.src && previewImage.src !== "/assets/default-avatar.png") {
      filledCount++;
    }

    // Check ID proof
    if (idPreviewImage.src && idPreviewImage.src !== "") {
      filledCount++;
    }

    // Calculate percentage (33.33% max for first step)
    const progress = Math.min((filledCount / totalFields) * 33.33, 33.33);

    // Update progress bar
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.setProperty("--progress", `${progress}%`);

      const steps = document.querySelectorAll(".step");
      if (progress === 33.33) {
        steps[0].classList.add("completed");
        steps[1].classList.add("active");
        steps[0].classList.remove("active");
      } else {
        steps[0].classList.add("active");
        steps[0].classList.remove("completed");
        steps[1].classList.remove("active");
      }
    }

    return progress === 33.33; // Return true if section is complete
  }

  // Remove all duplicate formInputs declarations and combine the event listeners
  const allFormInputs = document.querySelectorAll("input, select, textarea");
  allFormInputs.forEach((input) => {
    // Real-time validation
    if (!input.readOnly && input.type !== "file") {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          validateField(input);
        }
      });
    }

    // Progress calculation
    input.addEventListener("input", calculateProgress);
    input.addEventListener("change", calculateProgress);

    // Store form data
    if (input.type !== "file") {
      input.addEventListener("input", storeFormData);
      input.addEventListener("change", storeFormData);
    }
  });

  // Update progress when images are added/changed
  const imageInputs = [photoUpload, idProofUpload];
  imageInputs.forEach((input) => {
    input.addEventListener("change", calculateProgress);
  });

  // Initialize progress
  calculateProgress();
});
