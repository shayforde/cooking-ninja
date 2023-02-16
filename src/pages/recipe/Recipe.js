import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"

import "./Recipe.css"

function Recipe() {
  const params = useParams()

  const url = "http://localhost:3000/recipes/" + params.id.trim()

  const { data: recipe, isPending, error } = useFetch(url)

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Is Loading...</p>}

      {recipe && <h2>{recipe.title}</h2>}

      {recipe &&
        recipe.ingredients &&
        recipe.ingredients.map((item) => (
          <ul key={item}>
            <li>{item}</li>
          </ul>
        ))}
        {recipe && recipe.method}
    </div>
  )
}

export default Recipe
