import { EditorContactFields } from "@/components/editor/contact";
import { EditorMessagesFields } from "@/components/editor/messages";
import { EditorPreview } from "@/components/editor/preview";
import { EditorProvider } from "@/components/editor/provider";
import { EditorScreenshot } from "@/components/editor/screenshot";
import { EditorSystemFields } from "@/components/editor/system";
import { Page } from "@/components/ui/page";
import { Section, SectionContainer } from "@/components/ui/section";
import Link from "next/link";

export default function Home() {
  return (
    <EditorProvider>
      <Page>
        <Section>
          <SectionContainer>
            <div className="flex flex-row gap-4">
              <div className="text-left flex-1 max-w-[420px]">
                <div className="sticky top-8 flex flex-col gap-8">
                  <EditorContactFields />
                  <EditorSystemFields />
                  <EditorMessagesFields />

                  <div className="text-xs text-center text-muted-foreground">
                    <div>
                      Made by{" "}
                      <Link
                        href="https://x.com/slowjamsteve"
                        className="text-primary underline hover:no-underline"
                        target="_blank"
                      >
                        <i className="">@slowjamsteve</i>
                      </Link>{" "}
                      On <i className="icon-[simple-icons--x]" />
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

              {/* <div className="flex-1 max-w-[420px]">
              </div> */}

              <div className="flex-1 flex flex-col items-center">
                <EditorPreview />
              </div>

              <div className="fixed right-8 bottom-8">
                <EditorScreenshot />
              </div>
            </div>
          </SectionContainer>
        </Section>
      </Page>
    </EditorProvider>
  );
}
