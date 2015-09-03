from flask import Flask, jsonify, redirect, send_from_directory

from server_utils import crossdomain
import twitter_api

app = Flask("Twitter Backend")

@app.before_first_request
def initialize():
    twitter_api.init()
    pass

@app.route("/")
@crossdomain("*")
def display_root():
    return redirect("/app/index.html")

@app.route("/tweets/<userName>")
@crossdomain("*")
def display_tweets(userName):
    resp = twitter_api.get_tweets(userName)

    if resp['data']:
        return jsonify({'tweets': resp['data']})
    else:
        return jsonify({'tweets': None, 'error': resp['error']}), 404

@app.route("/app/<path:filePath>")
@crossdomain("*")
def serve_static(filePath):
    return send_from_directory("../client/", filePath);

if __name__ == "__main__":
    app.debug = True
    app.run()
