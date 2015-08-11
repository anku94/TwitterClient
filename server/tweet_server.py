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
    tweets = twitter_api.get_tweets(userName)
    return jsonify({'tweets': tweets})
    

if __name__ == "__main__":
    app.debug = True
    app.run()
