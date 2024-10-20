import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const AskedQuestions = () => {
  return (
    <div className="bg-gray-200 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg flex-col">
      <Card className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg p-2 flex-col">
        <h2 className="text-md md:text-3xl text-black font-bold ">
          Frequently Asked Question
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="text-sm">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              Yes. It adheres to the WAI-ARIA design pattern.
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
