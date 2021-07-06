import Comment from './Comment';

const Comments = () => {
    return (
        <div>
            {[1, 2].map(comment => <Comment key={comment}/>)}
        </div>
    )
}

export default Comments
