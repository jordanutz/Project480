const initialState = {
  admin: {},
  finalOutreach: [],
  finalEvents: [],
  finalWorship: []
}

const GET_FINAL_OUTREACH = 'GET_FINAL_OUTREACH',
      GET_FINAL_EVENTS = 'GET_FINAL_EVENTS',
      GET_FINAL_WORSHIP = 'GET_FINAL_WORSHIP',
      LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT'

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_FINAL_OUTREACH:
      return {...state, finalOutreach: action.payload}
    case GET_FINAL_EVENTS:
      return {...state, finalEvents: action.payload}
    case GET_FINAL_WORSHIP:
      return {...state, finalWorship: action.payload}
    case LOGGED_IN:
        return {...state, admin: action.payload}
    case LOGGED_OUT:
        return {...state, admin: null}
      default:
      return {...state}
  }
}

  export function getOutreach (finalOutreach) {
    return {
      type: GET_FINAL_OUTREACH, payload: finalOutreach
    }
  }

  export function getEvents (finalEvents) {
    return {
      type: GET_FINAL_EVENTS, payload: finalEvents
    }
  }

  export function getWorship (finalWorship) {
    return {
      type: GET_FINAL_WORSHIP, payload: finalWorship
    }
  }

  export function logIn (admin) {
    return {
      type: LOGGED_IN, payload: admin
    }
  }

  export function logOut () {
    return {
      type: LOGGED_OUT
    }
  }
