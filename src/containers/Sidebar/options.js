/*
http://demo.uncommons.pro/themes/wp/juno/demo1/ion-icons/
*/


const adminOptions = [
		{
			key: 'admindashboard',
			label: '-:- Admin Dashboard',
			leftIcon: 'ion-android-restaurant',
		},
		{
			key: 'adminconfirm',
			label: '-:- Confirm Deposit',
			leftIcon: 'ion-android-restaurant',
		},
		{
			key: 'adminstake',
			label: '-:- Confirm Stake',
			leftIcon: 'ion-android-restaurant',
		},
		{
			key: 'adminwithdraw',
			label: '-:- Confirm Withdraw',
			leftIcon: 'ion-android-restaurant',
		},
]

const options = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		leftIcon: 'ion-clipboard',
	},
	{
		key: 'stake',
		label: 'Staking',
		leftIcon: 'ion-link',
	},
	{
		key: 'deposit',
		label: 'Deposit',
		leftIcon: 'ion-archive',
	},
	{
		key: 'withdraw',
		label: 'Withdraw',
		leftIcon: 'ion-android-exit',
	},
	/*
	Has chars I could use
	{
		key: 'dashboardOrig',
		label: 'Dashboard Orig',
		leftIcon: 'ion-clipboard',
	},
	*/
	{
		key: 'faq',
		label: 'FAQ',
		leftIcon: 'ion-help',
	}
];

