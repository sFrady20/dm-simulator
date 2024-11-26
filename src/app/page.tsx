import { EditorContactFields } from "@/components/editor/contact";
import { EditorMessagesFields } from "@/components/editor/messages";
import { EditorPreview } from "@/components/editor/preview";
import { EditorProvider } from "@/components/editor/provider";
import { EditorScreenshot } from "@/components/editor/screenshot";
import { EditorSystemFields } from "@/components/editor/system";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { Section, SectionContainer } from "@/components/ui/section";
import Link from "next/link";

export default function Home() {
  return (
    <EditorProvider>
      <Page>
        <Section>
          <SectionContainer>
            <div className="flex flex-col items-center md:flex-row md:items-stretch gap-8">
              <div className="text-left flex-1 max-w-[420px] flex flex-col justify-center">
                <div className="sticky top-8 flex flex-col gap-8">
                  <EditorContactFields />
                  <EditorSystemFields />
                  <EditorMessagesFields />
                  <EditorScreenshot />

                  <div className="text-xs text-center text-muted-foreground">
                    <div>
                      Made by{" "}
                      <Link
                        href="https://x.com/slowjamsteve"
                        className="text-primary underline hover:no-underline"
                        target="_blank"
                      >
                        <i className="">@slowjamsteve</i>
                      </Link>
                      {` on `}
                      <Link
                        href="https://x.com/slowjamsteve"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <i className="icon-[simple-icons--x]" />
                      </Link>
                      {` and `}
                      <Link
                        href="https://bsky.app/profile/slowjamsteve.bsky.social"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <i className="icon-[simple-icons--bluesky]" />
                      </Link>
                    </div>
                    <Link
                      href="https://stevenfrady.com"
                      className="text-primary underline hover:no-underline"
                      target="_blank"
                    >
                      stevenfrady.com
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center rounded-xl">
                <EditorPreview />
              </div>

              {/* <div className="text-left flex-1 max-w-[420px] md:max-w-[260px] flex flex-col items-stretch justify-start">
                <div className="sticky top-8 flex flex-col gap-4">
                </div>
              </div> */}
            </div>
          </SectionContainer>
        </Section>
      </Page>
    </EditorProvider>
  );
}
