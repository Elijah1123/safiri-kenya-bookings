from flask import Flask, send_file
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from config import Config
from models import db, User

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate = Migrate(app, db)
    from flask_cors import CORS

    CORS(app, origins=["http://localhost:8080"], supports_credentials=True)

    
    login_manager = LoginManager()
    login_manager.init_app(app)

    @app.route('/')
    def home():
        return send_file('static/index.html')
    
    @app.route('/<path:path>')
    def assets(path):
        return send_file(f'static/{path}')


    from routes.auth_routes import auth_bp
    from routes.bookings_routes import booking_bp
    from routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(booking_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api')

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
