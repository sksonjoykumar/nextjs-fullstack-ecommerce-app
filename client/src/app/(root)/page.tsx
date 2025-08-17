import Banner from "@/components/Banner";
import Collections from "@/components/Collections";
import CustomerReview from "@/components/customer-review/CustomerReview";
import NewsletterHelp from "@/components/news-letter/NewsletterHelp";
import Products from "@/components/ProductsList";

export default function Home() {
  return (
    <>
      <div className="px-4 md:px-16">
        <Banner />
        <Collections />
        <Products />
        <CustomerReview />
        <NewsletterHelp />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
