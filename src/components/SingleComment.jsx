import { Button, ListGroup } from "react-bootstrap"

const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U1MGZkNGEyNDc4ZDAwMTNhMDU4NDgiLCJpYXQiOjE2NzYzOTkyODUsImV4cCI6MTY3NzYwODg4NX0.PDz1lsqfZ3Vo4jo4jO3itIo6DkK1eHLXngCQOjhAOIo",
        },
      })
      if (response.ok) {
        alert("Comment was deleted successfully!")
      } else {
        alert("Error - comment was NOT deleted!")
      }
    } catch (error) {
      alert("Error - comment was NOT deleted!")
    }
  }

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button variant="danger" className="ml-2" onClick={() => deleteComment(comment._id)}>
        Delete
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment
