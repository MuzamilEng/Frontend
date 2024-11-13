import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../layout/layout';

const TableForm = () => {
  // State for table data and target languages
  const [tableId, setTableId] = useState('');
  const [productId, setProductId] = useState('');
  const [rows, setRows] = useState([['', '', '', '', '', '', '', '', '']]);
  const [targetLanguages, setTargetLanguages] = useState([]);

  // Add a new empty row to the table data
  const addRow = () => {
    setRows([...rows, ['', '', '', '', '', '', '', '', '']]);
  };

  // Update a specific cell in the table data
  const updateCell = (rowIndex, cellIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][cellIndex] = value;
    setRows(updatedRows);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the payload
    const payload = {
      tables: [
        {
          product_id: productId,
          table_id: tableId,
          table_data: {
            id: tableId,
            data: rows,
          },
        },
      ],
      targetLanguages: targetLanguages,
    };

    try {
      // Send the payload to the backend
      const response = await axios.post('http://localhost:9000/store/create-table', payload);
      console.log('Response:', response.data);
      alert('Table data sent successfully!');
    } catch (error) {
      console.error('Error sending table data:', error);
      alert('Failed to send table data.');
    }
  };

  return (
 <Layout>
       <div className="p-8 bg-gray-100 rounded-md shadow-md max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Table Data Form</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Product ID:</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Table ID:</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          required
        />
      </div>
  
      <h3 className="text-xl font-semibold mb-2 text-gray-700">Table Data</h3>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2 mb-2">
          {row.map((cell, cellIndex) => (
            <input
              key={cellIndex}
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24"
              value={cell}
              onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={addRow}
      >
        Add Row
      </button>
  
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Target Languages</h3>
      <div className="space-y-2">
        {['German (DE)', 'French (FR)', 'Italian (IT)'].map((lang, index) => (
          <label key={index} className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              value={lang.slice(-3, -1)}
              className="text-indigo-500 focus:ring-indigo-400"
              onChange={(e) =>
                setTargetLanguages((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((language) => language !== e.target.value)
                )
              }
            />
            <span>{lang}</span>
          </label>
        ))}
      </div>
  
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        Send Table Data
      </button>
    </form>
  </div>
 </Layout>
  
  );
};

export default TableForm;