import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from '../Common/Constants'
import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'

const { Editor } = require('@toast-ui/react-editor')

type TImageUploadInfo = {
    uploaded: Boolean
    name: string
    url: string
    error: null | Error
}

const BoardWrite = () => {
    const [contentHTML, setContentHTML] = useState()
    const [imageUploadInfo, setImageUploadInfo] = useState()
    const { handleSubmit, register, errors } = useForm()
    const history = useHistory()
    const editorRef:
        | React.RefObject<Element>
        | null
        | object = React.createRef()
    const onSubmit = async ({ category = '', title = '' }): Promise<void> => {
        const instance = axios.create({
            baseURL: BASE_URL
        })
        const date = moment()
            .format()
            .substr(0, 19)
        try {
            const getSaiBlog = localStorage.getItem('sai-blog') || '{}'
            const id = JSON.parse(getSaiBlog).id
            await instance.post('/board/write', {
                category,
                id,
                title,
                content: contentHTML,
                createdAt: date
            })
            alert('글 작성이 완료되었습니다.')
            history.push('/board')
        } catch (err) {
            console.error(err)
        }
    }
    const handleClickWriteBtn = () => {
        const contentHTML = (editorRef as {
            current: { getRootElement: Function }
        }).current
            .getRootElement()
            .querySelector('.te-editor .tui-editor-contents').innerHTML
        setContentHTML(contentHTML)
        handleSubmit(onSubmit)
    }
    const handleChangeInputFile = () => {
        const inputFileEle = document.querySelector(
            '.te-image-file-input'
        ) as HTMLInputElement
        inputFileEle.addEventListener('change', async (e: Event) => {
            const target = e.target as HTMLInputElement
            const file = (target.files as FileList)[0]
            try {
                const instance = axios.create({
                    baseURL: BASE_URL
                })
                const form = new FormData()
                form.append('file', file)
                const responseData = await instance.post('/imageUpload', form)
                setImageUploadInfo(responseData.data)
                return responseData.data
            } catch (err) {
                console.error(err)
            }
        })
    }
    const handleChangeAfterInputFile = (imageUploadInfo: TImageUploadInfo) => {
        if (!imageUploadInfo) return
        const inputFileSubmitEles = document.querySelectorAll(
            '.te-ok-button'
        ) as NodeListOf<HTMLButtonElement>
        Array.from(inputFileSubmitEles).forEach($btnEl => {
            $btnEl.addEventListener('click', () => {
                setTimeout(() => {
                    Array.from(document.querySelectorAll('img')).forEach(
                        $el => {
                            if (
                                $el.getAttribute('alt') === imageUploadInfo.name
                            ) {
                                $el.setAttribute('src', imageUploadInfo.url)
                            }
                        }
                    )
                }, 50)
            })
        })
    }
    useEffect(() => {
        handleChangeInputFile()
        handleChangeAfterInputFile(imageUploadInfo)
    }, [imageUploadInfo])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select
                    name="category"
                    defaultValue=""
                    ref={register({
                        required: 'Required'
                    })}
                >
                    <option value="">카테고리를 선택해주세요.</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Vue">Vue</option>
                </select>
                {errors.category && <span>카테고리를 선택해주세요.</span>}
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

                <button onClick={handleClickWriteBtn}>작성 완료</button>
            </form>
        </div>
    )
}

export default BoardWrite
