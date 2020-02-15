import React, { useEffect } from 'react'
import { Link, Route, useHistory } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
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
        <div className="root">
            <nav className="gnb">
                <h1>
                    <DropdownButton
                        id="dropdown-item-button"
                        title="Dropdown button"
                    >
                        <Dropdown.Item as="button">
                            {!isLogin && (
                                <li>
                                    <Link to="/join">회원가입</Link>
                                </li>
                            )}
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            {!isLogin && (
                                <li>
                                    <Link to="/login">로그인</Link>
                                </li>
                            )}
                        </Dropdown.Item>
                    </DropdownButton>
                </h1>
                <h2>
                    <Link
                        to={{
                            pathname: '/board',
                            state: { total: true }
                        }}
                    >
                        전체 글보기
                    </Link>
                </h2>
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
