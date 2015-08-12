import sys
import HTMLParser
import ConfigParser
import twitter

CONSUMER_KEY = None
CONSUMER_SECRET = None
ACCESS_TOKEN_KEY = None
ACCESS_TOKEN_SECRET = None

api = None
hp = HTMLParser.HTMLParser()

def read_config():
    config = ConfigParser.ConfigParser()
    config.read("appConfig.ini")
    try:
        global CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET
        CONSUMER_KEY = config.get('Tokens', 'consumer_key')
        CONSUMER_SECRET = config.get('Tokens', 'consumer_secret')
        ACCESS_TOKEN_KEY = config.get('Tokens', 'access_token_key')
        ACCESS_TOKEN_SECRET = config.get('Tokens', 'access_token_secret')
    except Exception as e:
        print "\n\n\t\tInvalid Config File\n\n"
        sys.exit(0)


def init():
    read_config()
    global api
    api = twitter.Api(
            consumer_key = CONSUMER_KEY,
            consumer_secret = CONSUMER_SECRET,
            access_token_key = ACCESS_TOKEN_KEY,
            access_token_secret = ACCESS_TOKEN_SECRET
            );

def get_tweets(user_name):
    try:
        tweets = api.GetUserTimeline(screen_name=user_name, count=10)
    except twitter.TwitterError as e:
        return {'data': None, 'error': 'Invalid screen name'}
    else:
        tweetData = []
        for tweet in tweets:
            if tweet.retweeted_status:
                tweetData.append("RT @" + tweet.retweeted_status.user.screen_name + ": " + hp.unescape(tweet.retweeted_status.text))
            else:
                tweetData.append(hp.unescape(tweet.text))
        return {'data': tweetData}
