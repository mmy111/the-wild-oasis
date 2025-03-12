import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Setting updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  return { update, isUpdating };
}
