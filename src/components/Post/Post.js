// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// IMPORT COMPONENTS
import PostNavigation from "../Navigation/PostNavigation";
import PostData from "../Post/PostData";
import Comment from "../Comment/Comment";
// IMPORT ICONS
import loading from "../../icons/loading/loading-cylon-red.svg";
// IMPORT REDUX FUNCTION
import { getUserInfo } from "../../ducks/userReducer";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // LOADING
      loading: true,

      // VOTING
      upvoted: false,
      downvoted: false,

      // FAVORITING
      favorited: false,

      // HIDING
      hidden: false,

      // CONTROLS
      enableControls: this.props.user.user.id ? true : false,

      // DATA
      postData: {},
      comments: [],
      filter: "TOP"
    };

    this.goHome = this.goHome.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.cancelvote = this.cancelvote.bind(this);
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
  }
  goHome() {
    this.props.history.goBack();
  }
  upvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", { vote: 1, id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: true, downvoted: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  downvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", {
          vote: -1,
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: false, downvoted: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  cancelvote = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/vote", { vote: 0, id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ upvoted: false, downvoted: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  favorite = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/favorites/save", {
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  unfavorite = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/favorites/unsave", {
          id: `t3_${this.state.postData.post_id}`
        })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ favorited: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  hide = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/post/hide", { id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: true });
    } else {
      alert("Please login to use this feature");
    }
  };
  unhide = () => {
    if (this.state.enableControls) {
      axios
        .post("/api/post/unhide", { id: `t3_${this.state.postData.post_id}` })
        .then(response => {
          // console.log(response);
        })
        .catch(console.log);
      this.setState({ hidden: false });
    } else {
      alert("Please login to use this feature");
    }
  };
  componentDidMount() {
    this.props.getUserInfo();
    const { post, subreddit } = this.props.match.params;
    axios.get(`/api/post/${subreddit}/${post}`).then(response => {
      this.setState({
        postData: response.data.post,
        comments: response.data.comments,
        loading: false,
        upvoted: response.data.post.likes === true,
        downvoted: response.data.post.likes === false,
        favorited: response.data.post.saved,
        hidden: response.data.post.hidden
      });
    });
  }
  render() {
    const comments = this.state.comments.map((comment, index) => {
      return (
        <Comment
          postID={this.state.postData.post_id}
          key={index}
          commentData={comment.data}
          enableControls={this.state.enableControls}
        />
      );
    });
    const loader = (
      <div className="loader-wrapper" key={"loader"}>
        <img src={loading} className="loader-svg" alt="loading" />
      </div>
    );
    return (
      <div>
        <PostNavigation
          title={this.state.postData.subreddit_title}
          filterName={this.state.filter}
          goHome={this.goHome}
        />
        {this.state.loading ? (
          loader
        ) : (
          <div>
            <PostData
              postData={this.state.postData}
              upvoted={this.state.upvoted}
              downvoted={this.state.downvoted}
              favorited={this.state.favorited}
              hidden={this.state.hidden}
              enableControls={this.state.enableControls}
              upvote={this.upvote}
              downvote={this.downvote}
              cancelvote={this.cancelvote}
              favorite={this.favorite}
              unfavorite={this.unfavorite}
              hide={this.hide}
              unhide={this.unhide}
            />
            <div className="comments-wrapper">{comments}</div>
          </div>
        )}
      </div>
    );
  }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { getUserInfo })(Post);
