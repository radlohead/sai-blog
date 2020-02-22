import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { BASE_URL } from '../components/Common/Constants'

type TLogin = {
    id?: string
    password?: string
}

const Join = () => {
    const [error, setError] = useState<TLogin>({ id: '', password: '' })
    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async ({
        id,
        password
    }: Record<string, string>): Promise<any> => {
        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 3000
        })
        try {
            const responseData = await instance.post('/login', {
                id,
                password
            })
            const setData: { id: string } = {
                id
            }
            if (responseData.data.RESP_CD === 200) {
                localStorage.setItem('sai-blog', JSON.stringify(setData))
                console.log('로그인 되었습니다.')
                window.location.reload()
                return responseData
            } else {
                console.log('이이디, 비밀번호를 다시 확인해주세요.')
                setError({ password: '이이디, 비밀번호를 다시 확인해주세요.' })
            }
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
                type="password"
                name="password"
                ref={register({
                    required: 'Required',
                    minLength: 4,
                    maxLength: 20
                })}
            />
            {error.password && <span>{error.password}</span>}
            {errors.password && (
                <span>비밀번호는 4글자 이상 20글자 이하로 입력해주세요.</span>
            )}

            <button type="submit">로그인</button>
        </form>
    )
}

export default Join
