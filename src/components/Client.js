import React, { useEffect, useState } from 'react';
import { db } from "../Config/firebase";
import { collection, getDocs} from "firebase/firestore";
import "./Client.css";

const Client = () => {
    const [posts, setPosts] = useState([]);
   
    const postCollectionRef = collection(db, "Movies");
    

    const getPosts = async () => {
        try {
        const data = await getDocs(postCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setPosts(filteredData);
        console.log(filteredData);
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, [posts]);

  return (
    <div className='Main'>
        <h1>Uploaded Posts</h1>
        {posts.map((post, url) => {
            return (
                <div className='post'>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.image} height="300" width="300" />
                </div>
            )
        })}
    </div>
  )
}

export default Client;