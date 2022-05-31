import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';
import TopbarWrapper from './Topbar.styles';

import appAction from '@iso/redux/app/actions';
import { refreshData } from 'CommonFunctions'
import { Select } from 'antd';
const { Option } = Select;

const { setCopyUser } = appAction;

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  function selectUser(user) {
    //console.log('selectUser', user)
    dispatch(setCopyUser(user))
    refreshData()
  }

  const currentUser = useSelector((state) => state.App.copyuser);
  //console.log('currentUser', currentUser)

  const listUsers = useSelector((state) => state.Auth.allData.extraData.listOfAllUsers);


  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>

{/*
        <Select
          defaultValue="paul.gangemi86@gmail.com"
          style={{width: 250, marginTop: 20, marginLeft: 10}}
          onChange={selectUser}
          >
          <Option key={'None'} value={'None'}>None</Option>
          {listUsers.map((item, indx) => {
            return <Option key={item.email} value={item.email}>{item.email}</Option>
          })}
        </Select>
*/}
        <ul className="isoRight">


          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
