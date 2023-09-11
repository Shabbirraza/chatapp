'use client'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Form,
    Input,
    Select,
    Radio,
    Space,
} from 'antd';
import Card from '../components/Card';
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;
const Products = () => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [form4] = Form.useForm();
    let [products, setProducts] = useState([])
    let [sort, setSort] = useState(null)
    let [filter, setFilter] = useState(null)
    let [filterVal, setFilterVal] = useState(null)
    let [displayArr, setDisplayArr] = useState([])
    const onFinish4 = (values) => {
        console.log(values)
        let obj = {
            title: values.title,
            description: values.description,
            price: values.price,
            category: values.categories,
            image: values.image
        }
        console.log("obj >", obj)
        setProducts([obj, ...products])
        form4.resetFields()
    };
  
    let handleChange1 = (e) => {
        console.log(e.target.value)
        setFilter("categories")
       
        setSort(e.target.value)
        // form.resetFields(), form2.resetFields(), form3.resetFields()
    }
    let handleChange2 = (e) => {
        console.log(e.target.value)
        setFilter("price")
       
        setSort(e.target.value)
        // form.resetFields(), form2.resetFields(), form3.resetFields()
    }
    let handleChange3 = (e) => {
        console.log(e.target.value)
        setFilter("order")
       
        setSort(e.target.value)
        // form.resetFields(), form2.resetFields(), form3.resetFields()
    }
    useEffect(() => {
        if (filter == "categories") {
            let arr = []
            products.map((value, ind) => {
                console.log(value.category)
                if (value.category == sort) {
                    arr.push(value)
                }
            })
            setDisplayArr([...arr])
        } else if (filter == "price") {
            let arr = []
            let pInt = parseInt(sort)
            console.log(pInt)
            products.map((value, ind) => {
                console.log(value.category)
                
                if (parseInt(value.price) > parseInt(sort)) {
                    arr.push(value)
                }
            })
            setDisplayArr([...arr])
        } else if (filter == "order") {
            if (sort == 'htl') {
                let arr = [...products]
                arr.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                console.log(arr)
                setDisplayArr([...arr])
            } else if (sort == "lth") {
                let arr = [...products]
                arr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                console.log(arr)
                setDisplayArr([...arr])
            }

        }
    }, [sort])
    // const onFinish1 = (values) => {

    //     console.log('Received values of form: ', values['radio-group']
    //     );
    //     setSort(values['radio-group'])
    //     setFilter("categories")
    //     form2.resetFields(), form3.resetFields()


    // };
    // const onFinish2 = (values) => {
    //     setFilter("price")
    //     console.log('Received values of form: ', values['radio-group']
    //     );
    //     setSort(values['radio-group'])
    //     form.resetFields(), form3.resetFields()
    // };
    // const onFinish3 = (values) => {
    //     setFilter("order")
    //     console.log('Received values of form: ', values['radio-group']
    //     );
    //     setSort(values['radio-group'])
    //     form.resetFields(), form2.resetFields(), form3.resetFields()
    // };
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => { setProducts([...json]) })

    }, [])
    return (
        <>
            <div className='w-full fixed border-b-2 bg-white border-green-300 p-5 h-20 text-green-600 text-3xl font-extrabold'>Products      {sort}</div>
            <div className='h-screen w-[200px] mt-20  fixed border-r-2 border-green-500'>

                <div className='pl-5'>
                    <Form
                        form={form}
                        name="control-hooks1"
                        onChange={(e) => { form2.resetFields(), form3.resetFields(),console.log(e.target.value), handleChange1(e) }}
                        {...formItemLayout}
                        // onFinish={onFinish1}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <div>
                            <p className='font-bold'>Categories</p>
                            <Form.Item name="radio-group" className='mx-auto'  >
                                <Radio.Group>
                                    <Radio value="men's clothing">men's clothing</Radio>
                                    <Radio value="electronics">electronics</Radio>
                                    <Radio value="women's clothing">women's clothing</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        {/* <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            <Space >
                                <Button className='bg-blue-500 text-white' htmlType="submit">
                                    Sort
                                </Button>

                            </Space>
                        </Form.Item> */}



                    </Form>
                    <Form
                        form={form2}
                        name="control-hooks2"

                        {...formItemLayout}
                        // onFinish={onFinish2}
                        onChange={(e) => { form.resetFields(), form3.resetFields(),console.log(e.target.value), handleChange2(e) }}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >


                        <div>
                            <p className='font-bold'>Price</p>
                            <Form.Item name="radio-group" className='mx-auto'  >
                                <Radio.Group>
                                    <Radio value="50">&gt;50</Radio>
                                    <Radio value="100">&gt;100</Radio>
                                    <Radio value="200">&gt;200</Radio>
                                    <Radio value="300">&gt;300</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>

                        {/* <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            <Space >
                                <Button className='bg-blue-500 text-white' htmlType="submit">
                                    Sort
                                </Button>

                            </Space>
                        </Form.Item> */}



                    </Form>
                    <Form
                        form={form3}
                        name="control-hooks3"
                        onChange={(e) => { form2.resetFields(), form.resetFields(),console.log(e.target.value), handleChange3(e) }}
                        {...formItemLayout}
                        // onFinish={onFinish3}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >


                        <div>
                            <p className='font-bold'>Price</p>
                            <Form.Item name="radio-group" className='mx-auto'  >
                                <Radio.Group>
                                    <Radio value="htl">H TO L</Radio>
                                    <Radio value="lth">L TO H</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </div>

                        <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            {/* <Space >
                                <Button className='bg-blue-500 text-white' htmlType="submit">
                                    Sort
                                </Button>

                            </Space> */}
                        </Form.Item>



                    </Form>
                </div>
            </div>
            <div className='top-20 absolute left-[200px]  min-h-screen right-[0px] -z-10  '>

                <Form
                    className='flex flex-wrap'
                    {...layout}
                    form={form4}
                    name="control-hooks4"
                    onFinish={onFinish4}
                    style={{

                    }}
                >

                    <Form.Item
                        className='min-w-[250px] '
                        name="title"
                        label={<p className='font-bold  '>Title</p>}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='min-w-[250px] '
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='min-w-[250px] '
                        name="image"
                        label="Image"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item

                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input type={'number'} />
                    </Form.Item>
                    <Form.Item
                        name="categories"
                        label="Categories"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a Category"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="men's clothing">Men's clothing</Option>
                            <Option value="electronics">Electronics</Option>
                            <Option value="women's clothing">Women's clothing</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" className='bg-blue-500'>
                            Submit
                        </Button>
                      

                    </Form.Item>
                </Form>
                <div className="flex flex-wrap p-2">
                    {sort ?
                        displayArr.map((value, int) => {
                            // console.log(value)
                            return (<Card title={value.title}
                                price={value.price}
                                description={value.description}
                                category={value.category}
                                image={value.image}
                            />)
                        })
                        :
                        products.map((value, int) => {
                            console.log(value)
                            return (<Card title={value.title}
                                price={value.price}
                                description={value.description}
                                category={value.category}
                                image={value.image}
                            />)
                        })

                    }




                </div>

            </div>

        </>

    )
}

export default Products