import {useMutation} from "@tanstack/react-query"
import { createNewCategory } from "../services/createNewCategory"
import { newCategoryProps } from "../interfaces"

export const useCreateCategory = () => {
  const category = useMutation({
    mutationKey: ["NewCategory"],
    mutationFn: ({categNameRus, categNameUzb, categDescRus, categDescUzb, categSlug, categStatus}: newCategoryProps) =>  createNewCategory({categNameRus, categNameUzb, categDescRus, categDescUzb, categSlug, categStatus})
  })

  return category;
}
