import React, { Component } from 'react';
//import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
//import LayoutContent from '@iso/components/utility/layoutContent';
import Modals from '@iso/components/Feedback/Modal';
import Popover from '@iso/components/uielements/popover';
import { getData, setCookie, getCookie } from 'CommonFunctions'
//import { someFunc } from './monitor_functions'
//import Spin from '@iso/ui/Antd/Spin/Spin';
import Input from '@iso/components/uielements/input';
import { ModalContent } from '../Feedback/Modal/Modal.styles';
import { Layout } from 'antd';
import "./styles.css";
//import { retiringVault } from './data.js' //https://thornode.ninerealms.com/thorchain/vaults/asgard

import heartBlank from '@iso/assets/images/heart-blank.png';
import heartFull from '@iso/assets/images/heart-full.png';

import imageDO from '@iso/assets/images/do.png';
import imageAWS from '@iso/assets/images/aws.png';
import imageGCP from '@iso/assets/images/gcp.png';
import imageAZURE from '@iso/assets/images/azure.png';
import imageHETZNER from '@iso/assets/images/hetzner.png';
import imageVULTR from '@iso/assets/images/vultr.png';

import binance from '@iso/assets/images/binance.png';
import eth from '@iso/assets/images/eth.png';
import bitcoin from '@iso/assets/images/bitcoin.png';
import litecoin from '@iso/assets/images/litecoin.png';
import bitcoincash from '@iso/assets/images/bitcoincash.png';
import dogecoin from '@iso/assets/images/dogecoin.png';
import luna from '@iso/assets/images/luna.png';

const leaveIcon = <svg style={{marginTop: 5}} focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 30 30" aria-hidden="true" className="sfg"><path d="M6,30H18a2.0023,2.0023,0,0,0,2-2V25H18v3H6V4H18V7h2V4a2.0023,2.0023,0,0,0-2-2H6A2.0023,2.0023,0,0,0,4,4V28A2.0023,2.0023,0,0,0,6,30Z"></path><path d="M20.586 20.586L24.172 17 10 17 10 15 24.172 15 20.586 11.414 22 10 28 16 22 22 20.586 20.586z"></path></svg>

const { Header, Footer, Content } = Layout;

const headerStyle = {cursor: 'pointer'}
const tdStyle = {minWidth: 80, textAlign: 'right', fontFamily: 'monospace'}
const iconStyle = {minWidth: 25, padding: 5, paddingLeft: 10, paddingRight: 10}


async function copyToClipWithPopup(msg, ip) {
  copyToClipboard(ip)
  popUpModal(msg, ip)
}

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};




function popUpModal(msg, ip) {
  Modals.info({
    title: <h3>Success</h3>,
    content: (
      <ModalContent>
        <p>
          {`${msg} ${ip}`}
        </p>
      </ModalContent>
    ),
    onOk() {},
    okText: 'OK',
    cancelText: 'Cancel',
  });
}

