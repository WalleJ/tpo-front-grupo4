import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components/ui';
import type { PaymentMethod } from '@/types/marketplace.types';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (method: PaymentMethod, saveInProfile: boolean) => void;
}

interface FormValues {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  saveInProfile: boolean;
}

function getCardBrand(cardNumber: string) {
  if (/^4/.test(cardNumber)) return 'Visa';
  if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return 'Mastercard';
  if (/^3[47]/.test(cardNumber)) return 'Amex';
  return 'Card';
}

export function AddCardModal({ isOpen, onClose, onAdd }: AddCardModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      saveInProfile: true
    }
  });

  const submit = handleSubmit((data) => {
    const cleanedNumber = data.cardNumber.replace(/\s/g, '');
    if (!/^\d{13,16}$/.test(cleanedNumber)) {
      return;
    }
    const last4 = cleanedNumber.slice(-4);
    const [month, year] = data.expiry.split('/');
    const brand = getCardBrand(cleanedNumber);
    onAdd(
      {
        label: `${brand} ending in ${last4}`,
        detail: `Expires ${month}/20${year}`
      },
      data.saveInProfile
    );
    reset();
    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Card" subtitle="Payment method">
      <form className="space-y-sm" onSubmit={submit}>
        <Input label="Cardholder Name" {...register('cardholderName', { required: true, minLength: 2 })} />
        <Input label="Card Number" {...register('cardNumber', { required: true, pattern: /^[\d\s]{13,19}$/ })} />
        <div className="grid grid-cols-2 gap-sm">
          <Input label="Expiry (MM/YY)" {...register('expiry', { required: true, pattern: /^\d{2}\/\d{2}$/ })} />
          <Input label="CVV" {...register('cvv', { required: true, pattern: /^\d{3,4}$/ })} />
        </div>
        <label className="flex items-center gap-sm cursor-pointer pt-xs">
          <input type="checkbox" className="rounded border-outline-variant accent-primary w-4 h-4" {...register('saveInProfile')} />
          <span className="font-body-sm text-body-sm text-on-surface">Save as new payment method in my profile</span>
        </label>
        {Object.keys(errors).length > 0 ? <p className="text-error text-body-sm">Please enter valid card information.</p> : null}
        <div className="flex justify-end gap-sm pt-xs">
          <Button variant="secondary" type="button" onClick={onClose}>CANCEL</Button>
          <Button type="submit">ADD CARD</Button>
        </div>
      </form>
    </Modal>
  );
}