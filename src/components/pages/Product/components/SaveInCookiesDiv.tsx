import { addToLastSeenItems } from "@/actions/lastSeen";

//TODO: FIX LAST SEEN ITEMS
const SaveInCookiesDiv = async ({ slug }: { slug: string }) => {
  await addToLastSeenItems({ slug });
  return <></>;
};

export default SaveInCookiesDiv;
