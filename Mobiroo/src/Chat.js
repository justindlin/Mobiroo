import React from 'react';
import Comment from './Comment.js';


//comments can be selected and replied to. 
//Pressing again will unselect the comment so that a new comment can be created


class Chat extends React.Component{
	constructor(props){
		super(props);

		//username and comment references
		this.nameRef = React.createRef();
		this.comRef = React.createRef();

		var select = null;

		//default initial dummy comments saved in state
		this.state = {
			comments: [{
				id: "0",
				username: "Justin",
				comment: "This is great!",
				comments: [{
					id: "00",
					username: "Ashley",
					comment: "I agree!",
				},{
					id: "01",
					username: "Wanda",
					comment: "This piece of art fills me with inspiration"
				}],
			},{
				id: "1",
				username: "Vivian",
				comment: "I don't believe it's that great...",
				comments: [{
					id: "10",
					username: "Vision",
					comment: "We totally think alike. These colours are too strong for me",
				}],
			}],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectComment = this.selectComment.bind(this);
	}


	//handling the addition of a new comment to thread
	handleSubmit(event){
		event.preventDefault();
		if(this.comRef.current.value.length === 0){
			return;
		}else if(this.nameRef.current.value.length === 0){
			this.nameRef.current.value = "Anonymous";
		}
		const newState = this.state.comments;

		//replying to a comment
		if(this.select){
			newState[this.select].comments.push({
				id: this.select+""+newState[this.select].comments.length,
				username: this.nameRef.current.value,
				comment: this.comRef.current.value,
			});

		//creating a new comment
		}else{
			newState.push({
				id: newState.length,
				username: this.nameRef.current.value,
				comment: this.comRef.current.value,
				comments: [],
			});
		}

		this.setState({
			comments: newState,
		}, () => {
			//refreshing values and erasing inputs for next entry
			this.nameRef.current.value = "";
			this.comRef.current.value = "";
			if(this.select){
				var toggle = document.getElementById(this.select);
				toggle.className = "";
				this.select = null;
			}
		});
		
	}

	//Selecting and unselecting comment and bolding
	selectComment(event){

		var toggle;
		if(!this.select){
			this.select = event.nativeEvent.target.id.substr(0,1);
			toggle = document.getElementById(this.select);
			toggle.className = "bold";
		}else if(this.select){
			toggle = document.getElementById(this.select);
			toggle.className = "";
			this.select = null;
		}
	}

	//using a recursive function to navigate the tree and display them with increasing indent based on hierarchy of nodes
	treeMap(root, indent){	
		var tree;

		Array.prototype.forEach.call(root, comment=>{
			tree = 
				<span>
				{tree} 
				<Comment click={this.selectComment} id={comment.id} username={comment.username} comment={comment.comment} indent={indent}/> 
				</span>;

			if(comment.comments && comment.comments.length>0){
				tree = 
					<span>
					{tree}
					{this.treeMap(comment.comments,indent+1)}
					</span>;
				
			}
		})
		return tree;
		
	}


	//forum thread rendering
	render(){
		const {comments} = this.state;
		return (
			<div>
				<span>
					{
						this.treeMap(comments,0)
					}
				</span>

				<form onSubmit={this.handleSubmit}>			
					<input placeholder="Name" className="pretty" type="text" ref={this.nameRef}></input><br/>									
					<input placeholder="Comment" className="pretty" type="text" ref={this.comRef}></input><br/>
					<input className="button" type="submit" value="Submit"/>
				</form>
			</div>
	)};
}
export default Chat;