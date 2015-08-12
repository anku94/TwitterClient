import flask
from server_utils import crossdomain
import twitter_api

app = flask.Flask("Twitter Backend")

@app.before_first_request
def initialize():
    twitter_api.init()

@app.route("/")
@crossdomain("*")
def display_root():
    return flask.redirect("/app/index.html")

@app.route("/tweets/<userName>")
@crossdomain("*")
def display_tweets(userName):
    resp = twitter_api.get_tweets(userName)

    if resp['data']:
        return flask.jsonify({'tweets': resp['data']})
    else:
        return flask.jsonify({'tweets': None, 'error': resp['error']})

@app.route("/app/<path:filePath>")
@crossdomain("*")
def serve_static(filePath):
    return flask.send_from_directory("../client/", filePath);

if __name__ == "__main__":
    app.debug = True
    app.run()
