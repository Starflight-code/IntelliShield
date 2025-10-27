window.addEventListener("load", async () => {
  const element_ids = ["check-in-btn", "confirmation-check-in-btn", "location-share-btn"]
  for (element of element_ids) {
    document.getElementById(element).addEventListener("change", (e) => {
      let checkbox = e.target;
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      switch (checkbox.checked) {
        case true:
          label.textContent = "Enabled";
          break;
        case false:
          label.textContent = "Disabled";
          break;
      }
    });
  }

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let validation = document.getElementById("validationInvite");
    let textbox = document.getElementById("invite-username");

    if (textbox.value.trim().length !== 0) {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = textbox.value.trim();
      contact_list.appendChild(li);
      textbox.classList.remove("is-invalid");

      validation.classList.add("hidden");
      textbox.value = "";
    } else {
      textbox.classList.add("is-invalid");
      validation.classList.remove("hidden");
      validation.textContent = "Please enter a username"
    }
  });

  let contacts = await fetch("./data.json");
  let contacts_json = await contacts.json();
  let contact_list = document.getElementById("emergency-contact-list");
  for (let contact of contacts_json) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${contact.firstName} ${contact.lastName}`;
    contact_list.appendChild(li);
  }
});
