import React, { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import styles from "./ResponsiveSelect.module.scss";
import { IoClose } from "react-icons/io5";

interface ResponsiveSelectProps<
  T extends { label: React.ReactNode; value: string },
> {
  options: T[];
  value: T | null;
  onChange: (selected: T) => void;
  placeholder: string;
}

function ResponsiveSelect<T extends { label: React.ReactNode; value: string }>({
  options,
  onChange,
  placeholder,
  value,
}: ResponsiveSelectProps<T>) {
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
