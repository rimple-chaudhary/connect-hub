import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectLoginDataWithAll } from "../../redux/slice/AuthSlice";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../redux/slice/FriendList";

export default function FriendListCard() {
  const { userFriends } = useSelector((state) => state.userFriend);
  const { loggedInUser } = useSelector(selectLoginDataWithAll);

  const dispatch = useDispatch();

  const handleAccept = (friendEmail) => {
    dispatch(
      acceptFriendRequest({
        friendEmail,
        loggedInUserEmail: loggedInUser.email,
      })
    );
  };

  const handleReject = (friendEmail) => {
    dispatch(
      rejectFriendRequest({
        friendEmail,
        loggedInUserEmail: loggedInUser.email,
      })
    );
  };

  const remainingRequest = userFriends.filter(
    (user) => user.friend_email === loggedInUser.email && user.status === false
  );

  return (
    <>
      {remainingRequest.map((friend) => {
        return (
          <Card sx={{ maxWidth: 300 }} key={friend.friend_email}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?size=626&ext=jpg&ga=GA1.2.696549919.1684321360&semt=ais"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {friend.user_email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleAccept(friend.user_email)}
              >
                Accept
              </Button>
              <Button
                size="small"
                onClick={() => handleReject(friend.user_email)}
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
