window.addEventListener("load", async () => {
  let people_col = document.getElementById("people-list");
  let contacts = await fetch("./static/data.json");
  let contacts_json = await contacts.json();

  for (let contact of contacts_json) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("mb-2");
    div.innerHTML = `
        <div class="row g-0">
          <div class="col-11">
            <div class="card-body">
              <h5 class="card-title">${contact["firstName"]} ${contact["lastName"]}</h5>
              <p class="card-text">
                Status: ${contact["status"]}
                <br />
                <a type="button" class="btn btn-primary mt-2" href="person.html#${contact['username']}">View Page</a>
              </p>
            </div>
          </div>
          <div class="col-1">
            <img src="${contact['image']}" class="img-fluid rounded-start" style="max-height: 150px" alt="${contact["firstName"]} ${contact["lastName"]}">
          </div>`
    people_col.appendChild(div);
  }
}
)
