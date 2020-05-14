/* eslint-disable no-unused-vars */
/**
 * FeedView class
 */
class FeedView {
    tweetViewer = new TweetView(true);
    _addTemplate =
        document.getElementById('add-template');
    feed = document.querySelector('[class="feed"]');


    /**
    * Creates a new object
    * @param {array} tweets
    * @param {array} users
    * @param {object} userData
    */
    constructor(tweets, users, userData) {
        if (userData.author !== undefined) {
            this.tweetViewer.isGuest = false;
            this.drawTweetAddForm(userData);
        }
        this.fillFilter(users);
        this.drawTweets(tweets);
    }

    /**
     * Draws new tweets
     * @param {array} tweets 
     */
    drawTweets(tweets) {
        tweets.reverse().forEach(
            (tweet) => this.tweetViewer.drawTweet(tweet));
    }

    /**
     * Redraws existing tweets
     * @param {array} tweets 
     */
    redrawTweets(tweets) {
        let oldTweets = this.tweetViewer
            .feedPosts.querySelectorAll('article');
        Array.prototype.forEach.call(oldTweets,
            (oldTweet) => this.tweetViewer.feedPosts.removeChild(oldTweet));

        this.drawTweets(tweets);
    }

    /**
     * Adds to filter lists of users to choose
     * @param {array} users 
     */
    fillFilter(users) {
        let filter = document.getElementById('users-filter');

        users.forEach((user) => filter.appendChild(this._createOption(user)));
    }

    /**
     * Adds to filter one user 
     * @param {string} user 
     */
    _createOption(user) {
        let option = document.createElement('option');

        option.textContent = user;

        return option;
    }

    /**
     * Draws the form for adding tweets
     * @param {object} userData 
     */
    drawTweetAddForm(userData) {
        let tweetAddForm =
            document.importNode(this._addTemplate.content, true);
        tweetAddForm.id = 'tweet-add-form';

        let profilePhoto = tweetAddForm.querySelector('[data-target="photoLink"]');
        profilePhoto.src = userData.photoLink;

        let author = tweetAddForm.querySelector('[data-target="author"]');
        author.textContent = '@' + userData.author;

        this.feed.insertBefore(tweetAddForm, this.tweetViewer.feedPosts);
    }

    /**
     * Removes the form for adding tweets
     */
    removeTweetAddForm() {
        let form = this.feed.getElementById('tweet-add-form');
        this.feed.removeChild(form);
    }
}