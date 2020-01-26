import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Join = () => {
    const { handleSubmit, register, errors }: any = useForm()
    const onSubmit = (values: any) => {
        axios.post('http://localhost:4000/join', {
            id: values.id,
            password: values.password,
            createdAt: '2020-01-25 17:34:59',
            updatedAt: '2020-01-25 17:34:59'
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="id"
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /[a-z0-9]{2,20}/i,
                        message:
                            '아이디는 2글자 이상, 20글자 이하로 입력해주세요.'
                    }
                })}
            />
            {errors.id && errors.id.message}

            <input
                name="password"
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /.{4,}/,
                        message: '비밀번호는 4글자 이상 입력해주세요.'
                    }
                })}
            />
            {errors.password && errors.password.message}

            <button type="submit">회원가입</button>
        </form>
    )
}

export default Join
