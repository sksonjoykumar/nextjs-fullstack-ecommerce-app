'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Delete from '../custom-ui/Delete';
import ImageUpload from '../custom-ui/ImageUpload';
import MultiSelect from '../custom-ui/MultiSelect';
import MultiTexts from '../custom-ui/MultiTexts';

// formSchema
const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

// interface
export interface CollectionType {
  _id: string;
  title: string;
}

// interface
interface ProductsFormProps {
  initialData?: ProductType | null;
}

const ProductsForm: React.FC<ProductsFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: '',
          description: '',
          media: [],
          category: '',
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        media: initialData.media,
        category: initialData.category,
        collections: initialData.collections,
        tags: initialData.tags,
        sizes: initialData.sizes,
        colors: initialData.colors,
        price: initialData.price,
        expense: initialData.expense,
      });
    }
  }, [initialData, form]);

  // router
  const router = useRouter();

  // Form onSubmit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);

      const url = initialData
        ? `/api/products/${initialData._id}`
        : '/api/products';

      // fetch Product data
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      // res.ok
      if (res.ok) {
        setLoading(false);
        toast.success(
          `Product ${initialData ? 'updated' : 'created'} successfully!`
        );
        // window.location.href = '/collections';
        router.push('/products');
      }
    } catch (error) {
      console.log('[Products_POST]', error);
      toast.error('Something went wrong! Please try again.');
    }
  };

  // getCollectionsFunc
  const getCollectionsFunc = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/collections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log('Collection_GET', error);
      toast.error('Something went wrong! Please try again.');
    }
  };

  // useEffect
  useEffect(() => {
    getCollectionsFunc();
  }, []);

  // loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-3 ">
      <div className="">
        {/* title */}
        {initialData ? (
          <div className=" flex items-center justify-between">
            <h2 className="bg-white sm:mt-0 text-2xl text-center sm:text-left  sm:text-3xl font-semibold border-b border-gray-300 pb-2 text-[#00ABF1] uppercase ">
              Edit
              <span className="text-[#0F925C]"> Products</span>
            </h2>
            {/*Delete Collection  */}
            <h2>
              <Delete item="Product" id={initialData._id} />
            </h2>
          </div>
        ) : (
          <h2 className="bg-white sm:mt-0 text-2xl text-center sm:text-left  sm:text-3xl font-semibold border-b border-gray-300 pb-2 text-[#00ABF1] uppercase ">
            Create
            <span className="text-[#0F925C]"> Products</span>
          </h2>
        )}
      </div>

      {/* form */}
      <div className="mt-6 max-w-5xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-lg ml-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="  text-gray-700 px-2  py-5 text-base inline-block  mt-1 focus:outline-none focus:border-none border-2 border-gray-300 shadow-none focus:border"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-lg ml-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className=" text-gray-700 px-2 h-40 w-full resize-none  py-2  mt-1 focus:outline-violet-200  border-2 border-gray-300 shadow-none text-base "
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* image */}
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <FormControl>
                    {/*ImageUpload Component  */}
                    <ImageUpload
                      value={field.value}
                      onChange={url => field.onChange([...field.value, url])}
                      onRemove={url =>
                        field.onChange(
                          field.value.filter((img: string) => img !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid  grid-cols-1  md:grid-cols-2 gap-2 md:gap-x-7 md:gap-y-3 items-center justify-between ">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="  text-gray-700 px-2  py-5 text-base inline-block  mt-1 focus:outline-none focus:border-none border-2 border-gray-300 shadow-none focus:border"
                        placeholder="Category"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Collections */}
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Collections
                    </FormLabel>
                    <FormControl>
                      {/* MultiSelect Component */}
                      <MultiSelect
                        collections={collections}
                        placeholder="Collections"
                        value={field.value}
                        onChange={_id => field.onChange([...field.value, _id])}
                        onRemove={remove =>
                          field.onChange([
                            ...field.value.filter(
                              collectionId => collectionId !== remove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Tags
                    </FormLabel>
                    <FormControl>
                      {/* MultiTexts Component */}
                      <MultiTexts
                        placeholder="Add Tags"
                        value={field.value}
                        onChange={tag => field.onChange([...field.value, tag])}
                        onRemove={tagRemove =>
                          field.onChange([
                            ...field.value.filter(tag => tag !== tagRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Colors */}
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Colors
                    </FormLabel>
                    <FormControl>
                      {/* MultiTexts Component */}
                      <MultiTexts
                        placeholder="Add Colors"
                        value={field.value}
                        onChange={color =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={colorRemove =>
                          field.onChange([
                            ...field.value.filter(tag => tag !== colorRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              {/* Sizes */}
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Sizes
                    </FormLabel>
                    <FormControl>
                      {/* MultiTexts Component */}
                      <MultiTexts
                        placeholder="Add Sizes"
                        value={field.value}
                        onChange={color =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={colorRemove =>
                          field.onChange([
                            ...field.value.filter(tag => tag !== colorRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Price ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="  text-gray-700 px-2  py-5 text-base inline-block  mt-1 focus:outline-none focus:border-none border-2 border-gray-300 shadow-none focus:border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              {/* Expense */}
              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-lg ml-1">
                      Expense ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="  text-gray-700 px-2  py-5 text-base inline-block  mt-1 focus:outline-none focus:border-none border-2 border-gray-300 shadow-none focus:border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Expense"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Button */}
            <Button
              className="bg-[#0F925C]  hover:bg-[#0f925cd3] transition-all duration-300 cursor-pointer text-white"
              type="submit"
            >
              Submit
            </Button>
            <Button
              onClick={() => router.push('/products')}
              className="bg-[#0F925C] ml-4 hover:bg-[#0f925cd2] transition-all duration-300 cursor-pointer text-white"
              type="button"
            >
              Discard
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductsForm;
