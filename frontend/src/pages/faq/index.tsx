import "./index.scss";

import { Accordion } from "../../components/accordion";
import { AccordionItem } from "../../components/accordion/item";

export function FAQ() {
  return (
    <div className="page faq">
      <h1>🤔 FAQ</h1>
      <Accordion>
        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Our AI prompt marketplace is a platform that connects buyers and
              sellers of AI-generated prompts. Sellers can create and list their
              own prompts, while buyers can browse and purchase prompts for a
              variety of applications.
            </>
          }
          title={"What is your AI prompt marketplace?"}
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Our AI prompt marketplace offers a wide range of prompts for
              various applications, including creative writing, content
              creation, chatbots, and more. Whether you're looking for
              inspiration or a starting point for your next project, our
              marketplace has something for everyone.
            </>
          }
          title={
            "What kind of prompts can I find on your AI prompt marketplace?"
          }
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Our AI prompt marketplace is designed to be user-friendly and
              accessible for both buyers and sellers. Simply create an account,
              list your prompts (if you're a seller), or browse and purchase
              prompts (if you're a buyer).
            </>
          }
          title={"How do I use your AI prompt marketplace?"}
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Yes, our AI prompt marketplace is designed to be scalable and can
              accommodate a large number of users and prompts. Additionally, we
              have a team of experienced developers and data scientists working
              to optimize our platform and ensure the best possible user
              experience.
            </>
          }
          title={
            "Can your AI prompt marketplace handle large volumes of users and prompts?"
          }
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Our AI prompt marketplace uses advanced algorithms to ensure the
              quality and accuracy of all listed prompts. Additionally, we have
              a team of moderators who review and approve all new listings to
              ensure that they meet our standards and guidelines.
            </>
          }
          title={
            "How do you ensure the quality of prompts listed on your AI prompt marketplace?"
          }
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Yes, we offer a range of customization options that allow you to
              filter and search for prompts based on your specific needs. For
              example, you can search by topic, tone, style, and more to find
              prompts that match your brand or audience.
            </>
          }
          title={
            "Can I search for and filter prompts on your AI prompt marketplace?"
          }
        />

        <AccordionItem
          expanded={false}
          icon="diamond"
          body={
            <>
              Our AI prompt marketplace operates on a commission-based model,
              where we take a percentage of each sale made through our platform.
              The exact commission rate varies depending on a variety of
              factors, but we strive to keep our rates competitive and fair for
              both buyers and sellers.
            </>
          }
          title={"How does your AI prompt marketplace make money?"}
        />
      </Accordion>
    </div>
  );
}
