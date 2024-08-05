import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AskedQuestions = () => {
  return (
    <section className="bg-neutral-100 w-[35rem] h-96 flex flex-col justify- items-start p-4 rounded-lg shadow-lg">
      <h2 className="text-3xl text-black font-bold ">
        Frequently Asked Question
      </h2>
      <p className="text-sm text-muted-foreground ">
        Find answers to common questions about our products and services.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="w-full">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all of our products. If
            you&apos;re not satisfied with your purchase, you can return it for
            a full refund.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Shipping times vary depending on your location, but we typically
            ship orders within 1-2 business days and deliver them within 5-7
            business days.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
