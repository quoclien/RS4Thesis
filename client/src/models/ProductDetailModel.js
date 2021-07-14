export default class ProductDetailModel {
    constructor(_brand, _title, _subtitle, _imageUrl, _content, _subcontent, _descriptionTitle, _description, _extra) {
        this.brand = _brand;
        this.title = _title;
        this.subtitle = _subtitle;
        this.imageUrl = _imageUrl;
        this.content = _content;
        this.subcontent = _subcontent;
        this.descriptionTitle = _descriptionTitle;
        this.description = _description;
        this.extra = _extra;
    }
}