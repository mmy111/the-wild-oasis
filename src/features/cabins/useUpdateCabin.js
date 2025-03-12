import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: ({ editId, data }) => updateCabins(editId, data),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Cabin updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
  return { update, isUpdating };
}
