import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extract public ID from Cloudinary URL
 * Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
 * Returns: sample
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const regex = /\/v\d+\/(.+)\.[^.]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImageFromCloudinary(url: string): Promise<boolean> {
  try {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) {
      console.error('Could not extract public ID from URL:', url);
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log('Successfully deleted image from Cloudinary:', publicId);
      return true;
    } else {
      console.error('Failed to delete image from Cloudinary:', result);
      return false;
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 */
export async function deleteMultipleImagesFromCloudinary(urls: string[]): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  // Process deletions in parallel
  const deletePromises = urls.map(async (url) => {
    const deleted = await deleteImageFromCloudinary(url);
    if (deleted) {
      success++;
    } else {
      failed++;
    }
  });

  await Promise.all(deletePromises);

  return { success, failed };
}
