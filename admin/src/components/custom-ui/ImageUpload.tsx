'use client';

import { Trash, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Button } from '../ui/button';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    if (result?.event === 'success') {
      onChange(result.info.secure_url);
    }
  };
  console.log(value);

  return (
    <div>
      {value?.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-4 mt-2">
          {value.map(url => (
            <div
              key={url}
              className="relative w-[160px] xs:w-[220px] h-[120px] xs:h-[140px] border rounded-sm border-[#0f925c] overflow-hidden"
            >
              <div className="absolute top-2 right-2 z-10">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="bg-red-1 hover:bg-node text-white cursor-pointer"
                >
                  <Trash size={28} color="red" />
                </Button>
              </div>
              <Image
                src={url}
                alt="uploaded image"
                className="object-cover rounded-md p-2 hover:scale-105 transition-all duration-200"
                fill
              />
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget
        uploadPreset="web-apps"
        options={{ multiple: true }}
        // onUpload={handleUpload}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => typeof open === 'function' && open()}
            className="bg-[#0078FF] hover:bg-[#0077ffe6] transition-all duration-200 cursor-pointer text-white"
          >
            <Upload />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
