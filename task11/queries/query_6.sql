SELECT NAME, COUNT(POST_ID)
FROM user, post
WHERE post.CREATED_AT = '2020.03.01'
	AND user.USER_ID = post.USER_ID
GROUP BY NAME;