window.addEventListener("load", () => {
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
});
