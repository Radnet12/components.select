import {
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
  CSSProperties,
  ChangeEvent,
} from "react";
import { Controller, useFormContext } from "react-hook-form";

import { GrClose, GrDown } from "react-icons/gr";
import { useOnClickOutside } from "../hooks/use-on-click-outside";
import { SelectOption } from "./select.types";

interface MultipleSelect {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

interface SingleSelect {
  multiple?: false;
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
}

type SelectProps = {
  options: SelectOption[];
  style?: CSSProperties;
  isSearchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
} & (SingleSelect | MultipleSelect);

export const Select: FC<SelectProps> = (props) => {
  // **Props
  const {
    options,
    value,
    multiple,
    isSearchable = false,
    clearable = false,
    disabled = false,
    onChange,
    ...rest
  } = props;

  // **Local state
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // **Ref
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /* Change event */
  const handleChange = (option: SelectOption) => {
    if (disabled) return;

    setSearch("");

    /* For NON multi select */
    if (!multiple) {
      onChange(option);
      return;
    }

    /* For MULTI select */

    // If user has already chosen this option, remove it
    if (value?.some((entity) => entity.value === option.value)) {
      onChange(value.filter((entity) => entity.value !== option.value));
      return;
    }

    // Add new option
    onChange([...value, option]);
  };

  /* Search */
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    setSearch(e.target.value);
  };

  /* Close or open dropdown */
  const handleDropdown = (value: boolean) => () => {
    if (disabled) return;

    setIsOpen(value);
  };

