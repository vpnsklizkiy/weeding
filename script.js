 const hero = document.getElementById("inviteHero");
  const button = document.getElementById("openInvite");

  button.addEventListener("click", () => {
    hero.classList.add("is-open");

    setTimeout(() => {
      document.querySelector("#schedule")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 1900);
  });

  const countdown = document.querySelector(".countdown");

if (countdown) {
  const deadline = new Date(countdown.dataset.deadline).getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = deadline - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
    hoursEl.textContent = String(
      Math.floor((distance / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    minutesEl.textContent = String(
      Math.floor((distance / (1000 * 60)) % 60)
    ).padStart(2, "0");
    secondsEl.textContent = String(
      Math.floor((distance / 1000) % 60)
    ).padStart(2, "0");
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const rsvpForm = document.getElementById("rsvpForm");
const rsvpStatus = document.getElementById("rsvpStatus");

const TELEGRAM_BOT_TOKEN = "8641914052:AAG39R53eGDuu7ugMEOyvxHeF8GZmnN01P8";
const TELEGRAM_CHAT_ID = "2012325099";

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);

  const name = formData.get("name");
  const attendance = formData.get("attendance");
  const drinks = formData.getAll("drinks");

  const message = `
💌 Новая анкета гостя

👤 Фамилия и имя: ${name}

✅ Присутствие: ${attendance}

🥂 Напитки: ${drinks.length ? drinks.join(", ") : "Не выбрано"}
`;

  rsvpStatus.textContent = "Отправляем...";

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка отправки");
    }

    rsvpStatus.textContent = "Спасибо! Анкета отправлена.";
    rsvpForm.reset();
  } catch (error) {
    rsvpStatus.textContent = "Не получилось отправить. Попробуйте позже.";
  }
});

const dateTransform = document.querySelector(".date-transform");

if (dateTransform) {
  window.addEventListener("scroll", () => {
    const rect = dateTransform.getBoundingClientRect();
    const trigger = window.innerHeight * 0.45;

    if (rect.top < -trigger) {
      dateTransform.classList.add("is-active");
    } else {
      dateTransform.classList.remove("is-active");
    }
  });
}