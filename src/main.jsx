import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "sonner";
import { GlobalState } from "./context/globalState.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalState>
            <main className="bg-white font-Genty" style={{ backgroundAttachment: "fixed" }}>
              {/* <TopHeader />
              <Header /> */}
              <Toaster />
              <App />
              {/* <Footer /> */}
            </main>
        </GlobalState>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);




// import React, { useState } from 'react';

// const Form = () => {
//     const formFields = [ 
//         {
//             name: 'title',
//             type: 'text',
//             placeholder: 'Title',
//         },
//         {
//             name: 'subtitle',
//             type: 'text',
//             placeholder: 'Sub-title',
//         },
//         {
//             name: 'description',
//             type: 'textarea',
//             placeholder: 'Description',
//         }
//     ];

//     const [productsOption, setProductOptions] = useState([{ title: '' }]);
//     const [sku,setSku] = useState('')
//     const [variants, setVariants] = useState({
//         title: "",
//         sku: sku,
//         ean: "",
//         upc: "",
//         barcode: "",
//         hs_code: "",
//         inventory_quantity: 0,
//         allow_backorder: true,
//         manage_inventory: true,
//         weight: 0,
//         length: 0,
//         height: 0,
//         width: 0,
//         origin_country: null,
//         mid_code: "",
//         material: "cotton",
//         metadata: {},
//         prices: [{
//             amount: 2000,
//             region_id: "reg_01J96N7YB1JHMB9KGQEFQ0HNNE",
//             min_quantity: 1,
//             max_quantity: 100
//         }],
//         options: []
//     });
//     const [showModal, setShowModal] = useState(false);
//     const [newVariant, setNewVariant] = useState({
//         title: '',
//         sku: '',
//         ean: '',
//         upc: '',
//         inventory_quantity: '',
//     });
//     const [stock,showStock] = useState(false)
//     const [shipping,showShipping] = useState(false)

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Create the structured data object
//         const formData = {
//             title: e.target.title.value,
//             subtitle: e.target.subtitle.value,
//             description: e.target.description.value,
//             is_giftcard: false,
//             discountable: true,
//             images: [], // You can add image handling logic here
//             thumbnail: "",
//             handle: e.target.title.value.toLowerCase().replace(/\s+/g, '-'),
//             status: "draft",
//             type: {
//                 value: "test-type",
//                 id: "type_01H8ZHGKXYZC5F9H2YTJ4G1HYJ"
//             },
//             sales_channels: [
//                 {
//                     id: "sc_01J96N7QVWPYH2E6V16EMMTAZ9"
//                 }
//             ],
//             options: productsOption.map(opt => ({
//                 title: opt.title
//             })),
//             variants: [{
//                 ...variants,
//                 options: productsOption.map(opt => ({
//                     value: opt.description || ""
//                 }))
//             }],
//             weight: variants.weight,
//             length: variants.length,
//             height: variants.height,
//             width: variants.width,
//             hs_code: variants.hs_code,
//             origin_country: variants.origin_country,
//             mid_code: variants.mid_code,
//             material: variants.material,
//             metadata: {}
//         };

//         console.log('Form Data:', formData);
//     };

//     // Rest of your component code remains the same...
//     const addProductOptions = () => {
//         setProductOptions([...productsOption, { title: '', description: '' }]);
//     };

//     const handleOptionChange = (index, field, value) => {
//         const updatedOptions = [...productsOption];
//         updatedOptions[index][field] = value;
//         setProductOptions(updatedOptions);
//     };

//     const addVariant = () => {
//         setVariants((prev)=>({
//             title: newVariant.title,
//             sku: newVariant.sku,
//             ean: newVariant.ean,
//             upc: newVariant.upc,
//             inventory_quantity: newVariant.inventory_quantity,
//             allow_backorder: stock,
//             manage_inventory: stock,
//             weight: 0,
//             length: 0,
//             height: 0,
//             width: 0,
//             origin_country: null,
//             mid_code: "",
//             material: "cotton",
//             metadata: {},
//             prices: [{
//                 amount: 2000,
//                 region_id: "reg_01J96N7YB1JHMB9KGQEFQ0HNNE",
//                 min_quantity: 1,
//                 max_quantity: 100
//             }],
//             options: productsOption.map(opt => ({
//                 value: opt.description || ""
//             }))
//         }))
//         setShowModal(false);
//     };

