async function GetList() {
  const token = localStorage.getItem("BearerToken");
  const proxyUrl = "http://localhost:8080/";
  const apiUrl =
    "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.table(data);
      const tableBody = document.querySelector("#customerTable tbody");
      tableBody.innerHTML = "";

      data.forEach((customer) => {
        const row = document.createElement("tr");
        Object.keys(customer).forEach((key) => {
          if (key !== "uuid") {
            const cell = document.createElement("td");
            cell.textContent = customer[key];
            row.appendChild(cell);
          }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-button");
        deleteBtn.addEventListener("click", () => {
          console.log("Delete button clicked for:", customer.uuid);
          deleteCustomer(customer.uuid);
        });
        const overlay = document.getElementById("overlay");
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => {
          const firstNameInput = document.getElementById("firstName");
          const lastNameInput = document.getElementById("lastName");
          const streetInput = document.getElementById("street");
          const addressInput = document.getElementById("address");
          const cityInput = document.getElementById("city");
          const stateInput = document.getElementById("state");
          const emailInput = document.getElementById("email");
          const phoneInput = document.getElementById("phone");

          firstNameInput.value = customer.first_name;
          lastNameInput.value = customer.last_name;
          streetInput.value = customer.street;
          addressInput.value = customer.address;
          cityInput.value = customer.city;
          stateInput.value = customer.state;
          emailInput.value = customer.email;
          phoneInput.value = customer.phone;
          overlay.style.display = "block";

          const updateForm = document.getElementById("updateForm");
          updateForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const updatedData = {
              first_name: firstNameInput.value,
              last_name: lastNameInput.value,
              street: streetInput.value,
              address: addressInput.value,
              city: cityInput.value,
              state: stateInput.value,
              email: emailInput.value,
              phone: phoneInput.value,
            };
            console.log(updatedData);
            updateCustomer(customer.uuid, updatedData);
            overlay.style.display = "none";
          });

          console.log("Update button clicked for:", customer.uuid);
        });

        const actionCell = document.createElement("td");
        actionCell.appendChild(deleteBtn);
        actionCell.appendChild(updateBtn);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
      });
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
function closeOverlay() {
  overlay.style.display = "none";
}
async function deleteCustomer(customerUUID) {
  const token = localStorage.getItem("BearerToken");
  const proxyUrl = "http://localhost:8080/";
  const apiUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${customerUUID}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: "POST",
      headers: headers,
    });

    if (response.status === 200) {
      console.log("User deleted successfully");
      GetList();
    } else {
      console.log("Failed to delete user");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  GetList();
});

async function updateCustomer(uuid, updatedData) {
  console.log("in update");
  console.log(uuid);
  console.log(updatedData);

  const token = localStorage.getItem("BearerToken");
  const proxyUrl = "http://localhost:8080/";
  const apiUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(updatedData),
    });
    const data = await response.text();
    console.log(data);
    console.log(response);
    if (response.status === 200) {
      console.log("User updated successfully");
      GetList();
    } else {
      console.log("Failed to update user");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function redirectToCreatePage() {
  window.location.href = "create.html";
}
