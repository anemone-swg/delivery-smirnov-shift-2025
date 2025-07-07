import React, { useEffect, useState } from "react";
import styles from "./MainDeliveryForm.module.scss";
import BlueActionBtn from "@/ui/BlueActionBtn.jsx";
import Select from "react-select";
import { FaBox } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { fetchCitiesPoints } from "@/modules/MainDeliveryForm/api/fetchCitiesPoints.js";
import { fetchPackageSizes } from "@/modules/MainDeliveryForm/api/fetchPackageSizes.js";
import { useNavigate } from "react-router-dom";
import { calcDelivery } from "@/modules/MainDeliveryForm/api/calcDelivery.js";

const MainDeliveryForm = () => {
  const [cities, setCities] = useState([]);
  const [packageSizes, setPackageSizes] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCitiesPoints().then(setCities);
    fetchPackageSizes().then(setPackageSizes);
  }, []);

  const departureCitiesOptions = cities.map((city) => ({
    value: city.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <IoLocationOutline />
        {city.name}
      </div>
    ),
    city,
  }));

  const destinationCitiesOptions = cities.map((city) => ({
    value: city.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <CiLocationArrow1 />
        {city.name}
      </div>
    ),
    city,
  }));

  const packageOptions = packageSizes.map((size) => ({
    value: size.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <FaBox />
        {size.name}
      </div>
    ),
    size,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !packageSize) {
      console.warn("Не все поля заполнены");
      return;
    }
    const data = {
      package: {
        length: packageSize.length,
        width: packageSize.width,
        height: packageSize.height,
        weight: packageSize.weight,
      },
      senderPoint: {
        latitude: fromCity.latitude,
        longitude: fromCity.longitude,
      },
      receiverPoint: {
        latitude: toCity.latitude,
        longitude: toCity.longitude,
      },
    };

    calcDelivery(data).then((res) => {
      navigate("/delivery-result", { state: { result: res } });
    });
  };

  return (
    <div className={styles.deliveryForm}>
      <h2 className={styles.deliveryForm__formTitle}>Рассчитать доставку</h2>
      <form className={styles.deliveryForm__form} onSubmit={handleSubmit}>
        <div className={styles.deliveryForm__selects}>
          <label>
            <span>Город отправки:</span>
            <Select
              options={departureCitiesOptions}
              onChange={(selectedOption) => setFromCity(selectedOption.city)}
              placeholder="Выберите город"
              classNamePrefix="customSelect"
              isSearchable={false}
              menuPlacement="top"
            />
          </label>

          <label>
            <span>Город назначения:</span>
            <Select
              options={destinationCitiesOptions}
              onChange={(selectedOption) => setToCity(selectedOption.city)}
              placeholder="Выберите город"
              classNamePrefix="customSelect"
              isSearchable={false}
              menuPlacement="top"
            />
          </label>

          <label>
            <span>Размер посылки:</span>
            <Select
              options={packageOptions}
              onChange={(selectedOption) => setPackageSize(selectedOption.size)}
              placeholder="Выберите размер"
              classNamePrefix="customSelect"
              isSearchable={false}
              menuPlacement="top"
            />
          </label>
        </div>

        <div className={styles.deliveryForm__formBtn}>
          <BlueActionBtn type="submit">Рассчитать</BlueActionBtn>
        </div>
      </form>
    </div>
  );
};

export default MainDeliveryForm;
