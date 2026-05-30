import { Modal, Button } from '@/components/ui';

interface DeletePaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeletePaymentMethodModal({ isOpen, onClose, onConfirm }: DeletePaymentMethodModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm payment method removal" subtitle="Confirmation required">
      <p className="text-body-sm text-on-surface-variant mb-md">Are you sure you want to remove this saved payment method?</p>
      <div className="flex justify-end gap-sm">
        <Button variant="secondary" onClick={onClose}>CANCEL</Button>
        <Button variant="danger" onClick={onConfirm}>REMOVE</Button>
      </div>
    </Modal>
  );
}