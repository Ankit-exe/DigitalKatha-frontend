import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const { theme } = useSelector((state: any) => state.theme);

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">
        {children}
      </div>
    </div>
  );
};
