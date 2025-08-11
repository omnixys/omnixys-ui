"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Box, FormHelperText, Typography } from "@mui/material";

/** Re-export, wie gehabt */
export const Form = FormProvider;

/* ------------------------------------------------------------------ */
/* Interne Kontexte (keine Abhängigkeit zu RHF nötig in den Subviews) */
/* ------------------------------------------------------------------ */

type ItemCtx = { id: string };
const ItemContext = React.createContext<ItemCtx | null>(null);

type FieldCtx = {
  name?: string;
  error?: { message?: string } | undefined;
  // A11y-IDs
  formItemId?: string;
  formDescriptionId?: string;
  formMessageId?: string;
};
const FieldContext = React.createContext<FieldCtx | null>(null);

/* ------------------------------------- */
/* <FormField> – dünne RHF Controller-Hülle */
/* Stellt FieldContext bereit (name, error, IDs) */
/* ------------------------------------- */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  render,
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  // Wir erzeugen die Item-IDs erst in <FormItem/>.
  // Deshalb wrappen wir das ursprüngliche render und liefern FieldContext inline.
  return (
    <Controller
      {...props}
      render={(fieldRenderProps) => {
        // Error-Objekt aus RHF
        const error = fieldRenderProps.fieldState?.error as
          | { message?: string }
          | undefined;

        // Der eigentliche Inhalt (dein UI) kommt von außen:
        const node = render(fieldRenderProps);

        // Wir setzen hier nur den "name" und "error".
        // Die konkreten IDs (formItemId etc.) ergänzt später <FormItem/>.
        return (
          <FieldContext.Provider value={{ name: props.name as string, error }}>
            {node}
          </FieldContext.Provider>
        );
      }}
    />
  );
};

/* ---------------------- */
/* <FormItem> – Container */
/* Erzeugt stabile IDs    */
/* ---------------------- */
export function FormItem({
  sx,
  ...props
}: React.ComponentProps<typeof Box>) {
  const id = React.useId();

  // IDs für A11y. Werden außerdem ins FieldContext gemerged.
  const formItemId = `${id}-form-item`;
  const formDescriptionId = `${id}-form-item-description`;
  const formMessageId = `${id}-form-item-message`;

  // Vorhandenen FieldContext lesen (falls <FormField> außen existiert)
  const parentField = React.useContext(FieldContext);

  const mergedFieldValue: FieldCtx = {
    ...(parentField ?? {}),
    formItemId,
    formDescriptionId,
    formMessageId,
  };

  return (
    <ItemContext.Provider value={{ id }}>
      <FieldContext.Provider value={mergedFieldValue}>
        <Box
          data-slot="form-item"
          sx={{ display: "grid", gap: 1 }}
          {...props}
        />
      </FieldContext.Provider>
    </ItemContext.Provider>
  );
}

/* ----------------------- */
/* <FormLabel> – echtes <label> */
/* Nutzt MUI Typography         */
/* ----------------------- */
export function FormLabel({
  sx,
  ...props
}: React.ComponentProps<typeof Typography>) {
  const field = React.useContext(FieldContext);

  return (
    <Typography
      data-slot="form-label"
      component="label"
      htmlFor={field?.formItemId ?? props.htmlFor}
      variant="body2"
      sx={{
        fontWeight: 600,
        color: field?.error ? "error.main" : "text.primary",
        ...sx,
      }}
      {...props}
    />
  );
}

/* ------------------------------------------------------- */
/* <FormControl> – injiziert A11y-Props in GENAU ein Child */
/* Fällt zurück auf no-op, falls kein Feldkontext vorhanden */
/* ------------------------------------------------------- */
export function FormControl({ children }: { children: React.ReactElement }) {
  const field = React.useContext(FieldContext);

  if (!React.isValidElement(children) || !field) {
    return children;
  }

  const { formItemId, formDescriptionId, formMessageId, error } = field;

  const ariaDescribedBy = error
    ? [formDescriptionId, formMessageId].filter(Boolean).join(" ")
    : formDescriptionId;

  return React.cloneElement(children, {
    id: formItemId,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": !!error,
  });
}

/* -------------------------------------------- */
/* <FormDescription> – Hinweistext unter dem Feld */
/* -------------------------------------------- */
export function FormDescription({
  sx,
  children,
  ...props
}: React.ComponentProps<typeof FormHelperText>) {
  const field = React.useContext(FieldContext);

  return (
    <FormHelperText
      data-slot="form-description"
      id={field?.formDescriptionId}
      sx={{ m: 0, color: "text.secondary", fontSize: 12, ...sx }}
      {...props}
    >
      {children}
    </FormHelperText>
  );
}

/* -------------------------------- */
/* <FormMessage> – Fehlermeldung    */
/* -------------------------------- */
export function FormMessage({
  sx,
  children,
  ...props
}: React.ComponentProps<typeof FormHelperText>) {
  const field = React.useContext(FieldContext);
  const body =
    field?.error?.message != null && field?.error?.message !== ""
      ? String(field.error.message)
      : children;

  if (!body) return null;

  return (
    <FormHelperText
      data-slot="form-message"
      id={field?.formMessageId}
      sx={{ m: 0, color: "error.main", fontSize: 12, ...sx }}
      {...props}
    >
      {body}
    </FormHelperText>
  );
}
