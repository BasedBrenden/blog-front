import React,{useState, useEffect} from "react"
import defaultStock from "./styles/radnom_stock1.jpg"
import "../components/styles/Blogs.css"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"
import {ref, getDownloadURL, listAll, list} from 'firebase/storage'
import { storage } from "../Firebase"



const Blogs =() =>{
    const [blogs, setblogs] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    let nothing = "eep"
    const imageListRef = ref(storage, "images/")

    const getBlogInfo =()=>{
        fetch('https://globalmessageboardly.herokuapp.com/')
        .then((response)=>{
            return response.json()
        }).then((response)=>{
            setblogs(response.posts)
            listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                    setImageUrls( (imageUrls) => [...imageUrls, url]);
                    console.log(url)
                  });
                });
              });
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    
 


    useEffect(()=>{
    
        
        
        getBlogInfo()
        
        console.log("i fire once")
    },[nothing]);



    

    



    return(
        <div>
            
            
            {blogs.map((temp, index)=>
                <div className="blog-post" key={temp.title}>
                    <img src={imageUrls[index]} alt="not available" className="blog-image"></img>
                    <div className="blog-header">
                        <p>{dateFormat(temp.date,"mmmm dS, yyyy")}</p>
                        {temp.comments.length > 0
                            ? <p><span>{temp.comments.length}</span> Comments</p>
                            : <p>Post a Comment!</p>
                        }
                        
                        <p>Author: John Doe</p>
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