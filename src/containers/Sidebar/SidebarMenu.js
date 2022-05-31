import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Menu from '@iso/components/uielements/menu';
import IntlMessages from '@iso/components/utility/intlMessages';
const SubMenu = Menu.SubMenu;


const dotStyle = {
  height: 10,
  width: 10,
  backgroundColor: 'yellow',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'absolute',
  top: 5,
  left: '6%'
}

function yellowDot(extraData, key, label) {
  //Try statement as if we are not admin we dont have any of this and it will crash
  try {
    let dot = false
    if (extraData.deposits.length > 0 && key ==='adminconfirm') {
      dot = true
    }
    if (extraData.committed.length > 0 && key ==='adminstake') {
      dot = true
    }
    if (extraData.pendingWithdraws.length > 0 && key ==='adminwithdraw') {
      dot = true
    }
    return dot ? dotStyle : null;
  } catch (e){
    return null
  }

}

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(function SidebarMenu({
  singleOption,
  submenuStyle,
  submenuColor,
  extraData,
  ...rest
}) {
  let match = useRouteMatch();

  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon} />
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map(child => {
          const linkTo = child.withoutDashboard
            ? `/${child.key}`
            : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link style={submenuColor} to={linkTo}>
                <IntlMessages id={child.label} />
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key} {...rest}>
      <Link to={`${url}/${key}`}>
        <span className="isoMenuHolder" style={submenuColor}>
          <i style={{color: yellowDot(extraData, key, label)}} className={leftIcon} />
          <span className="nav-text">
            <span style={yellowDot(extraData, key, label)}/>
            <IntlMessages id={label} />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
});
