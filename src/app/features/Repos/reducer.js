import { ERROR_FETCHING_REPOS, START_FETCHING_REPOS, SUCCESS_FETCHING_REPOS } from "./constant"

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error'
}

const initialState = {
  data: [],
  status: statusList.idle
}

export default function repoReducer(state = initialState, {type, payload}) {
  switch (type) {
    case START_FETCHING_REPOS:
      return {...state, status: statusList.process }

    case ERROR_FETCHING_REPOS: 
      return {...state, status: statusList.error, data: [] }

    case SUCCESS_FETCHING_REPOS: 
      return {...state, status: statusList.success, data: payload.data }
  
    default:
      return state
  }
}