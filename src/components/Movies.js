import { useEffect, useState } from 'react';
import {db, auth, storage} from "../Config/firebase";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"


const Movies = () => {
    const [movieList, setMovieList] = useState([]);
    const [newMovieName,setNewMovieName] = useState("");
    const [newReleasedate,setNewReleaseDate] = useState(0);
    const [newMovieOscar,setNewMovieoscar] = useState(false);
    const [updateTitle,setUpdatedTitle] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);

 
  const moviesCollectionRef = collection(db, "Movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
      const data =  await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
      console.log(filteredData);
      } catch (err) {
        console.error (err);
      }
    };

    getMovieList(); 
  }, [movieList]);
  console.log(movieList)

  const onSubmitMovie = async () => {
    try {
        await addDoc(moviesCollectionRef, {
            title: newMovieName,
            releaseDate: newReleasedate,
            RecceivedanOscar: newMovieOscar,
            userId: auth?.currentUser?.uid,
        });
    } catch (err) {
        console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "Movies", id)
    await deleteDoc(movieDoc);
  }

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "Movies", id)
    await updateDoc(movieDoc, {title: updateTitle});
  }

  
  
  return (
    <div>

        <div>
          <input
           placeholder='Movie title'
           onChange={(e) => setNewMovieName(e.target.value)}
          />
          <input
           placeholder='Release Date'
           type="number"
           onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          />
          <input
           type="checkbox"
           checked={newMovieOscar}
           onChange={(e) => setNewMovieoscar(e.target.checked)}
          />
          <label>Received an Oscar</label>
          <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
      
      
      <div>
        {movieList.map((movie) => {
            return(
                <div>
                    <h1>{movie.title}</h1>
                    <p>Date: {movie.releaseDate}</p>
                    <button onClick={() => deleteMovie(movie.id)}>Delete</button>

                    <input 
                        placeholder='new title' 
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <button onClick={() => updateMovie(movie.id)}>Update Title</button>
                </div>
            )
        })}
      </div>
    </div>
  );
}

  

export default Movies;
