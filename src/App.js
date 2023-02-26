import { BrowserRouter, Routes, Route } from "react-router-dom"

// page components
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import Create from "./pages/create/Create"
import Search from "./pages/search/Search"
import Recipe from "./pages/recipe/Recipe"

// styles
import "./App.css"
import { ThemeProvider } from "./context/ThemeContext"
import { ThemeSelector } from "./components/ThemeSelector"

function App() {
  return (
    <div className="App" id="app">
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipes/:id" element={<Recipe />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
