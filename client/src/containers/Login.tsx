import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type TLogin = {
    id: string
    password: string
}

const Join = () => {
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: any = async ({ id, password }: TLogin) => {
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 3000
        })
        try {
            const responseData = await instance.post('/login', {
                id,
                password
            })
            console.log('로그인 되었습니다.')
            const setData: { id: string } = {
                id
            }
            localStorage.setItem('sai-blog', JSON.stringify(setData))
            return responseData
        } catch (err) {
            console.log('로그인이 실패했습니다.')
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="id"
                ref={register({
                    required: 'Required',
                    minLength: 2,
                    maxLength: 20
                })}
            />
            {errors.id && (
                <span>아이디는 2글자 이상 20글자 이하로 입력해주세요.</span>
            )}

            <input
                name="password"
                ref={register({
                    required: 'Required',
                    minLength: 4,
                    maxLength: 20
                })}
            />
            {errors.password && (
                <span>비밀번호는 4글자 이상 20글자 이하로 입력해주세요.</span>
            )}

            <button type="submit">로그인</button>
        </form>
    )
}

export default Join
