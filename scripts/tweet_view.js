/* eslint-disable no-unused-vars */
/**
 * TweetView class
 */
class TweetView {
    isGuest = false;
    feedPosts = document.querySelector('[class="feed-posts"]');
    _postTemplate = document.getElementById('post-template');

    /**
     * Creates an object
     * @param {boolean} isGuest 
     */
    constructor(isGuest) {
        this.isGuest = isGuest;
    }

    /**
     * Draws new tweet
     * @param {object} tweetData 
     */
    drawTweet(tweetData) {
        let newTweet = document.importNode(this._postTemplate.content, true);

        this._fillTweetData(newTweet, tweetData);

        let article = newTweet.querySelector('article');
        if (this.isGuest === true) {
            article.appendChild(this._drawLike());
        } else {
            article.appendChild(this._drawTweetButtons());
        }

        this.feedPosts.insertBefore(newTweet, this.feedPosts.firstChild);
    }

    /**
     * Redraws an existing tweet
     * @param {string} id 
     * @param {object} newTweetData 
     */
    redrawTweet(id, newTweetData) {
        let oldTweet = document.getElementById(id);

        let newTweet = document.importNode(this._postTemplate.content, true);

        this._fillTweetData(newTweet, newTweetData);

        let article = newTweet.querySelector('article');
        if (this.isGuest === true) {
            article.appendChild(this._drawLike());
        } else {
            article.appendChild(this._drawTweetButtons());
        }

        this.feedPosts.replaceChild(newTweet, oldTweet);
    }

    /**
     * Deletes tweet
     * @param {string} id 
     */
    deleteTweet(id) {
        let tweet = document.getElementById(id);
        this.feedPosts.removeChild(tweet);
    }

    /**
     * Fills a tweet with data
     * @param {node} newTweet 
     * @param {object} tweetData 
     */
    _fillTweetData(newTweet, tweetData) {
        let article = newTweet.querySelector('article');
        article.id = tweetData.id;

        let profilePhoto = newTweet.querySelector('[data-target="photoLink"]');
        profilePhoto.src = tweetData.photoLink;

        let author = newTweet.querySelector('[data-target="author"]');
        author.textContent = '@' + tweetData.author;

        let createdAt = newTweet.querySelector('[data-target="createdAt"]');
        createdAt.textContent = tweetData.createdAt.toDateString();

        let description = newTweet.querySelector('[data-target="description"]');
        description.textContent = tweetData.description;

        let tags = newTweet.querySelector('[data-target="tags"]');
        tweetData.tags.every(tag => tags.appendChild(this._createTag(tag)));
    }

    /**
     * Creates a new tag
     * @param {string} tagText 
     * @return {node}
     */
    _createTag(tagText) {
        let tag = document.createElement('li');
        tag.className = 'feed-post-tag';
        tag.textContent = '#' + tagText;

        return tag;
    }

    /**
     * Draws likes
     */
    _drawLike() {
        let div = document.createElement('div');
        div.className = 'feed-post-buttons';

        let image = document.createElement('img');
        image.src = '../UI/icons/like.jpg';
        image.alt = 'likes';

        div.appendChild(image);

        return div;
    }

    /**
     * Draws tweet buttons
     * @return {node}
     */
    _drawTweetButtons() {
        let buttons = document.createElement('div');
        buttons.className = 'feed-post-buttons';

        buttons.appendChild(this._drawTweetButton('delete'));
        buttons.appendChild(this._drawTweetButton('edit'));
        buttons.appendChild(this._drawTweetButton('like'));

        return buttons;
    }

    /**
     * Draws a tweet type button
     * @param {string} type 
     * @return {node}
     */
    _drawTweetButton(type) {
        let button = document.createElement('button');
        button.className = 'button feed-post-button-' + type;

        let image = document.createElement('img');
        image.src = '../UI/icons/' + type + '.jpg';
        image.alt = type + ' button';
        button.appendChild(image);

        return button;
    }
}
