from api.product.product_router import product_blueprint
from api.user.router import user_blueprint
from api.train.ctf_rec.route import ctf_rec_blueprint
from api.train.iir_rec.router import iir_rec_blueprint
from api.train.ctp_rec.router import ctp_rec_blueprint
from api.train.ucf_rec.router import ucf_rec_blueprint
from api.train.pf_rec.router import pf_rec_blueprint
from api.train.ubr_rec.router import ubr_rec_blueprint

def init(app):
    CORS(app)
    app.register_blueprint(product_blueprint, url_prefix="/products")
    app.register_blueprint(user_blueprint, url_prefix="/user")
    app.register_blueprint(ctf_rec_blueprint, url_prefix="/ctf_rec")
    app.register_blueprint(iir_rec_blueprint, url_prefix="/iir_rec")
    app.register_blueprint(ctp_rec_blueprint, url_prefix="/ctp_rec")
    app.register_blueprint(ucf_rec_blueprint, url_prefix="/ucf_rec")
    app.register_blueprint(pf_rec_blueprint, url_prefix="/pf_rec")
    app.register_blueprint(ubr_rec_blueprint, url_prefix="/ubr_rec")