import clsx from "clsx";
import { motion } from "framer-motion";
import type { ParseKeys } from "i18next";
import { useTranslation } from "react-i18next";

type FormErrorProps = {
  errorMessage?: ParseKeys;
  className?: string;
};

const FormErrorMessage = ({ errorMessage, className }: FormErrorProps) => {
  const { t } = useTranslation();

  if (!errorMessage) return null;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={clsx("text-red-error text-xs sm:text-sm", className)}
    >
      {t(errorMessage)}
    </motion.span>
  );
};

export default FormErrorMessage;