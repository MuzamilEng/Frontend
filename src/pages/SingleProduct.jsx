import React, { useState } from 'react';
import { ShoppingCart, Package2, Loader2, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/storeApi';
import Layout from '../layout/layout';

const SingleProduct = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const { id } = useParams();
  const { isLoading, isError, data: productData } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Product</h2>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!productData?.product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="text-gray-600 mt-2">The requested product could not be found</p>
        </div>
      </div>
    );
  }

  const data = productData.product;

  const formatPrice = (amount, currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount / 100);
  };

  const hasDimensions = data.height || data.length || data.width || data.weight;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{data.title}</h2>
              {data.subtitle && (
                <p className="text-gray-600">{data.subtitle}</p>
              )}
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Select Price</h3>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {data.variants?.[0]?.prices?.map((price) => (
                    <option key={price.currency_code} value={price.currency_code}>
                      {formatPrice(price.amount, price.currency_code)} ({price.currency_code.toUpperCase()})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Description Section */}
            {data.description && (
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold">Features:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {data.description.split('\n').map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Details - Dimensions Table */}
            {hasDimensions && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dimensions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Dimension</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.height && (
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-600">Height</td>
                          <td className="px-4 py-2 text-sm font-medium">{data.height} cm</td>
                        </tr>
                      )}
                      {data.length && (
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-600">Length</td>
                          <td className="px-4 py-2 text-sm font-medium">{data.length} cm</td>
                        </tr>
                      )}
                      {data.width && (
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-600">Width</td>
                          <td className="px-4 py-2 text-sm font-medium">{data.width} cm</td>
                        </tr>
                      )}
                      {data.weight && (
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-600">Weight</td>
                          <td className="px-4 py-2 text-sm font-medium">{data.weight} kg</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Additional Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {data.material && (
                <div>
                  <p className="text-gray-600">Material</p>
                  <p className="font-medium capitalize">{data.material}</p>
                </div>
              )}
              {data.variants?.[0]?.inventory_quantity !== undefined && (
                <div>
                  <p className="text-gray-600">Stock</p>
                  <p className="font-medium">
                    {data.variants[0].inventory_quantity} units
                  </p>
                </div>
              )}
              {data.variants?.[0]?.sku && (
                <div>
                  <p className="text-gray-600">SKU</p>
                  <p className="font-medium">{data.variants[0].sku}</p>
                </div>
              )}
              {data.origin_country && (
                <div>
                  <p className="text-gray-600">Origin</p>
                  <p className="font-medium">{data.origin_country}</p>
                </div>
              )}
            </div>

            {/* Options */}
            {data.options?.length > 0 && data.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <h3 className="text-lg font-semibold">{option.title}</h3>
                <select className="w-full border rounded-md px-3 py-2">
                  {option.values.map((value) => (
                    <option key={value.id} value={value.value}>
                      {value.value}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>

              {/* Shipping Info */}
              {data.profiles?.[0] && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Package2 size={20} />
                  <span>Free shipping available | {data.profiles[0].name}</span>
                </div>
              )}
            </div>

            {/* Additional Information */}
            {data.metadata?.title && (
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Available Languages</h3>
                <div className="flex space-x-4">
                  {Object.keys(data.metadata.title).map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;