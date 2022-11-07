import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');

  const getRepos = async () => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setData(response.data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getRepos();
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      {
        data.map((d, i) =>
          <p>{d.name}</p>
        )
      }
    </div>
  )
}

export default Home;