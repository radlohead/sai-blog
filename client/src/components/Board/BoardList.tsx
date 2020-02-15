import React, { useState, useEffect } from 'react'
import { Link, Route, RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { CardGroup, Card } from 'react-bootstrap'
import BoardView from '../../components/Board/BoardView'
import { BASE_URL } from '../Common/Constants'

const BoardList = (
    props: RouteComponentProps<{ rowId: string }> | { [key: string]: any }
) => {
    const [boardList, setBoardList] = useState([
        {
            rowId: 0,
            category: '',
            id: '',
            title: '',
            content: '',
            createdAt: '',
            timeStamp: ''
        }
    ])
    const state = props.location.state
    useEffect(() => {
        if (typeof state !== 'object' || !state.hasOwnProperty('total')) return
        const fetchBoardList = async () => {
            const instance = axios.create({
                baseURL: BASE_URL,
                timeout: 3000
            })
            try {
                const fetchLocalStorage =
                    JSON.parse(localStorage.getItem('sai-blog') as string) || {}
                const boardListData = {
                    id: fetchLocalStorage.id
                }
                const responseData = await instance.get('/board/list', {
                    params: boardListData
                })
                setBoardList(responseData.data)
                return responseData.data
            } catch (err) {
                console.error(err)
            }
        }
        fetchBoardList()
    }, [state])
    useEffect(() => {
        if (typeof state !== 'object' || !state.hasOwnProperty('category'))
            return
        const fetchSelectedItemList = async () => {
            const instance = axios.create({
                baseURL: BASE_URL,
                timeout: 3000
            })
            try {
                const responseData = await instance.get(
                    `/board/category/${state.category}`
                )
                setBoardList(responseData.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchSelectedItemList()
    }, [state])

    const renderBoardList = () => {
        if (!boardList.length) return <li>현재 작성된 포스팅이 없습니다.</li>
        return boardList.map(item => (
            <CardGroup key={item.createdAt}>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Link
                            to={{
                                pathname: `/board/view/${item.rowId}`,
                                state: { rowId: item.rowId }
                            }}
                        >
                            <ul>
                                <li>{item.category}</li>
                                <li>{item.id}</li>
                                <li>
                                    {item.createdAt
                                        .substr(0, 10)
                                        .replace(/-/g, '.')}
                                </li>
                            </ul>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">
                            Last updated 3 mins ago
                        </small>
                    </Card.Footer>
                </Card>
            </CardGroup>
            // <li key={item.createdAt}>
            //     <Link
            //         to={{
            //             pathname: `/board/view/${item.rowId}`,
            //             state: { rowId: item.rowId }
            //         }}
            //     >
            //         <ul>
            //             <li>{item.category}</li>
            //             <li>{item.id}</li>
            //             <li>{item.title}</li>
            //             <li>
            //                 {item.createdAt.substr(0, 10).replace(/-/g, '.')}
            //             </li>
            //             <li></li>
            //         </ul>
            //     </Link>
            // </li>
        ))
    }

    return (
        <>
            <article>
                {!state.rowId && renderBoardList()}
                <div>
                    <Route path="/board/view/:rowId" component={BoardView} />
                </div>
            </article>
        </>
    )
}

export default BoardList
