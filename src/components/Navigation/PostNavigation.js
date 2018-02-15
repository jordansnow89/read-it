// IMPORT DEPENDENCIES
import React from "react";
// IMPORT COMPONENTS
import Navigation from "./Navigation";
// IMPORT ICONS
import backIcon from "../../icons/ic_arrow_back_white_24px.svg";
import sortIcon from "../../icons/ic_sort_white_24px.svg";
import moreIcon from "../../icons/ic_more_vert_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

// COMPONENT
const PostNavigation = ({ filterName, title, openMenu }) => {
  const rightIcons = [sortIcon, moreIcon];
  return (
    <Navigation
      title={title}
      filterName={filterName}
      leftIcon={backIcon}
      rightIcons={rightIcons}
      dropdown={false}
      leftAction={openMenu}
    />
  );
};

// EXPORT COMPONENT
export default PostNavigation;
