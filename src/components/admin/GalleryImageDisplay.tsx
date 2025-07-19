"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { removeGalleryImage } from "@/actions/admin/scheme.action";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GalleryImageDisplayProps {
  images: { id: string; url: string; type: string }[];
  isEditable?: boolean;
}

export function GalleryImageDisplay({ images, isEditable = false }: GalleryImageDisplayProps) {
  const [isPending, startTransition] = useTransition();
  const [removingImageId, setRemovingImageId] = useState<string | null>(null);

  const handleRemoveImage = (imageId: string) => {
    setRemovingImageId(imageId);
    startTransition(async () => {
      try {
        const result = await removeGalleryImage(imageId);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to remove image");
        console.error("Error removing gallery image:", error);
      } finally {
        setRemovingImageId(null);
      }
    });
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((galleryImage) => (
        <div key={galleryImage.id} className="relative h-48 w-full rounded-lg overflow-hidden group">
          <Image
            src={galleryImage.url}
            alt={`Gallery image ${galleryImage.id}`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          
          {isEditable && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    disabled={isPending}
                  >
                    {removingImageId === galleryImage.id ? (
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Gallery Image</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove this image from the gallery? This action cannot be undone and the image will be deleted from both the database and cloud storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRemoveImage(galleryImage.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Remove Image
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
