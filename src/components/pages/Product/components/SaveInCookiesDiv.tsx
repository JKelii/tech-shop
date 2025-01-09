import { createLastSeenCookie } from "@/actions/lastSeen";
//TODO: Change name, use useEffect
const SaveInCookiesDiv = async ({ slug }: { slug: string }) => {
  await createLastSeenCookie({ slug });
  return <></>;
};

export default SaveInCookiesDiv;
