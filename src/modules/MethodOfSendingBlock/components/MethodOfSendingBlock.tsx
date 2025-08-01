import styles from "./MethodOfSendingBlock.module.scss";
import { DeliveryTypeCard } from "@/components/DeliveryTypeCard";
import { ProgressBar } from "@/ui/ProgressBar";
import { IoClose } from "react-icons/io5";
import PATHS from "@/constants/paths";
import { FormTitle } from "@/components/FormTitle";
import { useAppSelector } from "@/store/hooks";
import { selectDeliveryForm } from "@/modules/MainDeliveryForm";

const MethodOfSendingBlock = () => {
  const deliveryForm = useAppSelector(selectDeliveryForm);

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title="Способ отправки" icon={IoClose} route={PATHS.MAIN} />
      <ProgressBar step={1} />
      <div className={styles.checkoutBlock__options}>
        {deliveryForm?.map((option) => (
          <DeliveryTypeCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

export default MethodOfSendingBlock;