//     const handleVariantChange = (field, value) => {
//         setNewVariant({ ...newVariant, [field]: value });
//     };
//     console.log(productsOption)
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Dynamic Form Fields */}
//             <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
//               {formFields.map((field) => (
//                 <div key={field.name} className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
//                   </label>
//                   {field.type === 'textarea' ? (
//                     <textarea
//                       name={field.name}
//                       placeholder={field.placeholder}
//                       className="w-full min-h-[100px] px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
//                       rows="4"
//                     />
//                   ) : (
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       placeholder={field.placeholder}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
    
//             {/* Product Variants Section */}
//             <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Variants</h2>
//               <div className="space-y-6">
//                 {productsOption.map((option, index) => (
//                   <div key={index} className="p-5 bg-gray-50 rounded-xl space-y-4 hover:bg-gray-100 transition-colors duration-200">
//                     <input
//                       type="text"
//                       placeholder="Option Title"
//                       value={option.title}
//                       onChange={(e) => handleOptionChange(index, 'title', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     />
//                     <textarea
//                       placeholder="Option Description"
//                       value={option.description}
//                       onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       rows="2"
//                     />
//                   </div>
//                 ))}
//                 <div className="flex space-x-4 mt-6">
//                   <button
//                     type="button"
//                     onClick={addProductOptions}
//                     className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
//                   >
//                     Add Options
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(true)}
//                     className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
//                   >
//                     Add Variants
//                   </button>
//                 </div>
//               </div>
//             </div>
    
//             {/* Enhanced Modal */}
//             {showModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
//                 <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 my-8">
//                   {/* Modal Header */}
//                   <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-2xl font-semibold text-gray-900">Add Variant</h2>
//                   </div>
    
//                   {/* Modal Content - Scrollable Area */}
//                   <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
//                     <div className="space-y-6">
//                       {/* Title and SKU Fields */}
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Custom Title
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="Enter custom title"
//                             value={newVariant.title}
//                             onChange={(e) => handleVariantChange('title', e.target.value)}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Material
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="Enter material"
//                             value={newVariant.sku}
//                             onChange={(e) => handleVariantChange('sku', e.target.value)}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                           />
//                         </div>
//                       </div>
    
//                       {/* Options Selection */}
//                       <div className="space-y-4">
//                         {productsOption.map((elem, ind) => (
//                           <div key={ind} className="bg-gray-50 p-4 rounded-lg">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               {elem.optionTitle}
//                             </label>
//                             <select className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
//                               <option value={elem.description}>{elem.description}</option>
//                             </select>
//                           </div>
//                         ))}
//                       </div>
    
//                       {/* Stock and Inventory Section */}
//                       <div className="border-t border-gray-200 pt-6">
//                         <button 
//                           onClick={() => showStock(!stock)}
//                           className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors"
//                         >
//                           <span>Stock and Inventory</span>
//                         </button>
                        
//                         {stock && (
//                           <div className="mt-4 space-y-4">
//                             {['SKU', 'Quantity in stock', 'EAN Barcode', 'UPC Barcode', 'Barcode'].map((label) => (
//                               <div key={label}>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   {label}*
//                                 </label>
//                                 <input
//                                   type="text"
//                                   placeholder={label === 'SKU' ? 'SUN-G JK 1234' : ''}
//                                   className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
    
//                       {/* Shipping Section */}
//                       <div className="border-t border-gray-200 pt-6">
//                         <button 
//                           onClick={() => showShipping(!shipping)}
//                           className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors"
//                         >
//                           <span>Shipping</span>
//                         </button>
                        
//                         {shipping && (
//                           <div className="mt-4 space-y-6">
//                             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                               {['Width', 'Height', 'Length', 'Weight'].map((dim) => (
//                                 <div key={dim}>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     {dim}
//                                   </label>
//                                   <input
//                                     type="number"
//                                     placeholder="100"
//                                     className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                   />
//                                 </div>
//                               ))}
//                             </div>
                            
//                             {['MID Code', 'HS Code', 'Country of Origin'].map((field) => (
//                               <div key={field}>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   {field}{field !== 'HS Code' && '*'}
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
    
//                   {/* Modal Footer */}
//                   <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
//                     <div className="flex justify-end space-x-4">
//                       <button
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                         className="px-6 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors duration-200 border border-gray-200 font-medium"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         onClick={addVariant}
//                         className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg font-medium"
//                       >
//                         Add Variant
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
    
//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button 
//                 type="submit" 
//                 className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
//               >
//                 Submit Form
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
// };

// export default Form;