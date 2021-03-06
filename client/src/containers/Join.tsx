import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from '../components/Common/Constants'

const Join = () => {
    const { handleSubmit, register, errors } = useForm()
    const onSubmit = async ({
        id,
        password
    }: Record<string, string>): Promise<any> => {
        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 5000
        })
        const date = moment()
            .format()
            .substr(0, 19)
        try {
            const responseData = await instance.post('/join', {
                id,
                password,
                createdAt: date,
                updatedAt: date
            })
            alert('회원가입이 완료되었습니다.')
            return responseData
        } catch (err) {
            alert('회원가입이 실패했습니다.')
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

            <button type="submit">회원가입</button>
        </form>
    )
}

export default Join
