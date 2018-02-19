const axios = require("axios");
const querystring = require("querystring")

const getUserInfo = (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user._json);
  } else {
    res.status(200).json();
  }
};

const getAllFriends = (req, res, next) => {
  axios
    .get("https://oauth.reddit.com/api/v1/me/friends", {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`
      }
    })
    .then(response => res.status(200).json(response.data.data.children))
    .catch(console.log);
};

const friend = (req, res, next) => {
  const { username } = req.body;
  const userAgent = req.user._json.subreddit.display_name_prefixed;

  axios
    .put(
    `https://oauth.reddit.com/api/v1/me/friends/${username}`,
    {
      api_type: "json",
      name: `${username}`,
      type: "friend",
      container: ""
    },
    {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
      }
    }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);

};

// NOT WORKING
const unfriend = (req, res, next) => {
  const { username } = req.params;
  const userAgent = req.user._json.subreddit.display_name_prefixed;

  axios
    .delete(
    `https://oauth.reddit.com/api/v1/me/friends/${username}`,
    {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        "User-Agent": `web-app:navit:v0.0.1 (by /${userAgent})`
      }
    }
    )
    .then(response => res.status(200).json(response.data))
    .catch(console.log);

};

const getUserAbout = (req, res, next) => {
  const { username, sort, t } = req.query
  let baseURL = `https://oauth.reddit.com/user/${username}/overview?sort=top`
  if (sort) {
    baseURL = `https://oauth.reddit.com/user/${username}/overview?sort=${sort}&t=${t}`
  }


  axios
    .get(baseURL, {
      headers: {
        Authorization: `bearer ${req.user.accessToken}`
      }
    })
    .then(response => res.status(200).json(response.data.data))
    .catch(console.log);
}

module.exports = {
  getUserInfo,
  getAllFriends,
  getUserAbout,
  friend,
  unfriend
};
