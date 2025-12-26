function login(e) {
  e.preventDefault();
  window.location.href = "dashboard.html";
}

function register(e) {
  e.preventDefault();
  window.location.href = "dashboard.html";
}

function goBuilder() {
  window.location.href = "builder.html";
}

function goDashboard() {
  window.location.href = "dashboard.html";
}
function goLogobuilder() {
  window.location.href = "logobuilder.html";
}
function goSettings() {
  window.location.href = "settings.html";
}

function generateWebsite() {
  alert("AI is generating your website...");
}

function saveSettings() {
  alert("Settings saved!");
}

document.getElementById("loginForm").addEventListener("submit", login);
document.getElementById("registerForm").addEventListener("submit", register);
document.getElementById("builderBtn").addEventListener("click", goBuilder);
document.getElementById("settingsBtn").addEventListener("click", goSettings);
document.getElementById("generateBtn").addEventListener("click", generateWebsite);
document.getElementById("saveSettingsBtn").addEventListener("click", saveSettings); 

// Note: Ensure that the HTML elements with the specified IDs exist in your HTML files.

async function generateWebsite() {
  const data = {
    businessName: "Sandra Salon",
    businessType: "Salon",
    description: "Hair styling and beauty services"
  };

  const response = await fetch("http://localhost:5000/api/ai/generate-website", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  document.querySelector(".preview-box").innerText = result.content;
}
document.getElementById("generateBtn").addEventListener("click", generateWebsite);



