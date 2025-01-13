type MappedCategories = {
  name: string;
}[];

type ResponseGetCategories = string[];

export const mapperCategories = (
  categories: MappedCategories,
): ResponseGetCategories | undefined => {
  if (!categories || categories.length === 0) return undefined;

  return categories.map((item) => item.name);
};
