interface Props {
    isChecked: boolean;
    name: string;
    onChange: any;
    id: string
  }


const RadioButtonFalse = ({isChecked, name, onChange, id}: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="radio"
            name={name}
            value="Tidak"
            id={id}
            className="sr-only"
            onChange={onChange}
          />
          <div
            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`text-primary opacity-0 ${
                isChecked && '!opacity-100'
              }`}
            >
              <svg
                className="h-3.5 w-3.5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        Tidak
      </label>
    </div>
  );
};

export default RadioButtonFalse;
