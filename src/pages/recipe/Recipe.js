import { projectFirestore } from "../../firebase/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useTheme } from "../../hooks/useTheme"

// styles
import "./Recipe.css"

export default function Recipe() {
  const { id } = useParams()

  const { mode, color } = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load")
          setIsPending(false)
        } else {
          setRecipe({ ...snapshot.data() })
          setIsPending(false)
        }
      }).catch(err => {
        setError(err.message)
      })
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title" style={{ color: color }}>
            {" "}
            {recipe.title}{" "}
          </h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}
