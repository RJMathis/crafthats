# from main import db
from main import app
from models import db

if __name__ == '__main__':
    print('Creating all database tables...')
    db.create_all(app=app)
    print('Done!')
# [END all]