import { projectFirestore } from "../../firebase/config"
import { useState, useRef} from "react"
import { useNavigate } from "react-router-dom"
//import { useFetch } from "../../hooks/useFetch"

// styles
import "./Create.css"

export default function Create() {
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [newIngredient, setNewIngredient] = useState("")
  const [ingredients, setIngredients] = useState([])

  // const [data, setData] = useState(null)
  //const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  const ingredientInput = useRef(null)

  const navigate = useNavigate()
  
  // useEffect(() => {
  //   if (data) {
  //     navigate("/")
  //   }
  // }, [data, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    }
     projectFirestore
       .collection("recipes")
       .add(doc)
       .then(() => {
         console.log(doc, "ADDED")
         navigate("/")
       })
       .catch((err) => {
         setError(err.message)
         //  setIsPending(false)
       })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredient("")
    ingredientInput.current.focus()
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}
