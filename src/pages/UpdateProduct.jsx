import React from 'react';

const UpdateProduct = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">Medusa T-Shirt</h2>
        <p className="text-gray-600 mt-4">
          Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.
        </p>
      </div>
      <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-700 font-medium">Details</h3>
            <div className="mt-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtitle</span>
                <span>-</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Handle</span>
                <span>t-shirt</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Type</span>
                <span>-</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Collection</span>
                <span>-</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Category</span>
                <span>Shirts</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discountable</span>
                <span>True</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Metadata</span>
                <span>-</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 font-medium">Sales channels</h3>
            <div className="mt-2">
              <div className="flex justify-between text-gray-600">
                <span>Default Sales Channel</span>
                <span>-</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Available in 1 out of 1 Sales Channels</span>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;