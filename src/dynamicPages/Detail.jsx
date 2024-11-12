import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products, } from "../data";
import Ribbons from "../components/Ribbons";
import { Button, Fade, Grow } from "@mui/material";
import { useGlobalState } from "../context/globalState";
import { useAvalbilityMutation } from "../store/storeApi";
import Loading from "../components/Loader";
import { toast } from "sonner";
import CryptoJS from 'crypto-js';
import {
  FaStar,
  FaInfoCircle,
  FaRuler,
  FaCheckCircle,
  FaFlask,
  FaShoppingCart,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import {SizeTable, InflatableDetailsTable, UsersTable} from "../components/InflatableDetailsTable";
import Layout from "../components/Layout";

const DetailContent = ({ itemData }) => ( 
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaStar className="text-yellow-400 mr-3" />
        Description
      </h1>
     
    
     {
      itemData.description === 'https://youtu.be/s2w_4OBgKs8' ? <iframe width="560" height="315" src="https://www.youtube.com/embed/s2w_4OBgKs8?si=JXavX1ge11h_6zxD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>: <p className="text-lg text-gray-600 leading-relaxed">
      {/* {itemData.description} */}
    </p>
     }
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Price
          </h2>
          <p className="text-3xl font-bold text-green-600"> £{Number(itemData.price.replace(/[^0-9.-]+/g, "")) + 125}</p>
         
          {/* <div className="bg-blue-500 hover:cursor-pointer text-white px-3 py-1 rounded-full text-sm font-semibold">
            {itemData.isPremium ? "Drop and Go" : "2 operators"}
          </div> */}
        </div>
        {itemData?.description?.overview && itemData?.description?.overview?.map((item, index) => (
          <div key={index}>
            <p className="lg:text-[1vw] text-[3.5vw] text-gray-700 mb-2">
              {item}
            </p>
            </div>
        ))}
         {itemData?.description?.features && itemData?.description?.features?.map((item, index) => (
          <div key={index}>
            <p className="lg:text-[1vw] text-[3.5vw] text-gray-700 mb-2">
              {item}
            </p>
            </div>
        ))}
         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Availability
          </h2>
      <div className="flex flex-wrap gap-[0.5vw]">
      {
          itemData?.locations_available?.map((item, index) => (
            <div key={index} className="">
              <p className="text-[1vw] text-gray-700">
                {item}
              </p>
              </div>
          ))
        }
        {
          itemData?.locations?.map((item, index) => (
            <div key={index} className="">
              <p className="text-[1vw] text-gray-700">
                {item}
              </p>
              </div>
          ))
        }
      </div>
      </div>
    </div>
  </Fade>
);

const SizeContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaRuler className="text-blue-500 mr-3" />
        Size Information
      </h2>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Dimensions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-blue-800"> </th>
                <th className="px-4 py-2 text-left text-blue-800">Width</th>
                <th className="px-4 py-2 text-left text-blue-800">Length</th>
                <th className="px-4 py-2 text-left text-blue-800">Height</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold text-blue-800">Unit Size</td>
                <td className="px-4 py-2">{itemData?.size?.unit_size?.width}</td>
                <td className="px-4 py-2">{itemData?.size?.unit_size?.length}</td>
                <td className="px-4 py-2">{itemData?.size?.unit_size?.height}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-blue-800">Required Space</td>
                <td className="px-4 py-2">{itemData?.size?.required_space?.width}</td>
                <td className="px-4 py-2">{itemData?.size?.required_space?.length}</td>
                <td className="px-4 py-2">{itemData?.size?.required_space?.height}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <SizeTable  size={itemData?.size} s={itemData?.s1} />
    </div>
  </Fade>
);

const SuitabilityContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaUsers className="text-purple-500 mr-3" />
        Suitability 
      </h2>
      <InflatableDetailsTable size={itemData?.size} suitability={itemData?.suitability} />
    </div>
  </Fade>
);

