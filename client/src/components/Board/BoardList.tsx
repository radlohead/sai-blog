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

    return (
        <div>
            <h3>글 목록</h3>
            <article>
                <ul>
                    {boardList.map(item => (
                        <li key={item.createdAt}>
                            <ul>
                                <li>{item.id}</li>
                                <li>{item.title}</li>
                                <li>{item.createdAt}</li>
                                <li>
                                    <Link to={`/board/view/${item.rowId}`}>
                                        글보기
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    )
}

export default BoardList
