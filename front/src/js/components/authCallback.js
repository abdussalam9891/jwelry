const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const user = params.get("user");

if (token && user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", decodeURIComponent(user));

  // get redirect
  const redirect = localStorage.getItem("redirectAfterLogin");

  if (redirect) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else {
    window.location.href = "../index.html";
  }
}
