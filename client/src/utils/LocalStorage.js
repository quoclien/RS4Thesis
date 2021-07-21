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
    localStorage.setItem("product", JSON.stringify(product))
}

export function GetViewingProduct() {
    return JSON.parse(localStorage.getItem("product"))
}

export function Set3RecentProducts(array) {
    localStorage.setItem("3RecentProducts", JSON.stringify(array))
}

export function Get3RecentProducts() {
    return JSON.parse(localStorage.getItem("3RecentProducts"))
}
export function SetUbrBody(ratings) {
    localStorage.setItem("ubrBody", JSON.stringify(ratings))
}

export function GetUbrBody() {
    return JSON.parse(localStorage.getItem("ubrBody"))
}
