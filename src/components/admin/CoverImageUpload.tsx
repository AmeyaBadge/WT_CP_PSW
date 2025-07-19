"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function CoverImageUpload({
  value,
  onChange,
  disabled = false,
}: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = (result: any) => {
    if (result.event === "success") {
      console.log("Cover image uploaded successfully:", result.info.secure_url);
      onChange(result.info.secure_url);
      setIsUploading(false);
      
      // Force cleanup of any modal overlays
      setTimeout(() => {
        const overlays = document.querySelectorAll('.cloudinary-widget-overlay, .cld-overlay, [data-testid="cloudinary-overlay"]');
        overlays.forEach(overlay => overlay.remove());
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 100);
    }
  };

  const onRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative group bg-muted rounded-lg border border-border overflow-hidden w-32 h-32">
          <img
            src={value}
            alt="Cover image"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm z-10"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="w-32 h-32">
          <CldUploadWidget
            uploadPreset="wai_ps"
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
              maxFileSize: 5000000, // 5MB
              folder: "wai_ps_schemes",
              sources: ["local", "camera"],
              multiple: false,
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
              console.error("Cover image upload error:", error);
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
                  "w-full h-full border-dashed border-2 flex flex-col items-center justify-center gap-2",
                  "hover:bg-muted/50 transition-colors"
                )}
              >
                {isUploading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Uploading...</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-6 w-6" />
                      <Upload className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center">
                      Upload Cover Image
                    </span>
                  </>
                )}
              </Button>
            )}
          </CldUploadWidget>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p>• Cover image for the scheme</p>
        <p>• Supported formats: JPG, JPEG, PNG, WebP</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Recommended size: 800x600px</p>
      </div>
    </div>
  );
}
