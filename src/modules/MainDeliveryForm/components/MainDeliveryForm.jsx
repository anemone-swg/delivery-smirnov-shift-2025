import React, { useState } from "react";
import styles from "./MainDeliveryForm.module.scss";
import Select from "react-select";
import { FaBox } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { postDeliveryCalc } from "../api/postDeliveryCalc.js";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { toast } from "react-toastify";
import { getDeliveryPoints } from "../api/getDeliveryPoints.js";
import { getDeliveryPackageTypes } from "../api/getDeliveryPackageTypes.js";
import { useQuery } from "@tanstack/react-query";
import { useDelivery } from "@/context/DeliveryContext.jsx";

const MainDeliveryForm = () => {
  const [fromCityForm, setFromCityForm] = useState("");
  const [toCityForm, setToCityForm] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const { setPackageType, setDeliveryForm, setToCity, setFromCity } =
    useDelivery();
  const navigate = useNavigate();

  const { data: cities = [] } = useQuery({
    queryKey: ["deliveryPoints"],
    queryFn: getDeliveryPoints,
    staleTime: 100_000,
  });

  const { data: packageSizes = [] } = useQuery({
    queryKey: ["packageTypes"],
    queryFn: getDeliveryPackageTypes,
    staleTime: 100_000,
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fromCityForm || !toCityForm || !packageSize) {
      toast.warning("Не все поля заполнены.");
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
        latitude: fromCityForm.latitude,
        longitude: fromCityForm.longitude,
      },
      receiverPoint: {
        latitude: toCityForm.latitude,
        longitude: toCityForm.longitude,
      },
    };

    postDeliveryCalc(data).then((res) => {
      setToCity(toCityForm);
      setFromCity(fromCityForm);
      setPackageType(packageSize);
      setDeliveryForm(res);
      navigate(PATHS.CHECKOUT_METHOD);
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
              onChange={(selectedOption) =>
                setFromCityForm(selectedOption.city)
              }
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
              onChange={(selectedOption) => setToCityForm(selectedOption.city)}
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
          <button type="submit" className="blueActionBtn">
            Рассчитать
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainDeliveryForm;
