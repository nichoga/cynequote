import { useState } from "react"
import Films from "../film/Films"
import Quotes from "../quotes/Quotes"

export const MainPage = () => {

    const [currentFilm, setCurrentFilm] = useState()

    return (<div className="row">
        <div className="col s6">
            <Films
                currentFilm={currentFilm}
                setCurrentFilm={setCurrentFilm}
            />
        </div>
        <div className="col s6">
            <Quotes currentFilm={currentFilm} />
        </div>
    </div>)
}