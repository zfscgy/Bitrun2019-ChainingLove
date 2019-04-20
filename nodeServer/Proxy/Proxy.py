from flask import Flask, request, send_from_directory
from requests import get, post
origin_site = "wss://testnet.gxchain.org/"
app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello():
    return "Hello, World!"


@app.route('/client/<path:path>')
def get_file(path):
    return send_from_directory("../", path)


@app.route('/proxy/<path:path>', methods=["POST"])
def proxy(path):
    post_data = request.json
    response = post(origin_site + path, json=post_data)
    response.headers.update({"Access-Control-Allow-Origin": "*"})
    return response.text




if __name__ == "__main__":
    # the default port of https protocol is 443
    app.run("127.0.0.1", debug=True, port=80)