import React, { FC, useRef } from "react";

interface IProps {
  placeholder: string;
  id: string;
  properties?: string | undefined;
  value: string | undefined;
  inputHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  resize?: boolean;
}

export const TextArea: FC<IProps> = ({
  readOnly = false,
  placeholder,
  id,
  properties,
  value,
  inputHandler,
  resize,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  if (resize && ref.current) {
    ref.current.style.width = ref.current.clientWidth / 1.9 + "px";
    ref.current.style.height = ref.current.scrollHeight + "px";
    ref.current.style.maxHeight = ref.current.scrollHeight + "px";
  } else if (ref.current) {
    ref.current.style.width = "100%";
    ref.current.style.height = "auto";
    ref.current.style.maxHeight = "auto";
  }

  return (
    <textarea
      className={`w-full min-h-[200px]  h-0 px-4 py-3 bg-white rounded-lg shadow border border-neutral-200 flex-col ${properties}`}
      name={id}
      id={id}
      ref={ref}
      onChange={inputHandler}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
};
