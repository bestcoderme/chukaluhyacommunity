// ⚠️ REPLACE THIS with your deployed Apps Script Web App URL (ends in /exec)
const API_URL = "https://script.google.com/macros/s/AKfycbxIJa7J03NJMSWBgerVRBq76GPr7v3Rpza8ZKlqFpALzzUn0CxCjMlS6UsyFa_4qLgE/exec";

// ⚠️ REPLACE THIS with a direct image URL for your logo (e.g. an Imgur link,
// a GitHub-hosted image raw URL, or any public image link ending in .png/.jpg)
const LOGO_URL = "PASTE_YOUR_LOGO_IMAGE_URL_HERE";

// Sets the logo on every page — called automatically below.
// Stays hidden until a real LOGO_URL is set, so no broken-image icon shows.
function loadLogo() {
  const el = document.getElementById('siteLogo');
  if (el && LOGO_URL && !LOGO_URL.startsWith('PASTE_')) {
    el.src = LOGO_URL;
    el.style.display = 'block';
  }
}
document.addEventListener('DOMContentLoaded', loadLogo);

const COUNTIES = [
  "Mombasa","Kwale","Kilifi","Tana River","Lamu","Taita-Taveta","Garissa","Wajir","Mandera",
  "Marsabit","Isiolo","Meru","Tharaka-Nithi","Embu","Kitui","Machakos","Makueni","Nyandarua",
  "Nyeri","Kirinyaga","Murang'a","Kiambu","Turkana","West Pokot","Samburu","Trans Nzoia",
  "Uasin Gishu","Elgeyo-Marakwet","Nandi","Baringo","Laikipia","Nakuru","Narok","Kajiado",
  "Kericho","Bomet","Kakamega","Vihiga","Bungoma","Busia","Siaya","Kisumu","Homa Bay",
  "Migori","Kisii","Nyamira","Nairobi"
];

// Call the API. `payload` is a plain object; `action` matches a case in Code.gs
async function callApi(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight on Apps Script
    body: JSON.stringify({ action, payload })
  });
  return res.json();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
