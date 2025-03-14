import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onError: (err) => toast.error(err.message),
    onSuccess: ({user}) => {
      toast.success("User updated");
      queryClient.setQueryData(["user"],user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { updateUser, isUpdating };
}
