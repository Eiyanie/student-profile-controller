// ==========================================================
// Interactive Student Profile Controller
// ==========================================================

// ---------- Initial / default profile data (used for Reset) ----------
const INITIAL_PROFILE = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
};

// ---------- DOM Selection (getElementById: 4+ required) ----------
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

// querySelector usage (at least one required)
const profileCardBySelector = document.querySelector(".profile-card");

// ---------- Validation / formatting helpers ----------

/**
 * Returns true when the trimmed name has at least 2 characters.
 */
function isValidStudentName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

/**
 * Maps the raw status value ("active" / "inactive") to display text.
 */
function formatStudentStatus(status) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "";
}

// ---------- State-changing functions ----------

/**
 * Updates the status text, dataset.status, and active/inactive classes
 * on the profile card.
 */
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

/**
 * Validates the form and, if valid, updates the profile card using the
 * current control values. Uses textContent only (never innerHTML) for
 * any user-controlled value.
 */
function updateProfile() {
  if (!nameInput || !profileName || !formMessage) return;

  const enteredName = nameInput.value;

  if (!isValidStudentName(enteredName)) {
    formMessage.textContent = "Student name is required";
    return;
  }

  // Safe: textContent treats the value as plain text, never HTML.
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

/**
 * Shows or hides the details panel using classList.toggle().
 */
function toggleDetails() {
  if (!detailsPanel) return;
  detailsPanel.classList.toggle("hidden");
}

/**
 * Toggles the dark-theme class on document.body.
 */
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

/**
 * Restores the exact initial profile data, status, controls, message,
 * details visibility, and theme.
 */
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

// ---------- Initial render (ensures dataset-driven display is in sync) ----------

function initProfile() {
  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }
  setStatus(profileCard ? profileCard.dataset.status : INITIAL_PROFILE.status);
}

// ---------- Event listeners ----------

if (updateBtn) updateBtn.addEventListener("click", updateProfile);
if (toggleDetailsBtn) toggleDetailsBtn.addEventListener("click", toggleDetails);
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
if (resetBtn) resetBtn.addEventListener("click", resetProfile);

initProfile();
