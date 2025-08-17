"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Loading from "@/app/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Delete from "../custom-ui/Delete";
import ImageUpload from "../custom-ui/ImageUpload";

// formSchema
const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000).trim(),
  image: z.string(),
});

// interface
interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  // form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  // router
  const router = useRouter();
  // Form onSubmit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);

      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // res.ok
      if (res.ok) {
        setLoading(false);
        toast.success(
          `Collection ${initialData ? "updated" : "created"} successfully!`,
        );
        // window.location.href = '/collections';
        router.push("/collections");
      }
    } catch (error) {
      console.log("[Collection_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  // loading
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mt-3">
      <div className="">
        {/* title */}
        {initialData ? (
          <div className="flex items-center justify-between">
            <h2 className="border-b border-gray-300 bg-white pb-2 text-center text-2xl font-semibold text-[#00ABF1] uppercase sm:mt-0 sm:text-left sm:text-3xl">
              Edit
              <span className="text-[#0F925C]"> Collections</span>
            </h2>
            {/*Delete Collection  */}
            <h2>
              <Delete item="Collection" id={initialData._id} />
            </h2>
          </div>
        ) : (
          <h2 className="border-b border-gray-300 bg-white pb-2 text-center text-2xl font-semibold text-[#00ABF1] uppercase sm:mt-0 sm:text-left sm:text-3xl">
            Create
            <span className="text-[#0F925C]"> Collections</span>
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
                  <FormLabel className="ml-1 text-lg text-gray-700">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 inline-block border-2 border-gray-300 px-2 py-5 text-base text-gray-700 shadow-none focus:border-none focus:outline-none"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1 text-lg text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="focus:outline-gary-300 mt-1 h-40 w-full resize-none border-2 border-gray-300 px-2 py-2 text-base text-gray-700 shadow-none"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    {/*ImageUpload Component  */}
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button */}
            <Button
              className="cursor-pointer bg-[#0F925C] text-white transition-all duration-300 hover:bg-[#0f925cd3]"
              type="submit"
            >
              Submit
            </Button>
            <Button
              onClick={() => router.push("/collections")}
              className="ml-4 cursor-pointer bg-[#0F925C] text-white transition-all duration-300 hover:bg-[#0f925cd2]"
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

export default CollectionForm;