const Icons = ({address, ip_address, addToFav, whichHeart}) => {
  const firstURL = `https://thornode.ninerealms.com/thorchain/node/${address}`
  const secondURL = `https://viewblock.io/thorchain/address/${address}`
  return (
    <span style={{height: 20, marginLeft: 5}}>

    <Popover
      content={'Thornode API'}
      trigger="hover"
    >
      <a href={firstURL} target="_blank" rel="noopener noreferrer" style={{marginLeft: 5}}>
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg" fill="rgba(0,0,0,0.7)" width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><path d="M26,22a3.86,3.86,0,0,0-2,.57l-3.09-3.1a6,6,0,0,0,0-6.94L24,9.43A3.86,3.86,0,0,0,26,10a4,4,0,1,0-4-4,3.86,3.86,0,0,0,.57,2l-3.1,3.09a6,6,0,0,0-6.94,0L9.43,8A3.86,3.86,0,0,0,10,6a4,4,0,1,0-4,4,3.86,3.86,0,0,0,2-.57l3.09,3.1a6,6,0,0,0,0,6.94L8,22.57A3.86,3.86,0,0,0,6,22a4,4,0,1,0,4,4,3.86,3.86,0,0,0-.57-2l3.1-3.09a6,6,0,0,0,6.94,0L22.57,24A3.86,3.86,0,0,0,22,26a4,4,0,1,0,4-4ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2,2,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm10-8a4,4,0,1,1,4-4A4,4,0,0,1,16,20Zm10,8a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z"></path></svg>
      </a>
      </Popover>

      <Popover
        content={'Explore Node'}
        trigger="hover"
      >
      <a href={secondURL} target="_blank" rel="noopener noreferrer" style={{marginLeft: 5}}>
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg" fill="rgba(0,0,0,0.7)" width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><path d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"></path><path d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"></path></svg>
      </a>
      </Popover>



      <Popover
        content={ip_address}
        title={'IP Address'}
        trigger="hover"
      >
        <span style={{cursor: 'pointer', marginLeft: 5}} onClick={()=>copyToClipWithPopup('IP Copied to clipboard:', ip_address)}>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg" fill="rgba(0,0,0,0.7)" width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a8 8 0 108 8A8.0092 8.0092 0 0016 2zm5.91 7H19.4724a15.2457 15.2457 0 00-.7917-4.36A6.0088 6.0088 0 0121.91 9zM16.022 15.999h-.0076c-.3813-.1206-1.3091-1.8213-1.479-4.999h2.9292C17.2952 14.1763 16.3711 15.877 16.022 15.999zM14.5354 9c.1694-3.1763 1.0935-4.877 1.4426-4.999h.0076c.3813.1206 1.3091 1.8213 1.479 4.999zM13.3193 4.64A15.2457 15.2457 0 0012.5276 9H10.09A6.0088 6.0088 0 0113.3193 4.64zM10.09 11h2.4373a15.2457 15.2457 0 00.7917 4.36A6.0088 6.0088 0 0110.09 11zm8.59 4.36A15.2457 15.2457 0 0019.4724 11H21.91A6.0088 6.0088 0 0118.6807 15.36zM28 30H4a2.0021 2.0021 0 01-2-2V22a2.0021 2.0021 0 012-2H28a2.0021 2.0021 0 012 2v6A2.0021 2.0021 0 0128 30zM4 22v6H28V22z"></path><circle cx="7" cy="25" r="1"></circle></svg>
        </span>
      </Popover>


      <img alt="#" onClick={()=>addToFav(address)} src={whichHeart(address)} style={{ cursor:'pointer', marginLeft: 5, marginTop: 2, width: 15, height: 15, opacity: 0.5}}/>

    </span>
)
}

