document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("Id").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    const proxyUrl = `http://localhost:8080/`;
    const apiUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp`;

    try {
      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        console.log(token);
        localStorage.setItem("BearerToken", token);
        window.location.href = "get.html";
      } else {
        document.getElementById("loginMessage").textContent =
          "Login failed. Please check your credentials.";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("loginMessage").textContent =
        "An error occurred. Please try again later.";
    }
  });
