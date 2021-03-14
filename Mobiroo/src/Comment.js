import React from 'react';

class Comment extends React.Component{
	
	render(){
		const indent = "---";
		return <div onClick={this.props.click} id={this.props.id}>
			{indent.repeat(this.props.indent)}
			{this.props.username}
			:&nbsp;
			{this.props.comment}
		</div>;
	}
}

export default Comment;