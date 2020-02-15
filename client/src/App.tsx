import React, { useEffect } from 'react'
import { Link, Route, useHistory } from 'react-router-dom'
import './App.css'
import Home from './containers/Home'
import Join from './containers/Join'
import Board from './containers/Board'

const App: React.FC = () => {
    const history = useHistory()
    const getUserInfo = localStorage.getItem('sai-blog')

    useEffect(() => {
        if (getUserInfo) history.push('/board')
    })

    return (
        <div className="App">
            {!getUserInfo && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/join">회원가입</Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: '/board',
                                    state: { total: true }
                                }}
                            >
                                최근글
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
            <div className="container">
                <Route path="/" exact component={Home} />
                <Route path="/join" component={Join} />
                <Route path="/board" component={Board} />
            </div>
        </div>
    )
}

export default App
