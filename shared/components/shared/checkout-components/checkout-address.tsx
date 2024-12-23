"use client";
import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { FormSelect } from "../form-components/form-select";

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormSelect
          label="К какому времени вам привезти заказ?"
          name="time"
          required
        />

        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