const GlobalData = ({ globalData, animateBlockCount, state}) => {
  if (globalData.length===0) return null

  const title = {fontWeight: 800, textAlign: 'right', borderStyle: 'none', minWidth: 170}
  const values = {textAlign: 'right', borderStyle: 'none', paddingLeft: 20}
  const tr = {}

  /*
  Logic to display whether we are normal, trying to churn or churning
  If churnTry is true then seconds to churn is negative, if retiring is also false (no RetiringVaults found) this means we have finished the 3 day period and now in retrying churn phase
  Soon as retiring = true means we have found RetiringVault in the api response and this means we are in the churn phase
  If neither of these conditions are met, ie churnTry = false and retiring = false then we are in normal countdown until next churn
  */
  let timeToDisplay = '';
  let msgTitle = ''
  if (globalData.churnTry && globalData.retiring === 'false') {
    msgTitle = '(Churn) Retry In:'
    timeToDisplay = `${globalData.timeUntilRetry.days}d ${globalData.timeUntilRetry.hours}h ${globalData.timeUntilRetry.minutes}m`
  } else if (globalData.retiring === 'true') {
    msgTitle = '(Churn) Currently Churning:'
    timeToDisplay = 'Churning'
  } else {
    msgTitle = '(Churn) Time Until:'
    timeToDisplay = `${globalData.timeUntilChurn.days}d ${globalData.timeUntilChurn.hours}h ${globalData.timeUntilChurn.minutes}m`
  }

  //timeToDisplay = `${globalData.timeUntilChurn.days}d ${globalData.timeUntilChurn.hours}h ${globalData.timeUntilChurn.minutes}m`

  return (
    <table style={{fontFamily: 'monospace'}}>
      <tbody>
        <tr style={tr}>
          <td style={title}>Current Block:</td>
          <td style={values}>{parseInt(globalData.maxHeight).toLocaleString()}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>{msgTitle}</td>
          <td style={values}>{timeToDisplay}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>Total Bonded Value:</td>
          <td style={values}>ᚱ{state.activeNodes.length>0 ? parseInt((state.activeNodes.map(item => item.bond).reduce((prev, next) => prev + next))/100000000).toLocaleString() : '0'}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>Market Cap:</td>
          <td style={values}>${globalData.coingecko.market_cap.toLocaleString()}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>24hr Vol:</td>
          <td style={values}>${globalData.coingecko.total_volume.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  )
}

const CoinGeckoData = ({ globalData }) => {
  if (globalData.length===0) return null

  const title = {fontWeight: 800, textAlign: 'right', borderStyle: 'none', minWidth: 170}
  const values = {textAlign: 'right', borderStyle: 'none', paddingLeft: 20}
  const tr = {}
  return (
    <table style={{fontFamily: 'monospace', marginLeft: 50}}>
      <tbody>
        <tr style={tr}>
          <td style={title}>RUNE/USDT:</td>
          <td style={values}>${globalData.coingecko.current_price.toLocaleString()}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>24hr High:</td>
          <td style={values}>${globalData.coingecko.high_24h}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>24hr Low:</td>
          <td style={values}>${globalData.coingecko.low_24h}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>Market Cap Rank:</td>
          <td style={values}>{globalData.coingecko.market_cap_rank}</td>
        </tr>
        <tr style={tr}>
          <td style={title}>Total Supply:</td>
          <td style={values}>ᚱ{globalData.coingecko.total_supply.toLocaleString()}</td>
        </tr>
      </tbody>
      </table>
  )

}

const ReturnIspImage = ({isp}) => {

  const style = {width: 25, height: 25}

  if (isp ==='Amazon.com, Inc.' || isp === 'Amazon Technologies Inc.' || isp === 'Amazon.com'){
    return <img alt="#" src={imageAWS} style={style}/>
  }
  if (isp ==='DigitalOcean, LLC' || isp==='DigitalOcean'){
    return <img alt="#" src={imageDO} style={style}/>
  }
  if (isp ==='Google LLC'){
    return <img alt="#" src={imageGCP} style={style}/>
  }

  if (isp ==='Microsoft Corporation'){
    return <img alt="#" src={imageAZURE} style={style}/>
  }

  if (isp ==='Hetzner Online GmbH'){
    return <img alt="#" src={imageHETZNER} style={style}/>
  }

  if (isp ==='The Constant Company' || isp === 'The Constant Company, LLC'){
    return <img alt="#" src={imageVULTR} style={style}/>
  }


  return '-'
}

const ChainTD = ({chain, obchains, maxChainHeights}) => {
  const delta = obchains[chain]-maxChainHeights[chain]
  return (
    <td style={{ fontFamily: 'monospace', textAlign: 'center', color: delta<-5 ? 'red' : null}}>{delta===0 ? 'OK' : delta}</td>
  )
}

const BondProviderPopOver = ({data}) => {
  const totalBond = data.map(item=>parseInt(item.bond)).reduce((a, b) => a + b, 0)

  const d = data.map((item,index) => {
    return (
    <div key={index} style={{width: 200, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace'}}>
      <span style={{fontFamily: 'monospace'}}>{item.bond_address.substring(item.bond_address.length-4, item.bond_address.length)}</span>
      <span style={{fontFamily: 'monospace'}}>{((item.bond/totalBond)*100).toFixed(2)}%</span>
      <span style={{fontFamily: 'monospace'}}>ᚱ{parseInt((item.bond/100000000).toFixed()).toLocaleString()}</span>
    </div>
  )
  })
  return d
}

const NodeTable = ({nodeData, clickSortHeader, sortColour, maxChainHeights, chains, addToFav, whichHeart}) => {

  return (
    <div>
    <table style={{minWidth: 1500, borderWidth: 1.1, borderColor: 'rgba(0,0,0,1)'}}>
      <thead>
        <tr style={{borderStyle: 'solid', borderWidth: 1.1, borderColor: 'rgba(0,0,0,1)', color: 'black', backgroundColor: 'rgb(221, 221, 221)', textAlign: 'right', marginRight: 10}}>
          <th></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('node_address'), textAlign: 'left', minWidth: 120}}><span onClick={()=>clickSortHeader('node_address')}>NODE</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('age')}}><span onClick={()=>clickSortHeader('age')}>AGE</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('action'), textAlign: 'center', minWidth: 140}}><span onClick={()=>clickSortHeader('action')}>ACTION</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('isp'), textAlign: 'center'}}><span onClick={()=>clickSortHeader('isp')}>ISP</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('location'), textAlign: 'left', minWidth: 165}}><span onClick={()=>clickSortHeader('location')}>LOCATION</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('bond'), minWidth: 110}}><span onClick={()=>clickSortHeader('bond')}>BOND</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('bond_providers'), textAlign: 'center', minWidth: 110}}><span onClick={()=>clickSortHeader('bond_providers')}>PROVIDERS</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('current_award')}}><span onClick={()=>clickSortHeader('current_award')}>REWARDS</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('apy')}}><span onClick={()=>clickSortHeader('apy')}>APY</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('slash_points')}}><span onClick={()=>clickSortHeader('slash_points')}>SLASHES</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('score')}}><span onClick={()=>clickSortHeader('score')}>SCORE</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('version')}}><span onClick={()=>clickSortHeader('version')}>VERSION</span></th>
          <th className="tableHeader" style={{...headerStyle, color: sortColour('leave'), textAlign: 'center'}}><span onClick={()=>clickSortHeader('leave')}>{leaveIcon}</span></th>


          {chains &&
            <>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={binance} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={bitcoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={eth} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={litecoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={bitcoincash} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={dogecoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
              <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={luna} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
            </>
          }
          <th className="tableHeader" style={{...headerStyle, textAlign: 'center'}}>RPC</th>
          <th className="tableHeader" style={{...headerStyle, textAlign: 'center'}}>BFR</th>


        </tr>
      </thead>
      <tbody>
      {nodeData.map((item, index) => (

        <tr key={index} style={{borderStyle: 'solid', borderWidth: 1}}>

          <td style={{backgroundColor: 'rgb(221, 221, 221)', borderLeftStyle: 'solid', borderLeftColor: 'black', borderRightColor: 'rgba(0,0,0,0.5)', minWidth: 35, paddingLeft: 5, fontWeight: 300}}>{index+1}</td>

          <td style={{...tdStyle, textAlign: 'left', paddingLeft: 3, minWidth: 140}}>
            <Popover
              content={item.node_address}
              title={'Thornode Address'}
              trigger="hover"
            >
            <span style={{cursor: 'pointer', fontFamily: 'monospace'}} className="nodeaddress" onClick={()=>copyToClipWithPopup('Node address copied to clipboard:', item.node_address)}>
              {item.node_address.substring(item.node_address.length-4,item.node_address.length)}
            </span>
            </Popover>
            <Icons address={item.node_address} ip_address={item.ip_address} addToFav={addToFav} whichHeart={whichHeart}/>
          </td>
          <td style={tdStyle}>{item.age.toFixed(2)}</td>
          <td style={{...tdStyle, textAlign: 'center'}}>{item.action}</td>
          <td style={{...tdStyle, textAlign: 'center'}}><ReturnIspImage isp={item.isp}/></td>
          <td style={{...tdStyle, textAlign: 'left'}}>{item.location}</td>
          <td style={tdStyle}>ᚱ{parseInt((item.bond/100000000).toFixed()).toLocaleString()}</td>
          <td style={{...tdStyle, textAlign: 'center'}}> <Popover
                        content={<BondProviderPopOver data={item.bond_providers.providers}/>}
                        title={'Bond Providers'}
                        trigger="hover"
                      ><span style={{cursor: 'pointer', fontFamily: 'monospace'}}>{item.bond_providers.providers.length}</span>
                </Popover>
            </td>
          <td style={tdStyle}>ᚱ{parseInt((item.current_award/100000000).toFixed()).toLocaleString()}</td>
          <td style={tdStyle}>{item.apy}</td>
          <td style={tdStyle}>{parseInt(item.slash_points).toLocaleString()}</td>
          <td style={tdStyle}>{item.score}</td>
          <td style={tdStyle}>{item.version}</td>
          <td style={{...tdStyle, textAlign: 'center'}}>{item.forced_to_leave === "true" || item.requested_to_leave === "true" ? 'yes' : '-'}</td>
          {chains &&
            <>
              <ChainTD chain={'BNB'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'BTC'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'ETH'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'LTC'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'BCH'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'DOGE'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
              <ChainTD chain={'TERRA'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
            </>
          }
          <td style={{...tdStyle, textAlign: 'center'}}><a style={{color: 'rgba(0,0,0,0.85)', fontSize: 18}} href={`http://${item.ip_address}:27147/health?`} target="_blank" rel="noopener noreferrer">{item.rpc === 'true' ? '*' : 'BAD'}</a></td>
          <td style={{...tdStyle, textAlign: 'center'}}><a style={{color: 'rgba(0,0,0,0.85)', fontSize: 18}} href={`http://${item.ip_address}:6040/p2pid`} target="_blank" rel="noopener noreferrer">{item.bifrost === 'true' ? '*' : 'BAD' }</a></td>
       </tr>
      ))}

      </tbody>
    </table>
    </div>
  )
}

let timer = null;
export default class extends Component {


  constructor(props) {
    super(props);
     this.state = {
       data: [],
       globalData: [],
       sortBy: 'bond',
       sortDirection: 'desc',
       activeNodes: [],
       standByNodes: [],
       whitelistedNodes: [],
       animateBlockCount: false,
       myFavNodes: [],
       searchTerm: '',
     };
  }



  async componentWillMount() {

    const myFavNodes = getCookie('myFavNodes')

    const tmp = myFavNodes.length>0 ? JSON.parse(myFavNodes) : []

    this.setState({ myFavNodes: tmp })

    this.refreshData()
  }

  async refreshData() {
    const data = await getData()

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('DEV ONLY: Refresh Data Results: ', data)
    }


    this.setState({data: data.data, globalData: data.globalData, maxChainHeights: data.maxChainHeights, animateBlockCount: false}, ()=>this.setData()) //Change animateBlockCount to true here for animation

  }


  componentDidMount() {

    timer = setInterval(() => {
      this.setState({animateBlockCount: false}, ()=>this.refreshData())
      //this.refreshData()
    }, 6000)
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  addToFav(address) {

    //setCookie('myFavNodes', '')
    //return

    //Below works to add, but need to check if already exists, and if so remove

    const myFavNodes = getCookie('myFavNodes')//JSON.parse(

    if(myFavNodes.length===0) {
      //in here no current fav nodes
      const singleAddress = JSON.stringify([address])
      setCookie('myFavNodes', singleAddress)
      this.setState({myFavNodes: singleAddress}, ()=>this.setData())

    } else {
      //If we already have some fav nodes
      const newFaveNodes = JSON.parse(myFavNodes)

      //Need to check if already exists
      if (newFaveNodes.indexOf(address) > -1) {
          //In the array!

          const newArrayWithRemove = newFaveNodes.filter(item => item!==address)

          const newFaveNodesNew = JSON.stringify(newArrayWithRemove)
          this.setState({myFavNodes: newArrayWithRemove}, ()=>this.setData())
          setCookie('myFavNodes', newFaveNodesNew)

      } else {
          //Not in the array
          newFaveNodes[newFaveNodes.length] = address

          const newFaveNodesNew = JSON.stringify(newFaveNodes)

          this.setState({myFavNodes: newFaveNodes}, ()=>this.setData())
          setCookie('myFavNodes', newFaveNodesNew)

      }

    }

  }

  returnSearchedData(data) {
      if (this.state.searchTerm === '') {
        return data
      } else {
        const filteredNodes = data.filter(item => item.node_address.includes(this.state.searchTerm))
        return filteredNodes
      }
  }

  setData() {
    //Grab our state so we can mutate it
    let myData = JSON.parse(JSON.stringify(this.state.data))




    //Add faves to the data, then we can sort by then below
    const newItems = myData.map(item => {
        if (this.state.myFavNodes.includes(item.node_address)) {
          item.fave = 1
        } else {
          item.fave = 0
        }
        return item
      });

/*
Whitelisted
Active
Standby
Ready
Disabled
*/

      //Filter for our three tables
      let activeNodes = newItems.filter(item => item.status ==='Active')
      let standbyNodes = newItems.filter(item => (item.status ==='Standby' || item.status ==='Ready') && item.version === this.state.globalData.maxVersion)
      let whitelisted = newItems.filter(item => !(item.status ==='Active' || item.status ==='Standby' || item.status ==='Ready') && item.version !== this.state.globalData.maxVersion)

      activeNodes = this.findChurnOuts(activeNodes) //Add in the actions for churning
      standbyNodes = this.findChurnIns(standbyNodes) //Add in the actions for nodes churning in

      //Filter here if any searchTerm from the search bar
      //Need to do after adding the actions
      activeNodes = this.returnSearchedData(activeNodes)
      standbyNodes = this.returnSearchedData(standbyNodes)
      whitelisted = this.returnSearchedData(whitelisted)

      //Sort and add our favs to the top
      let activeNodesSorted = this.sortData(activeNodes)
      const favActiveNodesSorted = activeNodesSorted.filter(item => item.fave === 1) //Get our favourites
      activeNodesSorted = activeNodesSorted.filter(item => item.fave === 0)//Get our non favourites

      activeNodesSorted = [...favActiveNodesSorted, ...activeNodesSorted] //Join faves at top with non favourites


      const standBySorted = this.sortData(standbyNodes)
      const whitelistedSorted = this.sortData(whitelisted)

      this.setState({
        activeNodes: activeNodesSorted,
        standByNodes: standBySorted,
        whitelistedNodes: whitelistedSorted
      })
  }

/*
Split the data into over 300ks and under 300ks
With the over 300ks, take the top 3 if they exist and apply churn in action
If 4 nodes churn in instead of 3 each time, add another row
*/
  findChurnIns(standbyNodes) {
    if (standbyNodes.length === 0) return [] //Stops filter from breaking when search returns 0

    const over300 = standbyNodes.filter(item => item.bond >= 30000000000000)
    const over300Sorted = this.sortData(over300, 'bond', 'desc')

    if (over300Sorted.length > 0){
      over300Sorted[Math.min(0, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(1, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(2, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(3, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(4, over300Sorted.length-1)].action = 'Churn In'
    }
    const under300 = standbyNodes.filter(item => item.bond < 30000000000000)

    return [...over300Sorted, ...under300]
  }

/*
Lowest Bond
Oldest Node
Worst Performer (Can't churn out if just churned in, one cycle grace period)
*/
  findChurnOuts(activeNodes) {
    if (activeNodes.length === 0) return [] //Stops filter from breaking when search returns 0

    let activeNodesSorted = this.sortData(activeNodes, 'age', 'desc')
    activeNodesSorted[0].action = 'Oldest'

    activeNodesSorted = this.sortData(activeNodes, 'bond', 'asc')
    activeNodesSorted[0].action = 'Smallest Bond'

    activeNodesSorted = this.sortData(activeNodes, 'score', 'asc', true)
    //activeNodesSorted[0].action = 'Worst Performing'

    return activeNodesSorted
  }
/*
Sort by either string or number
We use string sort function if value is one of the arrays else do second sort number
*/
  sortData(data, value = null, direction = null, worst_perform = false) {
    const toSortBy = value === null ? this.state.sortBy : value
    let newData = []
    if (['node', 'isp', 'location', 'version', 'action', 'node_address'].includes(toSortBy)){ //Add items we want to sort by that are strings
      //This sort function for strings
      newData = data.sort((a, b) => a[toSortBy].localeCompare(b[toSortBy]));
    } else if (toSortBy === 'bond_providers') {
      //This is for bond provider sort as we need to go another layer deep in the object
      newData = data.sort((a, b) => a[toSortBy].providers.length - b[toSortBy].providers.length);
    } else if (worst_perform === true) {
      //This is for when we are sorting for action of worst performance as we want to exclude any with age under 3 days
      const ageCutOffDays = 3
      const a = data.filter(item => parseFloat(item.age) > ageCutOffDays)
      const b = data.filter(item => parseFloat(item.age) <= ageCutOffDays)

      const aSorted = a.sort((a, b) => (b[toSortBy] - a[toSortBy]) );

      aSorted[aSorted.length-1].action = 'Worst Performing'
      newData = [...aSorted, ...b]
    } else {
      //This sort function for numbers
      newData = data.sort((a, b) => a[toSortBy] - b[toSortBy]);
    }
    //If we pass it a direction, we set it here, if not we take it from the state
    const toDirection = direction === null ? this.state.sortDirection : direction
    if (toDirection === 'desc') {
      newData.reverse()
    }

    return newData
  }

  clickSortHeader(item){
    const direction = this.state.sortBy !== item ? 'desc' : this.state.sortDirection === 'desc' ? 'asc' : 'desc';
    this.setState({sortBy: item, sortDirection: direction}, ()=> this.setData())
  }

  sortColour(item) {
    if (item === this.state.sortBy) {
      return this.state.sortDirection ==='desc' ? '#065900' : '#590000'
    } else {
      return null
    }
  }

  whichHeart(address){
    return this.state.myFavNodes.includes(address) ? heartFull : heartBlank
  }


  searchBar() {
    return (
      <Input
        style={{marginTop: 10, width: 400, height: 30, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)'}}
        placeholder="Search..."
        onChange={(event) => this.setState({ searchTerm: event.target.value.trim()},()=>this.setData())}
      />
    )
  }

  render() {

/*
    if (this.state.data.length === 0) {
      return <div style={{display: 'flex', justifyContent: 'center'}}><Spin size="large" /></div>
    }
*/

    return (
      <Layout>
      <Header style={{color:'white', fontSize:20, fontWeight: 300, minWidth: 1580}}>Thornode Monitor</Header>
       <Content style={{padding:40, backgroundColor: 'white'}}>

          <div style={{display:'flex', width: '100%', justifyContent: 'flex-start'}}>
           <GlobalData state={this.state} globalData={this.state.globalData} animateBlockCount={this.state.animateBlockCount}/>
           <CoinGeckoData globalData={this.state.globalData} />
          </div>

           {this.searchBar()}
           <h2>Active</h2>
           <NodeTable whichHeart={this.whichHeart.bind(this)} addToFav={this.addToFav.bind(this)} nodeData={this.state.activeNodes} clickSortHeader={this.clickSortHeader.bind(this)} sortColour={this.sortColour.bind(this)} maxChainHeights={this.state.maxChainHeights} chains={true}/>
           <br/>
           <h2>{'Standby'}</h2>
           <NodeTable whichHeart={this.whichHeart.bind(this)}addToFav={this.addToFav.bind(this)} nodeData={this.state.standByNodes} clickSortHeader={this.clickSortHeader.bind(this)} sortColour={this.sortColour.bind(this)} maxChainHeights={this.state.maxChainHeights} chains={false}/>
           <br/>
           <h2>{'Other'}</h2>
           <NodeTable whichHeart={this.whichHeart.bind(this)}addToFav={this.addToFav.bind(this)} nodeData={this.state.whitelistedNodes} clickSortHeader={this.clickSortHeader.bind(this)} sortColour={this.sortColour.bind(this)} maxChainHeights={this.state.maxChainHeights} chains={false}/>
        </Content>
       <Footer>Thornode Monitor - 2022</Footer>
     </Layout>




    );
  }
}
