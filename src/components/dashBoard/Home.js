import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Upload } from "antd";
import axios from "axios";
import { addHours, format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectLoginDataWithAll } from "../../redux/slice/AuthSlice";
import { initialPostState, setPosts } from "../../redux/slice/PostSlice";
import Cards from "./Cards";
import "./Home.scss";
import FriendsCard from "../friendCard/FriendCards";
import FriendListCard from "../friendCard/FriendRequest";

const { Content, Footer } = Layout;
const { TextArea } = Input;

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectLoginDataWithAll);
  const [fileList, setFileList] = useState([]);
  const [postData, setPostData] = useState(initialPostState);

  const handleUpload = async () => {
    const { title, description, createdBy, createdAtValue } = postData;

    if (title && description && createdBy && createdAtValue) {
      // Upload each file in the fileList array
      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i].originFileObj);
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        const updatedPostData = {
          ...postData,
          images: response.data.uploadedFiles,
        };
        dispatch(setPosts(updatedPostData));
        setPostData(initialPostState);
        toast.success("Upload successful");
      } catch (error) {
        toast.error("Error uploading file:", error.message);
      }
    } else {
      toast.error("Upload unsuccessful");
    }
  };

  const handleFileChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const getDate = (date) => {
    // Add 12 hours to the current date if it's in PM to get the 12-hour format
    const twelveHourDate = date.getHours() >= 12 ? addHours(date, 12) : date;
    return format(twelveHourDate, "dd/MM/yyyy hh:mm:ss a");
  };

  const handleChange = (e) => {
    const post = { ...postData };
    post[e.target.name] = e.target.value;
    const date = new Date();
    if (!post.createdBy) {
      post.createdBy = loggedInUser.email;
      post.createdAtValue = getDate(date);
      post.createdAt = date.toISOString();
    }
    setPostData(post);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout className="main-container">
        <Content>
          <div>
            <div className="home-container">
              <h1> Create Post </h1>
            </div>
            <div className="textArea-container">
              <TextArea
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="title-container"
                placeholder="Enter Post Title"
              />
              <TextArea
                name="description"
                value={postData.description}
                rows={2}
                onChange={handleChange}
                placeholder="Write Post Description"
                className="textArea"
              />
              <span className="upload-container">
                <Upload
                  name="files"
                  listType="picture-card"
                  multiple={true}
                  fileList={fileList}
                  onChange={handleFileChange}
                >
                  {fileList.length >= 8 ? null : (
                    <div>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </div>
                  )}
                </Upload>
              </span>
              <span>
                <Button
                  type="primary"
                  value="Upload"
                  size={"large"}
                  className="post-btn"
                  onClick={handleUpload}
                >
                  Post
                </Button>
              </span>
            </div>
			<div className="friend-container"><FriendsCard/> </div>
      <h1> FriendRequests</h1>
      <div> <FriendListCard/> </div>
			<h1 className="feed-container">New Feeds </h1>
            <div className="cards-container">
              <Cards />
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#1976d2",
            color: "white",
          }}
        >
          Post Design ©2023 Created by @Rimple
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
