#This is where the routes are defined. It may be split into a package
# of its own (yourapp/views/) with related views grouped together into modules.
from main import app

@app.route('/')
def home():
    # x = db.session.query(Beer).all()
    return "hello world"

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500