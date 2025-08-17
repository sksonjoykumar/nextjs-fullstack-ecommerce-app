import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { bannerImg } from '@/lib/banner';
import Image from 'next/image';

// Banner Component
const Banner = () => {
  return (
    <>
      <div className="mt-4 md:mt-6">
        <Carousel className="">
          <CarouselContent>
            {bannerImg.map((item, index) => (
              <CarouselItem key={index} className="h-auto lg:h-[550px] ">
                <Image
                  src={item.img}
                  alt="banner"
                  className="w-full  h-full rounded-md "
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" hidden md:flex justify-center items-center bg-[#0F925C] hover:bg-[#0f925ccf] text-white hover:text-white cursor-pointer" />
          <CarouselNext className="hidden md:flex justify-center items-center bg-[#0F925C] hover:bg-[#0f925ccf] text-white hover:text-white cursor-pointer" />
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
