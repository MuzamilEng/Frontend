import React from 'react'

const VariantForm = ({productsOption,handleOptionChange,handleValueChange,addValueToOption,addProductOptions,setShowModal}) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Variants</h2>
            <div className="space-y-6">
              {productsOption.map((option, index) => (
                <div key={index} className="p-5 bg-gray-50 rounded-xl space-y-4 hover:bg-gray-100 transition-colors duration-200">
                  <input
                    type="text"
                    placeholder="Option Title"
                    value={option.title}
                    onChange={(e) => handleOptionChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <div className="space-y-2">
                    {option.values.map((value, valueIndex) => (
                      <div key={valueIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Option Value"
                          value={value}
                          onChange={(e) => handleValueChange(index, valueIndex, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addValueToOption(index)}
                      className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                    >
                      Add Value
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={addProductOptions}
                   className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200   rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Add Options
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200   rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Add Variants
                </button>
              </div>
            </div>
          </div>
    </>
  )
}

export default VariantForm