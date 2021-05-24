/* eslint-disable no-unused-vars */
/**
 * Adds new tweet
 * @param {object} tweet 
 * @param {PostModel} postModel 
 * @param {FeedView} feedView 
 */
function addTweet(tweet, postModel, feedView) {
    if (postModel.add(tweet)) {
        feedView.tweetViewer.drawTweet(tweet);
        return true;
    } else {
        return false;
    }
}

/**
 * Edits an existing tweet
 * @param {string} id 
 * @param {object} changes 
 * @param {PostModel} postModel 
 * @param {FeedView} feedView 
 */
function editTweet(id, changes, postModel, feedView) {
    if (postModel.edit(id, changes)) {
        feedView.tweetViewer.redrawTweet(id, postModel.get(id));
        return true;
    } else {
        return false;
    }
}

/**
 * Deletes tweet
 * @param {string} id 
 * @param {PostModel} postModel 
 * @param {FeedView} feedView 
 */
function deleteTweet(id, postModel, feedView) {
    if (postModel.remove(id)) {
        feedView.tweetViewer.deleteTweet(id);
        return true;
    } else {
        return false;
    }
}

/**
 * Shows tweets in the feed
 * @param {onbject} filterConfig 
 * @param {PostModel} postModel 
 * @param {FeedView} feedView 
 */
function showFeed(filterConfig = {}, postModel, feedView) {
    feedView.redrawTweets(postModel.getPage(0, 10, filterConfig));
}
