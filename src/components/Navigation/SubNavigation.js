// IMPORT DEPENDENCIES
import React from "react";
// IMPORT COMPONENTS
import Navigation from "./Navigation";
// IMPORT ICONS
import menuIcon from "../../icons/ic_menu_white_24px.svg";
import sortIcon from "../../icons/ic_sort_white_24px.svg";
// import moreIcon from "../../icons/ic_more_vert_white_24px.svg";
import sidebarIcon from "../../icons/ic_web_asset_white_24px.svg";
// import searchIcon from "../../icons/ic_search_white_24px.svg";

// COMPONENT
const SubredditNavigation = ({
  filterName,
  openMenu,
  sortAction,
  openSidebar,
  title
}) => {
  const rightIcons = [sortIcon, sidebarIcon];
  const rightActions = [sortAction, openSidebar];
  return (
    <Navigation
      title={title}
      filterName={filterName}
      leftIcon={menuIcon}
      rightIcons={rightIcons}
      dropdown={false}
      leftAction={openMenu}
      rightActions={rightActions}
    />
  );
};

// EXPORT COMPONENT
export default SubredditNavigation;
