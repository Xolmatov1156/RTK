import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAddProductMutation, useGetAllProductsQuery } from '../store/productsApi';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';

function Add() {
  const [addProduct] = useAddProductMutation();
  const { data: products = [], refetch } = useGetAllProductsQuery();
  const [formData, setFormData] = useState({ name: '', price: '', color: '' });
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.name) {
      const duplicate = products.some((product) => product.name === formData.name);
      setIsDuplicate(duplicate);
    } else {
      setIsDuplicate(false);
    }
  }, [formData.name, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicate) {
      toast.error('Product with this name already exists.');
      return;
    }
    try {
      await addProduct(formData).unwrap();
      setFormData({ name: '', price: '', color: '' });
      localStorage.setItem('productAdded', 'Product added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to add product: ', error);
      toast.error('Failed to add product. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-500'>
      <form onSubmit={handleSubmit} className='w-[500px] bg-violet-500 relative rounded-lg h-[350px] p-[10px] flex space-y-[15px] flex-col items-center'>
        <ClearIcon onClick={() => navigate('/')} className='cursor-pointer text-white absolute right-5 top-3' />
        <h1 className='text-center pb-[10px] text-white text-[20px] mt-[20px]'>Add your product</h1>
        <Input
          placeholder='Enter name'
          name='name'
          allowClear
          className='w-[330px]'
          size='large'
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder='Enter price'
          name='price'
          allowClear
          type='number'
          className='w-[330px]'
          required
          size='large'
          value={formData.price}
          onChange={handleInputChange}
        />
        <Input
          placeholder='Enter color'
          name='color'
          className='w-[330px]'
          allowClear
          required
          size='large'
          value={formData.color}
          onChange={handleInputChange}
        />
        <Button type='primary' danger className='w-[330px]' size='large' htmlType='submit' disabled={isDuplicate}>
          Add
        </Button>
        {isDuplicate && <p className='text-red-500'>A product with this name already exists.</p>}
      </form>
    </div>
  );
}

export default Add;
