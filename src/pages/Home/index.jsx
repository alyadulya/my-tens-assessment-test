import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../../app/features/Repos/action";

const Home = () => {
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const [username, setusername] = useState('alyadulya');

  useEffect(() => {
    dispatch(fetchRepos(username))
  }, [dispatch, username]);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  console.log(repos);

  return (
    <div>
      <div>
         <form onSubmit={handleSubmit}>
           <input type="text" name="username" id="username" value={username} onChange={event => {setusername(event.target.value)}} />
           <input type="submit" value="Submit" />
         </form>
       </div>
      {
        repos.status === 'process' ?
          <p>Loading</p>

          :
          
          repos.data.map((repo, key) =>
            <p>{repo.name}</p>
          )
      }
    </div>
  )
}

export default Home;