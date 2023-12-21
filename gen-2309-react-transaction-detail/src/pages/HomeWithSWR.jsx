import axios from "axios";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import ProductCard from "../components/Product";

function HomeWithSWR() {
  const navigate = useNavigate();

  const onClickCard = (id) => {
    navigate(`/detail/${id}`);
  };

  const getKopi = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/kopi",
    getKopi,
    {
      onSuccess: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
    }
  );
  if (error) return alert(JSON.stringify(error));

  return (
    <section className="flex flex-col justify-center">
      <div className="relative bg-center bg-no-repeat text-hijau h-[200px] px-20">
        <img
          src="https://fore.coffee/wp-content/uploads/2023/10/Frame-48096650-1024x202.png"
          alt="Background"
          className="w-full h-full object-cover rounded-lg "
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[50px] font-extrabold">MENU</h1>
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <BeatLoader color="#38BDF8" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5">
            {data.map(({ id, name, description, image, price, releaseOn }) => (
              <ProductCard
                key={id}
                name={name}
                description={description}
                price={price}
                image={image}
                releaseOn={new Date(releaseOn)}
                onClick={() => onClickCard(id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeWithSWR;
