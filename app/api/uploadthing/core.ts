

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


export const OurFileRouter = {
  imageUploader: f({ 
    image: { maxFileSize: "2MB", maxFileCount: 1 }
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete", file.url, metadata);
      return { url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;