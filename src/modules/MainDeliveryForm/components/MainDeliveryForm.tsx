import React, { useState } from "react";
import styles from "./MainDeliveryForm.module.scss";
import { FaBox } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { postDeliveryCalc } from "../api/postDeliveryCalc";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { toast } from "react-toastify";
import { getDeliveryPoints } from "../api/getDeliveryPoints";
import { getDeliveryPackageTypes } from "../api/getDeliveryPackageTypes";
import { useQuery } from "@tanstack/react-query";
import { useDelivery } from "@/context/DeliveryContext";
import { ResponsiveSelect } from "@/ui/ResponsiveSelect";
import type { DeliveryCalcRequest, Package, Point } from "@/types/delivery";

interface CityOption {
  value: string;
  label: React.JSX.Element;
  city: Point;
}

interface PackageOption {
  value: string;
  label: React.JSX.Element;
  size: Package;
}

const MainDeliveryForm = () => {
  const [fromCityForm, setFromCityForm] = useState<Point | null>(null);
  const [toCityForm, setToCityForm] = useState<Point | null>(null);
  const [packageSize, setPackageSize] = useState<Package | null>(null);
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

  const departureCitiesOptions: CityOption[] = cities.map((city) => ({
    value: city.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <IoLocationOutline />
        {city.name}
      </div>
    ),
    city,
  }));

  const destinationCitiesOptions: CityOption[] = cities.map((city) => ({
    value: city.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <CiLocationArrow1 />
        {city.name}
      </div>
    ),
    city,
  }));

  const packageOptions: PackageOption[] = packageSizes.map((size) => ({
    value: size.name,
    label: (
      <div className={styles.deliveryForm__selectValue}>
        <FaBox />
        {size.name}
      </div>
    ),
    size,
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fromCityForm || !toCityForm || !packageSize) {
      toast.warning("Не все поля заполнены.");
      return;
    }
    const data: DeliveryCalcRequest = {
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
      setDeliveryForm(res ?? null);
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
            <ResponsiveSelect
              options={departureCitiesOptions}
              onChange={(selectedOption: CityOption) =>
                setFromCityForm(selectedOption.city)
              }
              value={
                departureCitiesOptions.find((o) => o.city === fromCityForm) ||
                null
              }
              placeholder="Выберите город"
            />
          </label>

          <label>
            <span>Город назначения:</span>
            <ResponsiveSelect
              options={destinationCitiesOptions}
              onChange={(selectedOption: CityOption) =>
                setToCityForm(selectedOption.city)
              }
              value={
                destinationCitiesOptions.find((o) => o.city === toCityForm) ||
                null
              }
              placeholder="Выберите город"
            />
          </label>

          <label>
            <span>Размер посылки:</span>
            <ResponsiveSelect
              options={packageOptions}
              onChange={(selectedOption: PackageOption) =>
                setPackageSize(selectedOption.size)
              }
              value={packageOptions.find((o) => o.size === packageSize) || null}
              placeholder="Выберите размер"
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
