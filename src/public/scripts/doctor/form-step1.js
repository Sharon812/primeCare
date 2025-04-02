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
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    ageInput.value = age;
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
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Clear localStorage before proceeding
    localStorage.removeItem("doctorFormStep1");

    // Simulate form submission (replace with your actual submission logic)
    setTimeout(() => {
      window.location.href = "/doctor/register/step2"; // Replace with your actual next step URL
    }, 2000);
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
    const savedData = localStorage.getItem("doctorFormStep1");
    if (savedData) {
      const formData = JSON.parse(savedData);

      // Fill in the form fields
      document.querySelector('input[placeholder="First Name"]').value =
        formData.firstName || "";
      document.querySelector('input[placeholder="Last Name"]').value =
        formData.lastName || "";
      document.getElementById("dob").value = formData.dob || "";
      document.getElementById("age").value = formData.age || "";
      document.querySelector('input[placeholder="Phone Number"]').value =
        formData.phone || "";
      document.querySelector('input[placeholder="Email Address"]').value =
        formData.email || "";
      document.querySelector('input[placeholder="Country"]').value =
        formData.country || "";
      document.querySelector('input[placeholder="State"]').value =
        formData.state || "";
      document.querySelector('input[placeholder="District"]').value =
        formData.district || "";
      document.querySelector('input[placeholder="Locality"]').value =
        formData.locality || "";
      document.querySelector('input[placeholder="Pincode"]').value =
        formData.pincode || "";
      document.querySelector('textarea[placeholder="Full Address"]').value =
        formData.address || "";
      document.getElementById("idType").value = formData.idType || "";

      // Load images if they were saved
      if (
        formData.profileImage &&
        formData.profileImage !== "/assets/default-avatar.png"
      ) {
        previewImage.src = formData.profileImage;
      }

      if (formData.idProofPreview && formData.idProofPreview !== "data:,") {
        idPreviewImage.src = formData.idProofPreview;
        previewContainer.style.display = "block";
        dropzone.querySelector(".dropzone-content").style.display = "none";
        const fileName = formData.idType
          ? `${formData.idType} ID Proof`
          : "ID Proof";
        fileNameDisplay.textContent = fileName;
      } else {
        idPreviewImage.src = "";
        previewContainer.style.display = "none";
        dropzone.querySelector(".dropzone-content").style.display = "flex";
        fileNameDisplay.textContent = "";
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

  // Modify form submission to clear storage on successful submission
  const originalSubmit = form.onsubmit;
  form.onsubmit = function (e) {
    if (originalSubmit) {
      originalSubmit.call(this, e);
    }
    // Clear storage only if form submission is successful
    // This will be handled in your existing AJAX success callback
    // localStorage.removeItem('doctorFormStep1');
  };
});
