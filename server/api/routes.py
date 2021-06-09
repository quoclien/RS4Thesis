from api.product.product_router import product_blueprint
from api.train.ctf_rec.route import ctf_rec_blueprint
from api.train.iir_rec.router import iir_rec_blueprint

def init(app):
    app.register_blueprint(product_blueprint, url_prefix="/products")
    app.register_blueprint(ctf_rec_blueprint, url_prefix="/ctf_rec")
    app.register_blueprint(iir_rec_blueprint, url_prefix="/iir_rec")