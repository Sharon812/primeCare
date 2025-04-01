document.addEventListener("DOMContentLoaded", function () {
  // Sample appointments data
  const appointments = [
    { id: 1, patient: "Jane Smith", time: "09:00 AM", type: "Check-up" },
    { id: 2, patient: "Mike Johnson", time: "10:30 AM", type: "Follow-up" },
    { id: 3, patient: "Sarah Wilson", time: "02:00 PM", type: "Consultation" },
  ];

  // Populate appointments list with animations
  const appointmentsList = document.querySelector(".appointments-list");
  if (appointmentsList) {
    appointments.forEach((appointment, index) => {
      const appointmentItem = document.createElement("div");
      appointmentItem.classList.add("appointment-item");
      appointmentItem.setAttribute("data-aos", "fade-left");
      appointmentItem.setAttribute("data-aos-delay", `${(index + 1) * 100}`);
      appointmentItem.innerHTML = `
                <div class="appointment-info">
                    <h3>${appointment.patient}</h3>
                    <p>${appointment.time} - ${appointment.type}</p>
                </div>
            `;
      appointmentsList.appendChild(appointmentItem);
    });
  }

  // Handle sidebar navigation
  const navLinks = document.querySelectorAll(".nav-links li");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Modal functionality
  const modal = document.getElementById("signupModal");
  if (modal) {
    setTimeout(() => {
      modal.classList.add("show");
    }, 3000);

    // Close modal function
    window.closeModal = function () {
      modal.classList.add("removing");
      setTimeout(() => {
        modal.classList.remove("show", "removing");
      }, 300);
    };

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});
