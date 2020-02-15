import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import BoardList from '../components/Board/BoardList'
import BoardWrite from '../components/Board/BoardWrite'
import { BASE_URL } from '../components/Common/Constants'
import '../style/containers/Board.scss'

const Board = () => {
    const [category, setCategory] = useState([])
    const isLogin = Boolean(localStorage.getItem('sai-blog'))
    const fetchCategory = async () => {
        const responseData = await axios.get(`${BASE_URL}/board/category`)
        setCategory(responseData.data)
    }
    useEffect(() => {
        if (!category.length) fetchCategory()
    }, [category])
    const renderCategorys = category.map(category => (
        <li key={category}>
            <ListGroup>
                <Link
                    to={{
                        pathname: '/board/' + category,
                        state: { category }
                    }}
                >
                    <ListGroup.Item>{category}</ListGroup.Item>
                </Link>
            </ListGroup>
        </li>
    ))
    return (
        <main className="main">
            <nav className="gnb_sub">
                <ul>
                    {isLogin && (
                        <li>
                            <Link to="/board/write">글쓰기</Link>
                        </li>
                    )}
                    {renderCategorys}
                </ul>
            </nav>
            <article className="postingList">
                <ul>
                    <li>
                        <Route path="/board" component={BoardList} />
                    </li>
                    <li>
                        <Route path="/board/write" component={BoardWrite} />
                    </li>
                </ul>
            </article>
        </main>
    )
}
export default Board
