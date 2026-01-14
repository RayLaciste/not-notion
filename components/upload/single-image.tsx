"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { ProgressCircle } from "./progress-circle";
import { formatFileSize } from "./uploader-provider";

import { Spinner } from "../spinner";

const DROPZONE_VARIANTS = {
  base: "relative rounded-md p-4 flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border-2 border-dashed border-muted-foreground transition-colors duration-200 ease-in-out",
  image: "border-0 p-0 min-h-0 min-w-0 relative bg-muted shadow-md",
  active: "border-primary",
  disabled:
    "bg-muted/50 border-muted-foreground/50 cursor-default pointer-events-none",
  accept: "border-primary bg-primary/10",
  reject: "border-destructive bg-destructive/10",
};

export interface SingleImageDropzoneProps {
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
  value?: File;
  onChange?: (file?: File) => void | Promise<void>;
  dropzoneOptions?: Omit<
    DropzoneOptions,
    "disabled" | "onDrop" | "maxFiles" | "multiple"
  >;
}

const SingleImageDropzone = React.forwardRef<
  HTMLInputElement,
  SingleImageDropzoneProps
>(
  (
    {
      dropzoneOptions,
      width,
      height,
      className,
      disabled,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [file, setFile] = React.useState<File | undefined>(value);
    const [error, setError] = React.useState<string>();
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    // Create temporary URL for image preview
    const tempUrl = React.useMemo(
      () => (file ? URL.createObjectURL(file) : null),
      [file],
    );

    React.useEffect(() => {
      return () => {
        if (tempUrl) URL.revokeObjectURL(tempUrl);
      };
    }, [tempUrl]);

    const displayUrl = tempUrl;

    const isDisabled = !!disabled || uploading;

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled: isDisabled,
      onDrop: (acceptedFiles, rejectedFiles) => {
        setError(undefined);

        if (rejectedFiles.length > 0) {
          const err = rejectedFiles[0]?.errors[0];
          const messages: Record<string, string> = {
            "file-too-large": `The file is too large. Max size is ${formatFileSize(dropzoneOptions?.maxSize ?? 0)}.`,
            "file-invalid-type": "Invalid file type.",
            "too-many-files": "You can only upload one file.",
            default: "The file is not supported.",
          };
          setError(err?.code ? messages[err.code] : messages.default);
          return;
        }

        if (acceptedFiles.length > 0) {
          const newFile = acceptedFiles[0];
          setFile(newFile);
          onChange?.(newFile);
        }
      },
      ...dropzoneOptions,
    });

    const dropZoneClassName = React.useMemo(
      () =>
        cn(
          DROPZONE_VARIANTS.base,
          isFocused && DROPZONE_VARIANTS.active,
          isDisabled && DROPZONE_VARIANTS.disabled,
          displayUrl && DROPZONE_VARIANTS.image,
          isDragReject && DROPZONE_VARIANTS.reject,
          isDragAccept && DROPZONE_VARIANTS.accept,
          className,
        ),
      [
        isFocused,
        isDisabled,
        displayUrl,
        isDragAccept,
        isDragReject,
        className,
      ],
    );

    return (
      <div className="flex flex-col items-center relative">
        {disabled && (
          <div className="flex items-center justify-center absolute inset-y-0 h-full w-full bg-background/80 z-50">
            <Spinner size="large" />
          </div>
        )}
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: { width, height },
          })}
        >
          <input ref={ref} {...getInputProps()} {...props} />

          {displayUrl ? (
            <img
              className="h-full w-full rounded-md object-cover"
              src={displayUrl}
              alt={file?.name ?? "uploaded image"}
            />
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground",
                isDisabled && "opacity-50",
              )}
            >
              <UploadCloudIcon className="mb-1 h-7 w-7" />
              <div className="font-medium">
                drag & drop an image or click to select
              </div>
              {dropzoneOptions?.maxSize && (
                <div className="text-xs">
                  Max size: {formatFileSize(dropzoneOptions.maxSize)}
                </div>
              )}
            </div>
          )}

          {displayUrl && uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/70">
              <ProgressCircle progress={progress} />
            </div>
          )}

          {displayUrl && !disabled && (
            <button
              type="button"
              className="group pointer-events-auto absolute right-1 top-1 z-10 transform rounded-full border border-muted-foreground bg-background p-1 shadow-md transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setFile(undefined);
                setError(undefined);
                setProgress(0);
                setUploading(false);
                onChange?.(undefined);
              }}
            >
              <Trash2Icon className="block h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {error && (
          <div className="mt-2 flex items-center text-xs text-destructive">
            <AlertCircleIcon className="mr-1 h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  },
);
SingleImageDropzone.displayName = "SingleImageDropzone";

export { SingleImageDropzone };
