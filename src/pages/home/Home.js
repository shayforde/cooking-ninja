import { projectFirestore } from "../../firebase/config"
import { useEffect, useState } from "react"

// components
import RecipeList from "../../components/RecipeList"

// styles
import "./Home.css"

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  // const makeBackup = () => {
  //   data.map((item) =>
  //     projectFirestore
  //       .collection("backup")
  //       .add({ ...item })
  //       .then(() => {
  //         console.log(data)
  //       })
  //   )

  // }

  useEffect(() => {
    setIsPending(true)

    projectFirestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load")
          setIsPending(false)
        } else {
          let results = []
          snapshot.docs.forEach((doc) => {
            //  console.log(doc)
            results.push({ id: doc.id, ...doc.data() })
          })
          //   console.log(results)
          setData(results)
          setIsPending(false)
        }
      })
      .catch((err) => {
        setError(err.message)
        setIsPending(false)
      })
  }, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Is Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {/* <button className="button" onClick={makeBackup}>
        Click to add Recipes
      </button> */}
    </div>
  )
}
