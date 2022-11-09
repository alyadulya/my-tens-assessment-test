import debounce from "debounce-promise";
import { getRepos } from "../../api/repos";
import { ERROR_FETCHING_REPOS, START_FETCHING_REPOS, SUCCESS_FETCHING_REPOS } from "./constant";

export const startFetchingRepos = () => ({
  type: START_FETCHING_REPOS
})

export const errorFetchingRepos = () => ({
  type: ERROR_FETCHING_REPOS
})

export const successFetchingRepos = (payload) => ({
  type: SUCCESS_FETCHING_REPOS,
  payload
})

let debouncedFetchRepos = debounce(getRepos, 2000);

export const fetchRepos = (username) => {
  return async (dispatch) => {
    dispatch(startFetchingRepos());

    try {
      let { data } = await debouncedFetchRepos(username);
      dispatch(successFetchingRepos({ data }));
    } catch (error) {
      dispatch(errorFetchingRepos());
    }
  }
}