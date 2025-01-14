import { addToLastSeenItems } from "@/actions/lastSeen";

const SaveInCookiesDiv = async ({ slug }: { slug: string }) => {
  await addToLastSeenItems({ slug });
  return <></>;
};

export default SaveInCookiesDiv;
