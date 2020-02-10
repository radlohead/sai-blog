import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Common/Constants'

const BoardList = () => {
    const [boardList, setBoardList] = useState([
        {
            rowId: 0,
            id: '',
            title: '',
            content: '',
            createdAt: '',
            timeStamp: ''
        }
    ])
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
    useEffect(() => {
        fetchBoardList()
    }, [])
    const renderBoardList = () => {
        return boardList.map(item => (
            <li key={item.createdAt}>
                <Link to={`/board/view/${item.rowId}`}>
                    <ul>
                        <li>{item.id}</li>
                        <li>{item.title}</li>
                        <li>
                            {item.createdAt.substr(0, 10).replace(/\-/g, '.')}
                        </li>
                        <li></li>
                    </ul>
                </Link>
            </li>
        ))
    }

    return (
        <div>
            <article>
                <ul>{renderBoardList()}</ul>
            </article>
        </div>
    )
}

export default BoardList
