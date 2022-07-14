//import React, { Component, useState } from 'react';
//import { configureStore } from './myStore';
import Amplify, { API } from 'aws-amplify';
import { awsConfig } from './aws-exports';
//import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import semver from 'semver';


import { store } from './redux/store';
import authActions from '@iso/redux/auth/actions';

Amplify.configure(awsConfig);


export const getData = async () => {
  //const [firstLoad, setFirstLoad] = useState(false);

  const blockTime = 6 //6 seconds Need to calc this properly
  const val = await API.get('MyAWSApi', '');

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('DEV ONLY: Raw getData API Call Results: ', val)
  }

  let globalData = val.globalData

  //Find max version of code
  const maxVersion = val.data.map(item => item.version).sort(semver.rcompare)[0]


  //Calc time until next churn
  const churnAtBlock = globalData.lastChurn + globalData.churnInterval
  const blocksUntilChurn = churnAtBlock - globalData.maxHeight
  //console.log('blocksUntilChurn', blocksUntilChurn)
  const secondsUntilChurn = blocksUntilChurn * globalData.secondsPerBlock
  let duration = moment.duration(secondsUntilChurn, 'seconds');

  //Calc the seconds until next retry (will only get used if secondsUntilChurn is negative (to show we are no longer in normal 3 day wait) and if no retiring vaults are found)
  const modChurn = blocksUntilChurn % 720
  const blocksUntilRetry = 720 + modChurn
  const secondsUntilRetry = blocksUntilRetry * globalData.secondsPerBlock
  const durationRetry = moment.duration(secondsUntilRetry, 'seconds');

  //Calc APY
  //If we take rewards/ratioRewardsAPY then this gives us extrapolated rewards for end of churn
  const ratioRewardsAPY = (globalData.churnInterval-blocksUntilChurn)/globalData.churnInterval
  //Calc how long a churn goes for, then calc how many of these are in a year
  const churnsInYear = 365/((globalData.secondsPerBlock * globalData.churnInterval)/60/60/24)

  const timeUntilChurn = {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  }

  const timeUntilRetry = {
    days: durationRetry.days(),
    hours: durationRetry.hours(),
    minutes: durationRetry.minutes(),
    seconds: durationRetry.seconds()
  }

  globalData.coingecko = JSON.parse(globalData.coingecko)[0];

  globalData = {...globalData,
    ...{timeUntilChurn: timeUntilChurn},
    ...{timeUntilRetry: timeUntilRetry},
    churnTry: secondsUntilChurn < 0 ? true : false,
    ratioRewardsAPY: ratioRewardsAPY,
    maxVersion:maxVersion
  }

  globalData.blocksSinceLastChurn = globalData.maxHeight - globalData.lastChurn


  //Do calcs for whatever we need
  //Calc age (dont need to save it back)
  val.data.map(item => {
    item.age = (((globalData.maxHeight - item.status_since)*blockTime)/60/60/24)
    item.score = (globalData.blocksSinceLastChurn/item.slash_points).toFixed(1)
    item.score = item.score === 'Infinity' ? '-' : item.score
    item.action = '-'
    item.bond_providers = JSON.parse(item.bond_providers)
    item.jail = JSON.parse(item.jail)
    item.observe_chains = JSON.parse(item.observe_chains)
    item.preflight_status = JSON.parse(item.preflight_status)
    item.obchains = item.observe_chains === null ? 0 : item.observe_chains.reduce((obj, item) => Object.assign(obj, { [item.chain]: item.height }), {});
    item.apy = (((((item.current_award/ratioRewardsAPY)/100000000)*churnsInYear)/(item.bond/100000000))*100).toFixed(2)+'%'
    return item
  })
  const data2 = val.data.map(item =>item.observe_chains).filter(item => item !== null)

  function reduceDown(data, chain) {
    const a = data.map(item => item.filter(item=>item.chain === chain)) //Get data just for out chain
    const b = a.filter(item => item.length > 0) //Filter out if any nodes have missing data
    const c = b.map(item => item[0].height) //Grab just the height metric
    const d = c.reduce((a, b) => { return Math.max(a, b) }) //Grab max of our values
    return d
  }
  //console.log('data2', data2)
  const maxBTCHeight = reduceDown(data2, 'BTC')
  const maxDogeHeight = reduceDown(data2, 'DOGE')
  const maxEthHeight = reduceDown(data2, 'ETH')
  const maxLTCHeight = reduceDown(data2, 'LTC')
  //const maxTerraHeight = reduceDown(data2, 'TERRA')
  const maxBCHHeight = reduceDown(data2, 'BCH')
  const maxBNBHeight = reduceDown(data2, 'BNB')
  const maxGAIAHeight = reduceDown(data2, 'GAIA')

  const totalBondedValue = (val.data.map(item => item.bond).reduce((prev, next) => prev + next))/100000000;
  globalData.totalBondedValue = totalBondedValue;

  return {data: val.data, globalData: globalData, maxChainHeights: {BTC: maxBTCHeight, DOGE: maxDogeHeight, ETH: maxEthHeight, LTC: maxLTCHeight, GAIA: maxGAIAHeight, BCH: maxBCHHeight, BNB: maxBNBHeight}}
}

