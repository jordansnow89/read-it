// IMPORT DEPENDENCIES
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// IMPORT ICONS
import commentIcon from "../../icons/comment_tiny.svg";
import upvoteIcon from "../../icons/ic_keyboard_arrow_up_white_24px.svg";
import upvoteIconClicked from "../../icons/ic_keyboard_arrow_up_green_24px 2.svg";
import downvoteIcon from "../../icons/ic_keyboard_arrow_down_white_24px.svg";
import downvoteIconClicked from "../../icons/ic_keyboard_arrow_down_red_24px.svg";
import starIconEmpty from "../../icons/ic_star_border_white_20px.svg";
import starIconFilled from "../../icons/ic_star_white_20px.svg";
import hideIcon from "../../icons/ic_visibility_off_white_20px.svg";
import unhideIcon from "../../icons/ic_visibility_white_20px.svg";
import profileIcon from "../../icons/ic_person_white_20px.svg";
import defaultPreview from "../../icons/default-preview.svg";

// COMPONENT
const PostData = ({
  postData,
  score,
  upvoted,
  downvoted,
  favorited,
  hidden,
  enableControls,
  upvote,
  downvote,
  cancelvote,
  favorite,
  unfavorite,
  hide,
  unhide
}) => {
  return (
    <div className="postdata-container">
      <div>
        {postData.domain !== `self.${postData.subreddit_title}` ? (
          <a className="postdata-link" href={postData.url}>
            <img
              className="postdata-image"
              src={postData.image}
              alt="link preview"
              onError={e => {
                e.target.onError = null;
                e.target.src = defaultPreview;
              }}
            />

            <div className="postdata-link-info-container">
              <div className="postdata-link-info">{postData.domain}</div>
              <div className="postdata-link-info">{postData.url}</div>
            </div>
          </a>
        ) : null}
      </div>
      <div className="postdata-info-container">
        <div className="postdata-title">
          {postData.domain !== `self.${postData.subreddit_title}` ? (
            <a href={postData.url}>{postData.post_title}</a>
          ) : (
            postData.post_title
          )}
        </div>
        <div className="postdata-info">
          <span className="postdata-subreddit">
            /r/{postData.subreddit_title}
          </span>
          {" • "}
          <span className="postdata-author">{postData.author}</span>
        </div>
        {postData.is_self && postData.body ? (
          <div className="postdata-body">
            <ReactMarkdown
              source={
                postData.body
                // .split("https://www.reddit.com")
                // .join("")
                // .split("http://www.reddit.com")
                // .join("")
              }
            />
          </div>
        ) : null}
        <div className="postdata-data">
          <span
            className="postdata-score"
            style={
              upvoted
                ? { color: "#06D6A0" }
                : downvoted ? { color: "#ff445b" } : null
            }
          >
            {score > 10000 ? (score / 1000).toFixed(1) + "k" : score} points
          </span>
          {" • "}
          <span>{moment(postData.created_at * 1000).fromNow()}</span>
          {" • "}
          <span>
            {postData.comments_num} <img src={commentIcon} alt="comment icon" />
          </span>
        </div>
      </div>
      <div className="postdata-controls">
        <div className="postdata-left-controls">
          {upvoted ? (
            <img
              className="postdata-control-icon"
              src={upvoteIconClicked}
              alt="upvoted"
              onClick={cancelvote}
            />
          ) : (
            <img
              className="postdata-control-icon"
              src={upvoteIcon}
              alt="upvote"
              onClick={upvote}
            />
          )}
          {downvoted ? (
            <img
              className="postdata-control-icon"
              src={downvoteIconClicked}
              alt="downvoted"
              onClick={cancelvote}
            />
          ) : (
            <img
              className="postdata-control-icon"
              src={downvoteIcon}
              alt="downvote"
              onClick={downvote}
            />
          )}
          {favorited ? (
            <img
              className="postdata-control-icon"
              src={starIconFilled}
              alt="favorited"
              onClick={unfavorite}
            />
          ) : (
            <img
              className="postdata-control-icon"
              src={starIconEmpty}
              alt="favorite"
              onClick={favorite}
            />
          )}
          {hidden ? (
            <img
              className="postdata-control-icon"
              src={unhideIcon}
              alt="unhide"
              onClick={unhide}
            />
          ) : (
            <img
              className="postdata-control-icon"
              src={hideIcon}
              alt="hide"
              onClick={hide}
            />
          )}
          <Link
            className="postdata-control-icon"
            to={`/profile/${postData.author}`}
          >
            <img src={profileIcon} alt="author profile" />
          </Link>
          <Link
            to={`/r/${postData.subreddit_title}`}
            className="postdata-control-icon"
          >
            {"/r/"}
          </Link>
        </div>
        {/* <div className="postdata-right-controls">
          <img className="postdata-control-icon" src={moreIcon} alt="" />
        </div> */}
      </div>
    </div>
  );
};

// EXPORT COMPONENT
export default PostData;
