import React,{useState, useEffect} from "react"
import "../components/styles/Blogs.css"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"

const Blogs =() =>{
    const [blogs, setblogs] = useState([])
    let nothing = "eep"
    const getBlogInfo =()=>{
        fetch('https://globalmessageboardly.herokuapp.com')
        .then((response)=>{
            return response.json()
        }).then((response)=>{
            setblogs(response.posts)
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    useEffect(()=>{
        getBlogInfo()
    },[nothing]);

    return(
        <div>
            
            
            {blogs.map((temp, index)=>
                <div className="blog-post" key={temp.title}>
                    <img src={temp.image} alt="not available" className="blog-image"></img>
                    <div className="blog-header">
                        <p>{dateFormat(temp.date,"mmmm dS, yyyy")}</p>
                        {temp.comments.length > 0
                            ? <p><span>{temp.comments.length}</span> Comments</p>
                            : <p>Post a Comment!</p>
                        }
                        
                        <p>Author: {temp.author}</p>
                    </div>
                    <p className="blog-title">{temp.title}</p>
                    <p className="blog-content">{temp.blogPost}</p>
                    <Link to="/article" className="link-btn" state={{temp, index}}><button className="continueBtn">Continue Reading</button></Link>
                  
                
                </div>
                
            )}
        </div>
    )
}

export default Blogs