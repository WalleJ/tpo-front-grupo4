import { useForm } from "react-hook-form";
import { Modal, Input, Button } from "@/components/ui";
function getCardBrand(cardNumber) {
  if (cardNumber.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return "Mastercard";
  if (/^3[47]/.test(cardNumber)) return "Amex";
  return "Card";
}
function AddCardModal({ isOpen, onClose, onAdd }) {
  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      saveInProfile: true
    }
  });
  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };
  const formatExpiry = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
    if (digitsOnly.length <= 2) return digitsOnly;
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  };
  const submit = handleSubmit((data) => {
    const cleanedNumber = data.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanedNumber)) {
      return;
    }
    const last4 = cleanedNumber.slice(-4);
    const [month, year] = data.expiry.split("/");
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
  return <Modal isOpen={isOpen} onClose={onClose} title="Add New Card" subtitle="Payment method" maxWidthClass="max-w-md"><form className="space-y-sm" onSubmit={submit}><Input
    label="Cardholder Name"
    placeholder="Name as shown on card"
    autoComplete="cc-name"
    {...register("cardholderName", { required: true, minLength: 2 })}
  /><Input
    label="Card Number"
    placeholder="•••• •••• •••• ••••"
    autoComplete="cc-number"
    inputMode="numeric"
    maxLength={19}
    className="font-mono tracking-widest"
    {...register("cardNumber", { required: true, pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/ })}
    onChange={(event) => {
      setValue("cardNumber", formatCardNumber(event.target.value), { shouldValidate: true });
    }}
  /><div className="grid grid-cols-2 gap-sm"><Input
    label="Expiry (MM/YY)"
    placeholder="MM/YY"
    autoComplete="cc-exp"
    inputMode="numeric"
    maxLength={5}
    className="font-mono"
    {...register("expiry", { required: true, pattern: /^\d{2}\/\d{2}$/ })}
    onChange={(event) => {
      setValue("expiry", formatExpiry(event.target.value), { shouldValidate: true });
    }}
  /><Input
    label="CVV"
    placeholder="•••"
    autoComplete="cc-csc"
    inputMode="numeric"
    maxLength={4}
    className="font-mono"
    {...register("cvv", { required: true, pattern: /^\d{3,4}$/ })}
  /></div><label className="flex items-center gap-sm cursor-pointer pt-xs"><input type="checkbox" className="rounded border-outline-variant accent-primary w-4 h-4" {...register("saveInProfile")} /><span className="font-body-sm text-body-sm text-on-surface">Save as new payment method in my profile</span></label>{Object.keys(errors).length > 0 ? <p className="text-error text-body-sm">Please enter valid card information.</p> : null}<div className="flex justify-end gap-sm pt-xs"><Button variant="secondary" type="button" onClick={onClose}>CANCEL</Button><Button type="submit">ADD CARD</Button></div></form></Modal>;
}
export {
  AddCardModal
};
