import React from "react";
export const CheckBoxGenerateMenu = React.forwardRef(
  ({ indeterminate, row, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    const [checked, setChecked] = React.useState(row.original.isInMenu);

    React.useEffect(() => {
      if (row.original.isInMenu) {
        row.toggleRowSelected(checked);
      }
    }, [checked, row]);

    const handleCheckboxChange = () => {
      row.toggleRowSelected(!checked);
      setChecked(!checked);
    };

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          onChange={handleCheckboxChange}
          checked={checked}
          {...rest}
        />
      </>
    );
  }
);
