import React, { createContext, FC, JSX, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Тип темы приложения.
 * - `"light"` - светлая тема
 * - `"dark"` - темная тема
 */
type Theme = "light" | "dark";

/**
 * Тип данных, передаваемых через контекст темы.
 *
 * @property {Theme} theme - Тип темы приложения
 * @property {()=>void} toggleTheme - Функция переключения темы
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Пропсы компонента ThemeProvider.
 * @property {ReactNode} children - Дочерние элементы, которые получат доступ к теме
 */
export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Компонент-провайдер темы.
 * Оборачивает приложение и предоставляет доступ к текущей теме и функции её переключения.
 *
 * @param {ThemeProviderProps} props - Свойства компонента
 * @returns {JSX.Element} Провайдер контекста темы
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Хук для доступа к текущей теме и функции её переключения.
 * Должен вызываться внутри компонента, обёрнутого в ThemeProvider.
 *
 * @throws {Error} Если хук используется вне ThemeProvider
 * @returns {ThemeContextType} Объект с темой и функцией переключения
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
