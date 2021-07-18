export function SetAccessToken(token) {localStorage.setItem("token", token)};
export function GetAccessToken() {return localStorage.getItem("token")};
export function ClearStorage() {localStorage.clear()};
export function SetViewingProductId(product) {localStorage.setItem("productId", product)}
export function GetViewingProductId() { return localStorage.getItem("productId")}
