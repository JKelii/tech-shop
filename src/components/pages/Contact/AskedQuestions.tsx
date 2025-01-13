import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const AskedQuestions = () => {
  return (
    <div className="flex h-96 w-[22rem] flex-col justify-center rounded-lg border bg-white shadow-lg md:w-[35rem]">
      <Card className=" flex h-96 w-[22rem] flex-col justify-start rounded-lg p-2 shadow-lg md:w-[35rem]">
        <h2 className="text-md font-bold text-black md:text-3xl ">
          Frequently Asked Question
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="text-sm">
              Do you provide international shipping?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              Yes, we offer international shipping to many countries. Shipping
              rates and delivery times vary based on location and will be
              calculated at checkout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              We offer a 30-day return policy on all of our products. If
              you&apos;re not satisfied with your purchase, you can return it
              for a full refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">
              How long does shipping take?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              Shipping times vary depending on your location, but we typically
              ship orders within 1-2 business days and deliver them within 5-7
              business days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};
