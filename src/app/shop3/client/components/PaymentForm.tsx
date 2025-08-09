'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PaymentFormInputs, paymentFormSchema } from '../types';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
    mode: 'onBlur',
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    // TODO: Payment-Flow auslösen (Stripe/Klarna/etc.)
    // router.push("/order/confirmation");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handlePaymentForm)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Name on card"
        id="cardHolder"
        size="small"
        variant="standard"
        placeholder="John Doe"
        {...register('cardHolder')}
        error={!!errors.cardHolder}
        helperText={errors.cardHolder?.message}
        autoComplete="cc-name"
      />

      <TextField
        label="Card Number"
        id="cardNumber"
        size="small"
        variant="standard"
        placeholder="123456789123"
        {...register('cardNumber')}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
        inputProps={{ inputMode: 'numeric', autoComplete: 'cc-number' }}
      />

      <TextField
        label="Expiration Date"
        id="expirationDate"
        size="small"
        variant="standard"
        placeholder="01/32"
        {...register('expirationDate')}
        error={!!errors.expirationDate}
        helperText={errors.expirationDate?.message}
        inputProps={{ autoComplete: 'cc-exp' }}
      />

      <TextField
        label="CVV"
        id="cvv"
        size="small"
        variant="standard"
        placeholder="123"
        {...register('cvv')}
        error={!!errors.cvv}
        helperText={errors.cvv?.message}
        inputProps={{
          inputMode: 'numeric',
          autoComplete: 'cc-csc',
          maxLength: 4,
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
        <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
          <Image src="/shop3/klarna.png" alt="klarna" width={50} height={25} />
        </Box>
        <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
          <Image src="/shop3/cards.png" alt="cards" width={50} height={25} />
        </Box>
        <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
          <Image src="/shop3/stripe.png" alt="stripe" width={50} height={25} />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        endIcon={<ShoppingCart size={14} />}
        sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default PaymentForm;