const Users = (data) => {
  const max_users_by_height  = data?.itemData?.users?.max_users_by_height || []


  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left border">Height</th>
          <th className="px-4 py-2 text-left border">Max Users</th>
        </tr>
      </thead>
      <tbody>
        {max_users_by_height?.map((entry, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{entry?.height}</td>
            <td className="border px-4 py-2">{entry?.max_users}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TestsContent = ({ itemData }) => (
  <Fade in={true} timeout={500}>
    <div className="space-y-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
        <FaFlask className="text-red-500 mr-3" />
        Additional information
4:31 PM

      </h2>
      <div className="bg-red-50 p-6 rounded-lg shadow-md">
        <p className="text-lg text-red-800 leading-relaxed">
        {itemData.additionalInformation}
        </p>
      </div>
    </div>
  </Fade>
);

const ImagePreview = ({ image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length);
  };
  let imgUrl = `https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_900/${image[currentIndex]}`
  if(image[0] ==='2.png'){
    imgUrl = '/images/2.png'
  }else if(image[0] ==='3.png'){
    imgUrl='/images/3.png'
  }else if(image[0] ==='4.png'){
    imgUrl='/images/4.png'
  }else if(image[0] ==='5.png'){
    imgUrl='/images/5.png'
  }else if(image[0] ==='/images/zorbBalls.jpg'){
imgUrl = '/images/zorbBalls.jpg'
  }else if(image[0] =='/images/fountain.jpg'){
    imgUrl='/images/fountain.jpg'
  }else if( image[0] == '/images/img2.jpg') {
    imgUrl ='/images/img2.jpg'
  }else if(image[0] ==='/images/megaWave.png'){
    imgUrl='/images/megaWave.png'
  }else if(image[0] === '/images/toddlerSlide.jpg'){
    imgUrl='/images/toddlerSlide.jpg'
  }else if(image[0] ==='/images/bouncyCastle.png'){
    imgUrl='/images/bouncyCastle.png'
  }else if(image[0] === '/images/shootOut.jpg'){
    imgUrl ='/images/shootOut.jpg'
  }
  return (
    <div className="relative w-full h-64 lg:h-96">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          // src={}
          src={`${imgUrl}`}
          alt={`Image ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

const ImageModal = ({ image, onClose }) => {
  let imgUrl = `https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_900/${image}`
  if(image ==='2.png'){
    imgUrl = '/images/2.png'
  }else if(image ==='3.png'){
    imgUrl='/images/3.png'
  }else if(image ==='4.png'){
    imgUrl='/images/4.png'
  }else if(image ==='5.png'){
    imgUrl='/images/5.png'
  }else if(image ==='/images/zorbBalls.jpg'){
    imgUrl='/images/zorbBalls.jpg'
  }else if(image ==='/images/fountain.jpg'){
    imgUrl ='/images/fountain.jpg'
  }else if(image ==='/images/img2.jpg'){
    imgUrl ='/images/img2.jpg'
  }else if(image === '/images/megaWave.png'){
    imgUrl='/images/megaWave.png'
  }else if(image === '/images/toddlerSlide.jpg'){
    imgUrl='/images/toddlerSlide.jpg'
  }else if(image === '/images/bouncyCastle.png'){
    imgUrl='/images/bouncyCastle.png'
  }else if(image === '/images/shootOut.jpg'){
    imgUrl ='/images/shootOut.jpg'
  }
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      className="relative max-w-3xl max-h-[90vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={`${imgUrl}`} alt="Full size preview" className="w-full h-full object-contain" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
      >
        <FaTimes size={24} />
      </button>
    </motion.div>
  </motion.div>
  )
}

const ImageGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  let imgUrl = `https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_900/${images[0]}`
  if(images[0] ==='2.png'){
    imgUrl = '/images/2.png'
  }else if(images[0]==='3.png'){
    imgUrl='/images/3.png'
  }else if(images[0]==='4.png'){
    imgUrl='/images/4.png'
  }else if(images[0]==='5.png'){
    imgUrl='/images/5.png'
  }else if(images[0]==='/images/zorbBalls.jpg'){
imgUrl='/images/zorbBalls.jpg'
  }else if(images[0] === '/images/fountain.jpg'){
    imgUrl='/images/fountain.jpg'
  }else if(images[0] ==='/images/img2.jpg'){
imgUrl='/images/img2.jpg'
  }else if(images[0] === '/images/megaWave.png'){
    imgUrl='/images/megaWave.png'
  }else if(images[0] === '/images/toddlerSlide.jpg'){
    imgUrl='/images/toddlerSlide.jpg'
  }else if(images[0] === '/images/bouncyCastle.png'){
    imgUrl='/images/bouncyCastle.png'
  }else if(images[0] === '/images/shootOut.jpg'){
    imgUrl='/images/shootOut.jpg'
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images?.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImage(image)}
          >
            <img src={`${imgUrl}`} alt={`Thumbnail ${index + 1}`} className="w-full object-cover" />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};






const Detail = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const { id } = useParams();

  const navigate = useNavigate();
  // const { products } = useGlobalState(); // Assuming products are available in global state
  const itemData = products.find(product => product?.title === id); // Find the product by title

  const buttons = [
    { name: "Description", icon: <FaInfoCircle /> },
    { name: itemData?.size ? "Size" : null, icon: itemData?.size ? <FaRuler /> : null },
    { name: "Suitability", icon: <FaUsers /> },
    { name: "Users", icon: <FaUsers /> },
  ];

  const { itemDetail, setItemDetail } = useGlobalState();
  const [available, { isLoading, isSuccess, isError, data }] = useAvalbilityMutation();

  const handleClick = async () => {
    await available({ itemName: itemData?.title });
  };

  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  const encryptAndSaveToLocalStorage = (key, object) => {
    const jsonString = JSON.stringify(object);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    if (!itemData) {
      navigate('/');
    }

    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-center",
        duration: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (isError) {
      setItemDetail({
        name: itemData?.title,
        price: parseFloat(itemData.price.replace(/£/, '')),
        id: id,
        image: itemData?.image?.url,
      });
      encryptAndSaveToLocalStorage('data', {
        name: itemData?.title,
        price: parseFloat(itemData.price.replace(/£/, '')),
        id: id,
        image: itemData?.image?.url,
      });
      navigate(`/contact`);
    }
  }, [isSuccess, isError, itemData]);

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return <DetailContent itemData={itemData} />;
      case "Size":
        return itemData.size && <SizeContent itemData={itemData} />;
      case "Suitability":
        return <SuitabilityContent itemData={itemData} />;
      case "Tests":
        return <TestsContent itemData={itemData} />;
      case "Users":
        return <Users itemData={itemData} />;
      default:
        return <DetailContent itemData={itemData} />;
    }
  };

  return (
    <Layout>
      <main className="flex mt-8 w-full bg-gray-100 min-h-screen">
      <section className="p-8 w-full lg:max-w-[100vw]">
        {itemData ? (
          <Grow in={true} timeout={800}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-800 w-full p-6">
                <h1 className="font-bold text-center text-4xl lg:text-5xl text-white">
                  {itemData?.title}
                </h1>
              </div>

              <article className="flex lg:flex-row flex-col p-6">
                <div className="w-full lg:w-1/3 p-4">
                  <ImagePreview image={[itemData?.image?.url]} />
                  <ImageGrid images={[itemData?.image?.url]} />
                </div>

                <section className="lg:w-2/3 lg:ml-8 flex flex-col">
                  <div className="flex flex-col lg:flex-row mb-6 bg-gray-200 rounded-lg p-2">
                    {buttons?.map((button, i) => (
                      button.name && (
                        <button
                          onClick={() => setActiveTab(button.name)}
                          key={i}
                          className={`flex items-center justify-center w-full px-4 py-3 text-sm lg:text-base font-medium transition duration-300 rounded-md ${
                            activeTab === button.name
                              ? "bg-red-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {button.icon}
                          <span className="ml-2">{button.name}</span>
                        </button>
                      )
                    ))}
                  </div>

                  <div className="flex-grow">
                    {renderContent()}
                  </div>

                  <Button
                    onClick={handleClick}
                    variant="contained"
                    className="mt-8 p-4 bg-green-500 hover:bg-green-600 transition duration-300 w-full text-lg font-bold"
                    startIcon={<FaShoppingCart className="text-2xl" />}
                  >
                    {isLoading ? <Loading h={'2vh'} w={'2vw'} isButtonLoader ={true}/> : `Book now for ${Number(itemData.price.replace(/[^0-9.-]+/g, "")) + 125}`}
                  </Button>
                </section>
              </article>
            </div>
          </Grow>
        ) : (
          <p className="text-center text-gray-600 text-xl">Data not found</p>
        )}
      </section>
    </main>
    </Layout>
  );
};

export default Detail;

