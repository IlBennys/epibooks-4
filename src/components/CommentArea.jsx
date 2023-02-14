import { useEffect, useState } from "react"
import CommentList from "./CommentList"
import AddComment from "./AddComment"
import Loading from "./Loading"
import Error from "./Error"

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization: ' your-auth-token-goes-here',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  useEffect(
    (props) => {
      setIsLoading({
        isLoading: true,
      })
      try {
        let response = fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U1MGZkNGEyNDc4ZDAwMTNhMDU4NDgiLCJpYXQiOjE2NzYzOTkyODUsImV4cCI6MTY3NzYwODg4NX0.PDz1lsqfZ3Vo4jo4jO3itIo6DkK1eHLXngCQOjhAOIo",
          },
        })
        console.log(response)
        if (response.ok) {
          let comments = response.json()
          setComments({
            comments: comments,
          })
          setIsLoading({
            isLoading: false,
          })
          setIsError({
            isError: false,
          })
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // })
        } else {
          console.log("error")
          // this.setState({ isLoading: false, isError: true })
          setIsLoading({
            isLoading: false,
          })
          setIsError({
            isError: true,
          })
        }
      } catch (error) {
        console.log(error)
        // this.setState({ isLoading: false, isError: true })
        setIsLoading({
          isLoading: false,
        })
        setIsError({
          isError: true,
        })
      }
    },
    [props.asin]
  )

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}
export default CommentArea
