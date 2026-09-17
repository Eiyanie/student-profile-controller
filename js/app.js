const INITIAL_PROFILE = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
};

const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");
const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

const profileCardBySelector = document.querySelector(".profile-card");

function isValidStudentName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

function formatStudentStatus(status) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "";
}

function setStatus(status) {
  if (!profileCard || !profileStatus) return;

  const normalized = status === "inactive" ? "inactive" : "active";

  profileCard.dataset.status = normalized;
  profileStatus.textContent = formatStudentStatus(normalized);

  if (normalized === "active") {
    profileCard.classList.add("active");
    profileCard.classList.remove("inactive");
  } else {
    profileCard.classList.add("inactive");
    profileCard.classList.remove("active");
  }
}

function updateProfile() {
  if (!nameInput || !profileName || !formMessage) return;

  const enteredName = nameInput.value;

  if (!isValidStudentName(enteredName)) {
    formMessage.textContent = "Student name is required";
    return;
  }

  profileName.textContent = enteredName.trim();

  if (profileProgram) {
    profileProgram.textContent = programInput.value;
  }

  if (profileYear) {
    profileYear.textContent = yearInput.value;
  }

  setStatus(statusInput.value);

  formMessage.textContent = "";
}

function toggleDetails() {
  if (!detailsPanel) return;
  detailsPanel.classList.toggle("hidden");
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

function resetProfile() {
  if (profileName) profileName.textContent = INITIAL_PROFILE.name;
  if (profileProgram) profileProgram.textContent = INITIAL_PROFILE.program;
  if (profileYear) profileYear.textContent = INITIAL_PROFILE.year;

  setStatus(INITIAL_PROFILE.status);

  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }

  if (nameInput) nameInput.value = "";
  if (programInput) programInput.value = INITIAL_PROFILE.program;
  if (yearInput) yearInput.value = INITIAL_PROFILE.year;
  if (statusInput) statusInput.value = INITIAL_PROFILE.status;

  if (formMessage) formMessage.textContent = "";

  if (detailsPanel) detailsPanel.classList.remove("hidden");

  document.body.classList.remove("dark-theme");
}

function initProfile() {
  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }
  setStatus(profileCard ? profileCard.dataset.status : INITIAL_PROFILE.status);
}

if (updateBtn) updateBtn.addEventListener("click", updateProfile);
if (toggleDetailsBtn) toggleDetailsBtn.addEventListener("click", toggleDetails);
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
if (resetBtn) resetBtn.addEventListener("click", resetProfile);

initProfile();