'use client'
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
import { Button, Checkbox, Form, Input } from 'antd';


const onFinishFailed = (errorInfo) => {

    console.log('Failed:', errorInfo);
};


const Abc = () => {
    let [isEdit, setIsEdit] = useState(null)
    let [editIndex, setEditIndex] = useState(null)
    const [form] = Form.useForm();
    const onFill = (record, id) => {
        form.setFieldsValue(record);
        setIsEdit(id)
    };
    let [type, setType] = useState(null)
    const onFinish = (values) => {
        if (isEdit) {
            transaction[editIndex] = {
                amount: values.amount,
                desc: values.desc,
                created_at: new Date().toLocaleString(),
                type: type,
            }
            setTransactions([...transaction])
            setIsEdit(null)
            form.resetFields()

        } else {
            if (!type) {
                alert("please enter type")
                return
            } else if (!isEdit) {
                console.log(isEdit)
                let data = {
                    amount: values.amount,
                    desc: values.desc,
                    type,
                    created_at: new Date().toLocaleString(),

                }
                setType(null)
                transaction = [...transaction, data]
                console.log(transaction)
                setTransactions([...transaction])
                form.resetFields()

            } else if (isEdit) {
                console.log(values)
            }
        }


    };
    let [transaction, setTransactions] = useState([{
        amount: 100,
        type: 'income',
        desc: 'food',
        created_at: new Date().toLocaleString(),

    }])
    let [income, setIncome] = useState(0)
    let [expense, setExpense] = useState(0)
    let [profit, setProfit] = useState(0)
    useEffect(() => {
        let inc = 0
        let out = 0
        let prof = 0

        transaction.map((value, ind) => {

            if (value.type == "expense") {
                out = out + parseInt(value.amount)


            } else {
                inc = inc + parseInt(value.amount)

            }

        })
        setExpense(out)
        setIncome(inc)
        setProfit(inc - out)
    }, [transaction])

    // const [data, setdata] = useState([
    //     {
    //         key: '1',
    //         amount: 'John',
    //         type: 'Brown',
    //         desc: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         amount: 'John',
    //         type: 'Brown',
    //         desc: 32,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         amount: 'John',
    //         type: 'Brown',
    //         desc: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ])
    return (
        <div className='min-h-screen flex flex-col items-center p-5'>
            <h1 className='font-extrabold text-4xl mb-10'>Expense Tracker App</h1>
            <div className='flex flex-col items-center '>
                <div className='flex p-2 gap-x-20 justify-center'>
                    <span onClick={() => { setType("expense") }} className={`cursor-pointer ${type == "expense" ? 'bg-red-500 text-white' : "bg-white"} text-black p-4 rounded-xl`}>Expense</span>
                    <span onClick={() => { setType("income") }} className={` ${type == "income" ? 'bg-green-500  text-white' : "bg-white"} cursor-pointer text-black p-4 rounded-xl`}>Income</span>
                </div>
            </div>

            <Form
                name="control-hooks"
                form={form}
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
                    label="Amount"
                    name="amount"

                    rules={[
                        {
                            required: true,
                            message: 'Please input Amount!',
                        },
                    ]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: 'Please input details!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className='w-full flex '>
                <div className='flex flex-col flex-1 items-center p-5 bg-cyan-200'>
                    <div className=''>
                        <h1 className='text-3xl font-bold text-center'>{income}</h1>
                        <p>Income</p>
                    </div>
                </div>
                <div className='flex flex-col flex-1 items-center p-5 bg-cyan-200'>
                    <div className=''>
                        <h1 className='text-3xl font-bold text-center'>{expense}</h1>
                        <p>Expense</p>
                    </div>
                </div>
                <div className='flex flex-col flex-1 items-center p-5 bg-cyan-200'>
                    <div className=''>
                        <h1 className='text-3xl font-bold text-center'>{profit}</h1>
                        <p className='text-center'>Profit</p>
                    </div>
                </div>
            </div>

            <Table dataSource={transaction} className='w-full'>

                <Column title="Amount" dataIndex="amount" key="amount" />
                <Column title="Type" dataIndex="type" key="type" />

                <Column title="Desc" dataIndex="desc" key="desc" />
                <Column title="Created At" dataIndex="created_at" key="created_at" />


                <Column
                    title="Action"
                    key="action"
                    render={(_, record, ind) => {

                        return (
                            <Space size="middle">
                                <a onClick={() => {
                                    onFill(record, ind),

                                        setType(record.type),
                                        setIsEdit(true),
                                        setEditIndex(ind)
                                    console.log(isEdit)
                                }}>Edit</a>

                                <a onClick={() => {
                                    console.log(record)
                                    transaction.splice(ind, 1),
                                        setTransactions([...transaction]);
                                }}>Delete</a>
                            </Space>
                        )
                    }}
                />
            </Table>
        </div>
    )
};
export default Abc;