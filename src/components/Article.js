import {Link, useLocation} from "react-router-dom"
import {useState,useEffect, useCallback} from "react"
import defaultStock from "./styles/radnom_stock1.jpg"
import dateFormat from "dateformat"
import './styles/Articles.css'
import Nav from "./Nav"

const Article =() =>{
     const Article = useLocation()
     const [commentz, setComments] = useState([])

     let toggle = false;
    
     const GetComments = () =>{
        fetch('https://globalmessageboardly.herokuapp.com/')
        .then((response)=>{
            return response.json()
        }).then((response)=>{
            setComments(response.posts[Article.state.index].comments)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const SubmitComment= ()=>{
        fetch('https://globalmessageboardly.herokuapp.com/comments',{
            method:'PUT',
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify({ 
                post: document.getElementById("commentBody").value,
                author: document.getElementById("commentAuthor").value,
                postID: Article.state.index })},
                )
            .then(response => response.json())
            .catch(err => console.log(err))

        toggle = true;
        
    }

    useEffect(()=>{
        GetComments()
        console.log("yippeee")
    },[toggle])

    
    return(
        <div>
            <Nav/>
        
            <div className="mainContainer">
            <div className="articleContainer">
                <img src={defaultStock} alt="img not found" className="blog-image"></img>
                <div className="blog-header">
                    <p>{dateFormat(Article.state.temp.date,"mmmm dS, yyyy")}</p>
                    <p>Author: John Doe</p>
                </div>
                <p>{Article.state.temp.title}</p>
                <p>{Article.state.temp.blogPost}</p>
                <hr></hr>
                <Link to="/"><button type="button">Go back!</button></Link>
               
            </div>

            

            <div className="commentBox">
                <h2>Leave a comment</h2>
                <div className="comments-div">
                    <h2>Comments</h2>
                    {commentz.map((comment,index) =>
                    <div className="comments-indv" key={index}>
                        <p className="comments-comment">{comment.comment}</p>
                        <p className="comments-date">Submited on {dateFormat(comment.date, "mmmm dS, yyyy")}</p>
                        <p className="comments-author">{comment.author}</p>
                    </div>)}
                </div>
                
                <div className="comments-form">
                    <input type="text" placeholder="Enter Comment" id="commentBody"></input>
                    <input type="text" placeholder="Name" id="commentAuthor"></input>
                    <button type="button" onClick={()=> {SubmitComment()}} id="commentPost">Post Comment</button>
                </div>
            </div>

            
            </div>
        </div>
    )
}

export default Article