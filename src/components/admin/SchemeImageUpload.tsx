"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemeImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  maxImages?: number;
}

export function SchemeImageUpload({
  value = [],
  onChange,
  disabled = false,
  maxImages = 5,
}: SchemeImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = (result: any) => {
    if (result.event === "success") {
      // Add the new image URL to the existing array
      const newUrl = result.info.secure_url;
      console.log("Image uploaded successfully:", newUrl);
      
      // Create new array with the new URL
      const updatedUrls = [...value, newUrl];
      console.log("Updated URLs array:", updatedUrls);
      onChange(updatedUrls);
      
      // Force cleanup of any modal overlays
      setTimeout(() => {
        const overlays = document.querySelectorAll('.cloudinary-widget-overlay, .cld-overlay, [data-testid="cloudinary-overlay"]');
        overlays.forEach(overlay => overlay.remove());
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 100);
    }
    
    // Only set uploading to false when upload is complete or aborted
    if (result.event === "success" || result.event === "abort") {
      setIsUploading(false);
    }
  };

  const onRemove = (url: string) => {
    const filteredUrls = value.filter((current) => current !== url);
    onChange(filteredUrls);
  };

  const canUploadMore = value.length < maxImages;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {value.map((url) => (
          <div
            key={url}
            className="relative group bg-muted rounded-lg border border-border overflow-hidden"
          >
            <img
              src={url}
              alt="Scheme image"
              className="h-20 w-20 object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              disabled={disabled}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm z-10"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {canUploadMore && (
        <CldUploadWidget
          uploadPreset="wai_ps"
          options={{
            maxFiles: maxImages - value.length,
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000, // 5MB
            folder: "wai_ps_schemes",
            sources: ["local", "camera"],
            multiple: true,
            cropping: false,
            showAdvancedOptions: false,
            showCompletedButton: true,
            autoMinimize: true,
            showSkipCropButton: false,
            showUploadMoreButton: false,
            theme: "minimal",
          }}
          signatureEndpoint="/api/cloudinary/sign"
          onSuccess={onUpload}
          onError={(error) => {
            console.error("Upload error:", error);
            setIsUploading(false);
            
            // Force cleanup on error too
            setTimeout(() => {
              const overlays = document.querySelectorAll('.cloudinary-widget-overlay, .cld-overlay, [data-testid="cloudinary-overlay"]');
              overlays.forEach(overlay => overlay.remove());
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
            }, 100);
          }}
          onOpen={() => setIsUploading(true)}
          onClose={() => {
            setIsUploading(false);
            
            // Force cleanup when widget closes
            setTimeout(() => {
              const overlays = document.querySelectorAll('.cloudinary-widget-overlay, .cld-overlay, [data-testid="cloudinary-overlay"]');
              overlays.forEach(overlay => overlay.remove());
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
            }, 100);
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!disabled && !isUploading) {
                  open();
                }
              }}
              disabled={disabled || isUploading}
              className={cn(
                "w-full h-20 border-dashed border-2 flex flex-col items-center justify-center gap-2",
                "hover:bg-muted/50 transition-colors"
              )}
            >
              {isUploading ? (
                <>
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="text-sm">
                    Upload Images ({value.length}/{maxImages})
                  </span>
                </>
              )}
            </Button>
          )}
        </CldUploadWidget>
      )}

      {value.length >= maxImages && (
        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            Maximum {maxImages} images reached
          </Badge>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p>• Supported formats: JPG, JPEG, PNG, WebP</p>
        <p>• Maximum file size: 5MB per image</p>
        <p>• Maximum {maxImages} images allowed</p>
      </div>
    </div>
  );
}
