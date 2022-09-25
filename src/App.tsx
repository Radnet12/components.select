import { useState } from "react";
import { Select } from "./select/select";
import { SelectOption } from "./select/select.types";

export const App = () => {
  const [firstSelect, setFirstSelect] = useState<SelectOption | null>(null);
  const [secondSelect, setSecondSelect] = useState<SelectOption[]>([]);

  return (
    <div className="app">
      <Select
        value={firstSelect}
        onChange={(option) => setFirstSelect(option)}
        options={[
          {
            value: "Asus",
            label: "Asus",
          },
          {
            value: "long",
            label:
              "Very very very long value Very very very long value Very very very long value Very very very long value",
          },
          {
            value: "short",
            label: "Asu",
          },
          {
            value: 1,
            label: "54241234",
          },
          {
            value: "Asuss",
            label: "Asus",
          },
          {
            value: "longs",
            label: "Very very very ",
          },
          {
            value: "shorts",
            label: "Asu",
          },
          {
            value: 123,
            label: "54241234",
          },
          {
            value: "longs3",
            label: "Very very very ",
          },
          {
            value: "shorts3",
            label: "Asu",
          },
          {
            value: 1232,
            label: "54241234",
          },
          {
            value: "longs32",
            label: "Very very very ",
          },
          {
            value: "shortsfd",
            label: "Asu",
          },
          {
            value: 1255,
            label: "54241234",
          },
        ]}
        style={{
          marginBottom: "50px",
        }}
      />
      <Select
        multiple
        value={secondSelect}
        onChange={(option) => setSecondSelect(option)}
        options={[
          {
            value: "Asus",
            label: "Asus",
          },
          {
            value: "long",
            label:
              "Very very very long value Very very very long value Very very very long value Very very very long value",
          },
          {
            value: "short",
            label: "Asu",
          },
          {
            value: 1,
            label: "54241234",
          },
          // {
          //   value: "Asuss",
          //   label: "Asus",
          // },
          // {
          //   value: "longs",
          //   label: "Very very very ",
          // },
          // {
          //   value: "shorts",
          //   label: "Asu",
          // },
          // {
          //   value: 123,
          //   label: "54241234",
          // },
          // {
          //   value: "longs3",
          //   label: "Very very very ",
          // },
          // {
          //   value: "shorts3",
          //   label: "Asu",
          // },
          // {
          //   value: 1232,
          //   label: "54241234",
          // },
          // {
          //   value: "longs32",
          //   label: "Very very very ",
          // },
          // {
          //   value: "shortsfd",
          //   label: "Asu",
          // },
          // {
          //   value: 1255,
          //   label: "54241234",
          // },
        ]}
      />
    </div>
  );
};
