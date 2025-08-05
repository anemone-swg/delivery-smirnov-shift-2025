import React, { JSX, useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import styles from "./ResponsiveSelect.module.scss";
import { IoClose } from "react-icons/io5";

/**
 * Props компонента ResponsiveSelect.
 *
 * @template T - Тип объекта опции.
 * @property {T[]} options - Массив объектов для отображения.
 * @property {T | null} value - Текущая выбранная опция.
 * @property {(selected: T) => void} onChange - Действие при выборе опции.
 * @property {string} placeholder - Текст плейсхолдера для селекта.
 */
export interface ResponsiveSelectProps<
  T extends { label: React.ReactNode; value: string },
> {
  options: T[];
  value: T | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: T) => void;
  placeholder: string;
}

/**
 * Компонент селекта с адаптивным отображением.
 * Отображает обычный селект на пк и модальное окно с опциями на мобильных устройствах.
 *
 * @component
 * @template T - Тип объекта опции, содержащий поля `label` и `value`.
 * @param {ResponsiveSelectProps<T>} props - Свойства компонента.
 * @returns {JSX.Element} Селект с адаптивным отображением.
 */
function ResponsiveSelect<T extends { label: React.ReactNode; value: string }>({
  options,
  onChange,
  placeholder,
  value,
}: ResponsiveSelectProps<T>): JSX.Element {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMobileSelect = useCallback(
    (selectedOption: T) => {
      onChange(selectedOption);
      setModalOpen(false);
    },
    [onChange],
  );

  return (
    <>
      {!isMobile && (
        <Select
          options={options}
          onChange={(newValue) => newValue && onChange(newValue)}
          value={value}
          placeholder={placeholder}
          classNamePrefix="customSelect"
          isSearchable={false}
          menuPlacement="top"
        />
      )}

      {isMobile && (
        <>
          <Select
            value={value}
            placeholder={placeholder}
            classNamePrefix="customSelect"
            isSearchable={false}
            menuIsOpen={false}
            openMenuOnClick={true}
            openMenuOnFocus={false}
            onMenuOpen={() => setModalOpen(true)}
            onChange={() => {}}
          />

          {isModalOpen && (
            <div className={styles.responsiveSelectModal}>
              <div className={styles.responsiveSelectModal__modalContent}>
                <div className={styles.responsiveSelectModal__modalHeader}>
                  <span>{placeholder}</span>
                  <button onClick={() => setModalOpen(false)}>
                    <IoClose size={24} />
                  </button>
                </div>

                <div className={styles.responsiveSelectModal__optionsList}>
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={styles.responsiveSelectModal__optionItem}
                      onClick={() => handleMobileSelect(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(ResponsiveSelect) as typeof ResponsiveSelect;
