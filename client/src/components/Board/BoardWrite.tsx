import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'

type TBoardWrite = {
    title: string
    content: string
}

const BoardWrite = () => {
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: any = async ({ title, content }: TBoardWrite) => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000'
        })
        const date = moment()
            .format()
            .substr(0, 19)
        try {
            const responseData = await instance.post('/board/write', {
                id: 'admin',
                title,
                content,
                createdAt: date
            })
            alert('글 작성 완료되었습니다.')
            return responseData
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h3>글쓰기</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="title"
                    ref={register({
                        required: 'Required',
                        minLength: 1,
                        maxLength: 50
                    })}
                />
                {errors.title && (
                    <span>타이틀은 1글자 이상 50글자 이하로 입력해주세요.</span>
                )}

                <input
                    name="content"
                    ref={register({
                        required: 'Required',
                        minLength: 1,
                        maxLength: 1500
                    })}
                />
                {errors.content && (
                    <span>본문은 1글자 이상 1500글자 이하로 입력해주세요.</span>
                )}

                <button type="submit">작성 완료</button>
            </form>
        </div>
    )
}

export default BoardWrite
