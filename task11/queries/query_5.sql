SELECT NAME
FROM user
WHERE (SELECT COUNT(post.POST_ID) 
	   FROM post
       WHERE post.USER_ID = user.USER_ID) > 3;