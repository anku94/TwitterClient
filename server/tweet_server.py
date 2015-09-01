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
    if userName == "anku94":
        tweets = []
        tweets.append("RT @User1: #Abc #def tweet first");
        tweets.append("RT @User2: #NewHashTag #coolShitBrah tweet first");
        tweets.append("RT @User3: #NewHashTag #coolShitBrah tweet first");
        tweets.append("RT @User4: @hiianubhav @kansal.k #NewHashTag #coolShitBrah tweet first");
        for idx, i in enumerate(tweets):
            tweets[idx] = {"tweet": i}
        return jsonify({'tweets': tweets})

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
