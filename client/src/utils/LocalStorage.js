export function SetAccessToken(token) {localStorage.setItem("token", token)};
export function GetAccessToken() {return localStorage.getItem("token")};
export function clearStorage() {localStorage.clear()};

