window.onload = function () {
  me();
};

async function signup() {
  const username = document.getElementById("username-signup").value;
  const password = document.getElementById("password-signup").value;

  if (!username || !password) {
    console.log("Please fill in both username and password fields.");
    return;
  }

  const data = {
    username: username,
    password: password,
  };

  const url = "http://localhost:3000/sign-up";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const responseData = await response.json();
  } catch (error) {
    console.error("Error during signup:", error);
  }
}

async function signin() {
  const username = document.getElementById("username-signin").value;
  const password = document.getElementById("password-signin").value;

  if (!username || !password) {
    console.log("Please fill in both username and password fields.");
    return;
  }

  const data = {
    username: username,
    password: password,
  };

  const url = "http://localhost:3000/sign-in";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const responseData = await response.json();
    const token = responseData.token;

    localStorage.setItem("token", token);

    me();
  } catch (error) {
    console.error("Error during signin:", error);
  }
}

async function me() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, please sign in first.");
    return;
  }

  const url = "http://localhost:3000/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const responseData = await response.json();
    updateUserDetails(responseData);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
function updateUserDetails(data) {
  const usernameDiv = document.getElementById("username");
  const passwordDiv = document.getElementById("password");
  if (usernameDiv && passwordDiv) {
    usernameDiv.textContent = data.payload.username;
    passwordDiv.textContent = data.payload.password;
  } else {
    console.error("User detail elements not found in the DOM.");
  }
}
