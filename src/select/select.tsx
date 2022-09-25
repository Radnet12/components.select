import {
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
  CSSProperties,
} from "react";

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
} & (SingleSelect | MultipleSelect);

export const Select: FC<SelectProps> = (props) => {
  // **Props
  const { options, value, multiple, onChange, ...rest } = props;

  // **Local state
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // **Ref
  const selectRef = useRef<HTMLDivElement>(null);

  /* Change event */
  const handleChange = (option: SelectOption) => {
    /* For NON multi select */
    if (!multiple) {
      onChange(option);
      return;
    }

    /* For MULTI select */

    // If user has already chosen this option, remove it
    if (value.some((entity) => entity.value === option.value)) {
      onChange(value.filter((entity) => entity.value !== option.value));
      return;
    }

    // Add new option
    onChange([...value, option]);
  };

  const handleDropdown = (value: boolean) => () => {
    setIsOpen(value);
  };

  /* Clear selected options */
  const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!multiple) {
      onChange(null);
      return;
    }

    onChange([]);
  };

  /* Generate classes for option */
  const getOptionClasses = (option: SelectOption, index: number) => {
    let className = "select-option";

    /* "highlighted" class */
    if (highlightedIndex === index) {
      className += " highlighted";
    }

    /* "SELECTED" class for NON multi select */
    if (!multiple && value === option) {
      className += " selected";
    }

    /* "SELECTED" class for MULTI select */
    if (multiple && value.some((entity) => entity.value === option.value)) {
      className += " selected";
    }

    if (option.disabled) {
      className = "select-option disabled";
    }

    return className;
  };

  useEffect(() => {
    if (!selectRef.current) return;

    const handler = (e: KeyboardEvent) => {
      if (e.target !== selectRef.current) {
        setIsOpen(false);

        return;
      }

      switch (e.code) {
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
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    if (!isOpen) return;

    setHighlightedIndex(0);
  }, [isOpen]);

  useOnClickOutside(selectRef, handleDropdown(false));

  return (
    <div
      ref={selectRef}
      className={isOpen ? "select opened" : "select"}
      tabIndex={0}
      onClick={handleDropdown(!isOpen)}
      {...rest}
    >
      <div className="select-wrapper">
        <div
          className={multiple ? "select-value multiple" : "select-value single"}
        >
          {!multiple && <span>{value?.label}</span>}
          {multiple &&
            value.map((option) => (
              <div>
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
        </div>
        <div className="select-actions">
          <button
            className="select-clear"
            onClick={clearOptions}
            aria-label="Clear value"
          >
            <GrClose />
          </button>
          <div className="select-divider"></div>
          <div className="select-arrow">
            <GrDown />
          </div>
        </div>
      </div>
      <div className="select-dropdown">
        {options.length !== 0 && (
          <ul className="select-options">
            {options.map((option, index) => (
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
        {options.length === 0 && <>EMPTY</>}
      </div>
    </div>
  );
};
