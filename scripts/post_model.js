class PostModel {
	_posts = [];

	_ids = new Set();
	_standartFilter = {
		author: "all",
		createdAt: new Date(),
		tags: []
	}

	constructor(posts) {
		this._posts = posts.slice(0);
	}

	getPage(skip = 0, top = 10, filterConfig) {
		var postsFilter = Object.assign({}, standartFilter, filterConfig);

		return this._posts.filter(function(item) {
									return (postsFilter.author === "all" 
														|| item.author === postsFilter.author)
										&& compareDate(item, postsFilter) >= 0
										&& containTags(item, postsFilter.tags);
								})
							 .sort(this._compareDate)
							 .slice(skip, skip + top);
	}

	get(id) {
		return this._isExist(id) ? this._posts[this._getIndex(id)] : null;
	}

	add(post) {
		if (PostModel.validate(post)) {
			this._posts.push(post);
			return true;
		} 
		return false;
	}

	edit(id, changes) {
		if (!this._isExist(id)) {
			return false;
		}

		var isMutable = function(change) {
			return change !== "id" 
				&& change !== "createdAt" 
				&& change !== "author";
		}

		var post = Object.assign({}, this.get(id));

		for (var change of Object.keys(changes)) {
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

	remove(id) {
		if (this._isExist(id)) {
			this._posts.splice(this._getIndex(id), 1);
		}
	}

	static validate(post) {
		return (post.id != undefined)
			&& post.description != undefined 
			&& (post.author != undefined && post.author.length != 0);
	}


	_getIndex(id) {
		for (var i = 0; i < this._posts.length; ++i) {
			if (this._posts[i].id === id) {
				return i;
			}
		}
		return -1;
	}

	_isExist(id) {
		return this._getIndex(id) != -1;
	}

	_compareDate(first, second) {
		return (second.createdAt.getTime() 
				- first.createdAt.getTime()); 
	} 

	_containTags(item, tags) {
		return tags.every(function(tag) {
			return item.tags.some(function(item) {
				return item === tag;
			})
		});
	}
}