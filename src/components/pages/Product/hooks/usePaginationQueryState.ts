import { parseAsInteger, useQueryState } from "nuqs";

export const usePaginationQueryState = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return { page, setPage };
};
