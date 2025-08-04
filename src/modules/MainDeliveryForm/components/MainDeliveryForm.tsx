import React, { useMemo } from "react";
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
import { ResponsiveSelect } from "@/ui/ResponsiveSelect";
import type { DeliveryCalcRequest, Package, Point } from "@/types/delivery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFromCity,
  selectPackageType,
  selectToCity,
} from "../store/selectors";
import { mainDeliveryFormActions } from "../store/slice";

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
  const dispatch = useAppDispatch();
  const packageSizeForm = useAppSelector(selectPackageType);
  const fromCityForm = useAppSelector(selectFromCity);
  const toCityForm = useAppSelector(selectToCity);
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

  const departureCitiesOptions: CityOption[] = useMemo(() => {
    return cities.map((city) => ({
      value: city.name,
      label: (
        <div className={styles.deliveryForm__selectValue}>
          <IoLocationOutline />
          {city.name}
        </div>
      ),
      city,
    }));
  }, [cities]);

  const destinationCitiesOptions: CityOption[] = useMemo(() => {
    return cities.map((city) => ({
      value: city.name,
      label: (
        <div className={styles.deliveryForm__selectValue}>
          <CiLocationArrow1 />
          {city.name}
        </div>
      ),
      city,
    }));
  }, [cities]);

  const packageOptions: PackageOption[] = useMemo(() => {
    return packageSizes.map((size) => ({
      value: size.name,
      label: (
        <div className={styles.deliveryForm__selectValue}>
          <FaBox />
          {size.name}
        </div>
      ),
      size,
    }));
  }, [packageSizes]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fromCityForm || !toCityForm || !packageSizeForm) {
      toast.warning("Не все поля заполнены.");
      return;
    }
    const data: DeliveryCalcRequest = {
      package: {
        length: packageSizeForm.length,
        width: packageSizeForm.width,
        height: packageSizeForm.height,
        weight: packageSizeForm.weight,
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
      dispatch(mainDeliveryFormActions.setDeliveryForm(res));
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
                dispatch(
                  mainDeliveryFormActions.setFromCity(selectedOption.city),
                )
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
                dispatch(mainDeliveryFormActions.setToCity(selectedOption.city))
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
                dispatch(
                  mainDeliveryFormActions.setPackageType(selectedOption.size),
                )
              }
              value={
                packageOptions.find((o) => o.size === packageSizeForm) || null
              }
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
