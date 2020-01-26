import React from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
import Home from './containers/Home'
import Join from './containers/Join'
import Board from './containers/Board'

const App: React.FC = () => {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/join">회원가입</Link>
                    </li>
                    <li>
                        <Link to="/board">자유게시판</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <Route path="/" exact component={Home} />
                <Route path="/join" component={Join} />
                <Route path="/board" component={Board} />
            </div>
        </div>
    )
}

export default App
