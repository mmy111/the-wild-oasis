import toast from "react-hot-toast";
import { insertCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useInsertCabin() {
  const queryClient = useQueryClient();
  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (data) => insertCabins(data),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
  return { create, isCreating };
}
