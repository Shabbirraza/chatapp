'use client'
import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Select,
    Upload,
} from 'antd';
import { auth } from '../Config/Config';
import { storage } from '../Config/Config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../Config/Config';
import { collection, setDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader/page';




const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },

    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Signup = () => {
    let [user, loading, error] = useAuthState(auth)
    console.log(user, loading, error)
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             router.push('/')

    //         }
    //     });
    // }, [])
    let router = useRouter();


    let [loader, setLoader] = useState(false)
    let [sucessMsg, setSucessMsg] = useState("")
    let [errMessage, setErrMessage] = useState("")
    let [waitMessage, setWaitMessage] = useState("")

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    // useEffect(()=>{
    //     if(user && !loading){
    //         console.log('inside')
    //         router.push('/Chats')
    //     }else{
    //         console.log("no user")
    //     }
    // },[])

    const [form] = Form.useForm();
    // let createUserdataFirestore = (id, dataObj) => {
    //     const docRef = doc(db, "users", id);
    //     setDoc(docRef, dataObj)
    //         .then(() => {

    //             console.log("Document has been added successfully in firestore");
    //             setWaitMessage('')
    //             setSucessMsg("Sign Up sucessfull you will be redirected ")
    //             router.push('/Chats')


    //         })
    //         .catch(error => {
    //             console.log(error);
    //             setWaitMessage('')
    //             setErrMessage(error)
    //             setTimeout(() => {
    //                 setErrMessage('')
    //             }, 1000);
    //         })

    // }

    let createNewUser = async (email, password, file, initialData) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                console.log("new user created", userCredential.user)

                const storageRef = ref(storage, userCredential.user.email);
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    getDownloadURL(storageRef)
                        .then((url) => {
                            console.log(url)
                            initialData["url"] = url
                            initialData["id"] = userCredential.user.uid
                            // createUserdataFirestore(userCredential.user.uid, initialData)
                            const docRef = doc(db, "users", userCredential.user.uid);
                            setDoc(docRef, initialData)
                                .then(() => {

                                    console.log("Document has been added successfully in firestore");
                                    setWaitMessage('')
                                    setSucessMsg("Sign Up sucessfull you will be redirected ")
                                    router.push('/Chats')


                                })
                                .catch(error => {
                                    console.log(error);
                                    setWaitMessage('')
                                    setErrMessage(error)
                                    setTimeout(() => {
                                        setErrMessage('')
                                    }, 1000);
                                })

                        })
                        .catch((error) => {
                            console.log(error)
                            setWaitMessage('')
                            setErrMessage(error)
                            setTimeout(() => {
                                setErrMessage('')
                            }, 1000);
                        })


                })
                    .catch((err) => {
                        console.log("error uploading file", err)
                        setWaitMessage('')
                        setErrMessage(err)
                        setTimeout(() => {
                            setErrMessage('')
                        }, 1000);
                    })

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setWaitMessage('')
                console.log(errorMessage)
                setErrMessage(errorMessage)
                setLoader(false)
                setTimeout(() => {
                    setErrMessage('')
                }, 1000);
                // ..
            });
    }


    const onFinish = async (values) => {
        setLoader(true)
        console.log('Received values of form: ', values);
        setWaitMessage('Please Wait ')
        let data = {
            email: values.email,
            password: values.password,

        }
        console.log(data)
        createNewUser(values.email, values.password, values.dragger[0].originFileObj, data);


    };




    return (<>{!loading && !user ?
        <div className='flex flex-col items-center justify-center h-screen'>


            <h1 className='font-extrabold text-xl'> SignUp</h1>
            {sucessMsg ? <div className='bg-green-600 text-center text-white font-semibold rounded-xl p-4 w-[40%] my-4'>{sucessMsg}</div>
                :
                errMessage ? <div className='bg-red-600 text-center text-white font-semibold rounded-xl p-4 w-[40%] my-4'>{errMessage}</div> :
                    waitMessage ? <div className='bg-blue-600 text-center text-white font-semibold rounded-xl p-4 w-[40%] my-4'>{waitMessage}</div> : null}
            <Form
                className='shadow-xl bg-white shadow-black rounded-2xl p-4'
                labelAlign='left'
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}

                style={{
                    maxWidth: 700,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password minLength={8} />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password minLength={8} />
                </Form.Item>






                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle
                        wrapperCol={2}
                        rules={[
                            {
                                required: true,
                                message: 'Please input profile pic',
                            },
                        ]}>
                        <Upload.Dragger name="files">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button loading={loader} type="primary" htmlType="submit" className='bg-blue-900'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div > : <Loader />}</>




    )
}

export default Signup