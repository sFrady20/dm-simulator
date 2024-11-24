"use client";

import { useApp } from "@/components/app/provider";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const EditorContactFields = () => {
  const app = useApp();

  const contactAvatarUrl = app((x) => x.contactAvatarUrl);
  const contactName = app((x) => x.contactName);
  const contactOS = app((x) => x.contactOS);

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <div className="flex flex-col gap-2">
        <ImageUpload
          shape={"circle"}
          url={contactAvatarUrl}
          onUrlChange={(url) =>
            app.setState((x) => {
              x.contactAvatarUrl = url;
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <Input
          value={contactName}
          onChange={(e) => app.setState({ contactName: e.target.value })}
        />
        <Tabs
          value={contactOS}
          onValueChange={(x) => app.setState({ contactOS: x as any })}
        >
          <TabsList className="w-full">
            <TabsTrigger value="iphone" className="flex-1">
              iPhone
            </TabsTrigger>
            <TabsTrigger value="android" className="flex-1">
              Android
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
