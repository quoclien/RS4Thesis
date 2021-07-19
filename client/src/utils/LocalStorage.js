export function SetAccessToken(token) {
    localStorage.setItem("token", token)
};

export function GetAccessToken() {
    return localStorage.getItem("token")
};

export function SetUserId(id) {
    localStorage.setItem("user_id", id)
};

export function GetUserId() {
    return localStorage.getItem("user_id")
};

export function ClearStorage() {
    localStorage.clear()
};

export function SetViewingProduct(product) {
    localStorage.setItem("product", product)
}

export function GetViewingProduct() {
    return localStorage.getItem("product")
}
