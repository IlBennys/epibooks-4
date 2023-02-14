import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
const AddComment = (props) => {
  // state = {
  //   comment: {
  //     comment: "",
  //     rate: 1,
  //     elementId: props.asin,
  //   },
  // }

  // const [comment, setComment] = useState("")
  // const [rate, setRate] = useState(1)
  // const [elementId, setElementId] = useState(this.props.asin)

  // const [comment, setComment] = useState([{ elementId: props.asin, rate: 1, comment: "" }])
  const [comment, setComment] = useState({
    elementId: props.asin,
    rate: 1,
    comment: "",
  })

  useEffect(() => {
    setComment({
      ...comment,
      elementId: props.asin,
    })
  }, [props.asin])

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U1MGZkNGEyNDc4ZDAwMTNhMDU4NDgiLCJpYXQiOjE2NzYzOTkyODUsImV4cCI6MTY3NzYwODg4NX0.PDz1lsqfZ3Vo4jo4jO3itIo6DkK1eHLXngCQOjhAOIo",
        },
      })
      if (response.ok) {
        alert("Comment was sent!")
        setComment({
          comment: "",
          rate: 1,
          elementId: props.asin,
        })
      } else {
        console.log("error")
        alert("something went wrong")
      }
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {})
  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                comment: {
                  ...comment,
                  rate: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default AddComment
