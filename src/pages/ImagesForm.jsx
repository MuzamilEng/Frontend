import React from 'react';
import { Upload, Image, Trash } from 'lucide-react';

const ImagesForm = ({
  handleThumbnailChange,
  handleThumbnailUpload,
  handleFilesChange,
  handleFilesUpload,
  imageURLs,
  thumbnailUrl,
  handleImageDelete, // Pass the delete function as a prop
}) => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label htmlFor="image" className="block font-medium mb-2 text-gray-700">
            Thumbnail Image
          </label>
          <div className="flex items-center">
            <label
              htmlFor="thumbnailImage"
              className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <Upload className="mr-2 h-5 w-5" />
              <span>Select Thumbnail</span>
            </label>
            <input
              type="file"
              name="thumbnailImage"
              accept="image/*"
              id="thumbnailImage"
              onChange={handleThumbnailChange}
              className="hidden"
            />
            <button
              onClick={handleThumbnailUpload}
              className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ml-4"
            >
              <span>Upload Thumbnail</span>
            </button>
          </div>
        </div>
        {thumbnailUrl && <img className="w-24 h-24 object-cover" src={thumbnailUrl} alt="Thumbnail Preview" />}
        <div>
          <label htmlFor="image" className="block font-medium mb-2 text-gray-700">
            Images
          </label>
          <div className="flex items-center">
            <label
              htmlFor="images"
              className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <Image className="mr-2 h-5 w-5" />
              <span>Select Images</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              id="images"
              onChange={handleFilesChange}
              className="hidden"
            />
            <button
              onClick={handleFilesUpload}
              className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ml-4"
            >
              <span>Upload Media</span>
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {imageURLs.map((imageUrl, index) => (
          <div
            key={index}
            className="relative rounded-md overflow-hidden shadow-sm"
          >
            <img
              src={imageUrl}
              alt={`Preview ${index + 1}`}
              className="w-full h-24 object-cover"
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesForm;
