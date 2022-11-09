import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../../app/features/Repos/action";

const Home = () => {
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const [username, setusername] = useState('github');

  useEffect(() => {
    dispatch(fetchRepos(username))
  }, [dispatch, username]);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="container my-3">
      <h1>GitHub Repository List</h1>
      <form onSubmit={handleSubmit} className="row my-3">
        <div className="col-auto">
          <input type="text" className="form-control" placeholder="Enter github username" value={username} onChange={event => {setusername(event.target.value)}} />
        </div>
      </form>
      {
        repos.status === 'success' ?
          <div>
            <img src={repos.data[0].owner.avatar_url} className="rounded-circle mb-1" alt={username} width="100px" />
            <h4>{repos.data[0].owner.login}</h4>
          </div>

          :

          null
      }
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-3">
        {
          repos.status === 'process' ?
            <p>Loading</p>

            :
            
            repos.data.length === 0 ?
              <p>No results</p>

              :

              repos.data.map((repo, index) =>
                <div className="col" key={index}>
                  <div className="card h-100">
                    <a href={repo.html_url} className="card-body stretched-link text-decoration-none" target="_blank" rel="noreferrer">
                      <h5 className="card-title">{repo.name}</h5>
                      <p className="card-text">
                        {
                          !repo.language ?
                            null
                            :
                            <span>
                              <i className="fa-solid fa-code"></i> {repo.language}<br />
                            </span>
                        }
                        {
                          !repo.stargazers_count ?
                            null
                            :
                            <span>
                              <i className="fa-regular fa-star"></i> {repo.stargazers_count}
                            </span>
                        }
                      </p>
                    </a>
                    <div className="card-footer">
                      <small className="text-muted">Updated at {new Date(repo.updated_at).toLocaleDateString("en-US", {day: 'numeric', month: 'short', year: 'numeric'})}</small>
                    </div>
                  </div>
                </div>
              )
        }
      </div>
    </div>
  )
}

export default Home;