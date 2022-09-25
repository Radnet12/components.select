import { useState } from "react";
import { Select, ControlledSelect } from "./select/select";
import { SelectOption } from "./select/select.types";

import { useForm, FormProvider } from "react-hook-form";

export const App = () => {
  const [singleSelect, setSingleSelect] = useState<SelectOption | null>(null);
  const [multipleSelect, setMultipleSelect] = useState<SelectOption[]>([]);
  const [disabledSelect, setDisabledSelect] = useState<SelectOption | null>(
    null
  );
  const [singleSearchableSelect, setSingleSearchableSelect] =
    useState<SelectOption | null>(null);
  const [multipleSearchableSelect, setMultipleSearchableSelect] = useState<
    SelectOption[]
  >([]);
  const [clearableSelect, setClearableSelect] = useState<SelectOption[]>([]);

  const methods = useForm({
    defaultValues: {
      select1: {
        value: "Asus",
        label: "Asus",
      },
      select3: [],
    },
  });

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className="app">
      <div className="select-item">
        <div className="select-item__title">Single Select</div>
        <Select
          value={singleSelect}
          onChange={(option) => setSingleSelect(option)}
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">Multiple Select</div>
        <Select
          value={multipleSelect}
          multiple
          onChange={(option) => setMultipleSelect(option)}
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">Disabled Select</div>
        <Select
          value={disabledSelect}
          disabled
          onChange={(option) => setDisabledSelect(option)}
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">Single searchable Select</div>
        <Select
          value={singleSearchableSelect}
          onChange={(option) => setSingleSearchableSelect(option)}
          isSearchable
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">Multiple searchable Select</div>
        <Select
          value={multipleSearchableSelect}
          multiple
          onChange={(option) => setMultipleSearchableSelect(option)}
          isSearchable
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">Clearable Select</div>
        <Select
          value={clearableSelect}
          multiple
          onChange={(option) => setClearableSelect(option)}
          isSearchable
          clearable
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
          ]}
        />
      </div>
      <div className="select-item">
        <div className="select-item__title">(React hook form)</div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <div className="select-item">
              <div className="select-item__title">ControlledSelect Select</div>
              <ControlledSelect
                name="select"
                isSearchable
                clearable
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
                ]}
              />
            </div>
            <div className="select-item">
              <div className="select-item__title">With default value</div>
              <ControlledSelect
                name="select1"
                isSearchable
                clearable
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
                ]}
              />
            </div>
            <div className="select-item">
              <div className="select-item__title">With validation</div>
              <ControlledSelect
                name="select2"
                isSearchable
                clearable
                required
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
                ]}
              />
            </div>
            <div className="select-item">
              <div className="select-item__title">Multiple select</div>
              <ControlledSelect
                name="select3"
                isSearchable
                clearable
                multiple
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
                ]}
              />
            </div>

            <button
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "1rem",
                borderRadius: "0.4rem",
                backgroundColor: "#ccc",
                textAlign: "center",
              }}
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