  /* Get options accroding to the search value of it exists */
  const findOptions = (): SelectOption[] => {
    if (!isSearchable) {
      return options;
    }

    if (search.length === 0) {
      return options;
    }

    return options.filter((option) =>
      option?.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  /* Clear selected options */
  const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    e.stopPropagation();

    if (!multiple) {
      onChange(null);
      return;
    }

    onChange([]);
  };

  /* Generate classes for root select */
  const getSelectClasses = () => {
    let classes = "select";

    if (isOpen) {
      classes += " opened";
    }

    if (disabled) {
      classes = "select disabled";
    }

    return classes;
  };

  /* Generate classes for option */
  const getOptionClasses = (option: SelectOption, index: number) => {
    let classes = "select-option";

    /* "highlighted" class */
    if (highlightedIndex === index) {
      classes += " highlighted";
    }

    /* "SELECTED" class for NON multi select */
    if (!multiple && value?.value === option.value) {
      classes += " selected";
    }

    /* "SELECTED" class for MULTI select */
    if (multiple && value?.some((entity) => entity.value === option.value)) {
      classes += " selected";
    }

    if (option.disabled) {
      classes = "select-option disabled";
    }

    return classes;
  };

  /* Handle keyboard event while focus is on ROOT select */
  useEffect(() => {
    if (!selectRef.current) return;

    const handler = (e: KeyboardEvent) => {
      if (e.target !== selectRef.current) return;

      switch (e.code) {
        case "Tab": {
          if (!isOpen) break;

          setIsOpen(false);
          break;
        }
        case "Enter": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          handleChange(options[highlightedIndex]);
          break;
        }
        case "Space": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          handleChange(options[highlightedIndex]);
          break;
        }
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const prevOption = highlightedIndex - 1;

          if (prevOption < 0) {
            setHighlightedIndex(options.length - 1);
            break;
          }

          setHighlightedIndex(prevOption);

          break;
        }
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const nextOption = highlightedIndex + 1;

          if (nextOption + 1 > options.length) {
            setHighlightedIndex(0);
            break;
          }

          setHighlightedIndex(nextOption);

          break;
        }
        case "Backspace": {
          if ((multiple && value.length === 0) || (!multiple && !value)) {
            setIsOpen(false);
            break;
          }

          if (!multiple) {
            onChange(null);
            break;
          }

          onChange(value.slice(0, -1));
          break;
        }
        case "Escape": {
          setIsOpen(false);
          break;
        }
      }
    };
    selectRef.current?.addEventListener("keydown", handler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      selectRef.current?.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex, options, search]);

  /* Handle keyboard event while focus is on search INPUT */
  useEffect(() => {
    if (!searchRef.current || !isSearchable) return;

    const handler = (e: KeyboardEvent) => {
      if (e.target !== searchRef.current) return;

      switch (e.code) {
        case "Tab": {
          if (!isOpen) break;

          setIsOpen(false);
          break;
        }
        case "Enter": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const currentOptions = options.filter((option) =>
            option?.label.toLowerCase().includes(search.toLowerCase())
          );

          handleChange(currentOptions[highlightedIndex]);
          break;
        }
        case "Space": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const currentOptions = options.filter((option) =>
            option?.label.toLowerCase().includes(search.toLowerCase())
          );

          handleChange(currentOptions[highlightedIndex]);
          break;
        }
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const currentOptions = options.filter((option) =>
            option?.label.toLowerCase().includes(search.toLowerCase())
          );

          const prevOption = highlightedIndex - 1;

          if (prevOption < 0) {
            setHighlightedIndex(currentOptions.length - 1);
            break;
          }

          setHighlightedIndex(prevOption);

          break;
        }
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const currentOptions = options.filter((option) =>
            option?.label.toLowerCase().includes(search.toLowerCase())
          );

          const nextOption = highlightedIndex + 1;

          if (nextOption + 1 > currentOptions.length) {
            setHighlightedIndex(0);
            break;
          }

          setHighlightedIndex(nextOption);

          break;
        }
        case "Backspace": {
          if (search) break;

          if (!multiple) {
            onChange(null);
            break;
          }

          onChange(value.slice(0, -1));
          break;
        }
        case "Escape": {
          setIsOpen(false);
          break;
        }
      }
    };
    searchRef.current?.addEventListener("keydown", handler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      searchRef.current?.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex, options, search]);

  /* Set first highlighted element when dropdown is closed */
  useEffect(() => {
    if (!isOpen) return;

    setHighlightedIndex(0);
  }, [isOpen]);

  /* Open dropdown when search value is not empty */
  useEffect(() => {
    if (isOpen || !search) return;

    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* Close dropdown if click was outside the ROOT select */
  useOnClickOutside(selectRef, handleDropdown(false));

  return (
    <div
      ref={selectRef}
      className={getSelectClasses()}
      tabIndex={0}
      onClick={handleDropdown(!isOpen)}
      {...rest}
    >
      <div className="select-wrapper">
        <div
          className={multiple ? "select-value multiple" : "select-value single"}
        >
          {!multiple && !search && <span>{value?.label}</span>}
          {multiple && (
            <>
              {value?.map((option) => (
                <div key={option.value} className="select-value__option">
                  <span>{option.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChange(option);
                    }}
                    tabIndex={-1}
                    aria-hidden
                    aria-label={`Remove ${option.label}`}
                  >
                    <GrClose />
                  </button>
                </div>
              ))}
              {isSearchable && (
                <div className="select-search multiple">
                  <input
                    ref={searchRef}
                    value={search}
                    onInput={handleSearch}
                    style={{ width: `${search.length || 5}ch` }}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {!multiple && isSearchable && (
          <div className="select-search single">
            <input ref={searchRef} value={search} onInput={handleSearch} />
          </div>
        )}

        <div className="select-actions">
          {clearable && (
            <>
              <button
                className="select-clear"
                onClick={clearOptions}
                aria-label="Clear value"
              >
                <GrClose />
              </button>
              <div className="select-divider"></div>
            </>
          )}
          <div className="select-arrow">
            <GrDown />
          </div>
        </div>
      </div>
      <div className="select-dropdown">
        {findOptions().length !== 0 && (
          <ul className="select-options">
            {findOptions().map((option, index) => (
              <li
                key={option.value}
                className={getOptionClasses(option, index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(option);
                  setIsOpen(true);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {findOptions().length === 0 && <>EMPTY</>}
      </div>
    </div>
  );
};

type ControlledSelectProps = {
  name: string;
  required?: boolean;
} & Omit<SelectProps, "value" | "onChange">;

export const ControlledSelect: FC<ControlledSelectProps> = (props) => {
  // **Props
  const { name, required = false, multiple = false, ...rest } = props;

  // Form
  const formCtx = useFormContext();

  return (
    <Controller
      control={formCtx.control}
      name={name}
      rules={{
        required: {
          value: required,
          message: "Filed is required",
        },
      }}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <>
          <Select
            value={value}
            multiple={multiple}
            onChange={onChange}
            {...rest}
          />
          <div
            style={{
              fontSize: "12px",
              marginTop: "0.5rem",
              color: "red",
            }}
          >
            {errors[name]?.message as string}
          </div>
        </>
      )}
    />
  );
};
