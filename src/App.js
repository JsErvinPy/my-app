import { useEffect, useState } from 'react';
import c from 'clsx';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then(res => res.json())
      .then(json => {
        setData(json.data);
      });
  }, []);

  function onDelete (index) {
    data.splice(index, 1);
    setData([...data]);
  }

  function onLike(id) {
    const index = likes.findIndex((value) => value === id);

    if (index === -1) {
      likes.push(id)
    } else {
      likes.splice(index, 1)
    }

    setLikes([...likes]);
  }

  return (
    <div>
      <header>
        <p>Top anime</p>
      </header>

      <main>
        <div className="button">show favorite</div>

        <div className="cards">
          {
            data?.map((item, index) => (
              <div className="card" key={item.mal_id}>
                <img className="img" src={item.images.jpg.image_url} />
                <div>{item.title}</div>
                <div className="card_actions">
                  <div
                    className={c(
                      'card_action card_favorite',
                      'card_favorite',
                      { card_favorite_active: likes.includes(item.mal_id) }
                    )}
                    onClick={() => onLike(item.mal_id)}
                  />  
                  <div
                    className="card_action card_delete"
                    onClick={() => onDelete(index)}
                  />
                </div>
              </div>
            ))
          }

        </div>
      </main>
    </div>
  );
}

export default App;
