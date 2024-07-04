import { useRouter } from "next/router";
import { getCurrentAccident } from "./fetch/get-accidents";
import { useQuery } from "@tanstack/react-query";

export const useGetAccidentById = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const { data: accidentSelected } = useQuery({
    queryKey: ["accidentSelected"],
    queryFn: () => getCurrentAccident(`${id}`),
    retry: 1,
    enabled: !!id,
  });

  return accidentSelected;
};
