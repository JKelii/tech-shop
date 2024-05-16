import MainOffer from "@/components/main-offer";
import SingleOffers from "@/components/single-offers";

const Home = async () => {
  return (
    <main className="w-full flex justify-center items-center flex-col gap-12 mt-4 mb-8">
      <div className="bg-mainBg h-[25rem] w-full rounded-lg mt-2 flex flex-col justify-center items-center">
        <div className="bg-gray-200 h-80 w-[80%] rounded-lg ">
          <MainOffer />
        </div>
      </div>
      <SingleOffers />
    </main>
  );
};

export default Home;

// const client = new ApolloClient({
//   uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw3ni7c5000001w6fhaa4kdw/master",
//   cache: new InMemoryCache(),
// });

// const GET_PRODUCTS = gql`
//   query Assets {
//     assets {
//       id
//       publishedAt
//       fileName
//       url
//       updatedAt
//       size
//       productImages {
//         price
//       }
//     }
//   }
// `;

// export async function getProducts() {
//   const { data } = await client.query({
//     query: GET_PRODUCTS,
//   });
//   console.log(data);
//   return data.assets;
// }

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function loadData() {
//       const fetchedData = await getProducts();
//       setProducts(fetchedData);
//     }
//     loadData();
//   }, []);
