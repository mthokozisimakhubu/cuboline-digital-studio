"use strict";

// Replace with your WhatsApp number: country code + number, digits only.
const WHATSAPP_NUMBER = "27765565176";

const form = document.getElementById("contact-form");
const whatsappButton = document.getElementById("whatsapp-button");
const statusMessage = document.getElementById("form-status");

// Submit the enquiry to Formspree without leaving the page.
if (form && statusMessage) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    statusMessage.textContent = "Sending your enquiry...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("The enquiry could not be sent.");
      }

      statusMessage.textContent =
        "Thank you! Your enquiry was submitted successfully. We'll be in touch.";
      form.reset();
    } catch (error) {
      statusMessage.textContent =
        "Sorry, your enquiry could not be sent. Please try again or contact us on WhatsApp.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Enquiry";
    }
  });
}

// Prepare an enquiry in WhatsApp.
if (form && whatsappButton) {
  whatsappButton.addEventListener("click", function () {
    if (!form.reportValidity()) return;

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      alert("WhatsApp is not configured yet. Please set your number in script.js.");
      return;
    }

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const service = form.elements["service"].value;
    const message = form.elements["message"].value.trim();

    const text =
      "Hello Cuboline Digital Studio!\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Service: " + service + "\n" +
      "Project details: " + message;

    const url =
      "https://wa.me/" + WHATSAPP_NUMBER +
      "?text=" + encodeURIComponent(text);

    window.open(url, "_blank", "noopener,noreferrer");
  });
}


const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });
}
