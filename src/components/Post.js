import React, { useEffect, useState } from 'react';
import { db, storage} from "../Config/firebase";
import {addDoc, collection, doc, getDocs} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import "./Post.css";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [isdescription, setIsDescription] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState("");
    

    const postCollectionRef = collection(db, "Movies");
    const imageListRef = ref(storage, "projectfiles/");

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

    


    const uploadPost = async () => {
        
        try {
            setTitle("")
            setIsDescription("")
            setImageUpload(null)
            if (imageUpload === null) return;
            const imageRef = ref(storage, `/projectfiles/${imageUpload.name}`);
            uploadBytes(imageRef, imageUpload).then(() => {
                getDownloadURL(imageRef).then((imageurl) => {
                    const postCollectionRef = collection(db, "Movies");
                    addDoc(postCollectionRef, {
                                    title: title,
                                    description: isdescription,
                                    isActive: true,
                                    image: imageurl,
                                });
                })
            })

        } catch (err) {
            console.error(err)
        }
    }
  return (
    <div>
      <div className='main'>
        <div className='title'>
            <label>Enter Title: </label>
            <input className='input1'
                placeholder='Post Title'
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className='title2'>
            <label>Enter Description:</label>
            <input 
                placeholder='Post Description'
                onChange={(e) => setIsDescription(e.target.value)}
            />
        </div>
        <div className='title3'>
            <label>Upolad Image</label>
            <input className='input3'
                type="file"
                onChange={(e) => {setImageUpload(e.target.files[0])}}  
            />
        </div>

        <button onClick={uploadPost}>Upload</button>

      </div>
        {posts.map((post, url) => {
            return (
                <div>
                    <h1>Uploaded Posts</h1>
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <img src={post.image} height="300" width="300" />
                </div>
            )
        })}
      <div>
        
      </div>
    </div>
  )
}

export default Post
