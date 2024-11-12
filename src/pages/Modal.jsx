import React from 'react';
import { ArrowDown, ArrowDown01, ArrowUp, ChevronDown, ChevronUp, X } from 'lucide-react';

const Modal = ({
  showModal,
  handleVariantChange,
  handleVariantOptions,
  setVariantPrice,
  setVariantRegion,
  showStock,
  showShipping,
  setShowModal,
  newVariant,
  productsOption,
  variantPrice,
  variantRegion,
  regions,
  stock,
  shipping,
  addVariant,
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative  bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Add Variant</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <input
                type="text"
                placeholder="Enter custom title"
                value={newVariant.title}
                onChange={(e) => handleVariantChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 mb-4"
              />
              {productsOption.map((elem, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {elem.title}
                  </label>
                  <select
                    value={newVariant.options[index] || ''}
                    onChange={(e) => handleVariantOptions(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    {elem.values.map((value, valueIndex) => (
                      <option key={valueIndex} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter price in eur"
                  value={variantPrice}
                  onChange={(e) => setVariantPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regions
                </label>
                <select
                  value={variantRegion}
                  onChange={(e) => setVariantRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="">Select region</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => {
                    showStock(!stock);
                    // showShipping(false);
                  }}
                  className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors mb-4"
                >
                 
                  <span>Stock and Inventory</span>
                 <div className='ml-[22vw]'>
                 {stock ? <ChevronDown className='' /> : <ChevronUp className='' />}
                 </div>
                </button>
                {stock && (
                  <div className="space-y-4">
                    {[
                      { title: 'SKU', value: 'sku', type: 'text',},
                      { title: 'Quantity in stock', value: 'inventory_quantity', type: 'number',},
                      { title: 'EAN-Barcode', value: 'ean', type: 'text',},
                      { title: 'UPC-Barcode', value: 'upc', type: 'text',},
                      { title: 'Barcode', value: 'barcode', type: 'text',},
                    ].map((label) => (
                      <div key={label.title}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label.title}*
                        </label>
                        <input
                          type={label.type}
                          value={newVariant[label.value] || ''}
                          onChange={(e) =>
                            handleVariantChange(label.value, e.target.value)
                          }
                          placeholder={label === 'SKU' ? 'SUN-G JK 1234' : ''}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => {
                    showShipping(!shipping);
                    // showStock(false);
                  }}
                  className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors mb-4"
                >
                  
                  <span>Shipping</span>
                  <div className='ml-[26.5vw]'>
                 {shipping ? <ChevronDown className='' /> : <ChevronUp className='' />}
                 </div>
                </button>
                {shipping && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { title: 'Width', value: 'width' },
                        { title: 'Height', value: 'height' },
                        { title: 'Length', value: 'length' },
                        { title: 'Weight', value: 'weight' },
                      ].map((dim) => (
                        <div key={dim.title}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dim.title}
                          </label>
                          <input
                            type="number"
                            value={newVariant[dim.value] || ''}
                            onChange={(e) =>
                              handleVariantChange(dim.value, e.target.value)
                            }
                            placeholder="100"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>
                    {[
                      { title: 'Material', value: 'material' },
                      { title: 'MID Code', value: 'mid_code' },
                      { title: 'HS Code', value: 'hs_code' },
                      { title: 'Origin Country', value: 'origin_country' },
                    ].map((field) => (
                      <div key={field.value}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.title}
                          {field !== 'HS Code' && '*'}
                        </label>
                        <input
                          type="text"
                          value={newVariant[field.value] || ''}
                          onChange={(e) =>
                            handleVariantChange(field.value, e.target.value)
                          }
                          placeholder={field === 'HS Code' ? '123456' : ''}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end px-6 py-4 border-t border-gray-200 space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addVariant}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all duration-200"
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;