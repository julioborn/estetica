"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Store, Upload } from "lucide-react";
import { uploadBusinessCoverPhoto } from "@/app/business/actions";
import { Button } from "@/components/ui/button";

export function CoverPhotoForm({
  businessId,
  coverUrl,
}: {
  businessId: string;
  coverUrl: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("businessId", businessId);
      formData.set("file", file);
      const result = await uploadBusinessCoverPhoto(formData);
      if (result.error) setError(result.error);
    });
  };

  const shown = preview ?? coverUrl;

  return (
    <form ref={formRef} className="flex items-center gap-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary">
        {shown ? (
          <Image src={shown} alt="" fill className="object-cover" sizes="96px" />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <Store className="size-8" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          nativeButton={false}
          render={<label htmlFor="cover-photo-input" />}
          disabled={isPending}
        >
          <Upload className="size-4" />
          {isPending ? "Subiendo…" : "Cambiar foto"}
        </Button>
        <input
          id="cover-photo-input"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          disabled={isPending}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </form>
  );
}
