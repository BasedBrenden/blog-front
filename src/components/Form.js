import React from "react"
import { Link } from "react-router-dom"

const Form =() =>{

    const addToBlog =() =>{
        fetch('http://globalmessageboardly.herokuapp.com/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: document.getElementById("title").value, blogPost: document.getElementById("content").value })})
            .then(response => response.json())
            .catch(err => console.log(err))
        
        
    }

    

    return(
        <div>
            
            <div>
                <input type="text" placeholder="New Blog title" id="title"></input>
                <input type="text" placeholder="Type your new blog post!" id="content"></input>
                <button type="button" onClick={()=>{addToBlog()}}>submit!</button>
            </div>

            <Link to="/"><button type="button">Return to home page</button></Link>


        </div>
    )
}

export default Form