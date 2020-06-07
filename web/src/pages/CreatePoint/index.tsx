import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LeafletMouseEvent } from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FiArrowLeft } from "react-icons/fi";
import Dropzone from "../../components/Dropzone";
import endpoint from "../../services/api";
import { errorsMessage } from "../../helpers";
import { Item } from "../../interfaces";
import logo from "../../assets/logo.svg";
import "./styles.css";

const CreatePoint = () => {
  // em typescript, sempre que utilizar
  // array ou object precisa informar o tipo manualmente
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<String[]>([]);
  const [cities, setCities] = useState<String[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [image, setImage] = useState<File>();
  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    endpoint
      .getItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch(function (error) {
        errorsMessage(error.response);
      });
  }, []);

  useEffect(() => {
    endpoint.getUfs().then((response) => {
      const ufs = response.data.map((uf: any) => uf.sigla);
      setUfs(ufs);
    });
  }, []);

  useEffect(() => {
    if (selectedUf !== "") {
      endpoint.getCities(selectedUf).then((response) => {
        const cities = response.data.map((city: any) => city.nome);
        setCities(cities);
      });
    }
  }, [selectedUf]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const check = selectedItems.findIndex((item) => item === id);
    if (check >= 0) {
      const filterItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filterItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = position;
    const items = selectedItems;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));
    if (image) {
      data.append("image", image);
    }

    try {
      await endpoint.postCreatePoint(data);
      toast.success("Cadastro realizado com sucesso.");
      history.push("/");
    } catch (error) {
      errorsMessage(error);
    }
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" title="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do ponto de coleta</h1>

        <Dropzone onFileUpload={setImage} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            center={initialPosition}
            zoom={15}
            onClick={(event: LeafletMouseEvent) =>
              setPosition([event.latlng.lat, event.latlng.lng])
            }
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedUf(event.target.value)
                }
              >
                <option value="0">Selecione uma UF</option>
                {ufs.length > 0 &&
                  ufs.map((uf: any) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCity(event.target.value)
                }
              >
                <option value="0">Selecione uma cidade</option>
                {cities.length > 0 &&
                  cities.map((city: any) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.length > 0 &&
              items.map((item, key) => (
                <li
                  key={key}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? "selected" : ""}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    title={item.title}
                  />
                  <span>{item.title}</span>
                </li>
              ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
