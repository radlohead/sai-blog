import React, { useEffect } from 'react'
import { Link, Route, useHistory } from 'react-router-dom'
import Login from './containers/Login'
import Join from './containers/Join'
import Board from './containers/Board'
import './style/App.scss'

const App: React.FC = () => {
    const isLogin = Boolean(localStorage.getItem('sai-blog'))
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
                    {!isLogin && (
                        <>
                            <li>
                                <Link to="/join">회원가입</Link>
                            </li>
                            <li>
                                <Link to="/login">로그인</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="container">
                <Route path="/join" component={Join} />
                <Route path="/login" component={Login} />
                <Route path="/board" component={Board} />
            </div>
        </div>
    )
}

export default App
