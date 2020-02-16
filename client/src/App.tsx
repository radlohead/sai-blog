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
    const handleClickLogoutBtn = () => {
        localStorage.removeItem('sai-blog')
        window.location.reload()
    }

    return (
        <div className="root">
            <nav className="gnb">
                <h1>
                    <DropdownButton
                        id="dropdown-item-button"
                        title="Dropdown button"
                    >
                        <Link
                            to={{
                                pathname: '/board',
                                state: { total: true }
                            }}
                        >
                            <Dropdown.Item as="button">
                                전체 글보기
                            </Dropdown.Item>
                        </Link>
                        {!isLogin && (
                            <li>
                                <Link to="/join">
                                    <Dropdown.Item as="button">
                                        회원가입
                                    </Dropdown.Item>
                                </Link>
                            </li>
                        )}

                        {!isLogin && (
                            <li>
                                <Link to="/login">
                                    <Dropdown.Item as="button">
                                        로그인
                                    </Dropdown.Item>
                                </Link>
                            </li>
                        )}
                        {isLogin && (
                            <li onClick={handleClickLogoutBtn}>
                                <Dropdown.Item as="button">
                                    로그아웃
                                </Dropdown.Item>
                            </li>
                        )}
                        {isLogin && (
                            <li>
                                <Link to="/board/write">
                                    <Dropdown.Item as="button">
                                        글쓰기
                                    </Dropdown.Item>
                                </Link>
                            </li>
                        )}
                    </DropdownButton>
                </h1>
            </nav>
            <div>
                <Route path="/join" component={Join} />
                <Route path="/login" component={Login} />
                <Route path="/board" component={Board} />
            </div>
        </div>
    )
}

export default App
