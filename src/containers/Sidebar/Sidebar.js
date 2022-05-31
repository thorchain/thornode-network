import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import optionsTmp from './options';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Menu from '@iso/components/uielements/menu';
import IntlMessages from '@iso/components/utility/intlMessages';
import appActions from '@iso/redux/app/actions';
import Logo from '@iso/components/utility/logo';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } =
	appActions;

export default function Sidebar() {

	//Previsouly we had admin set locally, but this wouldnt load in time and when switching from an admin user to not it would show the wrong menu and you had to refresh
	//So we made sure to use a redux state for this
	const admin = useSelector((state) => state.Auth.idToken === 'AdminUser');
	//Depending of we are admin or not, grab the correct array from the options object
	const options = admin ? optionsTmp.admin : optionsTmp.normal;

	const allData = useSelector((state) => state.Auth.allData);

	const dispatch = useDispatch();
	const { view, openKeys, collapsed, openDrawer, current, height } =
		useSelector((state) => state.App);
	const customizedTheme = useSelector(
		(state) => state.ThemeSwitcher.sidebarTheme
	);

	function handleClick(e) {
		dispatch(changeCurrent([e.key]));
		if (view === 'MobileView') {
			setTimeout(() => {
				dispatch(toggleCollapsed());
				// dispatch(toggleOpenDrawer());
			}, 100);

			// clearTimeout(timer);
		}
	}
	function onOpenChange(newOpenKeys) {
		const latestOpenKey = newOpenKeys.find(
			(key) => !(openKeys.indexOf(key) > -1)
		);
		const latestCloseKey = openKeys.find(
			(key) => !(newOpenKeys.indexOf(key) > -1)
		);
		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = getAncestorKeys(latestCloseKey);
		}
		dispatch(changeOpenKeys(nextOpenKeys));
	}
	const getAncestorKeys = (key) => {
		const map = {
			sub3: ['sub2'],
		};
		return map[key] || [];
	};

	const isCollapsed = collapsed && !openDrawer;
	const mode = isCollapsed === true ? 'vertical' : 'inline';
	const onMouseEnter = (event) => {
		if (collapsed && openDrawer === false) {
			dispatch(toggleOpenDrawer());
		}
		return;
	};
	const onMouseLeave = () => {
		if (collapsed && openDrawer === true) {
			dispatch(toggleOpenDrawer());
		}
		return;
	};
	const styling = {
		backgroundColor: customizedTheme.backgroundColor,
	};
	const submenuStyle = {
		backgroundColor: 'rgba(0,0,0,0.3)',
		color: customizedTheme.textColor,
	};
	const submenuColor = {
		color: customizedTheme.textColor,
	};
	return (
		<SidebarWrapper>
			<Sider
				trigger={null}
				collapsible={true}
				collapsed={isCollapsed}
				width={240}
				className='isomorphicSidebar'
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={styling}
			>
				<Logo collapsed={isCollapsed} />
				<Scrollbars style={{ height: height - 70 }}>
					<Menu
						onClick={handleClick}
						theme='dark'
						className='isoDashboardMenu'
						mode={mode}
						openKeys={isCollapsed ? [] : openKeys}
						selectedKeys={current}
						onOpenChange={onOpenChange}
					>
						{options.map((singleOption) => (
							<SidebarMenu
								key={singleOption.key}
								submenuStyle={submenuStyle}
								submenuColor={submenuColor}
								singleOption={singleOption}
								extraData={allData.extraData}
							/>
						))}

					</Menu>
				</Scrollbars>
			</Sider>
		</SidebarWrapper>
	);
}
