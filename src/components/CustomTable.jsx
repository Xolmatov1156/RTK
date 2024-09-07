import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAllProductsQuery, useDeleteProductsMutation } from '../store/productsApi';
import toast, { Toaster } from 'react-hot-toast';
import UpdateProductModal from './UpdateProductModal';

export default function CustomTable() {
  const { data = [], isLoading } = useGetAllProductsQuery();
  const [deleteProducts] = useDeleteProductsMutation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteProducts(id).unwrap();
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product. Please try again.');
      console.error('Failed to delete product: ', error);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className='text-center text-xl'>Loading...</div>;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}$</TableCell>
                <TableCell align="right">{product.color}</TableCell>
                <TableCell align="right">
                  <button
                    className='bg-blue-500 rounded-lg text-white p-2 mr-2'
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </button>
                  <button
                    className='bg-red-500 rounded-lg text-white p-2 '
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
