import { useQuery } from "@tanstack/react-query"
import { getCategoryDetails } from "../services/getCategoryDetails"
   
export const useGetCategoryDetails = (category_id:string) => {
  const query = useQuery({
    queryKey: ["CategoryDetails", category_id],
    queryFn: () => getCategoryDetails(category_id),
    enabled: !!category_id
  })

  return query;
}
