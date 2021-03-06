import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Common/Constants'

const BoardView = (props: RouteComponentProps<{ rowId: string }>) => {
    const [content, setContent] = useState({
        rowId: 0,
        id: '',
        title: '',
        content: '',
        createdAt: '',
        timeStamp: ''
    })
    const [markUp, setMarkUp] = useState()

    const createMarkUp = () => ({ __html: markUp })
    useEffect(() => {
        const fetchBoard = async () => {
            const instance = axios.create({
                baseURL: BASE_URL,
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
        fetchBoard()
    }, [props.match.params.rowId])

    return (
        <div>
            <article>
                <h4>{content.title}</h4>
                <span>{content.id}</span>
                <div dangerouslySetInnerHTML={createMarkUp()}></div>
                <span>
                    {content.createdAt.substr(0, 10).replace(/-/g, '.')}
                </span>
            </article>
        </div>
    )
}

export default BoardView
