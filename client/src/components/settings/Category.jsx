"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteCategory,
  editCategory,
  getCategories,
  postCategories,
} from "@/lib/apiService";
import {
  DotsThree,
  PencilSimpleLine,
  TrashSimple,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, [categories]);

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) return;

    try {
      await deleteCategory(selectedCategoryId);
      toast.success("Category deleted successfully");
      setOpenDialog(false);
      await getCategories();
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const handleEditCategory = async () => {
    try {
      await editCategory(editCategoryId, categoryName);
      toast.success("Category updated successfully");
      setIsEditing(false);
      setCategoryName("");

      await getCategories();
    } catch (error) {
      toast.error(error.message || "Failed to edit category");
    }
  };

  const handleStartEditing = (category) => {
    setCategoryName(category.name);
    setIsEditing(true);
    setEditCategoryId(category.id);
  };

  const handleAddCategory = async () => {
    if (!categoryName) {
      toast.warning("You must enter a category name");
      return;
    }

    try {
      const response = await postCategories(categoryName);

      if (!response.ok) {
        throw new Error(response.message || "Failed to add category");
      }

      toast.success("Category added successfully");
      setCategoryName("");
      await getCategories();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while adding the category"
      );
    }
  };

  const confirmDeleteCategory = (id) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 w-full">
        <Label>Category Name</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {isEditing ? (
            <Button variant="outline" onClick={handleEditCategory}>
              Update Category
            </Button>
          ) : (
            <Button variant="outline" onClick={handleAddCategory}>
              Add Category
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h5>Categories</h5>
        <div className="flex flex-wrap gap-2 w-full">
          {categories.length === 0 ? (
            <p className="text-neutral-500">No categories added</p>
          ) : (
            categories.map((category) => (
              <div
                className="bg-primary/10 py-1 pl-5 pr-1 rounded-xl flex items-center gap-4 text-primary border border-primary"
                key={category.id}
              >
                <span>{category.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-none hover:bg-primary/10 rounded-lg"
                    >
                      <DotsThree className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleStartEditing(category)}
                      className="gap-2 text-neutral-500"
                    >
                      <PencilSimpleLine className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => confirmDeleteCategory(category.id)}
                      className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50"
                    >
                      <TrashSimple className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Delete Category</DialogTitle>
            <Separator />
            <DialogDescription className="pt-2">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Category;