export const refreshData = async () => {

  apiCall('getUserData')
  .then(results => {
    store.dispatch(authActions.saveData(results))

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('DEV ONLY: Refresh Data Results: ', results)
    }
  })
}

export const API_Call = async (myInit) => {
  //console.log('myInit', myInit.body.operation, myInit)
  let val = [];
  try {
    val = await API.post('MyAWSApi', '', myInit);

    //console.log('Returned data from API call: ', myInit.body.operation, val);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('DEV ONLY: Returned data from API call: ', myInit.body.operation, val)
    }

    if (val.errorType === 'NotAuthorizedException') {
      //This is if the token has expired
      await window.alert('Auth token has expired, please login again.')
      store.dispatch(authActions.logout())
      return false
    }

    if (val.errorMessage) {
      console.log('is an unhandled error - ' + myInit.body.operation + ':', val);
      return false;
    }

    //If sucess = false, this is our backend saying something wrong, display the message so user can give it in feedback when they contact us
    if (val.success === false) {
      console.log('is an error from success - ' + myInit.body.operation + ':', val);
      return false;
    }
    return val;
  } catch (e) {
    console.log('is an error from error', e);
    console.log('is an error from error', e.response);

    //signOut();
    return false;
  }
};

/*
---------------------------------------------------------------
apiCall function
---------------------------------------------------------------
*/

export const apiCall = async (operation, data) => {

  let myInit = {
      headers: { auth_token: localStorage.getItem("auth_token") },
      body: {
        operation: operation,
        accessToken: localStorage.getItem("accessToken"),
        //copyUser: copyuser === 'none' ? 'false' : 'true',
        //copyUserName: copyuser
      },
  };

  switch (operation) {
    case 'getUserData':
      break;

    //Normal user functions
    case 'saveDeposit':
        myInit.body.hash = data.hash;
        break;

    case 'unstakeToWallet':
        myInit.body.amount = data.amount;
        myInit.body.address = data.address;
        break;

    case 'stakePOKT':
        myInit.body.amount = data.amount;
        myInit.body.where = data.where;
        break;

    case 'moveRewardsToWallet':
        myInit.body.amount = data.amount;
        break;


    case 'userWithdraw':
        myInit.body.amount = data.amount;
        myInit.body.address = data.address;
        break;

    case 'unstakeNode':
        myInit.body.address = data.address;
        break;


    //Admin functions
    case 'adminConfirmDeposit':
        myInit.body.email = data.email;
        myInit.body.hash = data.hash;
        myInit.body.amount = data.amount;
        break;


    case 'adminConfirmStake':
        myInit.body.email = data.email;
        myInit.body.hash = data.hash;
        myInit.body.amount = data.amount;
        myInit.body.where = data.where;
        myInit.body.nodeAddress = data.nodeAddress;
        break;

    case 'adminConfirmWithdraw':
        myInit.body.datetime = data.datetime;
        myInit.body.email = data.email;
        myInit.body.amount = data.amount;
        myInit.body.address = data.address;
        myInit.body.hash = data.hash;
        break;

    case 'adminExpireDeposit':
      myInit.body.email = data.email;
      myInit.body.hash = data.hash;
      break;

    case 'adminLoadAllUserData':
      break;

    default:
      console.error('No operaton found for: ', operation);
      return false;
  }

  return await API_Call(myInit);

};

export const setCookie = (cname, cvalue, exdays) =>{
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //let expires = "expires="+d.toUTCString();
  let maxAge = "max-age="+60*60*24*365*5 //5 years
  document.cookie = cname + "=" + cvalue + ";" + maxAge + ";path=/";
}

export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const checkCookie = () => {
  let user = getCookie("username");
  if (user !== "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user !== "" && user !== null) {
      setCookie("username", user, 365);
    }
  }
}
