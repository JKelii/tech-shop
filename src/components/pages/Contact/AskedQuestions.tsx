import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const AskedQuestions = () => {
  return (
    <div className="bg-white border w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg flex-col">
      <Card className=" w-[22rem] md:w-[35rem] h-96 flex justify-start shadow-lg rounded-lg p-2 flex-col">
        <h2 className="text-md md:text-3xl text-black font-bold ">
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
