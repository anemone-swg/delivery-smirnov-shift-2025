import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import styles from "./ResponsiveSelect.module.scss";
import { IoClose } from "react-icons/io5";

const ResponsiveSelect = ({ options, onChange, placeholder, value }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMobileSelect = (selectedOption) => {
    onChange(selectedOption);
    setModalOpen(false);
  };

  return (
    <>
      {!isMobile && (
        <Select
          options={options}
          onChange={onChange}
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
                  {options.map((option, index) => (
                    <div
                      key={index}
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
};

export default ResponsiveSelect;