const optionsOrig = [
	{
		key: 'mailbox',
		label: 'sidebar.email',
		leftIcon: 'ion-android-mail',
	},
	{
		key: 'chat',
		label: 'sidebar.chat',
		leftIcon: 'ion-chatbubbles',
	},
	// {
	//   key: 'quiz',
	//   label: 'sidebar.quiz',
	//   leftIcon: 'ion-chatbubbles',
	// },
	{
		key: 'ecommerce',
		label: 'sidebar.ecommerce',
		leftIcon: 'ion-bag',
		children: [
			{
				key: 'shop',
				label: 'sidebar.shop',
			},
			{
				key: 'cart',
				label: 'sidebar.cart',
			},
			{
				key: 'checkout',
				label: 'sidebar.checkout',
			},
			{
				key: 'card',
				label: 'sidebar.cards',
			},
		],
	},
	{
		key: 'maps',
		label: 'sidebar.maps',
		leftIcon: 'ion-map',
		children: [
			{
				key: 'googlemap',
				label: 'sidebar.googleMap',
			},
			{
				key: 'leafletmap',
				label: 'sidebar.leafletMap',
			},
		],
	},
	{
		key: 'my-profile',
		label: 'sidebar.profile',
		leftIcon: 'ion-person',
	},
	{
		key: 'scrum-board',
		label: 'sidebar.scrumboard',
		leftIcon: 'ion-android-checkbox-outline',
	},
	{
		key: 'invoice',
		label: 'sidebar.invoice',
		leftIcon: 'ion-clipboard',
	},
	{
		key: 'calendar',
		label: 'sidebar.calendar',
		leftIcon: 'ion-calendar',
	},
	{
		key: 'notes',
		label: 'sidebar.notes',
		leftIcon: 'ion-ios-paper',
	},
	{
		key: 'todo',
		label: 'sidebar.todos',
		leftIcon: 'ion-android-checkbox-outline',
	},
	{
		key: 'firestorecrud',
		label: 'sidebar.firestorecrud',
		leftIcon: 'ion-fireball',

		children: [
			{
				key: 'articles',
				label: 'sidebar.firestorecrudarticle',
			},
			{
				key: 'investors',
				label: 'sidebar.firestorecrudinvestor',
			},
		],
	},
	{
		key: 'contacts',
		label: 'sidebar.contacts',
		leftIcon: 'ion-android-person-add',
	},
	{
		key: 'shuffle',
		label: 'sidebar.shuffle',
		leftIcon: 'ion-grid',
	},
	{
		key: 'charts',
		label: 'sidebar.charts',
		leftIcon: 'ion-arrow-graph-up-right',
		children: [
			{
				key: 'googleChart',
				label: 'sidebar.googleCharts',
			},
			{
				key: 'reecharts',
				label: 'sidebar.recharts',
			},
			{
				key: 'reactChart2',
				label: 'sidebar.reactChart2',
			},
			{
				key: 'frappeChart',
				label: 'sidebar.frappeChart',
			},
		],
	},
	{
		key: 'Forms',
		label: 'sidebar.forms',
		leftIcon: 'ion-android-mail',
		children: [
			{
				key: 'InputField',
				label: 'sidebar.input',
			},
			{
				key: 'editor',
				label: 'sidebar.editor',
			},
			{
				key: 'FormsWithValidation',
				label: 'sidebar.formsWithValidation',
			},
			{
				key: 'progress',
				label: 'sidebar.progress',
			},
			{
				key: 'button',
				label: 'sidebar.button',
			},
			{
				key: 'tab',
				label: 'sidebar.tab',
			},
			{
				key: 'checkbox',
				label: 'sidebar.checkbox',
			},
			{
				key: 'radiobox',
				label: 'sidebar.radiobox',
			},
			{
				key: 'selectbox',
				label: 'sidebar.selectbox',
			},
			{
				key: 'transfer',
				label: 'sidebar.transfer',
			},
			{
				key: 'autocomplete',
				label: 'sidebar.autocomplete',
			},
		],
	},
	// {
	//   key: 'gridLayout',
	//   label: 'sidebar.boxOptions',
	//   leftIcon: 'ion-cube'
	// },
	{
		key: 'uielements',
		label: 'sidebar.uiElements',
		leftIcon: 'ion-leaf',
		children: [
			{
				key: 'op_badge',
				label: 'sidebar.badge',
			},
			{
				key: 'op_card',
				label: 'sidebar.card2',
			},
			{
				key: 'op_carousel',
				label: 'sidebar.corusel',
			},
			{
				key: 'op_collapse',
				label: 'sidebar.collapse',
			},
			{
				key: 'op_popover',
				label: 'sidebar.popover',
			},
			{
				key: 'op_tooltip',
				label: 'sidebar.tooltip',
			},
			{
				key: 'op_tag',
				label: 'sidebar.tag',
			},
			{
				key: 'op_timeline',
				label: 'sidebar.timeline',
			},
			{
				key: 'dropdown',
				label: 'sidebar.dropdown',
			},
			{
				key: 'pagination',
				label: 'sidebar.pagination',
			},
			{
				key: 'rating',
				label: 'sidebar.rating',
			},
			{
				key: 'tree',
				label: 'sidebar.tree',
			},
			{
				key: 'swiperslider',
				label: 'sidebar.swiperslider',
			},
		],
	},
	{
		key: 'advancedUielements',
		label: 'sidebar.advancedElements',
		leftIcon: 'ion-flash',
		children: [
			{
				key: 'reactDates',
				label: 'sidebar.reactDates',
			},
			{
				key: 'codeMirror',
				label: 'sidebar.codeMirror',
			},
			{
				key: 'uppy',
				label: 'sidebar.uppy',
			},
			{
				key: 'dropzone',
				label: 'sidebar.dropzone',
			},
		],
	},
	{
		key: 'feedback',
		label: 'sidebar.feedback',
		leftIcon: 'ion-thumbsup',
		children: [
			{
				key: 'alert',
				label: 'sidebar.alert',
			},
			{
				key: 'modal',
				label: 'sidebar.modal',
			},
			{
				key: 'message',
				label: 'sidebar.message',
			},
			{
				key: 'notification',
				label: 'sidebar.notification',
			},
			{
				key: 'popConfirm',
				label: 'sidebar.popConfirm',
			},
			{
				key: 'spin',
				label: 'sidebar.spin',
			},
		],
	},
	{
		key: 'table',
		label: 'sidebar.tables',
		leftIcon: 'ion-android-menu',
		children: [
			{
				key: 'table_ant',
				label: 'sidebar.antTables',
			},
		],
	},
	{
		key: 'pages',
		label: 'sidebar.pages',
		leftIcon: 'ion-document-text',
		children: [
			{
				key: '404',
				label: 'sidebar.404',
				withoutDashboard: true,
			},
			{
				key: '500',
				label: 'sidebar.500',
				withoutDashboard: true,
			},
			{
				key: 'signin',
				label: 'sidebar.signIn',
				withoutDashboard: true,
			},
			{
				key: 'signup',
				label: 'sidebar.signUp',
				withoutDashboard: true,
			},
			{
				key: 'forgotpassword',
				label: 'sidebar.forgotPw',
				withoutDashboard: true,
			},
			{
				key: 'resetpassword',
				label: 'sidebar.resetPw',
				withoutDashboard: true,
			},

			// {
			//   key: 'comingSoon',
			//   label: 'sidebar.comingSoon',
			//    withoutDashboard: true
			// }
		],
	},
	{
		key: 'githubSearch',
		label: 'sidebar.githubSearch',
		leftIcon: 'ion-social-github',
	},
	{
		key: 'blank_page',
		label: 'sidebar.blankPage',
		leftIcon: 'ion-document',
	},
]


export default {'normal': options, 'admin': [...adminOptions , ...options]};
//export default {'normal': [...adminOptions , ...options, ...optionsOrig], 'admin': [...adminOptions , ...options, ...optionsOrig]};
