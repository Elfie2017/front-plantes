import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";

export interface Plante {
  id: string;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */
let listePlantes: Plante[] = [];
let checkedCateg: string[] = [];

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);
  useEffect(() => {
    fetch("http://localhost:8080/api/plantes")
      .then((reponse) => reponse.json())
      .then((plantsData) => {
        console.log(plantsData);
        console.log(plantsData.data);
        listePlantes = plantsData.data;
        setListPlantDisplayed(plantsData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    console.log("categories checked", mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */
    let resultFilteredPlants;
    checkedCateg = [...mesCategoriesChecked];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = listePlantes.filter((x) =>
        checkedCateg.includes(x.category)
      );
    } else {
      resultFilteredPlants = [...listePlantes];
    }

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div className="container-fluid custom-main d-flex flex-wrap">
        {listPlantDisplayed.map((plante, i) => (
          <div key={plante.id} className="card m-3" style={{ width: "18rem" }}>
            <img
              src={`http://localhost:8080/assets/${plante.url_picture}`}
              className="card-img-top"
              alt="icone plante"
            />
            <div className="card-body">
              <h5 className="card-title">{plante.name}</h5>
              <p className="card-text">{plante.category}</p>
              <p className="card-text">{plante.unitprice_ati} €</p>
              <p className="card-text">rating : {plante.rating}</p>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};
export default Home;
