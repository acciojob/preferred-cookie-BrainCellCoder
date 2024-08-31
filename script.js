// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply the saved preferences
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.getElementById('fontsize').value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Event listener for the form submission
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  setCookie("fontsize", fontSize, 365);
  setCookie("fontcolor", fontColor, 365);

  applyPreferences();
});

// Apply the preferences when the page loads
window.onload = applyPreferences;
