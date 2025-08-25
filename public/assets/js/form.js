document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      let res = await fetch("https://formsubmit.co/ajax/iconicayansh@gmail.com", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        showPopup("✅ Your message was sent successfully!");
        form.reset();
      } else {
        showPopup("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      showPopup("⚠️ Error: " + err.message);
    }
  });

  function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 4000);
  }
});
