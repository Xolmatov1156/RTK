import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { useUpdateProductMutation } from '../store/productsApi';
import toast from 'react-hot-toast'; // Ensure this is correctly imported

const UpdateProductModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState(product);
  const [updateProduct] = useUpdateProductMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateProduct(formData).unwrap();
      toast.success('Product updated successfully!');
      onClose(); // Close the modal on successful update
    } catch (error) {
      toast.error('Failed to update product. Please try again.');
      console.error('Failed to update product: ', error);
    }
  };

  return (
    <Modal
      title="Update Product"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Update
        </Button>,
      ]}
    >
      <Input
        placeholder='Enter name'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
        style={{ marginBottom: '10px' }}
      />
      <Input
        placeholder='Enter price'
        name='price'
        type='number'
        value={formData.price}
        onChange={handleInputChange}
        style={{ marginBottom: '10px' }}
      />
      <Input
        placeholder='Enter color'
        name='color'
        value={formData.color}
        onChange={handleInputChange}
      />
    </Modal>
  );
};

export default UpdateProductModal;
