document
  .getElementById("createForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const token = localStorage.getItem("BearerToken");

    const { first, last, street, address, city, state, email, phone } =
      this.elements;
    var requestBody = {
      first_name: first.value,
      last_name: last.value,
      street: street.value,
      address: address.value,
      city: city.value,
      state: state.value,
      email: email.value,
      phone: phone.value,
    };
    console.log(requestBody);
    console.log(token);
    const proxyUrl = `http://localhost:8080/`;
    const apiUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    console.log(headers);
    try {
      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      const data = await response.text();
      if (response.status === 201) {
        console.log("user created");
        console.log(response);
        console.log(data);
        window.location.href = "get.html";
      } else {
        console.log("failed");
        console.log(response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  });
