import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";

export default function SelectPopOver({
  id,
  required = false,
  status,
  ArraySelect,
  handleSelect = undefined,
  label,
}: {
  required?: boolean;

  id: number | undefined;
  status: string | number|undefined;
  ArraySelect: string[] |number[];
  handleSelect?: any;
  label?: string;
}) {
  const [selected, setSelected] = useState(status);

  useEffect(() => {
    setSelected(status);
  }, [id, status]);

  return (
    <div className=" w-full">
      {label ? (
        <label className="label w-fit">
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </label>
      ) : (
        ""
      )}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mb-1">
          <Listbox.Button className="relative input input-bordered cursor-pointer w-full  rounded-lg bg-white  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span
              className={`block truncate ${selected == "checkout" ? "text-neutral" : selected == "cancelled" ? "text-warning" : selected == "pending" ? "text-primary" : selected == "checkin" ? "text-success" : selected == "booked" ? "text-error" : selected == "completed" ? "text-info" : ""}`}
            >
              {selected}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {ArraySelect.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 text-center cursor-pointer ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  onClick={() => {
                      handleSelect(person, id, setSelected);
                      setSelected(status);

                  }}
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}