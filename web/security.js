window.addEventListener("load", async () => {
  let contact_col = document.getElementById("contact-alerts-col");
  let contacts = await fetch("./static/contacts.json");
  let contacts_json = await contacts.json();

  for (let contact of contacts_json) {
    for (let alert of contact["alerts"]) {
      let div = document.createElement("div");
      div.classList.add("card");
      div.classList.add("mb-2");
      div.innerHTML = `
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${alert["type"]}</h5>
              <p class="card-text">
                From: ${contact["firstName"]} ${contact["lastName"]}<br />Severity: ${alert["severity"]}
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <img src="${contact['image']}" class="img-fluid rounded-start" style="max-height: 150px" alt="${contact["firstName"]} ${contact["lastName"]}">
          </div>`
      contact_col.appendChild(div);
    }
  }
})
