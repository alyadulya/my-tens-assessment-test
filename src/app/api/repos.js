import axios from "axios";

export const getRepos = async (username) => {
  return await axios.get(`https://api.github.com/users/${username}/repos`);
}