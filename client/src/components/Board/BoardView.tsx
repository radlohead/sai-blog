import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BoardView = (props: any) => {
    const [content, setContent] = useState({
        rowId: 0,
        id: '',
        title: '',
        content: '',
        createdAt: '',
        timeStamp: ''
    })
    const [markUp, setMarkUp] = useState()
    const fetchBoard = async () => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 3000
        })
        try {
            const rowId = props.match.params.rowId
            const responseData = await instance.get(`/board/view/${rowId}`)
            setContent(responseData.data[0])
            setMarkUp(responseData.data[0].content)
            return responseData.data
        } catch (err) {
            console.error(err)
        }
    }
    const createMarkUp = () => ({ __html: markUp })
    useEffect(() => {
        if (!content.id) {
            fetchBoard()
        }
    })

    return (
        <div>
            <h3>글보기</h3>
            <article>
                <h4>{content.title}</h4>
                <span>{content.id}</span>
                <div dangerouslySetInnerHTML={createMarkUp()}></div>
                <span>{content.createdAt}</span>
            </article>
        </div>
    )
}

export default BoardView
