import {Link, useLocation} from "react-router-dom"
import {useState,useEffect} from "react"
import dateFormat from "dateformat"
import defaultProfile from "./styles/ProfilePic.jpg"
import './styles/Articles.css'
import Nav from "./Nav"

const Article =() =>{
     const Article = useLocation()
     const [commentz, setComments] = useState([])

     const[toggle, setToggle]= useState(false)
    
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
        setToggle(['true'])
        fetch('https://globalmessageboardly.herokuapp.com/comments',{
            method:'POST',
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                post: document.getElementById("commentBody").value,
                author: document.getElementById("commentAuthor").value,
                postID: Article.state.index })})
            .then(() => {
                 toggle !== true ? setToggle(true) : setToggle(false)
                }
                )
            .catch(err => console.log(err))

        
        
    }

    useEffect(()=>{
        GetComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggle])

    
    return(
        
            
        <div className="mainContainer">
            <div className="nav">
                <Nav />
            </div>
            
          
            <div className="articleContainer">
                <p className="article-title">{Article.state.temp.title}</p>
                <div className="article-header">
                    <p>Posted by <span>John Doe</span> on {dateFormat(Article.state.temp.date,"mmmm dS, yyyy")}</p>
                </div>
                <img src={Article.state.temp.image} alt="img not found" className="blog-image"></img>
                
                <p>{Article.state.temp.blogPost}</p>
                
                <Link to="/"><button type="button">Go back!</button></Link>
               
            </div>

            

            <div className="commentBox">
                <h2>Leave a comment</h2>
                <div className="comments-div">
                    <h2>Comments</h2>
                    {commentz.map((comment,index) =>
                    <div className="comments-indv" key={index}>
                        <img src={defaultProfile} alt="not found" className="comments-profile"></img>
                        <p className="comments-comment">{comment.comment}</p>
                        <p className="comments-date">{dateFormat(comment.date, "mmmm dS, yyyy")}</p>
                        <p className="comments-author">{comment.author}</p>
                    </div>)}
                </div>
                
                <div className="comments-form">
                    <textarea type="text" placeholder="Enter Comment" id="commentBody"></textarea>
                    <input type="text" placeholder="Name" id="commentAuthor"></input>
                    <button type="button" onClick={()=> {SubmitComment()}} id="commentPost">Post Comment</button>
                </div>
            </div>

            
          </div>
        
    )
}

export default Article