import { useFetch } from "../../hooks/useFetch"

// styles
import "./Home.css"

export default function Home() {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes")

  console.log(data)

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Is Loading...</p>}
      {data &&
        data.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            {/* <p>{recipe.method}</p> */}
          </div>
        ))}
    </div>
  )
}
