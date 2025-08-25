document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact__form');
  const notifications = document.getElementById('notifications');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      showNotification("✅ Message sent successfully!", "success");
      form.reset();
    } else {
      showNotification("❌ Something went wrong. Please try again!", "error");
    }
  });

  function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;

    notifications.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 3400);
  }
});
