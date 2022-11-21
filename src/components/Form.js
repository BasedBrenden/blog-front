import React from "react"
import Nav from './Nav'
import { useState } from "react"
import { Link } from "react-router-dom"
import {storage} from "../Firebase"
import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {v4} from 'uuid'

import "./styles/Form.css"

const Form =() =>{
    const [imageKey, setImageKey] = useState('')
    const addToBlog =(imageLink) =>{
        fetch('https://globalmessageboardly.herokuapp.com',{
            method:'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: document.getElementById("title").value, 
                blogPost: document.getElementById("content").value,
                author: document.getElementById("author").value, 
                image: imageLink })})
            .catch(err => console.log(err))
        
        
    }

    const uploadImage = () =>{
        const tempKey = v4()
        if (imageKey == null) return;
        const imageRef = ref(storage, 'images/'+tempKey)
        uploadBytes(imageRef, imageKey).then(()=>{
            alert(tempKey +" has been uploaded");
            getDownloadURL(imageRef).then((url)=> addToBlog(url))
        })
        //setImageKey(tempKey.getDownloadURL())
        
    }


    

    return(
        <div>
            <Nav/>
            <div className="main-container">
                <div className="form-container">
                    <input type="text" placeholder="New Blog title" id="title"></input>
                    <input type="text" placeholder="Author" id="author"></input>
                    <textarea type="text" placeholder="Type your new blog post!" id="content"></textarea>
                    <input type="file" name="myImage" id="image" accept="image/x-png,image/gif,image/jpeg" onChange ={(event) => {setImageKey(event.target.files[0])}}/>
                    <button type="button" onClick={()=>{uploadImage()}}>submit!</button>
                    <Link to="/"><button type="button">Return to home page</button></Link>
                </div>
            </div>
        </div>
        
    )
}

export default Form