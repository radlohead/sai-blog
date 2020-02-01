import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'

const { Editor } = require('@toast-ui/react-editor')

type TBoardWrite = {
    title: string
    content: string
}

const BoardWrite = () => {
    const [contentHTML, setContentHTML] = useState()
    const { handleSubmit, register, errors } = useForm()
    const editorRef: any = React.createRef()
    const onSubmit: any = async ({ title }: TBoardWrite) => {
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
                content: contentHTML,
                createdAt: date
            })
            alert('글 작성 완료되었습니다.')
            return responseData
        } catch (err) {
            console.error(err)
        }
    }
    const handleClick = () => {
        const contentHTML = editorRef.current
            .getRootElement()
            .querySelector('.te-editor .tui-editor-contents').innerHTML
        setContentHTML(contentHTML)
        handleSubmit(onSubmit)
    }
    const handleChangeInputFile = () => {
        const inputFileEle = document.querySelector(
            '.te-image-file-input'
        ) as HTMLInputElement
        inputFileEle.addEventListener('change', (e: Event): void => {
            const target = e.target as HTMLInputElement
            const file = (target.files as FileList)[0]
            console.log('inputFile change: ', file)
        })
    }
    useEffect(() => {
        handleChangeInputFile()
    })

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

                <Editor
                    previewStyle="vertical"
                    height="400px"
                    initialEditType="wysiwyg"
                    initialValue="hello"
                    ref={editorRef}
                />
                <button onClick={handleClick}>작성 완료</button>
            </form>
        </div>
    )
}

export default BoardWrite
