'use client'
import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/Config';
import { useRouter } from 'next/navigation';




const Login = () => {

  
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/')

            }
        });
    }, [])

    let router = useRouter();
    let signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("sign In successful")
                router.push("/Chats")
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });


    }
    const onFinish = (values) => {
        console.log('Success:', values);
        signInUser(values.email,values.password)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <Form
                className='shadow-xl bg-white shadow-black rounded-2xl p-4'
                name="basic"
                labelAlign='left'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"


                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input className='p-2 text-lg' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password className='p-2 text-lg' />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" className='bg-blue-600'>

                        Submit
                    </Button>

                </Form.Item>
                <Form.Item>
                    <p className='text-center'>If you Dont have account<b><Link href='/Signup'>SignUp</Link></b></p>
                </Form.Item>

            </Form>
        </div>
    )
}

export default Login