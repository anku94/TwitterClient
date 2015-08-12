from flask import Flask, jsonify
from server_utils import crossdomain
import twitter_api

app = Flask("Twitter Backend")

@app.before_first_request
def initialize():
    twitter_api.init()

@app.route("/")
@crossdomain("*")
def display_root():
    return "Home page of the Twitter Backend"

@app.route("/tweets/<userName>")
@crossdomain("*")
def display_tweets(userName):
    resp = twitter_api.get_tweets(userName)

    if resp['data']:
        return jsonify({'tweets': resp['data']})
    else:
        return jsonify({'tweets': None, 'error': resp['error']})

if __name__ == "__main__":
    app.debug = True
    app.run()
