/* eslint-disable no-unused-vars */
(function () {
    let postModel = new PostModel(posts);
    let users = ['mariakolyachko', 'veronikchaa', 'ar_kud', 'pavel.tyl', 'sstrazdina'];
    let user = {
        author: 'mariakolyachko',
        photoLink: 'users/mariakolyachko/photo.jpg'
    };
    let feedView = new FeedView(postModel.getPage(), users, user);

    addTweet(
        {
            id: '123',
            description: 'ну я вижу только Полину и Машу. Это же Маша, да?',
            createdAt: new Date('2019-12-10T21:12:01'),
            author: 'kupajj_oleg_',
            photoLink: 'users/kupajj_oleg_/photo.jpg',
            tags: ['Masha', 'Polina', 'seeyou'],
            likes: [],
        },
        postModel, feedView
    );

    editTweet('123',
        {
            tags: ['Mashen\'ka', 'Polina', 'seeyou'],
        },
        postModel, feedView);

    deleteTweet('123', postModel, feedView);

    showFeed(
        { tags: ['love'] },
        postModel, feedView
    );
})();