import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Modal } from '@/shared/ui/Modal/index.ts';
import { Input } from '@/shared/ui/Input/index.ts';
import { Button } from '@/shared/ui/Button/index.ts';
import { t } from '@/shared/lib/i18n/index.ts';
import { useProductsStore } from '../model/useProductsStore.ts';
import styles from './AddProductModal.module.scss';

const addProductSchema = z.object({
  title: z.string().min(1, t.addProduct.nameRequired),
  price: z
    .string()
    .min(1, t.addProduct.priceRequired)
    .refine((val) => Number(val) > 0, t.addProduct.pricePositive),
  brand: z.string().min(1, t.addProduct.vendorRequired),
  sku: z.string().min(1, t.addProduct.skuRequired),
});

type AddProductFormData = z.infer<typeof addProductSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const addLocalProduct = useProductsStore((s) => s.addLocalProduct);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { title: '', price: '', brand: '', sku: '' },
  });

  const onSubmit = (data: AddProductFormData) => {
    addLocalProduct({ ...data, price: Number(data.price) });
    toast.success(t.addProduct.successToast);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.addProduct.title}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t.addProduct.nameLabel}
          placeholder={t.addProduct.namePlaceholder}
          error={errors.title?.message}
          {...register('title')}
        />
        <Input
          label={t.addProduct.priceLabel}
          type="number"
          step="0.01"
          placeholder={t.addProduct.pricePlaceholder}
          error={errors.price?.message}
          {...register('price')}
        />
        <Input
          label={t.addProduct.vendorLabel}
          placeholder={t.addProduct.vendorPlaceholder}
          error={errors.brand?.message}
          {...register('brand')}
        />
        <Input
          label={t.addProduct.skuLabel}
          placeholder={t.addProduct.skuPlaceholder}
          error={errors.sku?.message}
          {...register('sku')}
        />
        <Button type="submit" size="lg">
          {t.addProduct.submit}
        </Button>
      </form>
    </Modal>
  );
}
