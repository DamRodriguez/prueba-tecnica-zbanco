import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("pages");
  return (
    <p>
      {t("test.text")}
    </p>
  );
};

export default Home;