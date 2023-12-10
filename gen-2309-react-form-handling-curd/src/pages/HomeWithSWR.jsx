import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import useSWR, { mutate } from "swr";
import ProductCard from "../components/Product";

function HomeWithSWR() {
  const navigate = useNavigate();
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const onClickCard = (id) => {
    navigate(`/detail/${id}`);
  };

  const getKopi = (url) => axios.get(url).then((response) => response.data);

  const { data, error } = useSWR("http://localhost:3000/kopi", getKopi);

  const onClickPostData = () => {
    const newProductData = {
      name: "Iced Classic Latte",
      description:
        "Perpaduan rasa espresso premium dengan saus krim spesial Fore",
      price: 24000,
      img: "https://static.fore.coffee/product/classiclatteiced173.jpg",
      thumbnail1:
        "https://static.fore.coffee/product/Buttercream%20Choco%20Mint.jpg",
      thumbnail2: "https://static.fore.coffee/product/Buttercream%20latte.jpg",
      thumbnail3:
        "https://static.fore.coffee/product/buttercream%20tiramissu.jpg",
      thumbnail4: "https://static.fore.coffee/product/light%20buttercream.jpg",
      releaseOn: "2023-10-01",
    };

    setIsLoadingPost(true);

    axios
      .post("http://localhost:3000/kopi", newProductData)
      .then(() => {
        // Refresh data after posting
        mutate("http://localhost:3000/kopi");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      })
      .finally(() => {
        setIsLoadingPost(false);
      });
  };

  if (error) return alert(JSON.stringify(error));

  return (
    <section className="flex flex-col justify-center">
      <div className="flex justify-center gap-4">
        <button
          className="rounded-lg bg-sky-400 p-2 text-white self-center"
          onClick={onClickPostData}
          disabled={isLoadingPost}
        >
          {isLoadingPost ? "Posting..." : "Post Data"}
        </button>
      </div>

      <div className="flex justify-center">
        {data ? (
          <div className="grid grid-cols-2 md:grid-cols-5">
            {data.map(({ id, name, description, img, price, releaseOn }) => (
              <ProductCard
                key={id}
                name={name}
                description={description}
                price={price}
                image={img}
                releaseOn={new Date(releaseOn)}
                onClick={() => onClickCard(id)}
              />
            ))}
          </div>
        ) : (
          <BeatLoader color="#38BDF8" />
        )}
      </div>
    </section>
  );
}

export default HomeWithSWR;
