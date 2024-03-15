import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getAccidents } from "@/store/store";
import { Accidents } from "@/types";

export const useGetAccidentById = () => {
  const router = useRouter();
  const { accidents } = useSelector(getAccidents);
  const [accidentSelected, setAccidentSelected] = useState<Accidents>();

  useEffect(() => {
    setAccidentSelected(accidents?.find((a: Accidents) => a.id === Number(router?.query?.id)));
  }, [router.query.id, accidents]);

  return accidentSelected;
};
