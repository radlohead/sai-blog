import React, { useState, useEffect } from 'react'
import { Link, Route, RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { ListGroup, Button } from 'react-bootstrap'
import BoardList from '../components/Board/BoardList'
import BoardWrite from '../components/Board/BoardWrite'
import { BASE_URL } from '../components/Common/Constants'
import '../style/containers/Board.scss'

const Board = (
    props:
        | RouteComponentProps<{ [rowId: string]: string }>
        | { [key: string]: any }
) => {
    const [category, setCategory] = useState([])
    const [toggleClass, setToggleClass] = useState('')
    const fetchCategory = async () => {
        const responseData = await axios.get(`${BASE_URL}/board/category`)
        setCategory(responseData.data)
    }
    useEffect(() => {
        if (!category.length) fetchCategory()
    }, [category])
    const renderCategorys = category.map(category => (
        <li
            key={category}
            className={category === toggleClass ? 'active' : ''}
            onClick={() => setToggleClass(category)}
        >
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
                    {(rowId() || state.write) && (
                        <li>
                            <Button
                                variant="secondary"
                                onClick={() => props.history.goBack()}
                            >
                                이전
                            </Button>
                        </li>
                    )}
                    {!rowId() && !state.write && renderCategorys}
                </ul>
            </nav>
            <article className="postingList">
                <ul>
                    {!state.write && (
                        <li>
                            <Route path="/board" component={BoardList} />
                        </li>
                    )}
                    <li>
                        <Route path="/board/write" component={BoardWrite} />
                    </li>
                </ul>
            </article>
        </main>
    )
}
export default Board
