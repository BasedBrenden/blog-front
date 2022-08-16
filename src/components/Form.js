import React from "react"
import Nav from './Nav'
import { useState } from "react"
import { Link } from "react-router-dom"
import {Storage} from 'aws-amplify'
import "./styles/Form.css"

const Form =() =>{
    const [imageKey, setImageKey] = useState('')
    const addToBlog =() =>{
        fetch('http://globalmessageboardly.herokuapp.com/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: document.getElementById("title").value, blogPost: document.getElementById("content").value , imageKey: imageKey})})
            .then(response => response.json())
            .catch(err => console.log(err))
        
        
    }

    const uploadImage = async(e) =>{
         const file = e.target.files[0]
         const result = await Storage.put(file.name, file)
         setImageKey(result.key)
        
    }
    

    return(
        <div>
            <Nav/>
            <div className="main-container">
                <div className="form-container">
                    <input type="text" placeholder="New Blog title" id="title"></input>
                    <textarea type="text" placeholder="Type your new blog post!" id="content"></textarea>
                    <input type="file" name="myImage" id="image" accept="image/x-png,image/gif,image/jpeg" onChange={uploadImage}/>
                    <button type="button" onClick={()=>{addToBlog()}}>submit!</button>
                    <Link to="/"><button type="button">Return to home page</button></Link>
                </div>
            </div>
        </div>
        
    )
}

export default Form