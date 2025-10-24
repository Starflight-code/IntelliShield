window.addEventListener("load", async () => {
  let username = window.location.href.split("#")[1];

  let contacts = await fetch("./static/contacts.json");
  let contacts_json = await contacts.json();
  let current_user = null;

  for (let contact of contacts_json) {
    if (contact["username"] === username) {
      current_user = contact;
      break;
    }
  }
  if (current_user === null) {
    console.error("Invalid Username Provided, Failed!");
    return;
  }

  document.getElementById("name").textContent = `${current_user["firstName"]} ${current_user["lastName"]}`;
  document.getElementById("userinfo").innerHTML = `
    Username: ${current_user["username"]} <br />
    Status: ${current_user["status"]} <br />
    Last Updated: ${current_user["lastUpdated"]} <br />
  `;
  let event_log = document.getElementById("event-log");
  for (let alert of current_user["alerts"]) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("mb-2");
    div.innerHTML = `
        <div class="row g-0">
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${alert["type"]}</h5>
              <p class="card-text">
                From: ${current_user["firstName"]} ${current_user["lastName"]}<br />Severity: ${alert["severity"]}
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <img src="${current_user['image']}" class="img-fluid rounded-start" style="max-height: 150px" alt="${current_user["firstName"]} ${current_user["lastName"]}">
          </div>`
    event_log.appendChild(div);
  }

  console.log(current_user);
})
