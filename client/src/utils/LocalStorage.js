export function SetAccessToken(token) {localStorage.setItem("token", token)};
export function GetAccessToken() {return localStorage.getItem("token")};
export function ClearStorage() {localStorage.clear()};
export function SetViewingProduct(product) {localStorage.setItem("product", product)}
export function GetViewingProduct() { return localStorage.getItem("product")}
