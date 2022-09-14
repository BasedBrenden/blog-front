import React from "react"
import Nav from './Nav'
import { useState } from "react"
import { Link } from "react-router-dom"
import {storage} from "../Firebase"
import {ref, uploadBytes} from "firebase/storage"
import {v4} from 'uuid'

import "./styles/Form.css"

const Form =() =>{
    const [imageKey, setImageKey] = useState('')
    const addToBlog =() =>{
        fetch('https://globalmessageboardly.herokuapp.com/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: document.getElementById("title").value, blogPost: document.getElementById("content").value, image: imageKey })})
            .then(response => response.json())
            .catch(err => console.log(err))
        
        
    }

    const uploadImage = () =>{
        const tempKey = v4()
        if (imageKey == null) return;
        const imageRef = ref(storage, 'images/'+tempKey)
        uploadBytes(imageRef, imageKey).then(()=>{
            alert(tempKey +" has been uploaded");
            console.log(tempKey.getDownloadURL())
            console.log(imageRef)
        })
        setImageKey(tempKey)
        
    }


    

    return(
        <div>
            <Nav/>
            <div className="main-container">
                <div className="form-container">
                    <input type="text" placeholder="New Blog title" id="title"></input>
                    <textarea type="text" placeholder="Type your new blog post!" id="content"></textarea>
                    <input type="file" name="myImage" id="image" accept="image/x-png,image/gif,image/jpeg" onChange ={(event) => {setImageKey(event.target.files[0])}}/>
                    <button type="button" onClick={()=>{uploadImage();addToBlog()}}>submit!</button>
                    <Link to="/"><button type="button">Return to home page</button></Link>
                </div>
            </div>
        </div>
        
    )
}

export default Form