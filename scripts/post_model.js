/* eslint-disable no-unused-vars */
/**
 * PostModel class
 */
class PostModel {
  _posts = [];

  _ids = new Set();
  _standartFilter = {
    author: 'all',
    createdAt: new Date(),
    tags: [],
  }

  /**
   * Creates a new object
   * @param {array} posts
   */
  constructor(posts) {
    this._posts = posts.slice(0);
  }

  /**
   * Returns top posts skipping first skip posts that fit the filterConfig
   * @param {number} skip
   * @param {number} top
   * @param {number} filterConfig
   * @return {array}
   */
  getPage(skip = 0, top = 10, filterConfig) {
    const postsFilter = Object.assign({}, standartFilter, filterConfig);

    return this._posts.filter(function(item) {
      return (postsFilter.author === 'all' ||
              item.author === postsFilter.author) &&
              compareDate(item, postsFilter) >= 0 &&
              containTags(item, postsFilter.tags);
    })
        .sort(this._compareDate)
        .slice(skip, skip + top);
  }
  /**
   * Returns a post by its id
   * @param {string} id
   * @return {object}
   */
  get(id) {
    return this._isExist(id) ? this._posts[this._getIndex(id)] : null;
  }

  /**
   * Adds a post to the collection
   * @param {object} post
   * @return {boolean}
   */
  add(post) {
    if (PostModel.validate(post)) {
      this._posts.push(post);
      return true;
    }
    return false;
  }

  /**
   * Adds posts to the collection
   * @param {array} posts
   */
  addAll(posts) {
    const addPost = (post) => this.add(post);
    posts.every(addPost);
  }

  /**
   * Edit the post
   * @param {string} id
   * @param {object} changes
   * @return {boolean}
   */
  edit(id, changes) {
    if (!this._isExist(id)) {
      return false;
    }

    const isMutable = function(change) {
      return change !== 'id' &&
        change !== 'createdAt' &&
        change !== 'author';
    };

    const post = Object.assign({}, this.get(id));

    for (const change of Object.keys(changes)) {
      if (isMutable(change)) {
        post[change] = changes[change];
      } else {
        return false;
      }
    }

    if (PostModel.validate(post)) {
      this._posts[this._getIndex(id)] = Object.assign({}, post);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Removes the post by its id
   * @param {string} id
   */
  remove(id) {
    if (this._isExist(id)) {
      this._posts.splice(this._getIndex(id), 1);
    }
  }

  /**
   * Clears the collection
   */
  clear() {
    this._posts.splice(0, this._posts.length);
  }

  /**
   * Checks if the post is correct
   * @param {object} post
   * @return {boolean}
   */
  static validate(post) {
    return (post.id != undefined) &&
            post.description != undefined &&
            (post.author != undefined && post.author.length != 0);
  }


  /**
   * Gets index of the post by its id
   * @param {string} id
   * @return {number}
   */
  _getIndex(id) {
    for (let i = 0; i < this._posts.length; ++i) {
      if (this._posts[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Checks if the post exist
   * @param {string} id
   * @return {boolean}
   */
  _isExist(id) {
    return this._getIndex(id) != -1;
  }

  /**
   * Compares two dates
   * @param {Date} first
   * @param {Date} second
   * @return {number}
   */
  _compareDate(first, second) {
    return (second.createdAt.getTime() -
            first.createdAt.getTime());
  }

  /**
   * Checks if item contains all tags
   * @param {object} item
   * @param {array} tags
   * @return {boolean}
   */
  _containTags(item, tags) {
    return tags.every(function(tag) {
      return item.tags.some(function(item) {
        return item === tag;
      });
    });
  }
}

