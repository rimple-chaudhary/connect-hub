import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectLoginDataWithAll } from "../../redux/slice/AuthSlice";
import { sendFriendRequest } from "../../redux/slice/FriendList";


export default function FriendsCard() {
  const { loggedInUser } = useSelector(selectLoginDataWithAll);
  const { users } = useSelector(selectLoginDataWithAll);
  const dispatch = useDispatch();

  const { userFriends } = useSelector((state) => state.userFriend);

  const sendRequest = (friendEmail) => {
    const friendAccount = users.find((user) => user.email === friendEmail);

    if (friendAccount) {
      dispatch(
        sendFriendRequest({
          user_email: loggedInUser.email,
          friend_email: friendAccount.email,
        })

      );
    } else {
      toast.error("Unable to find friend.");
	  
    }
  };
console.log("userFriends", userFriends);

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => user.email !== loggedInUser.email && user.friend_email !== userFriends);
  }, [users]);

  return (
    <>
      {filteredUsers.map((user, index) => {
        const userFriend = userFriends.find((uf) => 
          [uf.friend_email, uf.user_email].includes(user.email) &&
          [uf.friend_email, uf.user_email].includes(loggedInUser.email)
        );

        let result = "Send Request";
        if (userFriend) {
          const { friend_email, status } = userFriend;
          result = status
            ? "Friends"
            : friend_email === loggedInUser.email
            ? "this user sent you a friend request"
            : "Pending";	
        }

        if (result !== "this user sent you a friend request") { 
          return (
            <div key={index}>
              <Card sx={{ maxWidth: 200,marginLeft:"20px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="150"
                  image="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?size=626&ext=jpg&ga=GA1.2.696549919.1684321360&semt=ais"
                />
                <CardContent style={{ display: "flex" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {user.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    disabled={result === "Pending" || result === "Friends"}
                    onClick={() => sendRequest(user.email)}
                  >
                    {result}
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        } else {
          return null; // Skip rendering the card
        }
      })}
    </>
  );
}
