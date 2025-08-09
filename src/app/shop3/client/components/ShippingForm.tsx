'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShippingFormInputs, shippingFormSchema } from '../types';

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
    mode: 'onBlur',
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push('/shop3/cart?step=3', { scroll: false });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleShippingForm)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Name"
        id="name"
        size="small"
        variant="standard"
        placeholder="John Doe"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        autoComplete="name"
      />

      <TextField
        label="Email"
        id="email"
        size="small"
        variant="standard"
        placeholder="johndoe@gmail.com"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        type="email"
        autoComplete="email"
      />

      <TextField
        label="Phone"
        id="phone"
        size="small"
        variant="standard"
        placeholder="123456789"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        inputProps={{ inputMode: 'tel' }}
        autoComplete="tel"
      />

      <TextField
        label="Address"
        id="address"
        size="small"
        variant="standard"
        placeholder="123 Main St, Anytown"
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        autoComplete="street-address"
      />

      <TextField
        label="City"
        id="city"
        size="small"
        variant="standard"
        placeholder="New York"
        {...register('city')}
        error={!!errors.city}
        helperText={errors.city?.message}
        autoComplete="address-level2"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        endIcon={<ArrowRight size={14} />}
        sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default ShippingForm;
