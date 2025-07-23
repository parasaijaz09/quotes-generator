function generateQuote() {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");

  quoteEl.innerText = "⏳ Loading...";
  authorEl.innerText = "";

fetch("quotes.json")
  .then(res => res.json())
  .then(data => {
    const random = data[Math.floor(Math.random() * data.length)];
    quoteEl.innerText = `"${random.quote}"`;
    authorEl.innerText = `— ${random.author}`;
  })
  .catch(err => {
    quoteEl.innerText = "⚠️ Could not load quote.";
    authorEl.innerText = "";
    console.error(err);
  });

}

// Copy to Clipboard Functionality
copyBtn.addEventListener("click", () => {
  const quote = document.getElementById("quote").innerText;

// Creating a temporary textarea
const textarea = document.createElement("textarea");
textarea.value = quote;
document.body.appendChild(textarea);
textarea.select();

try {
  document.execCommand("copy");
  alert("Quote copied to clipboard!");
} catch (err) {
  alert("Failed to copy quote.");
}

  document.body.removeChild(textarea);
});

// Speak Quote Functionality
const speakBtn = document.getElementById("speakBtn");

speakBtn.addEventListener("click", () => {
  const quote = document.getElementById("quote").innerText;
  const speech = new SpeechSynthesisUtterance(quote);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
});

// Auto Refresh Functionality
let autoRefresh = false;
let refreshInterval;

const autoRefreshBtn = document.getElementById("autoRefreshBtn");

autoRefreshBtn.addEventListener("click", () => {
  autoRefresh = !autoRefresh;

  autoRefreshBtn.innerText = `🔁 Auto Refresh: ${autoRefresh ? 'ON' : 'OFF'}`;

  if (autoRefresh) {
    refreshInterval = setInterval(generateQuote, 10000);
  } else {
    clearInterval(refreshInterval);
  }
});

// Share on WhatsApp or Twitter
const whatsappBtn = document.getElementById("whatsappBtn");
const twitterBtn = document.getElementById("twitterBtn");

whatsappBtn.addEventListener("click", () => {
  const quote = document.getElementById("quote").innerText;
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(quote)}`;
  window.open(whatsappURL, "_blank");
});

twitterBtn.addEventListener("click", () => {
  const quote = document.getElementById("quote").innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
  window.open(twitterURL, "_blank");
});
