// src/components/CustomizeProducts.tsx (MUI-Version, wix-frei)
'use client';

import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import Add from '../components/Add';

// --- Typen (wix-frei, kompatibel zu deinen Dummy-Daten) ---
export type Variant = {
  _id: string;
  choices?: Record<string, string>; // z.B. { Color: "Rot", Size: "M" }
  stock?: { inStock?: boolean; quantity?: number };
};

export type ProductOptionChoice = {
  value?: string; // z.B. Hex für Color
  description?: string; // Anzeigename / Matching-String
};

export type ProductOption = {
  name?: string; // "Color", "Size", ...
  choices?: ProductOptionChoice[];
};

// --- Komponente ---
export default function CustomizeProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: Variant[];
  productOptions: ProductOption[];
}) {
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] = React.useState<
    Variant | undefined
  >();

  // Variante anhand der gewählten Optionen finden
  React.useEffect(() => {
    const variant = variants.find((v) => {
      const vc = v.choices;
      if (!vc) return false;
      return Object.entries(selectedOptions).every(([k, val]) => vc[k] === val);
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: Record<string, string>) =>
    variants.some((v) => {
      const vc = v.choices;
      if (!vc) return false;
      const match = Object.entries(choices).every(([k, val]) => vc[k] === val);
      return match && !!v.stock?.inStock && (v.stock?.quantity ?? 0) > 0;
    });

  return (
    <Stack spacing={3}>
      {productOptions.map((option) => {
        const optName = option.name ?? '';
        return (
          <Stack key={optName} spacing={1.5}>
            <Typography variant="subtitle1" fontWeight={600}>
              Choose a {optName}
            </Typography>

            {/* Choices */}
            <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
              {(option.choices ?? []).map((choice) => {
                const label = choice.description ?? '';
                const pendingSelection = {
                  ...selectedOptions,
                  [optName]: label,
                };
                const disabled = !isVariantInStock(pendingSelection);
                const selected = selectedOptions[optName] === label;

                // Sonderfall Color: runder Farbswatch
                if (optName.toLowerCase() === 'color') {
                  const color = choice.value || '#ccc';
                  return (
                    <Tooltip key={label || color} title={label || color}>
                      <Box
                        role="button"
                        aria-label={`${optName} ${label}`}
                        tabIndex={disabled ? -1 : 0}
                        onClick={
                          disabled
                            ? undefined
                            : () => handleOptionSelect(optName, label)
                        }
                        onKeyDown={(e) =>
                          !disabled &&
                          (e.key === 'Enter' || e.key === ' ') &&
                          handleOptionSelect(optName, label)
                        }
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: color,
                          border: '1px solid',
                          borderColor: 'divider',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          position: 'relative',
                          outline: selected ? '2px solid' : 'none',
                          outlineColor: selected
                            ? 'primary.main'
                            : 'transparent',
                        }}
                      >
                        {/* Disabled Strikethrough */}
                        {disabled && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              width: 36,
                              height: 2,
                              bgcolor: 'error.light',
                              transform: 'translate(-50%, -50%) rotate(45deg)',
                              pointerEvents: 'none',
                            }}
                          />
                        )}
                      </Box>
                    </Tooltip>
                  );
                }

                // Standard: Chip
                return (
                  <Chip
                    key={label}
                    label={label}
                    onClick={
                      disabled
                        ? undefined
                        : () => handleOptionSelect(optName, label)
                    }
                    clickable={!disabled}
                    variant={selected ? 'filled' : 'outlined'}
                    color={selected ? 'primary' : 'default'}
                    disabled={disabled}
                    sx={{
                      fontSize: 14,
                      ...(selected && { color: 'primary.contrastText' }),
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>
        );
      })}

      {/* Add to cart */}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id ?? '00000000-0000-0000-0000-000000000000'
        }
        stockNumber={selectedVariant?.stock?.quantity ?? 0}
      />
    </Stack>
  );
}
