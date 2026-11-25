import React, { useEffect, useRef, useState } from 'react'
import { UploadCloud } from "lucide-react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";

type UploadResult = { url: string; publicId: string } | null;

const UploadWidget = ({ value = null, onChange, disabled = false }: {
    value?: { url: string; publicId: string } | null;
    onChange?: (result: UploadResult) => void;
    disabled?: boolean;
}) => {
    const widgetRef = useRef<CloudinaryWidget | null>(null);
    const onChangeRef = useRef(onChange);
    const [preview, setPreview] = useState<{ url: string; publicId: string } | null>(value);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | null = null;
        const init = () => {
            if (cancelled || widgetRef.current) return;
            if (!window.cloudinary) {
                timer = setTimeout(init, 200);
                return;
            }
            widgetRef.current = window.cloudinary.createUploadWidget(
                {
                    cloudName: CLOUDINARY_CLOUD_NAME,
                    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                },
                (error: unknown, result: any) => {
                    if (error) return;
                    if (result?.event === 'success') {
                        const info = result.info;
                        onChangeRef.current?.({ url: info.secure_url, publicId: info.public_id });
                    }
                }
            );
        };
        init();
        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
            (widgetRef.current as any)?.destroy?.();
            widgetRef.current = null;
        };
    }, []);

    const openWidget = () => {
        if (!disabled) widgetRef.current?.open();
    };

    const removeImage = () => {
        setPreview(null);
        onChangeRef.current?.(null);
    };

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="upload-preview relative">
                    <img src={preview.url} alt="Upload file" className="h-40 w-full rounded-md object-cover" />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div
                    className="upload-dropzone flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-input p-6 text-center transition-colors hover:bg-accent"
                    role="button"
                    tabIndex={0}
                    onClick={openWidget}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            openWidget();
                        }
                    }}
                >
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">Click to upload photo</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadWidget;
