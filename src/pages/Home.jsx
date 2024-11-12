import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import ImagesForm from './ImagesForm';
import VariantForm from './VariantForm';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';


const Form = () => {
    const formFields = [ 
        {
            name: 'title',
            type: 'text',
            placeholder: 'Title',
        },
        {
            name: 'subtitle',
            type: 'text',
            placeholder: 'Sub-title',
        },
        {
            name: 'description',
            type: 'textarea',
            placeholder: 'Description',
        },
        {
          name: 'short_description',
          type: 'textarea',
          placeholder: 'Short Description',
        }
    ];

    const [productsOption, setProductOptions] = useState([{ title: '', values: [''] }]);
    const [variants, setVariants] = useState([]);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [mediaUrls, setMediaUrls] = useState([]);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [regions, setRegions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newVariant, setNewVariant] = useState({
        title: '',
        sku: '',
        ean: '',
        upc: '',
        inventory_quantity: 0,
        options: [],
    });
    const [showVariants,setShowVariants] = useState(null)
    const [stock,showStock] = useState(false)
    const [shipping,showShipping] = useState(false)
    const [variantPrice, setVariantPrice] = useState(0);
    const [variantRegion, setVariantRegion] = useState('');

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...productsOption];
        updatedOptions[index][field] = value;
        setProductOptions(updatedOptions);
    };

    const handleValueChange = (optionIndex, valueIndex, value) => {
        const updatedOptions = [...productsOption];
        updatedOptions[optionIndex].values[valueIndex] = value;
        setProductOptions(updatedOptions);
    };

    const addValueToOption = (optionIndex) => {
        const updatedOptions = [...productsOption];
        updatedOptions[optionIndex].values.push(''); // Add an empty value input
        setProductOptions(updatedOptions);
    };

    const addProductOptions = () => {
        setProductOptions([...productsOption, { title: '', values: [''] }]); // Add a new option with an empty value
    };

    const handleVariantChange = (field, value) => {
        setNewVariant({ ...newVariant, [field]: value });
    };

    const handleVariantOptions = (optionIndex, value) => {
      // Create a copy of the current options array
      const updatedOptions = [...newVariant.options];
      updatedOptions[optionIndex] = value;
      // Update the state with the modified options array
      setNewVariant((prevVariant) => ({
          ...prevVariant,
          options: updatedOptions,
      }));
      console.log('Updated Options:', updatedOptions);
  };
  
      
    const handleThumbnailChange = (e) => {
        const selectedFile = e.target.files[0];
        setThumbnailImage(selectedFile);
    };

    const handleFilesChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      const imageURLsArray = selectedFiles.map(file => URL.createObjectURL(file));
      setImageURLs(prev => [...prev, ...imageURLsArray]);
    };


      // Handle image upload
  const handleThumbnailUpload = async (e) => {
    e.preventDefault()
    if (!thumbnailImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", thumbnailImage);

    try {
      const response = await fetch("https://api-mzml.ovooro.com/store/thumbnail", {
        method: "POST",
        // mode: "no-cors",
        body: formData,
        // referrerPolicy: "no-referrer" // This can help with strict CORS policies in dev
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();
      setThumbnailUrl(`https://api-mzml.ovooro.com${result.url}`);
      console.log("Image uploaded successfully:", result);
      // Optionally, you can set some state here to reflect the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };
  const handleFilesUpload = async (e) => {
    e.preventDefault()
    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("images", file)); // 'images' matches the field name in the multer config

    try {
      const response = await fetch("https://api-mzml.ovooro.com/store/media", {
        method: "POST",
        body: formData,
        referrerPolicy: "no-referrer" // This can help with strict CORS policies in dev
      });

      if (!response.ok) {
        throw new Error("Failed to upload images.");
      }

      const result = await response.json();
      const updatedUrls = result.map(url => url.url);
      setMediaUrls(prev => [...prev, ...updatedUrls]);
      console.log("Images uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images.");
    }
  };
  const handleImageDelete = async (index) => {
    try {
      setImageURLs((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };
  

    const addVariant = () => {
        setVariants((prevVariants) => [
            ...prevVariants,
            {
                title: newVariant.title,
                sku: newVariant.sku,
                ean: newVariant.ean,
                upc: newVariant.upc,
                hs_code: newVariant.hs_code,
                // description: newVariant.description,
                inventory_quantity: parseInt(newVariant.inventory_quantity),
                allow_backorder: stock,
                manage_inventory: stock,
                weight: parseInt(newVariant.weight),
                length: parseInt(newVariant.length),
                height: parseInt(newVariant.height),
                origin_country: newVariant.origin_country,
                mid_code: newVariant.mid_code,
                material: "cotton",
                metadata: {
                  // short_description: newVariant.short_description
                },
                options: newVariant.options.map((option) => ({
                  value: option
              })),
                prices: [
                  {
                    amount: typeof variantPrice === 'string' ? parseInt(variantPrice) : variantPrice,
                    // region_id: variantRegion,
                    currency_code: "eur"
                  }
                ],
                
            }
        ]);
        setShowModal(false);
        setNewVariant({
            title: '',
            sku: '',
            ean: '',
            upc: '',
            inventory_quantity: '',
            options: []
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            title: e.target.title.value,
            subtitle: e.target.subtitle.value,
            description: e.target.description.value,
            is_giftcard: false,
            discountable: true,
            images: mediaUrls, 
            thumbnail: thumbnailUrl || "https://via.placeholder.com/150",
            handle: e.target.title.value.toLowerCase().replace(/\s+/g, '-'),
            status: "draft",
            type: {
                value: "test-type",
                id: "type_01H8ZHGKXYZC5F9H2YTJ4G1HYJ"
            },
            sales_channels: [
                {
                    id: "sc_01JBBS0AGHZYVAGT4AR4REFQES"
                }
            ],
            options: productsOption.map(opt => ({
                title: opt.title
            })),
            variants,
            length: variants[0]?.length,
            height: variants[0]?.height,
            width: variants[0]?.width,
            hs_code: variants[0]?.hs_code,
            origin_country: variants[0]?.origin_country,
            mid_code: variants[0]?.mid_code,
            material: variants[0]?.material,
            metadata: {
                short_description: e.target.short_description.value
            }
        };

      const response =  await fetch("https://api-mzml.ovooro.com/store/custom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log('Response:', response.data);
        console.log('Form Data:', formData);
    };

    const fetchRegions = async () => {
      try {
        const response = await fetch("https://api-mzml.ovooro.com/store/regions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
          if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setRegions(data.regions);
        console.log('Response data:', data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    

    useEffect(()=> {
        fetchRegions()
    }, [])

    return (

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
            {formFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full min-h-[100px] px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                  />
                )}
              </div>
            ))}
                 <ImagesForm thumbnailUrl={thumbnailUrl} handleImageDelete={handleImageDelete} handleThumbnailChange ={handleThumbnailChange} handleThumbnailUpload ={handleThumbnailUpload} handleFilesChange ={handleFilesChange}handleFilesUpload ={handleFilesUpload} imageURLs={imageURLs} />
          </div>
          {
            showVariants && <VariantForm productsOption ={productsOption} handleOptionChange ={handleOptionChange} handleValueChange ={handleValueChange} addValueToOption ={addValueToOption} addProductOptions ={addProductOptions} setShowModal={setShowModal} />
          }
        <button
      onClick={()=>setShowVariants(!showVariants)}
      type='button'
      className="flex items-center px-4 py-3 bg-indigo-600 w-full text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
    >
      <div className='flex w-full justify-center'>
      <PlusCircle className="mr-2 h-5 w-5" />
      <span className="font-medium text-center">Product Variants</span>
      </div>
    </button>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      {
        showModal && 
        <Modal showModal ={showModal}handleVariantChange ={handleVariantChange} handleVariantOptions ={handleVariantOptions} setVariantPrice ={setVariantPrice}setVariantRegion ={setVariantRegion} showStock ={showStock} showShipping={showShipping} setShowModal ={setShowModal} newVariant={newVariant} productsOption={productsOption} variantPrice={variantPrice} variantRegion={variantRegion} regions={regions} stock={stock} shipping={shipping} addVariant={addVariant}/>
      }
    </div>
    

    );
};

export default Form;