import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import { ListGroup, Button } from 'react-bootstrap'
import BoardList from '../components/Board/BoardList'
import BoardWrite from '../components/Board/BoardWrite'
import { BASE_URL } from '../components/Common/Constants'
import '../style/containers/Board.scss'

const Board = (props: any) => {
    console.log(1, props)
    const [category, setCategory] = useState([])
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
    const state = props.location.state
    const rowId = () => {
        if (typeof state === 'object' && state.hasOwnProperty('rowId'))
            return props.location.state.rowId
    }
    return (
        <main className="main">
            <nav className="gnb_sub">
                <ul>
                    {rowId() && (
                        <li>
                            <Link
                                to={{
                                    pathname: '/board',
                                    state: { total: true }
                                }}
                            >
                                <Button variant="secondary">이전</Button>
                            </Link>
                        </li>
                    )}
                    {!rowId() && renderCategorys}
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
