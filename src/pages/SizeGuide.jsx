import React, { useState } from 'react';
import { Ruler, ArrowDown } from 'lucide-react';
import Layout from '../layout/layout';

const SizeGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('tops');

  const categories = [
    { id: 'tops', label: 'Tops & T-Shirts' },
    { id: 'bottoms', label: 'Pants & Bottoms' },
    { id: 'shoes', label: 'Footwear' },
  ];

  const measurementGuide = {
    chest: "Measure around the fullest part of your chest, keeping the tape horizontal.",
    waist: "Measure around your natural waistline, keeping the tape comfortably loose.",
    hips: "Measure around the fullest part of your hips.",
    inseam: "Measure from the crotch to the bottom of the leg.",
  };

  const sizingData = {
    tops: {
      headers: ['Size', 'Chest (in)', 'Waist (in)', 'Length (in)', 'Shoulders (in)'],
      rows: [
        ['XS', '34-36', '28-30', '26', '15.5'],
        ['S', '36-38', '30-32', '27', '16'],
        ['M', '38-40', '32-34', '28', '16.5'],
        ['L', '40-42', '34-36', '29', '17'],
        ['XL', '42-44', '36-38', '30', '17.5'],
        ['XXL', '44-46', '38-40', '31', '18'],
      ]
    },
    bottoms: {
      headers: ['Size', 'Waist (in)', 'Hips (in)', 'Inseam (in)', 'Thigh (in)'],
      rows: [
        ['28', '28-29', '34-35', '30', '20'],
        ['30', '30-31', '36-37', '30', '21'],
        ['32', '32-33', '38-39', '31', '22'],
        ['34', '34-35', '40-41', '31', '23'],
        ['36', '36-37', '42-43', '32', '24'],
        ['38', '38-39', '44-45', '32', '25'],
      ]
    },
    shoes: {
      headers: ['US Size', 'UK Size', 'EU Size', 'Foot Length (cm)'],
      rows: [
        ['7', '6', '40', '25'],
        ['8', '7', '41', '25.5'],
        ['9', '8', '42', '26'],
        ['10', '9', '43', '27'],
        ['11', '10', '44', '28'],
        ['12', '11', '45', '29'],
      ]
    }
  };

  return (
  <Layout>
  <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Ruler className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Size Guide</h1>
        </div>
        
        {/* Measurement Tips */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">How to Measure</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(measurementGuide).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3">
                <ArrowDown className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <span className="font-medium text-blue-900 capitalize">{key}:</span>
                  <p className="text-blue-800 text-sm mt-1">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Size Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {sizingData[selectedCategory].headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizingData[selectedCategory].rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 text-sm text-gray-900 border-b border-gray-200 ${
                          cellIndex === 0 ? 'font-medium' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></span>
              <span>Measurements are approximate and may vary by style</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></span>
              <span>If you're between sizes, we recommend choosing the larger size</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></span>
              <span>For the most accurate fit, have someone else take your measurements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default SizeGuide;