import React from "react";
import { useFormContext } from "react-hook-form";
import { Select } from "../../ui";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormSelect: React.FC<Props> = ({
  className,
  name,
  label,
  required,
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const userDate = new Date();
  const userTime: string = `${userDate.getHours()}:${userDate.getMinutes()}`;
  const availableTime: string[] = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      <div className="flex justify-between relative">
        <div>
          <p className="font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </p>
          <p className="font-thin text-xs">Доставка ~ 1 час</p>
        </div>
        <Select onValueChange={(value) => setValue(name, value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите время" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Как можно скорее">Как можно скорее</SelectItem>
            {availableTime.map((i, index = new Date().getTime()) => {
              if (
                i.split(":")[0] >
                (Number(userTime.split(":")[0]) + 1).toString()
              ) {
                return (
                  <SelectItem value={i} key={index}>
                    {i}
                  </SelectItem>
                );
              }
            })}
            {/* <SelectItem value="09:00">09:00</SelectItem>
            <SelectItem value="12:00">12:00</SelectItem>
            <SelectItem value="15:00">15:00</SelectItem>
            <SelectItem value="18:00">18:00</SelectItem>
            <SelectItem value="21:00">21:00</SelectItem>
            <SelectItem value="00:00">00:00</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
