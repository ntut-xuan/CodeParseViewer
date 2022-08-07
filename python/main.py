from flask import *

app = Flask(__name__, static_url_path="")

@app.route("/static/<path:path>")
def returnStaticFile(path):
	return send_from_directory('../static', path)

@app.route("/", methods=["GET"])
def index():
    return open("../src/html/index.html", "r").read()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)