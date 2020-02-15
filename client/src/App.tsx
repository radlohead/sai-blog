import React, { useEffect } from 'react'
import { Link, Route, useHistory } from 'react-router-dom'
import Join from './containers/Join'
import Board from './containers/Board'
import './style/App.scss'

const App: React.FC = () => {
    const getUserInfo = localStorage.getItem('sai-blog')
    const history = useHistory()
    useEffect(() => {
        history.push({
            pathname: '/board',
            state: { total: true }
        })
    }, [history])

    return (
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link
                            to={{
                                pathname: '/board',
                                state: { total: true }
                            }}
                        >
                            전체 글보기
                        </Link>
                    </li>
                    {!getUserInfo && (
                        <li>
                            <Link to="/join">회원가입</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="container">
                <Route path="/join" component={Join} />
                <Route path="/board" component={Board} />
            </div>
        </div>
    )
}

export default App
