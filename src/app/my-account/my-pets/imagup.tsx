import { useState, useEffect, ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  primage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, primage }) => {
  const [preview, setPreview] = useState<string | null>(null);
      const cloudurl = "https://static-vision.s3.ap-south-1.amazonaws.com/"

  // Update preview when primage changes
  useEffect(() => {
    if (primage) {
      setPreview(cloudurl+primage);
    }
  }, [primage]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageChange(file);
    }
  };

  const handleImageRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <div className="relative group w-32 h-32">
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleImageRemove}
              style={{ color: "white" }}
              className="size-12 text-white-500 hover:cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      ) : (
        <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer">
          <span className="text-gray-500">Upload Image</span>
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
