import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostDataWithAll } from "../../redux/slice/PostSlice";
import "./Home.scss";
import { selectLikesOfAll, setLikes } from "../../redux/slice/likePost";
import { selectLoginDataWithAll } from "../../redux/slice/AuthSlice";

export default function Cards() {
  const { posts } = useSelector(selectPostDataWithAll);
  const { likes } = useSelector(selectLikesOfAll);
  const { userFriends } = useSelector((state) => state.userFriend);

  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectLoginDataWithAll);

  const likedPostsByUser = likes.filter(like => like.friend_email === loggedInUser.email);
  const likedPostIdsByUser = likedPostsByUser.map(like => like.postId);


  const handleShowPosts = posts.filter((post) =>
    userFriends.some(
      (friend) =>
        friend.status === true &&
        friend.friend_email === post.createdBy &&
        friend.user_email === loggedInUser.email
    )
  );


  const handleLikeClick = (postId) => {
    const isAlreadyLiked = likedPostIdsByUser.includes(postId);

    if (isAlreadyLiked) {
      const updatedLikes = likes.filter(
        (like) => !(like.friend_email === loggedInUser.email && like.postId === postId)
      );
      dispatch(setLikes(updatedLikes));
    } else {
      dispatch(
        setLikes([...likes, { postId, friend_email: loggedInUser.email }])
      );
    }
  };
  const isPostLiked = (postId) => {
    return likedPostIdsByUser.includes(postId);
  };

  return handleShowPosts.map((post, index) => (
    <Card key={index}>
      <CardHeader
        title={post.title}
        style={{ width: "30%", color: "#e0218a" }}
        subheader={post.date}
      />
      <CardMedia
        component="img"
        image={post.imageUrl}
        alt="Post"
        className="cardMedia-container"
      />
      <CardContent>
        <Typography variant="body2" style={{ color: "red", fontSize: "20px" }}>
          {`Caption: ${post.description}`}
          <br />
        </Typography>
        <Typography variant="body2">
          {`created by: ${post.createdBy}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleLikeClick(index)}
        >
          <FavoriteIcon
            style={{ color: isPostLiked(index) ? "red" : "grey" }}
          />
        </IconButton>
        <Typography>
          {likes.filter((like) => like.postId === index).length} Like(s)
        </Typography>
      </CardActions>
      <br />
    </Card>
  ));
}
