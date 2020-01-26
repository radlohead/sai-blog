import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const timeStamp = moment()
    .toDate()
    .getTime()
const BoardList = () => {
    const [boardList, setBoardList] = useState([
        { id: '', title: '', content: '', createdAt: '' }
    ])
    const fetchBoardList = async () => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
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
            return responseData
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
                        <li key={timeStamp}>
                            <ul>
                                <li>{item.id}</li>
                                <li>{item.title}</li>
                                <li>{item.content}</li>
                                <li>{item.createdAt}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    )
}

export default BoardList
